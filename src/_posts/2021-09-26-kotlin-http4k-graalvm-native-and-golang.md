---
title: Kotlin http4k (via GraalVM Native Image) and Golang
description: "How Kotlin compiled to native image via GraalVM Native Image compares to Golang."
---

First things first, this article is not a scientific performance comparison between [Kotlin](https://kotlinlang.org/) and [Go](https://golang.org/) (aka Golang). I want to show that someone can use lightweight frameworks with Kotlin to achieve small enough binaries that execute fast, and quite comparable to Go's executables. One of my favourite deployment platforms is AWS Lambda, and it really makes a difference having small artifacts to upload, with very fast startup times, otherwise [cold start invocations](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/) will essentially push latencies to the roof.

As part of a new project, I am trying to decide what stack to use as the backend. Let's see how Go and Kotlin compare based on my very subjective and opinionated experience.

**Go** (favourite backend choice)

- PRO: Great developer experience (i.e. tooling)
- PRO: Great standard library
- PRO: Small binary executables
- PRO: Amazing performance (especially the low memory usage!)
- CON: Some things are not available in quality libraries, hence might need boilerplate, or complete development (e.g. Machine Learning)

**Kotlin** (favourite language)

- PRO: Amazingly expressive language
- PRO: Great standard library & third-party libraries for anything
- PRO: Good developer experience (at least when Gradle et al. work as expected)
- PRO: Good overall performance
- CON: Very high memory usage due to [Java Virtual Machine (JVM)](https://en.wikipedia.org/wiki/Java_virtual_machine)

The rest of the article will be a walkthrough for implementing a small API in Go and Kotlin, with a comparison of their performance against 200 simultaneous connections of 10s continuous traffic.

## API

A very simple API with two endpoints, and [SQLite](https://www.sqlite.org) as the database.

- `/?name=<requested-name>`
    + Checks the database to see if `<requested-name>` exists in the `users` table and responds accordingly.
- `/add?name=<new-name>`
    + Tries to add a new entry in the `users` table with `name=<new-name>` (without checking if it exists) and responds accordingly.

The table schema:
```sql
sqlite> .schema
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    UNIQUE(name)
);
```

## Go

I will not paste here the full code for Go since it's quite a few lines, and it's not the main purpose of this article.

Check out the full source code at <https://github.com/lambrospetrou/code-playground/blob/master/go-vs-kotlin-datastores/golang/main.go>.

The only third-party dependency I use is [`crawshaw.io/sqlite`](https://pkg.go.dev/crawshaw.io/sqlite) library by David Crawshaw as the SQLite driver, who also [wrote an amazing article](https://crawshaw.io/blog/go-and-sqlite) about it.

### Stats

Some interestings facts of the Go implementation.

- Binary size: `9.7MB`

```
$ ls -hl v1
-rwxr-xr-x  1 lambros  lambros   9.7M 26 Sep 20:10 v1
```
- RSS memory at startup: `6.6MB`

```
$ ps -eo pid,rss,%mem,%cpu,command | grep -e "./v1"
90176   6660  0.0   0.0 ./v1
```

- Replay `GET /add?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `15.11k` (total: `303834`)
    + RSS memory after replay: `17.9MB` (**!**)

```
$ wrk -t2 -c100 -d10s --latency --timeout 1s http://localhost:8080/add\?name\=i_am_ironman
Running 10s test @ http://localhost:8080/add?name=i_am_ironman
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     4.89ms   15.52ms 675.26ms   97.49%
    Req/Sec    15.11k     2.10k   18.45k    58.91%
  Latency Distribution
     50%    3.00ms
     75%    3.62ms
     90%    4.51ms
     99%   51.22ms
  303834 requests in 10.10s, 52.45MB read
  Non-2xx or 3xx responses: 303833
Requests/sec:  30075.57
Transfer/sec:      5.19MB
```

- Replay `GET /?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `18.58k` (total: `373386`)
    + RSS memory after replay: `18.2MB` (**!**)

```
$ wrk -t2 -c100 -d10s --latency --timeout 1s http://localhost:8080/\?name\=i_am_ironman
Running 10s test @ http://localhost:8080/?name=i_am_ironman
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.65ms  702.95us   9.48ms   73.62%
    Req/Sec    18.58k     2.45k   26.61k    74.26%
  Latency Distribution
     50%    2.60ms
     75%    2.99ms
     90%    3.50ms
     99%    4.75ms
  373386 requests in 10.10s, 53.06MB read
Requests/sec:  36960.38
Transfer/sec:      5.25MB
```

Small binary, fast startup, and extremely low memory usage 🚀

## Kotlin

I am a huge fan of the [http4k](https://www.http4k.org/) framework for building APIs with Kotlin. It is very small, modular, extremely versatile, and due to its philosophy "Server as a Function" it's just an absolute joy to work with. It works both locally, and in AWS Lambda, and runs inside the JVM but also supports compiling down to native binary through [GraalVM Native Image](https://www.graalvm.org/reference-manual/native-image/).

As a driver for SQLite I used [SQLDelight](https://cashapp.github.io/sqldelight/jvm_sqlite/). This is the first time I used it, and I am very pleasantly surprised by how nice it is. Definitely using it for all my SQL needs in the JVM. I tried to use [JetBrains Exposed](https://github.com/JetBrains/Exposed) before SQLDelight but faced issues during the native image compilation, and its custom modelling is a no-go for me.

Check out the full source code at <https://github.com/lambrospetrou/code-playground/tree/master/go-vs-kotlin-datastores/kotlin-sqlite>.

As I mentioned above, I really love Kotlin "the language", and in combination with `http4k`, it enables very lean servers. This is the entire server code.

```kotlin
package com.example

import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.sqlite.driver.JdbcSqliteDriver
import org.http4k.core.HttpHandler
import org.http4k.core.Method.GET
import org.http4k.core.Response
import org.http4k.core.Status
import org.http4k.core.Status.Companion.BAD_REQUEST
import org.http4k.core.Status.Companion.NOT_FOUND
import org.http4k.core.Status.Companion.OK
import org.http4k.routing.bind
import org.http4k.routing.routes
import org.http4k.server.ApacheServer
import org.http4k.server.asServer
import org.sqlite.SQLiteConfig

fun makeApp(db: Database): HttpHandler = routes(
    "/ping" bind GET to {
        Response(OK).body("pong")
    },

    "/add" bind GET to {
        val name = (it.query("name") ?: "").trim()
        when {
            name.isEmpty() ->
                Response(BAD_REQUEST).body("Invalid 'name' given: $name")
            else -> {
                val userQueries = db.usersQueries
                try {
                    userQueries.transaction {
                        userQueries.addUser(name = name)
                    }
                    Response(OK).body("Welcome to our community $name!")
                } catch (e: Exception) {
                    Response(Status.INTERNAL_SERVER_ERROR).body("Sadly we failed to register you: $name")
                }
            }
        }
    },

    "/" bind GET to {
        val name = (it.query("name") ?: "").trim()
        when {
            name.isEmpty() ->
                Response(BAD_REQUEST).body("Invalid 'name' given: $name")
            else -> {
                val userQueries = db.usersQueries
                userQueries.selectByName(name = name).executeAsOneOrNull()?.let {
                    Response(OK).body("Boom! We found you: $name")
                } ?: Response(NOT_FOUND).body("Sadly we could not find you: $name")
            }
        }
    }
)

fun main() {
    val port = (System.getenv("PORT") ?: "9000").toInt()

    val config = SQLiteConfig().apply {
        setSharedCache(true)
        setJournalMode(SQLiteConfig.JournalMode.WAL)
    }
    val driver: SqlDriver = JdbcSqliteDriver("jdbc:sqlite:/tmp/users.sqlite3", properties = config.toProperties())
    Database.Schema.create(driver)

    val app: HttpHandler = makeApp(db = Database(driver))
    val server = app.asServer(ApacheServer(port)).start()

    println(Runtime.getRuntime().availableProcessors())
    println("Server started on " + server.port())
}
```

## Stats - JVM

In this section I am going to show the stats for running the above Kotlin code inside the JVM, the standard way.
The following stats are without any custom JVM argument, just `java -jar build/libs/HelloWorld.jar`.

For context, I use the JVM provided by GraalVM:

```
$ java -version
openjdk version "16.0.2" 2021-07-20
OpenJDK Runtime Environment GraalVM CE 21.2.0 (build 16.0.2+7-jvmci-21.2-b08)
OpenJDK 64-Bit Server VM GraalVM CE 21.2.0 (build 16.0.2+7-jvmci-21.2-b08, mixed mode, sharing)
```

- Fat-JAR size: `15MB`

```
$ ls -hl build/libs/HelloWorld.jar
-rw-r--r--  1 lambros  lambros    15M 26 Sep 21:42 build/libs/HelloWorld.jar
```

- RSS memory at startup: `143.9MB`

```
$ ps -eo pid,rss,%mem,%cpu,command | grep -e "HelloWorld.jar"
 3460 143924  0.4   0.0 java -jar build/libs/HelloWorld.jar
```

- Replay `GET /add?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `7.17k` (total: `142653`)
    + RSS memory after replay: `1400MB` (`1.4GB`)

```
$ wrk -t2 -c100 -d10s --latency --timeout 1s http://localhost:9000/add\?name\=i_am_ironman
Running 10s test @ http://localhost:9000/add?name=i_am_ironman
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    68.57ms  154.96ms 950.92ms   88.32%
    Req/Sec     7.17k     2.18k   12.00k    65.50%
  Latency Distribution
     50%  138.00us
     75%   39.81ms
     90%  269.81ms
     99%  722.75ms
  142653 requests in 10.01s, 27.75MB read
  Socket errors: connect 0, read 0, write 0, timeout 278
  Non-2xx or 3xx responses: 142653
Requests/sec:  14253.41
Transfer/sec:      2.77MB
```

- Replay `GET /?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `17.37k` (total: `345639`)
    + RSS memory after replay: `2500MB` (`2.5GB`)

```
$ wrk -t2 -c100 -d10s --latency --timeout 1s http://localhost:9000/\?name\=i_am_ironman
Running 10s test @ http://localhost:9000/?name=i_am_ironman
  2 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.41ms    4.36ms 139.93ms   93.48%
    Req/Sec    17.37k     3.04k   20.22k    92.00%
  Latency Distribution
     50%    2.68ms
     75%    4.68ms
     90%    6.92ms
     99%   15.54ms
  345639 requests in 10.01s, 1.01GB read
  Non-2xx or 3xx responses: 340797
Requests/sec:  34526.79
Transfer/sec:    103.35MB
```

So much memory used...

I also tried restricting the heap memory to `512MB` (with `java -Xmx512M -jar build/libs/HelloWorld.jar`) but the results were roughly the same.
The `ApacheServer` used here seems to be using lots of memory due to the many connections.

## Stats - GraalVM Native Image

This section shows the boost we can get by compiling our code down to a native binary using GraalVM Native Image. This is a great piece of technology and hopefully it will keep evolving and improving.

This is the command I use to compile the fat-JAR down to a binary:
```
$ native-image --no-fallback -H:+ReportExceptionStackTraces --enable-url-protocols=https -jar build/libs/HelloWorld.jar build/libs/HelloWorld-native
```

- Binary size: `46MB`
- RSS memory at startup: `19.7MB` (**!**)
- Replay `GET /add?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `6.50k` (total: `129385`)
    + RSS memory after replay: `721.1MB`
- Replay `GET /?name=i_am_ironman` for 10s with 2 threads of 100 connections each.
    + Average requests per second: `17.17k` (total: `341736`)
    + RSS memory after replay: `1700MB` (`1.7GB`)

As we can see, the memory usage is reduced significantly compared to the JVM runs, especially at the start, without introducing significant performance regression. Also, even though the binary size is larger than the fat-JAR, this is a standalone binary we can copy to any system and just run. In the fat-JAR case we still need to have the Java JVM installed in the system running the code. Although, to be fair, with the fat-JAR being less than `20MB` cold starts in AWS Lambda should be non-existent. 

### Binary compression with UPX

> [UPX](https://upx.github.io/) is a free, portable, extendable, high-performance executable packer for several executable formats. 

Running `upx -7 -k build/libs/HelloWorld-native` will essentially take the GraalVM binary and compress it down significantly. The first time the executable runs, it decompresses the content and then proceeds to execution.

The size of the binary went from `46MB` down to `18.9MB`, without affecting the startup time in any meanigful way.
This is great news since it's very close to the Go binary size.

## Stats - Summary

|                      | Artifact Size | Initial RSS memory | Final RSS memory | Replay 1 Total Requests | Replay 2 Total Requests |
|----------------------|---------------|--------------------|------------------|-------------------------|-------------------------|
| Go                   | 9.7MB         | 6.6MB              | 18.2MB           | 303834                  | 373386                  |
| JVM Fat-JAR          | 15MB          | 143.9MB            | 2500MB           | 142653                  | 345639                  |
| GraalVM Native Image | 46MB          | 19.7MB             | 1700MB           | 129385                  | 341736                  |
| UPX                  | 18.9MB        | -                  | -                | -                       | -                       |

## Conclusion

Please don't get too scientific on me about the results. I know (and acknowledge) there are many nuances that affect the differences in performance, especially with SQLite parameters used, connection pooling in Go but not in Kotlin, etc.

The throughput & latency of all server versions examined above is satisfactory to me, so that's not a concern.

The huge memory usage difference though is what still concerns me when using the JVM, even when the code gets compiled down to an executable binary.
I expected that with GraalVM Native Image the memory use would be reduced a lot more, but I guess there is still lots of space for improvement.

I really like Kotlin the language though, so I am looking forward to the moment when memory won't be an issue anymore. For the time being, I think I will stick with Go for long-running servers that will have thousands of parallel open connections. On the other hand, for AWS Lambda deployments Kotlin has become a very viable solution! Each Lambda invocation serves exactly one connection at a time, which means we only care about the binary size, and overall performance, and both of these issues are solved with GraalVM Native Image.

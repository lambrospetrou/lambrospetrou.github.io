---
title: "Testing the Cloudflare D1 REST API with Hurl"
description: "Learn techniques and tips for using Hurl to test your own REST APIs with Cloudflare D1 as example."
---

**Table of contents**

-   [User journey](#user-journey)
-   [Hurl source](#hurl-source)
-   [Create a new database](#create-a-new-database)
-   [Ensure freshness](#ensure-freshness)
-   [Database details](#database-details)
-   [Database queries](#database-queries)
-   [Conclusion](#conclusion)

As I wrote in a previous post, [I love using Hurl](/articles/hurl/) to test HTTP JSON APIs.
[Hurl](https://hurl.dev) is a command-line interface tool (CLI) that **makes testing and automating HTTP APIs easy and enjoyable**.

In this article, I will showcase some Hurl features with a concrete example. We will test part of the [Cloudflare D1 REST API](https://developers.cloudflare.com/api/operations/cloudflare-d1-list-databases).

## User journey

[Cloudflare D1](https://developers.cloudflare.com/d1/) is Cloudflare's take on a serverless SQL database.
It's built ontop of SQLite and specifically the [SQLite in Durable Objects](https://developers.cloudflare.com/durable-objects/api/sql-storage/) product.
Read the blog post [Zero-latency SQLite storage in every Durable Object](https://blog.cloudflare.com/sqlite-in-durable-objects/) for more details.

D1 is meant to be used from within a [Worker](https://developers.cloudflare.com/workers/) using the [D1 Worker Binding API](https://developers.cloudflare.com/d1/worker-api/) for best performance.
It provides however a REST API that allows scripts and automation to interact with a database instance from anywhere.

**Note:** _The D1 REST API is not optimized for performance, since all requests go through a central location, but can be useful for adhoc queries._

The user journey we will test is the following:

1. **Create** a D1 database named `skybear-test-001`.
    - This can fail if a database already exists with that name.
2. **List** the databases of the account and extract the database UUID for the one named `skybear-test-001`.
    - We use a list operation to figure out the database ID since the previous step can fail, hence we might not have the ID of the same-named existing database.
3. If step 1 failed, it means the database existed already, so **delete** the database with the ID from step 2.
4. If step 1 failed, we need to **create** a new database instance.
5. **Get** the database details and assert its details.
6. Submit an SQL query with one `CREATE` and one `SELECT` statements and assert the results.
7. Submit the same queries as step 6, but requesting "/raw" results instead of the default and assert the results.

Steps 1-4 could be simplified into a single step just creating the database but in the sake of showcasing some Hurl features we make our test suite more robust so that steps 5-7 always work with a freshly created database.

## Hurl source

The Cloudflare D1 REST API requires an [account API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/), and the `accountId` ([find your account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/)) to be provided in all requests.

We will use [Hurl variables](https://hurl.dev/docs/templates.html#injecting-variables) to extract both of these values and simplify our scripts to not contain hardcoded secrets.
The variables are `CLOUDFLARE_TOKEN` and `CLOUDFLARE_ACC_ID`.

### Create a new database

```http
POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
{
  "name": "skybear-test-001",
  "primary_location_hint": "weur"
}
HTTP *
[Captures]
db_created: jsonpath "$.success"
```

A simple `POST` request, already showcasing some Hurl niceties.

We can specify request headers (e.g. `Authorization`) right below the HTTP method and URL of the request.

The multiline inlined JSON between lines 3-6 will automatically set the `Content-Type: application/json` header to our request.

The `HTTP *` line indicates that we expect an HTTP response code of anything, hence the `*`.
The reason we don't assert the exact code is that as we explained, this create request can fail if a database already exists with the same name.

The last line is a [captured variable](https://hurl.dev/docs/capturing-response.html), and is what we will use in steps 3-4.
We create a new variable named `db_created` that will have the value of the `success` property of the JSON response.

A value `true` for `db_created` denotes that there wasn't any existing database with the same name and all went well, whereas a value of `false` denotes that the creation failed, and we need to delete the existing database first.

Hurl supports [JSONPath](https://goessner.net/articles/JsonPath/) for easy parsing of JSON API responses.

### Ensure freshness

As mentioned above, we want our main test requests to query a newly created database, so the steps described in this section delete any existing database with the same name and re-create it.

We want to find the ID of the existing database (step 2 of user journey).
The following Hurl source does that by listing all databases and extracting the ID of the one named `skybear-test-001`.

```http
GET https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
HTTP 200
[Captures]
db_id: jsonpath "$.result[?(@.name == 'skybear-test-001')].uuid" nth 0
```

Line 3 asserts that we received an HTTP response code `200` indicating success, and line 5 creates a new variable `db_id` that has the UUID value of the existing database.

This [JSONPath documentation](https://goessner.net/articles/JsonPath/) is nice for understanding the syntax, but it basically filters the `result` array for items that have `name == 'skybear-test-001'` and then returns the `uuid` field for each item selected.

The final `nth 0` ensures that our variable will have a single string value and not an array value, since we will reuse it in subsequent requests.

The following snippet issues a `DELETE` request to the appropriate URL using the `db_id` variable (step 3).

```http
DELETE https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
[Options]
skip: {{ db_created }}
HTTP 200
```

The interesting bit here is the `skip: {{ db_created}}` request option.

If the `skip` option value is `true` the request will not be sent.
This ensures we only delete the database if step 1 above failed.

```http
POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
[Options]
skip: {{ db_created }}
{
  "name": "skybear-test-001",
  "primary_location_hint": "weur"
}
HTTP 200
[Captures]
db_id: jsonpath "$.result.uuid"
```

Similarly to the deletion, in this step we create a new database (step 4), only if step 1 failed, and then we assign the newly created database ID to the same variable `db_id`.

We use the `skip: {{ db_created}}` request option again to only do this if necessary.

### Database details

At this point we have a new database ready to accept our queries.

```http
GET https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
HTTP 200
[Asserts]
jsonpath "$.success" == true
jsonpath "$.result.uuid" == {{ db_id }}
jsonpath "$.result.name" == "skybear-test-001"
jsonpath "$.result.running_in_region" == "WEUR"
```

We do a straightforward `GET` request here to assert the basic details of the database.

Using [Hurl's powerful assertions](https://hurl.dev/docs/asserting-response.html) we ensure it has the name and ID we expect, and is placed in the location we provided during creation (step 1 or 4).

### Database queries

We now want to execute SQL queries on our database.

The `/query` endpoint ([see docs](https://developers.cloudflare.com/api/operations/cloudflare-d1-query-database)) accepts an `sql` string that can contain multiple SQLite statements and responds with an array of results, one for each statement.

In the example below, we issue two statements, one to create a new table, and one to select a few rows from the SQLite built-in table `sqlite_master`.

```http
POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}/query
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
Content-Type: application/json
{"sql": "CREATE TABLE IF NOT EXISTS marvel (name TEXT, power INTEGER); SELECT name, type FROM sqlite_master ORDER BY name ASC;"}
HTTP 200

[Asserts]
jsonpath "$.success" == true
jsonpath "$.result[0].success" == true
jsonpath "$.result[0].results" count == 0
jsonpath "$.result[1].success" == true
jsonpath "$.result[1].results[0].name" == "_cf_KV"
jsonpath "$.result[1].results[0].type" == "table"
jsonpath "$.result[1].results[1].name" == "marvel"
jsonpath "$.result[1].results[1].type" == "table"

# SQL Duration in the Durable Object should be FAST! (less than 2ms)
jsonpath "$.result[0].meta.duration" < 2.0
jsonpath "$.result[1].meta.duration" < 2.0
```

There shouldn't be anything new in the above snippet apart from the fact that we use more [Hurl filters](https://hurl.dev/docs/filters.html) in our assertions. For example, `jsonpath "$.result[0].results" count == 0` asserting that our first result (the `INSERT` statement) has zero rows returned.

The last two lines assert that the SQLite statement execution duration was less than 2 milliseconds.
Yes, SQLite in Durable Objects is fast🚀

The following is an excerpt of the actual response:

```json
{
    "result": [
        {
            "results": [],
            "success": true,
            "meta": {
                "duration": 0.2732 //...
            }
        },
        {
            "results": [
                {
                    "name": "_cf_KV",
                    "type": "table"
                },
                {
                    "name": "marvel",
                    "type": "table"
                }
            ],
            "success": true,
            "meta": {
                "duration": 0.2147 //...
            }
        }
    ],
    "success": true
}
```

Finally, our last test will be against the `/raw` endpoint that is identical to the `/query` above but instead of returning an array of objects as `results`, it returns the raw rows and separately the column names ([see docs](https://developers.cloudflare.com/api/operations/cloudflare-d1-raw-database-query)).

```http
POST https://api.cloudflare.com/client/v4/accounts/{{ CLOUDFLARE_ACC_ID }}/d1/database/{{ db_id }}/raw
Authorization: Bearer {{ CLOUDFLARE_TOKEN }}
Content-Type: application/json
{"sql": "CREATE TABLE IF NOT EXISTS marvel (name TEXT, power INTEGER); SELECT name, type FROM sqlite_master ORDER BY name ASC;"}
HTTP 200

[Asserts]
jsonpath "$.success" == true
jsonpath "$.result[0].success" == true
jsonpath "$.result[0].results.columns" count == 0
jsonpath "$.result[0].results.rows" count == 0

jsonpath "$.result[1].success" == true
jsonpath "$.result[1].results.columns[0]" == "name"
jsonpath "$.result[1].results.columns[1]" == "type"
jsonpath "$.result[1].results.rows[0][0]" == "_cf_KV"
jsonpath "$.result[1].results.rows[0][1]" == "table"
jsonpath "$.result[1].results.rows[1][0]" == "marvel"
jsonpath "$.result[1].results.rows[1][1]" == "table"

# SQL Duration in the Durable Object should be FAST! (less than 2ms)
jsonpath "$.result[0].meta.duration" < 2.0
jsonpath "$.result[1].meta.duration" < 2.0
```

Almost identical, with the assertions of the rows and columns being the difference.

OK, that's it.

With a few lines we have tested and asserted almost all of the D1 REST API.

## Skybear.NET

Finally, a piece of self-promotion😅

If you use Hurl for HTTP API testing, and have scripts you wish you could run on a schedule or on-demand as part of your CI pipeline I am building [<span class="skybear-name">Skybear<span>.NET</span></span>](https://www.skybear.net/) doing exactly that.

The platform provides you [comprehensive reports for every single script run execution](https://www.skybear.net/docs/features/script-run-report/) that you can view at any time.
The full HTTP response headers and bodies are automatically persisted for you, for every execution, which makes investigations and troubleshooting of your APIs easy and simple.

The full script we examined so far is running as we speak on the Skybear.NET platform every few minutes.

Try [<span class="skybear-name">Skybear<span>.NET</span></span>](https://www.skybear.net/) and send me your feature requests.

## Conclusion

If you are doing anything with HTTP-based APIs and websites, do yourself a favour and integrate [Hurl](https://hurl.dev) into your daily workflow.

Hurl is amazing, and comes with a CLI that runs all your test files in parallel by default, generates detailed JSON and HTML reports, and it's overall a great way to ensure correctness of your APIs.

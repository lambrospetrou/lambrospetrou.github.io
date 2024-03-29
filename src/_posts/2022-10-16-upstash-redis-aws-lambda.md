---
title: "AWS Lambda + Upstash Redis + Go = 🚀❤️"
description: "Low latency APIs on AWS Lambda, using Go, backed by Serverless Redis, for a great developer experience. Guest blog on Upstash Redis blog."
canonical_url: https://upstash.com/blog/aws-lambda-go-redis
---

This article was originally posted as a [guest post on Upstash Redis blog](https://upstash.com/blog/aws-lambda-go-redis). I am cross-posting it here for my records.

---

## Intro

Serverless compute platforms are awesome, but without serverless databases they are too limited.

While I was building the platform for my upcoming course, [The Elements of CI/CD](https://www.elementsofcicd.com?utm_source=personal_blog), I wanted a serverless database since I decided to use [AWS Lambda](https://aws.amazon.com/lambda/) as my server for certain things. The requirements I had were:

1. **Pay as you go pricing**. I don't want to pay per hour or per node, but by usage (requests, storage, etc). It should be very cheap to start using it and as usage ramps up the cost would grow proportionally.
2. **Low latency**. Nobody likes slow responses, so querying the database should be fast from inside AWS regions (e.g. `eu-west-1`).
3. **Great developer experience (DevX)**. Having a nice interface for the database without having to learn yet another niche DSL, or wasting hours fiddling with a website is preferred.

[Upstash Redis](https://upstash.com/redis) satisfies all of the above requirements, and it does a great job at it.

- Pay as you go?
  - ✅ Really affordable to start, and also at scale!
- Low latency?
  - ✅ <1ms latency from querying from inside AWS Lambda!
- Great DevX?
  - ✅ It's standard Redis. So, yeap.

In this article we are going to see how to use Upstash Redis from inside AWS Lambda, ensure it is fast enough for our needs, whilst at the same time keeping our code maintainable in order to be able to test locally or deploy to a different platform if needed.

## What are we implementing?

For simplicity, we are going to implement just 3 API endpoints:

1. The `GET|POST /login` endpoint which accepts a `userId` as a query parameter in a `GET`, or inside a form value submitted with a `POST` request. This endpoint will generate a session ID, store it in Redis, and also set a cookie for subsequent visits. The `GET` just makes it easier to test.🙃
2. The `GET /lessons/completed` endpoint requires logged in users (i.e. having the cookie with the session ID) and returns a JSON response with all the lessons the user completed and when.
3. The `POST /lessons/{lessonSlug}/mark-complete` endpoint requires logged in users (i.e. having the cookie with the session ID) and marks the lesson denoted by `lessonSlug` as completed with the current time.

_Note: In the code below there are a few things missing, thus this is not production-ready copy-pasteable code. For example, we should check that the given `lessonSlug` exists before updating it. The login endpoint should also accept a password and do proper salted/hashed verification before creating session IDs, etc._

## 1. Setup

- The complete code detailed below also exists in my [`aws-playground` repository](https://github.com/lambrospetrou/aws-playground/tree/master/aws-lambda-upstash-redis-article) if you want to see how everything fits together.

As you will see below, we are creating two entrypoints, i.e. two executable commands. One will be for a normal local server, and one will be for AWS Lambda. This way, we will be able to test our whole logic locally, and with standard unit/integration tests if we wanted.

The only differences between them is shown in sections 1.2 and 1.3 below.

### 1.1 Workspace

Before we dive into the code, let's setup our working directory for Go.

1. [Download Go](https://go.dev/doc/install).
2. [Create an Upstash Redis account and database](https://docs.upstash.com/redis#create-account) in a region of your choosing. Ideally it should be the same AWS region you will deploy your Lambda. I will be using `eu-west-1` (Europe, Ireland) in this article.

![Redis database details](/articles-data/2022-10-16-upstash-redis-aws-lambda/upstash-dburl.jpg)

After completing the above, we can now create our workspace. For the rest of the article, assume our code is under `~/dev/aws-lambda-upstash-redis`.

```bash
mkdir -p ~/dev/aws-lambda-upstash-redis
cd ~/dev/aws-lambda-upstash-redis
```

Then, create a Go package:

```bash
go mod init com.upstash/example/aws-lambda-upstash-redis
```

### 1.2 Local server entrypoint

- Paste the following code in `~/dev/aws-lambda-upstash-redis/cmd/server/main.go`.

```go
package main

import (
	"log"
	"net/http"
	"os"

	"com.upstash/example/aws-lambda-upstash-redis/core"
)

func main() {
	mux := core.NewMux()
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "5000"
	}
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}
```

### 1.3 AWS Lambda entrypoint

- Paste the following code in `~/dev/aws-lambda-upstash-redis/cmd/lambda/main.go`.

```go
package main

import (
	"com.upstash/example/aws-lambda-upstash-redis/core"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
)

func main() {
	mux := core.NewMux()
	lambda.Start(httpadapter.NewV2(mux).ProxyWithContext)
}
```

### 1.4 Core logic

Our main core logic will go into the `core` package to be shared by both entry points above.

- Paste the following code in `~/dev/aws-lambda-upstash-redis/core/lib.go`.

```go
package core

import (
	"github.com/go-chi/chi/v5"
)

func NewMux() *chi.Mux {
	r := chi.NewRouter()
	return r
}
```

### 1.5 Building / Compiling

I usually write a small `makefile` to avoid typing long commands every time I want to compile so copy the following into `~/dev/aws-lambda-upstash-redis/makefile`:

```makefile
default: build

clean:
	rm -rf build/

build: build-lambda build-server

build-lambda: clean
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o build/handler cmd/lambda/main.go
	cd build/ && zip handler.zip ./handler

build-server: clean
	CGO_ENABLED=0 go build -o build/server cmd/server/main.go
```

Don't worry too much for now about the details but this allows us to do:

- `make build-server`: Builds the binary for running the server locally (executable `./build/server`).
- `make build-lambda`: Builds the binary for running the server on AWS Lambda (executable `./build/handler` and `./build/handler.zip`).
- `make` or `make build` does both.

The `CGO_ENABLED=0` option makes sure our executable binaries are self-contained (i.e. statically compiled). The `GOOS=linux GOARCH=amd64` options are needed to cross-compile and match the linux environment of AWS Lambda in case you are using a Mac or Windows system locally.

Next, run `go mod tidy` to fetch all the code dependencies. Remember to run this every time you add or remove Go dependencies.

Finally, run `make` once, in order to build everything and make sure your workspace is setup, before we go deeper into the code.

## 2. API implementation

_For this section we will always be working inside the `~/dev/aws-lambda-upstash-redis/core/lib.go` file._

The following few lines define the API endpoints we discussed earlier, using the amazing [`go-chi`](https://github.com/go-chi/chi/) library.

```go
import (
	//...
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func NewMux() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/login", login)
	r.Post("/login", login)
	r.Group(func(r chi.Router) {
		r.Use(UsersWithSessionOnly)
		r.Get("/lessons/completed", listLessonsCompleted)
		r.Post("/lessons/{lessonSlug}/mark-complete", markLessonComplete)
	})

	return r
}
```

In the snippet above, `r.Group(...)` creates a shared layer where we can apply common middleware for any route defined inside of it. In this case, we add our own middleware `UsersWithSessionOnly`, which as we will see later guarantees that the request contains the cookie with an active session ID.

### 2.1 UsersWithSessionOnly middleware

In this middleware we want to implement the following:

1. Extract the cookie that contains the session ID, and fail otherwise.
2. Query Redis to fetch the user details based on the session ID, and fail if the session ID provided is not active.
3. Store the user ID in the request's `context.Context` in order to make it available to downstream middleware or handlers.

First, we need some boilerplate code for some imports and definitions that are used everywhere.

```go
import (
	//...
	"log"
	"os"
	"strings"

	"github.com/go-redis/redis/v8"
)

type contextKey struct {
	name string
}
const (
	COOKIE_AUTH_NAME = "xxx_session_id"
)
var (
	CTX_USER_ID = &contextKey{"LoggedInUserId"}
	redisDb     = NewClient()
)

func NewClient() *redis.Client {
	redisUrl := strings.TrimSpace(os.Getenv("UPSTASH_REDIS_URL"))
	if redisUrl == "" {
		log.Fatalln("Required env UPSTASH_REDIS_URL not set!")
	}
	opt, _ := redis.ParseURL(redisUrl)
	redisDb := redis.NewClient(opt)

	return redisDb
}
```

And now the main logic for the authentication middleware.

```go
// UsersWithSessionOnly middleware restricts access to just logged-in users.
// If validation passes, then the context will contain the user id (CTX_USER_ID).
func UsersWithSessionOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, err := r.Cookie(COOKIE_AUTH_NAME)
		if err != nil {
			render.Status(r, http.StatusForbidden)
			render.JSON(w, r, struct{}{})
			return
		}

		ctx := r.Context()
		userId, err := redisDb.Get(ctx, "session:"+c.Value).Result()
		if err == redis.Nil {
			// If session is not found then user is forbidden from accessing the API!
			render.Status(r, http.StatusForbidden)
			render.JSON(w, r, struct{}{})
			return
		} else if err != nil {
			// Something went wrong querying Redis!
			render.Status(r, http.StatusInternalServerError)
			render.JSON(w, r, struct{ Message string }{Message: "We could not validate the provided session ID"})
			return
		}
		// Set it for downstream middleware and handlers.
		next.ServeHTTP(w, r.WithContext(context.WithValue(ctx, CTX_USER_ID, userId)))
	})
}
```

### 2.2 markLessonComplete(...)

This is a straightforward operation where we want to store in Redis that the lesson denoted by the `lessonSlug` path parameter is completed at the current time of the request.

In Redis we want to keep a map for each user where each key-value pair in the map will be the lesson as key, and the completion date as value. Therefore, we use the [`HSET` Redis command](https://redis.io/commands/hset/). We could also store a separate key per lesson but this makes it easier to fetch all the lessons for a user at once later.

```go
func markLessonComplete(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	lessonSlug := chi.URLParam(r, "lessonSlug")
	userId := r.Context().Value(CTX_USER_ID).(string)
	timeNow := time.Now().Format(time.RFC3339)

	err := redisDb.HSet(ctx, "lessons:"+userId, lessonSlug, timeNow).Err()
	if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, struct{ Message string }{Message: "We could not save your progression..."})
		return
	}

	render.JSON(w, r, struct {
		LessonSlug    string
		LastCompleted string
	}{
		lessonSlug,
		timeNow,
	})
}
```

### 2.3 listLessonsCompleted(...)

In similar fashion as the previous section, here we just want to return the whole map of lessons completion and return it to the user in a JSON response. We use the [`HGETALL` command](https://redis.io/commands/hgetall/) for this.

```go
func listLessonsCompleted(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	userId := r.Context().Value(CTX_USER_ID).(string)

	lessons, err := redisDb.HGetAll(ctx, "lessons:"+userId).Result()
	if err == redis.Nil {
		lessons = map[string]string{}
	} else if err != nil {
		render.Status(r, http.StatusInternalServerError)
		render.JSON(w, r, struct{ Message string }{Message: "We could not load your lessons..."})
		return
	}

	render.JSON(w, r, struct {
		Lessons map[string]string
	}{
		lessons,
	})
}
```

### 2.4 login(...)

Finally, the login endpoint. Once again, please do not copy the following code into production, since it's not doing any kind of validation. For the purposes of this article we are only interested in how it queries Redis and how it sets the cookie for the session ID.

The session ID is generated by the [`ksuid`](https://github.com/segmentio/ksuid) library, which has a few advantages over normal UUIDs, and we only consider it active for 1 hour. We use the time-to-live functionality of the [Redis `SET` command](https://redis.io/commands/set/) for automatic removal from the database after one hour.

```go
import (
	// ...
  "github.com/segmentio/ksuid"
)

func login(w http.ResponseWriter, r *http.Request) {
	// Check credentials and update redis session and return Set-Cookie
	// WARNING: You should do an actual validation in production for credentials!
	// ...
	// For now we always assume correctness and automatically create a session token
	// by saving it to Redis, and also setting it as a cookie.
	userId := strings.TrimSpace(r.FormValue("userId"))
	if userId == "" {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, struct{ Message string }{Message: "Missing required userId"})
		return
	}

	sessionId := ksuid.New()
	redisDb.Set(r.Context(), "session:"+sessionId.String(), userId, time.Hour*1)
	http.SetCookie(w, &http.Cookie{
		Name: COOKIE_AUTH_NAME, Value: sessionId.String(),
		Path: "/", MaxAge: int((time.Hour * 1).Seconds()),
		// This should be true when deploying in production (https), but locally we need it false (http).
		Secure: false,
	})

	http.Redirect(w, r, "/lessons/completed", http.StatusTemporaryRedirect)
}
```

## 3. Demo - Locally

Phew, that was a lot of code.😅

Let's do a quick demo to make sure everything works as expected.

- First, set the `UPSTASH_REDIS_URL` environment variable to the URL of the database you created in section 1 above. You can find it in the _details_ tab of your database's page (see section 1.1 above).

```bash
export UPSTASH_REDIS_URL="<your-url-here>"
```

- Then, build and run the local server:

```bash
make build-server && ./build/server
```

### Browser testing

Now let's do some testing in the browser by visiting <http://localhost:5000/lessons/completed>.

![Demo access denied](/articles-data/2022-10-16-upstash-redis-aws-lambda/upstash-demo-step1.jpg)

We get `403 - Forbidden`, so let's login, by visiting <http://localhost:5000/login?userId=lambros>.

![Demo login results](/articles-data/2022-10-16-upstash-redis-aws-lambda/upstash-demo-step2.jpg)

We are logged in now, and we automatically got redirected to `/lessons/completed`, but they are empty. So, let's mark a lesson as completed. In the `console` tab inside the devtools of your browser run the following:

```javascript
await (
  await fetch("http://localhost:5000/lessons/123/mark-complete", {
    method: "POST",
    credentials: "same-origin",
  })
).json();

// Should output something like:
// {LessonSlug: '123', LastCompleted: '2022-10-12T02:01:14+03:00'}
```

Visiting <http://localhost:5000/lessons/completed> should show this lesson as marked now:

```json
{ "Lessons": { "123": "2022-10-12T02:01:14+03:00" } }
```

Et voila. Everything works fine!

Looking into the Redis database itself using the recently launched online Data Browser also proves that the expected data is there.

![Redis Data Browser](/articles-data/2022-10-16-upstash-redis-aws-lambda/upstash-demo-step3.jpg)

## 4. AWS Lambda

In order to test and deploy to AWS Lambda we are going to use the `sam` cli.

- First, setup the [SAM cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) and make sure your user/role has the [right permissions](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-permissions.html).

- The `sam` cli needs a Cloudformation template to work, so copy the following into `aws-iac/sam-template.yml`:

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: Defines all the AWS resources we need for our Upstash Redis API.

Resources:
  # https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html
  GoUpstashRedis:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ../build/handler.zip
      Handler: handler
      Runtime: go1.x
      MemorySize: 512
      FunctionUrlConfig:
        AuthType: NONE
        Cors:
          AllowCredentials: false
          AllowMethods: ["*"]
          AllowOrigins: ["*"]

Outputs:
  GoUpstashRedisApi:
    Description: "Endpoint URL"
    Value: !GetAtt GoUpstashRedisUrl.FunctionUrl
  GoUpstashRedis:
    Description: "Lambda Function ARN"
    Value: !GetAtt GoUpstashRedis.Arn
  GoUpstashRedisIamRole:
    Description: "Implicit IAM Role created for GoUpstashRedis"
    Value: !GetAtt GoUpstashRedisRole.Arn
```

- Build the handler bundle for AWS Lambda:

```bash
make build-lambda
```

- Add the following to `makefile` to make it easy to deploy after we do code changes:

```
sam-deploy: build-lambda
	sam deploy -t aws-iac/sam-template.yml --stack-name "UpstashRedisGoArticleStackDemo" --region eu-west-1 --resolve-s3 --no-confirm-changeset --no-fail-on-empty-changeset --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND
```

- Deploy to the specified region (see previous command).

```bash
make sam-deploy
```

- You should get some output like the below:

```bash
CloudFormation outputs from deployed stack
-----------------------------------------------------------------------------------------------------------------------------------------------------------
Outputs
-----------------------------------------------------------------------------------------------------------------------------------------------------------
Key                 GoUpstashRedis
Description         Lambda Function ARN
Value               arn:aws:lambda:eu-west-1:<redacted>:function:UpstashRedisGoArticleStackDem-GoUpstashRedis-baB8dQPkTfg0

Key                 GoUpstashRedisIamRole
Description         Implicit IAM Role created for GoUpstashRedis
Value               arn:aws:iam::<redacted>:role/UpstashRedisGoArticleStac-GoUpstashRedisRole-16UWC7HR6KII8

Key                 GoUpstashRedisApi
Description         Endpoint URL
Value               https://6pmmwqmg5vec3bcsldabckaf5i0nlgje.lambda-url.eu-west-1.on.aws/
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Successfully created/updated stack - UpstashRedisGoArticleStackDemo in eu-west-1
```

- The URL of the deployed AWS Lambda is shown in the output printed, in this case `https://6pmmwqmg5vec3bcsldabckaf5i0nlgje.lambda-url.eu-west-1.on.aws/`. So, feel free to repeat the demo steps we did in our browser before using `localhost` with the actual domain now.
  - Alternatively, you can also find the URL of the newly created function in the outputs of the CloudFormation stack `UpstashRedisGoArticleStackDemo` in the [Cloudformation console](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1).
  - **Note:** Make sure to set the `UPSTASH_REDIS_URL` environment variable on your AWS Lambda configuration as well, otherwise it will just crash. Visit the [AWS Lambda console](https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1), then click on your newly deployed Lambda, click on the **Configuration** tab, and then on the left side menu click **Environment variables**. Type `UPSTASH_REDIS_URL` as key, and your Upstash Redis URL as value. Click **Save**, and now your Lambda is ready.

### 4.1 SAM local test

We can test our Lambda locally by providing a `sample-event.json` with the right path/cookie/query parameters/etc. Example of such JSON can be found in [`aws-lambda-upstash-redis-article/sample-event.json`](https://github.com/lambrospetrou/aws-playground/blob/master/aws-lambda-upstash-redis-article/sample-event.json).

- Then, once you have a valid JSON event file, run the following to invoke the server logic as it would run on AWS Lambda:

```bash
sam local invoke -t aws-iac/sam-template.yml -e sample-event.json
```

### 4.2 Security of Upstash Redis URL

In this article, for simplicity we provided the Upstash Redis URL, containing the password, through environment variables. We don't want to hardcode this into the SAM Cloudformation template which is versioned along with our code, hence why we had to manually configure it through the AWS Lambda console.

There is a better way to do this automatically without modifying the Lambda configuration every time and to avoid having the Redis credentials/URL in plain sight for anyone with console access.

We can use [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) and the corresponding Cloudformation resource [`AWS::SSM::Parameter`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-parameter.html#aws-resource-ssm-parameter--examples) to hold the URL (we can set it once and retain during deployments), and change our Lambda code to fetch the parameter's value at runtime. We could also automatically inject it as an env variable inside `sam-template.yml`, although this would still have it in plain text in the console.

Changing the code to fetch it from SSM Parameter Store is easy due to our separation of entrypoints, so we could fetch the parameter only when running inside AWS Lambda (`~/dev/aws-lambda-upstash-redis/cmd/lambda/main.go`) and passing it through to the `NewClient()` function that creates the Redis client.

## 5. How fast is it?

Apart from the first [cold start invocation](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/) which takes roughly `100-120 ms`, every invocation thereafter is lightning fast and always under `4 ms`.

Below is an example of a hot invocation for the `/login?userId=lambros` endpoint as implemented above:

![AWS Lambda runtime duration](/articles-data/2022-10-16-upstash-redis-aws-lambda/upstash-bench-lambda.jpg)

As you can see the total duration of our request was `2.06 ms`. Yes, that's **two milliseconds**, to generate a session ID, write it to Upstash Redis remotely, and return the redirection response.

Looking more carefully in the **Log output** section, we can see that the request lasted `789.435μs`, at least from our code's perspective. This means our logic completed well under `1 ms` (roughly `0.790 ms`). Mind-blowing considering we are using a remote database.🤯

## Conclusion

I am really amazed by how well Upstash Redis performs, especially since it's hard to find such performance for serverless databases suited for platforms like AWS Lambda.

The Redis API is really convenient, Upstash Redis has top-notch pricing model and awesome developer experience, and it's fast. I love the combination!

AWS Lambda + Upstash Redis + Go = 🚀❤️

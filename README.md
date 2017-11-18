# Personal website

Hosted at https://www.lambrospetrou.com
Static side generator: https://github.com/lambrospetrou/gomicroblog

Uses docker to build as alternative to installing the build tools locally.

```
# Uses Docker image for the build tools
make docker-image # This to generate the image
make docker-build # This to compile the app and generate the `_site`

# Uses local tools
make prepare # Install dependencies
make build   # Compile the app
```

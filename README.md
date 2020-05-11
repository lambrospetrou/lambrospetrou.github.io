# Personal website

Hosted at https://www.lambrospetrou.com
Static side generator: [Next.js](https://nextjs.org/)

**Prerequisites**

* Node
* Docker (optional)

Uses docker to build as alternative to installing the build tools locally.

```
# Uses Docker image for the build tools
make docker-image # This to generate the image
make docker-build # This to compile the app and generate the `_site`

# Uses local tools
make prepare # Install dependencies
make build   # Compile the app

# Run everything needed to generate the website.
make
```

## Writing an article

- Run `npm run dev` to start the Next development server.
- Visit <http://localhost:3000/api/enable-preview> once to enable [preview mode](https://nextjs.org/docs/advanced-features/preview-mode) so that we can refresh the page and see the updated article while editing the Markdown files.
- Visit the article being edited and refresh to get the latest version every time.

To disable preview mode visit <http://localhost:3000/api/disable-preview>.

.PHONY: build-css build-site start

start: build-site
	gohttp -d _site

build-css:
	npm run --prefix build-tool/node-tools build-css

build-site: build-css
	gomicroblog -site ./
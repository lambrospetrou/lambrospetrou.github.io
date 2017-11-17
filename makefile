.PHONY: build-css build-site start default prepare all

default: build-site

all: prepare build-site

prepare:
	cd build-tool/node-tools && npm install

build-css:
	npm run --prefix build-tool/node-tools build-css

build-site: build-css
	gomicroblog -site ./

start: build-site
	gohttp -d _site


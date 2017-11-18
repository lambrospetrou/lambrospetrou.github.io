.PHONY: build-css build start default prepare all docker-build docker-image deploy

default: docker-build

all: prepare build

prepare:
	cd build-tool/node-tools && npm install

build-css:
	npm run --prefix build-tool/node-tools build-css

build: build-css
	gomicroblog -site ./

start:
	gohttp -d _site

# Docker targets

docker-build:
	rm -rf _site
	sudo docker run --rm -v `pwd`:/mnt/host -w /usr/src/app lpwebsite-compiler bash -c "make build && cp -r _site /mnt/host/_site && chown -R `id -u`:`id -u` /mnt/host/_site"

docker-image:
	sudo docker build -t lpwebsite-compiler ./

# Deployment commands

# Make the remote bucket an exact copy of the local version. Deleting whatever is not local.
CMD_S3_SYNC := aws s3 sync _site s3://www.lambrospetrou.com --delete
CMD_S3_SYNC_ARGS = --dryrun

ifeq ($(args),--no-dryrun)
	CMD_S3_SYNC_ARGS = 
endif

# make deploy | make deploy args=--no-dryrun
deploy:
	$(CMD_S3_SYNC) $(CMD_S3_SYNC_ARGS)

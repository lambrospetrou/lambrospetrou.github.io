.PHONY: clean build-css build start default prepare all docker-build docker-image deploy

default: docker-build

all: clean prepare build

clean:
	rm -rf _site .next

prepare:
	npm install

build: clean
	npm run release

start:
	gohttp -d _site

# Docker targets

docker-build: clean
	docker run --rm -v `pwd`:/mnt/host -w /app lpwebsite-compiler bash -c "rm -rf src/ && cp -r /mnt/host/src ./ && make build && cp -r _site /mnt/host/_site && chown -R `id -u`:`id -u` /mnt/host/_site"

docker-image:
	docker build -t lpwebsite-compiler ./

# Deployment commands

# Make the remote bucket an exact copy of the local version. Deleting whatever is not local.
CMD_S3_SYNC := ./build-tool/deploy-aws.sh
CMD_S3_SYNC_ARGS = $(dryrun)

deploy:
	bash -c "echo -e \"\nTo run without --dryrun, execute: make deploy dryrun=--no-dryrun\n\""
	$(CMD_S3_SYNC) $(CMD_S3_SYNC_ARGS)

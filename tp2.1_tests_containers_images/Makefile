.PHONY: test build

IMAGE:=my-image

build:
	docker build -t $(IMAGE) sources

test:
	container-structure-test test \
		--config tests/check-metadatas.yaml \
		--config tests/check-files.yaml \
		--config tests/check-commands.yaml \
		--image $(IMAGE) 


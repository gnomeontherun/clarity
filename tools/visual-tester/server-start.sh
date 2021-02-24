#!/usr/bin/env bash

# Start a local nginx container 
docker stop local-visual-diff || true && docker rm local-visual-diff || true
docker run --name local-visual-diff -v $PWD/../../dist/website/:/usr/share/nginx/html:ro -v $PWD/local.nginx.conf:/etc/nginx/nginx.conf:ro -p 8008:80 -d nginx
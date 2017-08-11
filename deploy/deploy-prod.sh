#!/bin/bash

set -e

rm -rf ./build
NODE_ENV=production ./node_modules/.bin/webpack --config ./webpack.config.release.js
ssh root@47.88.53.105 'rm -rf /www/*'
scp -r ./build/* root@47.88.53.105:/www

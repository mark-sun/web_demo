#!/bin/bash

set -e

git checkout gh-pages
git rebase master
rm -rf build
NODE_ENV=production ./node_modules/.bin/webpack --config ./webpack.config.release.js
mv build/index.html .
git add -f index.html build
git commit --amend -m 'update build'
git push -f
git checkout master

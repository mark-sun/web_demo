#!/bin/bash

set -e

git checkout gh-pages
git rebase master
rm -rf build
NODE_ENV=gh ./node_modules/.bin/webpack --config ./webpack.config.gh.js
mv build/index.html .
git add -f index.html build
git commit --amend -m 'update build'
git push -f
git checkout master

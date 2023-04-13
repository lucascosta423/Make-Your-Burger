#!/usr/bin/env sh

set -e

npm run build
npm run backend
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:LukasStranges/Make-Your-Burger.git master:gh-pages

cd -

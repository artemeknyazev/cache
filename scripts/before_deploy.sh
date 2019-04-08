#!/usr/bin/env bash
set -euf -o pipefail
npm run cleanup
npm run build
rm $(pwd)/package-lock.json || true
rm $(pwd)/npm-shrinkwrap.json || true
NODE_ENV=production npm install --production
npm shrinkwrap
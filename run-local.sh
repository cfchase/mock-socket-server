#!/bin/bash

source .secrets

export PORT=$PORT
export IP=$IP
export S3_ENDPOINT="$S3_ENDPOINT"
export S3_BUCKET="$S3_BUCKET"
export S3_PREFIX="$S3_PREFIX"
export S3_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID"
export S3_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY"

npm run dev
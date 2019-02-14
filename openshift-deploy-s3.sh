#!/bin/bash
set -x

source .secrets

oc process -f openshift/application.yml \
  -p S3_ENDPOINT=${S3_ENDPOINT} \
  -p S3_BUCKET=${S3_BUCKET} \
  -p S3_PREFIX=${S3_PREFIX} \
  -p S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID} \
  -p S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY} \
  | oc create -f -
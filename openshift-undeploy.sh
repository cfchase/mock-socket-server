#!/bin/bash
set -x

source .secrets

oc process -f openshift/application.yml | oc delete -f -

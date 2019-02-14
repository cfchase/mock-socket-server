#!/bin/bash
set -x

oc process -f openshift/application.yml | oc create -f -
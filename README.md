# mock-socket-server

### Deploying the App
First edit a `.secrets` file similar to the `.secrets.example`, but with your personal information.  Then, you can create the UI app using the included script.

```bash
./openshift-deploy.sh
```

Instead of a secrets file, you can also just use the template directly and replace `<VAR>` with your values.
```
oc process -f openshift/application.yml \
  -p S3_ENDPOINT=<S3_ENDPOINT> \
  -p S3_BUCKET=<S3_BUCKET> \
  -p S3_PREFIX=<S3_PREFIX> \
  -p S3_ACCESS_KEY_ID=<S3_ACCESS_KEY_ID> \
  -p S3_SECRET_ACCESS_KEY=<S3_SECRET_ACCESS_KEY> \
  | oc create -f -
```

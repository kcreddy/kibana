#!/bin/bash

set -euo pipefail

export BAZEL_CACHE_MODE=populate-local-gcs
export DISABLE_BOOTSTRAP_VALIDATION=true

retry 5 5 vault read -field=service_account_json secret/kibana-issues/dev/kibana-ci-bazel-remote-cache-local-dev > target/kibana-ci-bazel-remote-cache-local-dev.json
GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/target/kibana-ci-bazel-remote-cache-local-dev.json
export GOOGLE_APPLICATION_CREDENTIALS

# Clear out bazel cache between runs to make sure that any artifacts that don't exist in the cache are uploaded
rm -rf ~/.bazel-cache

# Since our Mac agents are currently static,
# use a temporary HOME directory that gets cleaned out between builds
TMP_HOME="$WORKSPACE/tmp_home"
rm -rf "$TMP_HOME"
export HOME="$TMP_HOME"

.buildkite/scripts/bootstrap.sh

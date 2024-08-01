#!/usr/bin/env sh
#
# Copyright (c) Microsoft Corporation. All rights reserved.
#
VSROOT="$(dirname "$(dirname "$(dirname "$(readlink -f "$0")")")")"
ROOT="$(dirname "$(dirname "$VSROOT")")"

APP_NAME="code-server"
VERSION="1.91.1"
COMMIT="1962f48b7f71772dc2c060dbaa5a6b4c0792a549"
EXEC_NAME="code-server"
CLI_SCRIPT="$VSROOT/out/server-cli.js"
"${NODE_EXEC_PATH:-$ROOT/lib/node}" "$CLI_SCRIPT" "$APP_NAME" "$VERSION" "$COMMIT" "$EXEC_NAME" "$@"

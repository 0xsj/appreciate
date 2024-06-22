#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd "${BASEDIR}"/../

echo "Generator proto rss gRPC...";

python -m grpc_tools.protoc \
    -I./proto \
    --proto_path=./src/proto \
    --python_out=./src/proto \
    --pyi_out=./src/proto \
    --grpc_python_out=./src/proto \
    ./src/proto/rss.proto
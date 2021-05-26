#!/usr/bin/env bash

set -o errexit

# Args
# Default
PUSH="false"
PUSH_PREFIX="localhost:5000/"

# Check
for i in "$@"
do
    case $i in
        --push=*)
        PUSH="${i#*=}"
        shift
        ;;
        --push-prefix=*)
        PUSH_PREFIX="${i#*=}"
        shift
        ;;
        *)
            # Unknown option
        ;;
    esac
done
# END Args

# Images
images_name=('graphmarket-database' 'graphmarket-gateway' 'graphmarket-svc-products' 'graphmarket-svc-reviews' 'graphmarket-svc-inventories')
images_file=('database/Dockerfile.database' 'services/Dockerfile.gateway' 'services/Dockerfile.service.products' 'services/Dockerfile.service.reviews' 'services/Dockerfile.service.inventories')
# END Images

for ((i = 0; i < ${#images_name[@]}; ++i)); do
    echo "--- ${images_name[i]}"
    echo "Building"
    docker build -f "docker/${images_file[i]}" -t ${images_name[i]} .

    if [ "${PUSH}" != "true" ]; then
        echo "Skipping docker push"
    else
        echo "Tagging"
        docker tag "${images_name[i]}" "${PUSH_PREFIX}${images_name[i]}"
        echo "Pushing"
        docker push "${PUSH_PREFIX}${images_name[i]}"
    fi
done

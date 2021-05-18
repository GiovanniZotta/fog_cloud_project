#!/usr/bin/env bash

set -o errexit

# Args
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

# Check args
if [ -z ${PUSH+x} ]; then
    PUSH="false"
fi
if [ -z ${PUSH_PREFIX+x} ]; then
    PUSH_PREFIX="localhost:5000/"
fi
# END Args

# Images
images_name=('database' 'gateway' 'service-products' 'service-reviews')
images_file=('database/Dockerfile.database' 'Dockerfile.gateway' 'Dockerfile.service.products' 'Dockerfile.service.reviews')
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

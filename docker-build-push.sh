#!/bin/bash

# Build and Push Script for users-crud-frontend
# Usage: ./docker-build-push.sh [version]

set -e

# Default version if not provided
VERSION=${1:-latest}
IMAGE_NAME="srbon444/users-crud-frontend"

echo "🐳 Building Docker image: ${IMAGE_NAME}:${VERSION}"

# Build the image
docker build -t "${IMAGE_NAME}:${VERSION}" .

# Tag as latest if a specific version was provided
if [ "$VERSION" != "latest" ]; then
    docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:latest"
fi

echo "✅ Build completed successfully!"
echo ""
echo "🚀 To push to Docker Hub, run:"
echo "   docker login"
echo "   docker push ${IMAGE_NAME}:${VERSION}"
if [ "$VERSION" != "latest" ]; then
    echo "   docker push ${IMAGE_NAME}:latest"
fi
echo ""
echo "🏃‍♂️ To run locally:"
echo "   docker run -p 3000:3000 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "📦 Or use docker-compose:"
echo "   docker-compose up"

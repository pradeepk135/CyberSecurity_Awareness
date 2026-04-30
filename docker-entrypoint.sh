#!/bin/sh

# Docker entrypoint script for development
set -e

# Wait for dependencies if needed
# echo "Waiting for services..."
# wait-for-it db:5432 --timeout=30 --strict -- echo "Database is up"

# Run the command
exec "$@"

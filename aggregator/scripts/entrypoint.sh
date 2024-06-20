#!/bin/sh

# Run database migrations
alembic upgrade head

# Start the server using PDM's script
pdm run start

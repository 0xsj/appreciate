# Use the official Python image as the base image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY pyproject.toml pdm.lock ./

# Install PDM and the dependencies
RUN pip install pdm && pdm install

# Copy the rest of the application code
COPY src ./src
COPY alembic.ini ./alembic.ini
COPY alembic ./alembic
COPY scripts ./scripts

# Make entrypoint script executable
RUN chmod +x ./scripts/entrypoint.sh

# Expose the port the app runs on
EXPOSE 8000

# Run the entrypoint script
CMD ["./scripts/entrypoint.sh", "./scripts/protoc.sh"]

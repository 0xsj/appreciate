FROM golang:1.22-alpine AS builder
# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o gateway .

# Start a new stage from scratch
FROM alpine:latest

# Copy the pre-built binary from the previous stage
COPY --from=builder /app/gateway /app/gateway

# Expose the port that your Go app will run on
EXPOSE 3005

# Command to run the Go app
CMD ["/app/gateway"]
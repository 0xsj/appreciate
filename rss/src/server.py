import sys
import time
from concurrent import futures
import grpc
from dotenv import load_dotenv
from fastapi import FastAPI
from .core.service import RSSAggregatorService
from .proto import rss_pb2_grpc  # Ensure this path matches your project structure


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Aggregator Service"}

def serve_grpc(port=8000):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    rss_pb2_grpc.add_RSSAggregatorServicer_to_server(RSSAggregatorService(), server)
    server.add_insecure_port(f'[::]:{port}')
    return server

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000  # Default to 8000 if no port is provided
    grpc_server = serve_grpc(port)

    try:
        grpc_server.start()
        print(f"Running gRPC server on port {port}")
        while True:
            time.sleep(86400)  # Sleep for 1 day to keep the server running
    except KeyboardInterrupt:
        print("Stopping gRPC server")
        grpc_server.stop(0)

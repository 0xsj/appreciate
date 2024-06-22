import sys
import time
import grpc
from concurrent import futures

def serverCreate():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    return server


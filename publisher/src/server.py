import sys
import time
import grpc
from concurrent import futures
from controllers.PublisherController import PublisherController

def serverCreate():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    return server


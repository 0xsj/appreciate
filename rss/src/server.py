import sys 
import time 
import grpc 
from concurrent import futures
from core.service import AggregatorService
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "aggregator Service"}

def serverCreate():
    return

if __name__ == '__main__':
    port = ""
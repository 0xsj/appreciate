from aggregator.proto import aggregator_pb2, aggregator_pb2_grpc
class AggregatorService(aggregator_pb2_grpc.AggregatorServicer):
    
    def Get(self, request, context):
        rss_feed = aggregator_pb2.GetByIdResponse(id=request.id, content="RSS feed content",)
        return rss_feed
    
    def GetAll(self, request, context):
        feed_list = []
        # for item in range(10):
            
        return
    
    
    



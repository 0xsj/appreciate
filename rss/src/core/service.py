from src.proto import rss_pb2, rss_pb2_grpc

class RSSAggregatorService(rss_pb2_grpc.RSSAggregatorServicer):    
    def Get(self, request, context):
        item = rss_pb2.NewsItem(id=request.id, title="title rss feed", description="same rss feed item ")
        return rss_pb2.GetByIdResponse(item)
    
    def GetAll(self, request, context):
        feed_list = []
        for i in range(1, 11):  # Generate 10 sample news items
            item = rss_pb2.NewsItem(id=str(i), title=f"News {i}", description=f"Description {i}")
            feed_list.append(item)
        return rss_pb2.GetAllResponse(items=feed_list)
    
    

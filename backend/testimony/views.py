from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from .models import Testimony
from .serializers import TestimonySerializer

class TestimonyView(APIView):
       permission_classes = [AllowAny]

       def get(self, request):
              testimonies = Testimony.objects.all().order_by('?')
              paginator = PageNumberPagination()
              paginated_testimonies = paginator.paginate_queryset(testimonies, request)
              serializer = TestimonySerializer(paginated_testimonies, many=True)
              return Response(serializer.data)
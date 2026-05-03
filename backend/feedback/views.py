from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Feedback

class FeedbackView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        feedback = Feedback.objects.create(name=name, email=email, message=message)
        return Response({'message': 'Feedback submitted successfully!'}, status=201)
    
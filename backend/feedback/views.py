from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Feedback
import requests,os

def send_email(to_email, subject, html_content):
    url = "https://api.resend.com/emails"

    headers = {
        "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
        "Content-Type": "application/json",
    }

    data = {
        "from": "EthioGlobal Digital <onboarding@resend.dev>",  
        "to": [to_email],
        "subject": subject,
        "html": html_content,
    }

    response = requests.post(url, json=data, headers=headers)
    return response.json()


class FeedbackView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        send_email(
            to_email=email,
            subject= "New Message Received - EthioGlobal Digital",
            html_content=render(requests,'tnx.html',{'name':name})
        )

        feedback = Feedback.objects.create(name=name, email=email, message=message)
        return Response({'message': 'Feedback submitted successfully!'}, status=201)
    
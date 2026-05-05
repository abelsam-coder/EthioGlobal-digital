from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta

from django.utils import timezone
import requests,os,random, string
from django.contrib.auth import get_user_model
from .models import Otp

User = get_user_model()

import requests


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


class AuthOtp(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        

        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        check_otp = Otp.objects.filter(email=email).first()
        if check_otp:
            check_otp.delete()  
        if user and user.is_staff:
            otp = str(random.randint(000000,999999))
            send_email(
                to_email=email,
                subject="Your Login Verification Code",
                html_content=render(request, 'otp_code.html', {'otp': otp}).content.decode('utf-8')
            )
            
            Otp.objects.create(email=email, otp_code=otp)  # Replace with actual OTP generation logic
            return Response({'message': 'Login code sent to your email'})
        else:
            return Response({'error': 'Admin does not exist'},status=400)
        
class VerifyOtp(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        otp_entry = Otp.objects.filter(email=email, otp_code=otp_code).first()
        
        if otp_entry:
            check_date = otp_entry.created_at
            now = timezone.now()
            if now > check_date + timedelta(minutes=5):
                otp_entry.delete()  # OTP expired, delete it
                return Response({'error': 'OTP has expired'})
            else:
                token = RefreshToken.for_user(User.objects.get(email=email))
                response = {
                    'refresh': str(token),
                    'access': str(token.access_token),
                }
                otp_entry.delete()  # OTP is valid, delete it after use
                return Response(response)
            
        else:
            return Response({'error': 'Invalid OTP'})        
        
class AdminInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_staff:
            return Response({
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            })
        else:
            return Response({'error': 'Unauthorized'}, status=403)
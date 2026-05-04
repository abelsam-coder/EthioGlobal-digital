from django.urls import path
from .views import AuthOtp, VerifyOtp

urlpatterns = [
       path('auth/send-otp/', AuthOtp.as_view(), name='admin-login'),
       path('auth/verify-otp/', VerifyOtp.as_view(), name='admin-verify-otp'),
       ]
from django.urls import path
from .views import AuthOtp, VerifyOtp,AdminInfo
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
       path('auth/send-otp/', AuthOtp.as_view(), name='admin-login'),
       path('auth/verify-otp/', VerifyOtp.as_view(), name='admin-verify-otp'),
       path('info/', AdminInfo.as_view(), name='admin-info'),
       path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
       ]
from django.urls import path
from .views import AuthOtp, VerifyOtp,AdminInfo,DashboardData,Messages,Data,ClientList,ClientSearch,Projects,UserData,GoogleAuth
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
       path('auth/send-otp/', AuthOtp.as_view(), name='admin-login'),
       path('auth/verify-otp/', VerifyOtp.as_view(), name='admin-verify-otp'),
       path('info/', AdminInfo.as_view(), name='admin-info'),
       path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
       path('dashboard/', DashboardData.as_view(), name='admin-dashboard'),
       path('messages/', Messages.as_view(), name='admin-messages'),
       path('data/', Data.as_view(), name='admin-data'),
       path('clients/', ClientList.as_view(), name='admin-clients'),
       path('clients/<id>/', ClientList.as_view(), name='admin-clients'),
       path('client/search/',ClientSearch.as_view()),
       path('projects/',Projects.as_view()),
       path('projects/<id>/',Projects.as_view()),
       path('user/',UserData.as_view()),
       path('google-auth/',GoogleAuth.as_view()),
       ]
from django.urls import path
from .views import TestimonyView

urlpatterns = [
       path('testimony/', TestimonyView.as_view(), name='testimonies'),]
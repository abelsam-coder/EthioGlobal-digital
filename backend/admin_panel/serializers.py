from rest_framework import serializers
from feedback.models import Feedback
from .models import Otp,Project
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'  
    def create(self,validate_data):
        project = Project(**validate_data)
        project.save()  
        return project
        
         

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'first_name', 'last_name', 'email','id'
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        try:
            user = User(**validated_data)
            if password:
                user.set_password(password)
            user.save()
            return user
        except IntegrityError as e:
            raise serializers.ValidationError(
                {"detail": "A user with these details already exists."}
            )
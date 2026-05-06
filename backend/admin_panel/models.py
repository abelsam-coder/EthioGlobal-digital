from django.db import models

# Create your models here.

class Otp(models.Model):
    email = models.EmailField(unique=True)
    otp_code = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)

class Project(models.Model):
    client_name = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    project_name = models.CharField(max_length=255)
    package = models.CharField(max_length=255)
    payment = models.CharField(max_length=255,default='pending')
    delivery_date = models.DateField()
    payment_date = models.DateField(null=True, blank=True)
    payment_type = models.CharField(max_length=255, default='cash')
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)    

    def __str__(self):
        return f"{self.client_name} - {self.project_name}"
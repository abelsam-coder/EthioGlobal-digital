from django.db import models

# Create your models here.

class Testimony(models.Model):
       id = models.AutoField(primary_key=True)
       name = models.CharField(max_length=100)
       role = models.CharField(max_length=100)
       content = models.TextField()
       rating = models.IntegerField()
       created_at = models.DateTimeField(auto_now_add=True)
       avatar = models.URLField(blank=True, null=True)
       def __str__(self):
              return f"{self.name} - {self.role}"
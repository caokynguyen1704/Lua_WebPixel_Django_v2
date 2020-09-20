from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    luot=models.IntegerField(default=0)
    name=models.CharField(max_length=100,default="")
    uid=models.IntegerField(default=0)
    isAdmin = models.BooleanField(default=False) 
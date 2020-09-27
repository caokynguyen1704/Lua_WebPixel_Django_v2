from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    luot=models.IntegerField(default=0)
    name=models.CharField(max_length=100,default="")
    uid=models.IntegerField(default=0)
    isAdmin = models.BooleanField(default=False)
    madonhang=models.IntegerField(default=0) 
class CallBackModel(models.Model):
    status=models.CharField(max_length=50,default="")
    message=models.CharField(max_length=50,default="")
    request_id=models.CharField(max_length=50,default="")
    trans_id=models.CharField(max_length=50,default="")
    declared_value=models.CharField(max_length=50,default="")
    value=models.CharField(max_length=50,default="")
    amount=models.CharField(max_length=50,default="")
    code=models.CharField(max_length=50,default="")
    serial=models.CharField(max_length=50,default="")
    telco=models.CharField(max_length=50,default="")
    callback_sign=models.CharField(max_length=100,default="")
class NapThe(models.Model):
    telco=models.CharField(max_length=50,default="")
    amount=models.CharField(max_length=50,default="")
    serial=models.CharField(max_length=50,default="")
    code=models.CharField(max_length=50,default="")
    madonhang=models.CharField(max_length=50,default="")
    trangthai=models.CharField(max_length=50,default="")
    date = models.DateTimeField(auto_now_add=True)
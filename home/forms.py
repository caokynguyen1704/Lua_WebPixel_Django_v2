from django import forms
import re
from django.http import HttpResponse
from django.contrib.auth import get_user_model
User = get_user_model()
from home.models import MyUser

class AdminEdit(forms.Form):
    _id = forms.IntegerField()
    name=forms.CharField(max_length=100)
    uid=forms.IntegerField()
    luot=forms.IntegerField()
    username=forms.CharField(max_length=100)
    password=forms.CharField(max_length=100)
    email=forms.CharField(max_length=100)
    def save_Name(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.name=self.cleaned_data['name']
        user.save()
    def save_Uid(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.uid=self.cleaned_data['uid']
        user.save()
    def save_Luot(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.luot=self.cleaned_data['luot']
        user.save()
    def save_Username(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.username=self.cleaned_data['username']
        user.save()
    def save_Pass(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.set_password(self.cleaned_data['password'])
        user.save()
    def save_Email(self):
        user=MyUser.objects.get(id=self.cleaned_data['_id'])
        user.email=self.cleaned_data['email']
        user.save()
class EditProfile(forms.Form):
    name=forms.CharField(max_length=100)
    uid=forms.IntegerField()
    username=forms.CharField(max_length=100)
    password=forms.CharField(max_length=100)
    email=forms.CharField(max_length=100)
    def save(self,nick):
        user=MyUser.objects.get(username=nick)
        user.username=self.cleaned_data['username']
        user.set_password(self.cleaned_data['password'])
        #user.password=self.cleaned_data['password']
        user.name=self.cleaned_data['name']
        user.email=self.cleaned_data['email']
        user.uid=self.cleaned_data['uid']
        user.save()
class GetScript(forms.Form):
    def save(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=user.luot-1
        user.save()

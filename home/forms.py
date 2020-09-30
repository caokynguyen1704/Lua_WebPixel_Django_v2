from django import forms
import re
from django.http import HttpResponse
from django.contrib.auth import get_user_model
User = get_user_model()
from home.models import MyUser, CallBackModel,NapThe
import hashlib

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
    select=forms.CharField(max_length=3)
    def save_64(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=user.luot-1
        user.save()
    def save_128(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=user.luot-2
        user.save()
    def save_192(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=user.luot-4
        user.save()
    def save_256(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=user.luot-8
        user.save()
    def save_hack(self,nick):
        user=MyUser.objects.get(username=nick)
        user.luot=-1
        user.save()
        
class NapThe_From(forms.Form):
    telco=forms.CharField(max_length=20)
    amount=forms.IntegerField()
    serial=forms.CharField(max_length=30)
    code=forms.CharField(max_length=30)
    def getSign(self,nick):
        partner_id="3850690061"
        partner_key="aa521d75f8fd7ac881657e74ac969410"
        user=MyUser.objects.get(username=nick)
        madonhang= str(user.id)+"code"+str(user.madonhang)
        val=partner_key+self.cleaned_data['code']+"charging"+partner_id+ madonhang +self.cleaned_data['serial']+self.cleaned_data['telco']
        return hashlib.md5(val.encode("utf")).hexdigest()
    def save_(self,madonhang,trangthai):
        napthe=NapThe()
        napthe.telco=self.cleaned_data['telco']
        napthe.amount=self.cleaned_data['amount']
        napthe.serial=self.cleaned_data['serial']
        napthe.code=self.cleaned_data['code']
        napthe.madonhang=madonhang
        napthe.trangthai=trangthai
        napthe.save()
class CallBack(forms.Form):
    status=forms.CharField(max_length=50)
    message=forms.CharField(max_length=50)
    request_id=forms.CharField(max_length=50)
    trans_id=forms.CharField(max_length=50)
    declared_value=forms.CharField(max_length=50)
    value=forms.CharField(max_length=50)
    amount=forms.CharField(max_length=50)
    code=forms.CharField(max_length=50)
    serial=forms.CharField(max_length=50)
    telco=forms.CharField(max_length=50)
    callback_sign=forms.CharField(max_length=100)
    def save(self):
        call=CallBackModel()
        call.status=self.cleaned_data['status']
        call.message=self.cleaned_data['message']
        call.request_id=self.cleaned_data['request_id']
        call.trans_id=self.cleaned_data['trans_id']
        call.declared_value=self.cleaned_data['declared_value']
        call.value=self.cleaned_data['value']
        call.amount=self.cleaned_data['amount']
        call.code=self.cleaned_data['code']
        call.serial=self.cleaned_data['serial']
        call.telco=self.cleaned_data['telco']
        call.callback_sign=self.cleaned_data['callback_sign']
        call.save()
    
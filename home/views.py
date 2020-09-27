from django.shortcuts import render
from django.db import models
from home.models import MyUser,CallBackModel,NapThe
from home.forms import AdminEdit,EditProfile,GetScript,NapThe_From,CallBack
from django.http import HttpResponseRedirect 
import requests
import json
# Create your views here.
from django.http import HttpResponse
def giveaway(request):
   return render(request, 'pages/acc_free.html')
def index(request):
   User = {'MyUser': MyUser.objects.all()}
   return render(request, 'pages/home.html', User)

def script(request):
   form=GetScript()
   nick=request.user.username
   if request.method == 'POST':
      form=GetScript(request.POST)
      if form.is_valid():
         form.save(nick)
      else:
         form.save(nick)
      return HttpResponseRedirect('../')
   return render(request, 'pages/script_create.html',{'form': form})
  # return render(request, 'pages/home.html')
def admin(request):
   form = AdminEdit()
   if request.method == 'POST':
      form=AdminEdit(request.POST)
      if form.is_valid():
         print("ok")
      else:
         if form.cleaned_data.get('name')!=None:
            form.save_Name()
         elif form.cleaned_data.get('uid')!=None:
               form.save_Uid()
         elif form.cleaned_data.get('luot')!=None:
               form.save_Luot()
         elif form.cleaned_data.get('username')!=None:
               form.save_Username()
         elif form.cleaned_data.get('password')!=None:
               form.save_Pass()
         elif form.cleaned_data.get('email')!=None:
               form.save_Email()
      return HttpResponseRedirect('/')
   return render(request, 'pages/admin.html',{'form': form,'MyUser': MyUser.objects.all()})

def edit_profile(request):
   
   form = EditProfile()
   nick=request.user.username
   i_d=str(request.user.id)+'code'
   if request.method == 'POST':
      form=EditProfile(request.POST)
      if form.is_valid():
         form.save(nick)
      return HttpResponseRedirect('/')
   return render(request, 'pages/editprofile.html', {'form': form,'Card':NapThe.objects.filter(madonhang__contains= i_d)})
def napthe(request):
   form=NapThe_From()
   nick=request.user.username
   if request.method == 'POST':
      form=NapThe_From(request.POST)
      if form.is_valid():
         sign=form.getSign(nick)
         url = 'https://ppay.vn/chargingws/v2'
         user=MyUser.objects.get(username=nick)
         
         madonhang= str(user.id)+"code"+str(user.madonhang)
         user.madonhang=user.madonhang+1
         user.save()
         postdata = {
            "request_id":madonhang,
            "partner_id":"3850690061",
            "telco":form.cleaned_data.get('telco'),
            "amount":form.cleaned_data.get('amount'),
            "serial":form.cleaned_data.get('serial'),
            "code":form.cleaned_data.get('code'),
            "command":"charging",
            "sign":sign
         }
         r = requests.post(url, data=postdata)
         
         print(r.status_code)
         json_return=r.json()
         print(json_return)
         trangthai=json_return['message']
         form.save_(madonhang,trangthai)
         return HttpResponseRedirect('/')
   return render(request, 'pages/napthe.html', {'form': form})

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
@csrf_exempt
def callback(request):
   form=CallBack()
   if request.method == 'POST':
      data = request.body.decode("utf-8")
      
      
      
      #form
      form=CallBack(request.POST)
      if form.is_valid():
         form.save()
         mdh=form.cleaned_data.get('request_id')
         tt=form.cleaned_data.get('message')
         am=form.cleaned_data.get('amount')
         js=json.loads(json.dumps(data))
      #json
      else:
         js = json.loads(data)
         call=CallBackModel()
         call.status=js['status']
         call.message=js['message']
         call.request_id=js['request_id']
         call.trans_id=js['trans_id']
         call.declared_value=js['declared_value']
         call.value=js['value']
         call.amount=js['amount']
         call.code=js['code']
         call.serial=js['serial']
         call.telco=js['telco']
         call.callback_sign=js['callback_sign']
         call.save()
         mdh=js['request_id']
         tt=js['message']
         am=js['amount']
      card=NapThe.objects.get(madonhang=mdh)
      card.trangthai=tt
      card.amount=am
      card.save()
      id_user = int(mdh[0:mdh.find("code")])
      user=MyUser.objects.get(id=id_user)
      user.luot=user.luot + round(int(am)/5000)
      user.save()
      
      return HttpResponse(js, content_type='application/json')
   return render(request,{'form': form})

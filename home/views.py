from django.shortcuts import render
from django.db import models
from home.models import MyUser
from home.forms import AdminEdit,EditProfile,GetScript
from django.http import HttpResponseRedirect 

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
   if request.method == 'POST':
      form=EditProfile(request.POST)
      if form.is_valid():
         form.save(nick)
      return HttpResponseRedirect('/')
   return render(request, 'pages/editprofile.html', {'form': form})
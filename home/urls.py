from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
   path('', views.index),
   path('login/',auth_views.LoginView.as_view(template_name="pages/login.html"), name="login"),
   path('logout/',auth_views.LogoutView.as_view(next_page='/'),name='logout'),
   path('qtv/', views.admin,name="qtv"),
   path('information/',views.edit_profile,name="edit_profile"),
   path('script/',views.script,name="script"),
   path('giveaway/',views.giveaway,name="giveaway"),
]
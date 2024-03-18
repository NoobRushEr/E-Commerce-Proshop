from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from ..views import user_views as views


urlpatterns = [

    path('login/', TokenObtainPairView.as_view(serializer_class=views.MyTokenObtainPairSerializer), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name='users-profile'),
    path('', views.getUsers, name='users'),

]

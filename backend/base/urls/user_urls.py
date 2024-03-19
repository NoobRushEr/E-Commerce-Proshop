from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from ..views import user_views as views


urlpatterns = [

    path('login/', TokenObtainPairView.as_view(serializer_class=views.MyTokenObtainPairSerializer), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name='users-profile'),

    path('profile/update/', views.updateUserProfile, name='users-profile-update'),

    path('', views.getUsers, name='users'),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

]

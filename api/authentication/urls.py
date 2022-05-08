from django.urls import path
from .views import LoginAPIView, RegisterView

urlpatterns = [
   path('register/', RegisterView.as_view(), name='register'),
   path('login/', LoginAPIView.as_view(), name='login'),

]

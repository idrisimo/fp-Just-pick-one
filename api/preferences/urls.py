from django.urls import path
from . import views

urlpatterns = [
   path('', views.PreferencesListAPIView.as_view(), name="all-preferences"),
]

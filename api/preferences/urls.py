from django.urls import path
from . import views

urlpatterns = [
   path('', views.PreferencesListAPIView.as_view(), name="all-preferences"),
   path('<int:id>', views.PreferenceDetailsAPIView.as_view(), name="user-preferences")
]

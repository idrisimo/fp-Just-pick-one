from django.urls import path
from .views import get_movie_data

urlpatterns = [
   path('', get_movie_data, name='get_movie_data')
]

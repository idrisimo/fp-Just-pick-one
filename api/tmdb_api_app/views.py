from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import requests
import environ
import os
from rest_framework.response import Response
from rest_framework.decorators import api_view
from pprint import pprint

# Initialise environmental variables
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'api/.env'))

@api_view(['POST'])
def get_movie_data(req):
    options = {
        'genre': '&with_genres=',
        'adult': '&include_adult=',
        'language': '&language=',
        'release_date_start': '&primary_release_date.gte=',
        'release_data_end': '&primary_release_date.lte=',
        'watch_providers': '&with_watch_providers=',
        'region': '&region=',
        'pages': '&page='
    }
    if req.method == 'POST':
        choices = req.data

        query_string = ''
        
        for key, value in choices.items():
            if value != '':
                query_string = f'{query_string}{options[key]}{value}'
                
        base_url = 'https://api.themoviedb.org/3/discover/movie?'
        api_key = f"api_key={env('TMDB_KEY')}"
        final_url = f'{base_url}{api_key}{query_string}'
        response = requests.get(final_url)
        data = response.json()
        return Response(data)
    else:
        return Response('No Access via this route') # TODO Deal with this better. 

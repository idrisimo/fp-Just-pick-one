from django.shortcuts import render, HttpResponse
import requests
import environ
import os
# Initialise environmental variables
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, 'api/.env'))

def get_movie_data(req, choices):
    
    options = {
        'genre':'&with_genres=',
        'adult':'&include_adult=',
        'language':'&language=',
        'release_date_start':'&primary_release_date.gte=',
        'release_data_end':'&primary_release_date.lte=',
        'watch_providers':'&with_watch_providers=',
        'region':'&region=',
        'pages':'&page='
    }
    query_string = ''
    for key, value in choices.items():
        if value != '':
            query_string = f'{query_string}{options[key]}{value}'
        

    try: 
        base_url = 'https://api.themoviedb.org/3/discover/movie?'
        api_key = f"api_key={env('TMDB_KEY')}"
        response = requests.get(f'{base_url}{api_key}{query_string}')
        data = response.json()
        return HttpResponse(data['results'])
    except Exception as err:
        return HttpResponse(err)

from django.shortcuts import render
import requests
import environ

# Initialise environmental variables
env = environ.Env()
environ.Env.read_env()


def get_movie_data(req):
    choices = {'genre':'1',
        'adult':'false',
        'language':'en',
        'release_date_start':'',
        'release_data_end':'',
        'watch_providers':'',
        'region':'',
        'pages':''}
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
        else:
            del options[key]
        
    
    base_url = 'https://api.themoviedb.org/3/discover/movie?'
    api_key = env('TMDB_KEY')
    # response = requests.get(f'{base_url}{api_key}{query_string}')
    print(f'{base_url}{api_key}{query_string}')
    

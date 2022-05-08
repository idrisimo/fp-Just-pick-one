from django.shortcuts import render
import requests
import environ

# Initialise environmental variables
environ.Env.read_env()


def get_movie_data(req):
    base_url = 'https://api.themoviedb.org/3/discover/movie'
    api_key = env('TMDB_KEY')
    response = requests.get()
    return ''

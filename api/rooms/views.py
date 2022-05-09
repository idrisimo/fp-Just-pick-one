# chat/views.py
from django.shortcuts import render

def index(request):
    return render(request, '', {})

def room(request, room_name):
    return render(request, '', {
        'room_name': room_name
    })

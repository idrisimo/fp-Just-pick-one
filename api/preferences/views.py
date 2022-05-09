from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import PreferencesSerializer
from .models import Preferences
from rest_framework import permissions
from .permissions import IsOwner

# Create your views here.
class PreferencesListAPIView(ListCreateAPIView):
   serializer_class = PreferencesSerializer
   queryset = Preferences.objects.all()
   permission = (permissions.IsAuthenticated,)
   
   def perform_create(self, serializer):
      return serializer.save(user=self.request.user)
   
   def get_all(self):
      return self.queryset.filter(user=self.request.user)

class PreferenceDetailsAPIView(RetrieveUpdateDestroyAPIView):
   serializer_class = PreferencesSerializer
   queryset = Preferences.objects.all()
   permission = (permissions.IsAuthenticated,IsOwner,)
   lookup_field = 'id'
   
   def perform_create(self, serializer):
      return serializer.save(user=self.request.user)
   
   def get_all(self):
      return self.queryset.filter(user=self.request.user)


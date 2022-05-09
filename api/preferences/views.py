from rest_framework.generics import ListCreateAPIView
from .serializers import PreferencesSerializer
from .models import Preferences
from rest_framework import permissions

# Create your views here.
class PreferencesListAPIView(ListCreateAPIView):
   serializer_class = PreferencesSerializer
   queryset = Preferences.objects.all()
   permission_classes = (permissions.IsAuthenticated,)
   
   def perform_create(self, serializer):
      user = self.request.user
      user.preferences = serializer.save()
      user.save()
      return user.preferences
   
   def get_all(self):
      return self.queryset.filter(user=self.request.user)



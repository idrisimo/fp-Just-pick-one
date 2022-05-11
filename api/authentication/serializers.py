from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed

class RegisterSerializer(serializers.ModelSerializer):
   password = serializers.CharField(max_length=68, min_length=8, write_only=True)
   
   class Meta:
      model=User
      fields=('__all__')
      
   def validate(self,attrs):
      username = attrs.get('username','')     
      
      if not username.isalnum():
         raise serializers.ValidationError('The username should only contain alphanumeric characters')
      return attrs

   def create(self,validated_data):
      return User.objects.create_user(**validated_data)
   
class LoginSerializer(serializers.ModelSerializer):
   email = serializers.EmailField(max_length=255, read_only=True)
   password = serializers.CharField(max_length=68, min_length=6, write_only=True)
   username = serializers.CharField(max_length=255, min_length=3)
   tokens = serializers.CharField(max_length=68, read_only=True)
   
   class Meta:
      model=User
      fields=['email','password','username','tokens','preferences']
   
   def validate(self, attrs):
      username = attrs.get('username','')
      password = attrs.get('password','')
      user = auth.authenticate(username=username, password=password)
      if not user:
         raise AuthenticationFailed('Invalid credentials. Try again')

      return {
         'email':user.email,
         'username':user.username,
         'tokens': user.tokens(),
         'preferences': user.preferences
      }

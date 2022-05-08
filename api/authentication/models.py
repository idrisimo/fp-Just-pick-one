from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class User(AbstractBaseUser):
   username = models.CharField(max_length=255, unique=True, db_index=True)
   email = models.EmailField(max_length=255, unique=True, db_index=True)

   # we need to define what attribute the user will be using to login
   
   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS = ['username']
   
   def __str__(self):
      return self.email
   
   def tokens(self):
      return ''

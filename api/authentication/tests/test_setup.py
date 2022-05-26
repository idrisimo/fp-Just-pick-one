import imp
from rest_framework.test import APITestCase
from django.urls import reverse

class TestSetUp(APITestCase):

   def setUp(self):
      self.register_url = reverse('register')
      self.login_url = reverse('login')
      self.user_data_register = {
         'username' : 'usertesting',
         'email' : 'testing@testing.com',
         'password': 'testingpassword'
      }
      self.user_data_wrong_email = {
         'username' : 'usertesting',
         'email' : 'testing@testing',
         'password': 'testingpassword'
      }
      self.user_data_invalid_credentials = {
         'username': 'doesntexist',
         'password': 'doesntexist'
      }

      
      return super().setUp()
   
   def tearDown(self):
      return super().tearDown()
   

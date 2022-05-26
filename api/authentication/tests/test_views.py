from .test_setup import TestSetUp


class TestViews(TestSetUp):

   def test_user_cannot_register_with_no_data(self):
      res = self.client.post(self.register_url)
      self.assertEqual(res.status_code,400)

   def test_user_can_register_correctly(self):
      res = self.client.post(self.register_url,self.user_data_register, format='json')
      self.assertEqual(res.data['email'],self.user_data_register['email'])
      self.assertEqual(res.data['username'],self.user_data_register['username'])
      self.assertEqual(res.status_code,201)

   def test_user_cannot_register_with_wrong_email(self):
      res = self.client.post(self.register_url,self.user_data_wrong_email, format='json')
      self.assertEqual(res.data["email"][0].code,'invalid')
      self.assertEqual(res.status_code,400)

   def test_user_cannot_login_with_invalid_credentials(self):
      res = self.client.post(self.login_url,self.user_data_invalid_credentials, format='json')
      self.assertEqual(res.status_code,401)
      self.assertEqual( res.data["detail"].code,'authentication_failed')

   def test_user_can_login_with_valid_credentials(self):
      self.client.post(self.register_url,self.user_data_register, format='json')
      res = self.client.post(self.login_url,self.user_data_register, format='json')
      self.assertEqual(res.status_code, 200)

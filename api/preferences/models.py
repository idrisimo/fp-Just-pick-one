from django.db import models
from authentication.models import User

# Create your models here.
class Preferences(models.Model):
   user = models.ForeignKey(User,on_delete=models.CASCADE, null=False)
   genre = models.CharField(max_length=256, blank=True, null=True)
   year = models.IntegerField(blank=True, null=True)
   country = models.CharField(max_length=68, blank=True, null=True)
   platform = models.CharField(max_length=256, blank=True, null=True)

   def __str__(self):
      return f"{self.user.username} preferences"

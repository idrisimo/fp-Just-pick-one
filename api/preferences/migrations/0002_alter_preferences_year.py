# Generated by Django 4.0.4 on 2022-05-09 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('preferences', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='preferences',
            name='year',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]

# Generated by Django 3.1.1 on 2020-09-26 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_myuser_isadmin'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='madonhang',
            field=models.IntegerField(default=0),
        ),
    ]

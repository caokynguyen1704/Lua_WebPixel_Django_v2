# Generated by Django 3.1.1 on 2020-09-19 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20200919_1950'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='fullname',
        ),
        migrations.AddField(
            model_name='myuser',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]

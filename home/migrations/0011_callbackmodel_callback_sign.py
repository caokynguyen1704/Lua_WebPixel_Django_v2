# Generated by Django 3.1.1 on 2020-09-27 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_napthe_trangthai'),
    ]

    operations = [
        migrations.AddField(
            model_name='callbackmodel',
            name='callback_sign',
            field=models.CharField(default='', max_length=100),
        ),
    ]

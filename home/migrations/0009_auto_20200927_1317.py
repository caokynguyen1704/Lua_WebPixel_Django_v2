# Generated by Django 3.1.1 on 2020-09-27 06:17

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_napthe_day'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='napthe',
            name='day',
        ),
        migrations.AddField(
            model_name='napthe',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
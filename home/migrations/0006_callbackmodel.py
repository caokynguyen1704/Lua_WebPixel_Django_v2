# Generated by Django 3.1.1 on 2020-09-26 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_myuser_madonhang'),
    ]

    operations = [
        migrations.CreateModel(
            name='CallBackModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='', max_length=50)),
                ('message', models.CharField(default='', max_length=50)),
                ('request_id', models.CharField(default='', max_length=50)),
                ('trans_id', models.CharField(default='', max_length=50)),
                ('declared_value', models.CharField(default='', max_length=50)),
                ('value', models.CharField(default='', max_length=50)),
                ('amount', models.CharField(default='', max_length=50)),
                ('code', models.CharField(default='', max_length=50)),
                ('serial', models.CharField(default='', max_length=50)),
                ('telco', models.CharField(default='', max_length=50)),
            ],
        ),
    ]
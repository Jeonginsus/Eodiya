# Generated by Django 3.2.12 on 2022-04-02 18:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('commercial_area', '0004_commercialareabuilding'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commercialareabuilding',
            name='airportNumber',
        ),
    ]

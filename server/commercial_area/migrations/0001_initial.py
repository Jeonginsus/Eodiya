# Generated by Django 3.2.12 on 2022-03-21 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommercialArea1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField()),
                ('commercialAreaName', models.CharField(max_length=50)),
                ('revenue', models.IntegerField()),
                ('priceByCase', models.IntegerField()),
                ('maleRevenue', models.IntegerField()),
                ('femaleRevenue', models.IntegerField()),
                ('ageGroup', models.CharField(max_length=50)),
                ('timeGroup', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='CommercialArea2',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField()),
                ('numberStore', models.IntegerField()),
                ('similarStore', models.IntegerField()),
                ('openingStore', models.IntegerField()),
                ('closureStore', models.IntegerField()),
                ('openingRate', models.IntegerField()),
                ('closureRate', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='CommercialArea3',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField()),
                ('residentPeople', models.IntegerField()),
                ('maleResidentPeople', models.IntegerField()),
                ('femaleResidentPeople', models.IntegerField()),
                ('numberHouseholds', models.IntegerField()),
                ('age10', models.IntegerField()),
                ('age20', models.IntegerField()),
                ('age30', models.IntegerField()),
                ('age40', models.IntegerField()),
                ('age50', models.IntegerField()),
                ('age60', models.IntegerField()),
            ],
        ),
    ]
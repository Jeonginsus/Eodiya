# Generated by Django 3.2.12 on 2022-04-03 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommercialArea',
            fields=[
                ('commercialAreaCode', models.IntegerField(primary_key=True, serialize=False)),
                ('commercialAreaName', models.CharField(max_length=50)),
                ('commercialAreaChange', models.CharField(max_length=10)),
                ('commercialAreaXYPoint', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SeoulGuDong',
            fields=[
                ('dongCode', models.IntegerField(primary_key=True, serialize=False)),
                ('guName', models.CharField(max_length=50)),
                ('guCenterXPoint', models.FloatField()),
                ('guCenterYPoint', models.FloatField()),
                ('guXYPoint', models.TextField()),
                ('dongName', models.CharField(max_length=50)),
                ('dongCenterXPoint', models.FloatField()),
                ('dongCenterYPoint', models.FloatField()),
                ('dongXYPoint', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CommercialAreaRevenue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quarterRevenue', models.BigIntegerField()),
                ('perRevenue', models.FloatField()),
                ('maleRevenue', models.BigIntegerField()),
                ('femaleRevenue', models.BigIntegerField()),
                ('ageGroup', models.CharField(max_length=50)),
                ('timeGroup', models.CharField(max_length=50)),
                ('commercialArea', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='commercial_area.commercialarea')),
            ],
        ),
        migrations.CreateModel(
            name='CommercialAreaPeople',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('likePeople', models.IntegerField()),
                ('maleLikePeople', models.IntegerField()),
                ('femaleLikePeople', models.IntegerField()),
                ('likePeopleAge10', models.IntegerField()),
                ('likePeopleAge20', models.IntegerField()),
                ('likePeopleAge30', models.IntegerField()),
                ('likePeopleAge40', models.IntegerField()),
                ('likePeopleAge50', models.IntegerField()),
                ('likePeopleAge60', models.IntegerField()),
                ('commercialArea', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='commercial_area.commercialarea')),
            ],
        ),
        migrations.CreateModel(
            name='CommercialAreaNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numberStore', models.IntegerField()),
                ('numberSimilarStore', models.IntegerField()),
                ('openingStore', models.IntegerField()),
                ('closureStore', models.IntegerField()),
                ('openingRate', models.FloatField()),
                ('closureRate', models.FloatField()),
                ('commercialArea', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='commercial_area.commercialarea')),
            ],
        ),
        migrations.CreateModel(
            name='CommercialAreaBuilding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bankNumber', models.IntegerField()),
                ('hospitalNumber', models.IntegerField()),
                ('pharmacyNumber', models.IntegerField()),
                ('kindergardenNumber', models.IntegerField()),
                ('schoolNumber', models.IntegerField()),
                ('universityNumber', models.IntegerField()),
                ('departmentStoreNumber', models.IntegerField()),
                ('supermarketNumber', models.IntegerField()),
                ('theaterNumber', models.IntegerField()),
                ('hotelNumber', models.IntegerField()),
                ('busTerminalNumber', models.IntegerField()),
                ('subwayNumber', models.IntegerField()),
                ('busStopNumber', models.IntegerField()),
                ('commercialArea', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='commercial_area.commercialarea')),
            ],
        ),
        migrations.CreateModel(
            name='CommercialAreaBackground',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avgIncome', models.IntegerField()),
                ('gradeIncome', models.IntegerField()),
                ('commercialArea', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='commercial_area.commercialarea')),
            ],
        ),
        migrations.AddField(
            model_name='commercialarea',
            name='seoulGuDong',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commercialAreas', to='commercial_area.seoulgudong'),
        ),
    ]

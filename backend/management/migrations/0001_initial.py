# Generated by Django 4.2.7 on 2023-11-26 06:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('address', models.CharField(max_length=500)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Dish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='')),
                ('price', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='DishCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=55)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_ad', models.DateTimeField(auto_now_add=True)),
                ('status', models.SmallIntegerField(choices=[(1, 'Pending'), (2, 'Accepted'), (3, 'Cooked'), (4, 'Being delivered'), (5, 'Delivered')], default=(1, 'Pending'))),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='management.branch')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client', to=settings.AUTH_USER_MODEL)),
                ('courier', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='courier', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Promocode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=8)),
                ('value', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='management.dish')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='management.order')),
            ],
        ),
        migrations.CreateModel(
            name='AccountDiscount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discount', models.FloatField()),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

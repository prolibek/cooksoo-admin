# Generated by Django 4.2.7 on 2023-12-03 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0003_alter_dish_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='lat',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
        migrations.AddField(
            model_name='branch',
            name='lon',
            field=models.DecimalField(decimal_places=6, max_digits=9, null=True),
        ),
    ]

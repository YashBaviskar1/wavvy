# Generated by Django 5.1.4 on 2025-01-17 18:42

import phonenumber_field.modelfields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0039_servicecategory_parent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='otp',
            name='phone_number',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None),
        ),
    ]

# Generated by Django 5.1.4 on 2025-01-08 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0016_alter_business_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="business",
            name="user",
        ),
    ]
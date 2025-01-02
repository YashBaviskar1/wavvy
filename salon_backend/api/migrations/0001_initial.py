# Generated by Django 5.1.4 on 2025-01-02 05:15

import api.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("appointment_date", models.DateField()),
                ("appointment_time", models.TimeField()),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Booked", "Booked"),
                            ("Confirmed", "Confirmed"),
                            ("Cancelled", "Cancelled"),
                            ("Completed", "Completed"),
                        ],
                        max_length=50,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Business",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "profile_img",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to="business",
                        validators=[api.models.validate_image_size],
                    ),
                ),
                ("owner_name", models.CharField(max_length=255)),
                ("phone_number", models.CharField(max_length=15, unique=True)),
                ("salon_name", models.CharField(max_length=255, unique=True)),
                ("owner_email", models.EmailField(max_length=254, unique=True)),
                (
                    "gst",
                    models.CharField(blank=True, max_length=50, null=True, unique=True),
                ),
                ("salon_description", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Services",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("service_name", models.CharField(max_length=255)),
                (
                    "service_type",
                    models.CharField(
                        choices=[
                            ("Basic", "Basic"),
                            ("Premium", "Premium"),
                            ("Add-on", "Add-on"),
                        ],
                        max_length=50,
                    ),
                ),
                (
                    "menu_category",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("duration_in_mins", models.PositiveIntegerField()),
                ("price", models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="TeamMember",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "profile_img",
                    models.ImageField(blank=True, null=True, upload_to="team_members"),
                ),
                ("member_name", models.CharField(max_length=255)),
                ("phone_number", models.CharField(max_length=15, unique=True)),
                ("member_email", models.EmailField(max_length=254, unique=True)),
                ("date_of_joining", models.DateField()),
                (
                    "access_type",
                    models.CharField(
                        choices=[("Super Admin", "Super Admin"), ("Admin", "Admin")],
                        max_length=50,
                    ),
                ),
                ("is_available", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Client",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("client_name", models.CharField(max_length=255)),
                (
                    "client_type",
                    models.CharField(
                        choices=[
                            ("Regular", "Regular"),
                            ("Premium", "Premium"),
                            ("Corporate", "Corporate"),
                            ("Walk-in", "Walk-in"),
                        ],
                        max_length=50,
                    ),
                ),
                ("client_email", models.EmailField(max_length=40, unique=True)),
                ("client_phone", models.CharField(max_length=15, unique=True)),
                ("client_dob", models.DateField(blank=True, null=True)),
                (
                    "client_gender",
                    models.CharField(
                        choices=[
                            ("Male", "Male"),
                            ("Female", "Female"),
                            ("Rather Not to Say", "Rather Not to Say"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "appointment_history",
                    models.ManyToManyField(blank=True, to="api.appointment"),
                ),
            ],
        ),
        migrations.AddField(
            model_name="appointment",
            name="customer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.client"
            ),
        ),
        migrations.AddField(
            model_name="appointment",
            name="select_service",
            field=models.ManyToManyField(to="api.services"),
        ),
        migrations.AddField(
            model_name="appointment",
            name="select_staff",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="api.teammember",
            ),
        ),
    ]
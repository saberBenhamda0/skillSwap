# Generated by Django 5.0.6 on 2024-08-04 15:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_chartdata_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chartdata',
            old_name='date',
            new_name='month',
        ),
    ]

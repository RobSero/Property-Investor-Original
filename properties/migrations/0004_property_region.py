# Generated by Django 3.0.7 on 2020-06-06 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0003_auto_20200605_0931'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='region',
            field=models.CharField(default='south', max_length=30),
            preserve_default=False,
        ),
    ]

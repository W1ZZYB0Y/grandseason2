from django.db import migrations
from django.utils.text import slugify


ROOMS = [
    {
        "name": "Classic Room",
        "short_description": "Comfortable layout",
        "amenities": "Comfortable layout\nAir-conditioning, Free WiFi, TV",
        "price": "60000.00",
        "display_order": 1,
    },
    {
        "name": "Deluxe Room",
        "short_description": "Workspace and comfortable layout",
        "amenities": "Workspace\nComfortable layout\nAir-conditioning, Free WiFi, TV",
        "price": "65000.00",
        "display_order": 2,
    },
    {
        "name": "Superior Room",
        "short_description": "Workspace and comfortable layout",
        "amenities": "Workspace\nComfortable layout\nAir-conditioning, Free WiFi, TV",
        "price": "75000.00",
        "display_order": 3,
    },
    {
        "name": "Executive Suite",
        "short_description": "1 King bed, workspace",
        "amenities": "1 King bed\nWorkspace\nAir-conditioning, Free WiFi, TV",
        "price": "100000.00",
        "display_order": 4,
    },
    {
        "name": "Diplomatic Suite",
        "short_description": "1 King bed, spacious layout",
        "amenities": "1 King bed\nWorkspace\nComfortable layout\nAir-conditioning, Free WiFi, TV",
        "price": "120000.00",
        "display_order": 5,
    },
]

for _room in ROOMS:
    _room["slug"] = slugify(_room["name"])


def seed_rooms(apps, schema_editor):
    Room = apps.get_model("hotel", "Room")
    for data in ROOMS:
        Room.objects.get_or_create(name=data["name"], defaults=data)


def remove_rooms(apps, schema_editor):
    Room = apps.get_model("hotel", "Room")
    Room.objects.filter(name__in=[r["name"] for r in ROOMS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("hotel", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_rooms, remove_rooms),
    ]

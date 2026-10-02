from django.db import migrations

# Maps each room name to its image filenames already sitting in media/rooms/
ROOM_IMAGES = {
    "Classic Room": ["CLASSIC_1.jpg", "CLASSIC_3.jpg"],
    "Deluxe Room": ["DELUX_1.jpg", "DELUX_2.jpg"],
    "Superior Room": ["SUPERIOR_1.jpg", "SUPERIOR_3.jpg"],
    "Executive Suite": ["EXECUTIVE_1.jpg", "EXECUTIVE_3.jpg"],
    "Diplomatic Suite": ["DIPLOMATIC_1.jpg", "DSC_0975.jpg"],
}


def seed_room_images(apps, schema_editor):
    Room = apps.get_model("hotel", "Room")
    RoomImage = apps.get_model("hotel", "RoomImage")

    for room_name, filenames in ROOM_IMAGES.items():
        try:
            room = Room.objects.get(name=room_name)
        except Room.DoesNotExist:
            continue
        for order, filename in enumerate(filenames):
            RoomImage.objects.get_or_create(
                room=room,
                image=f"rooms/{filename}",
                defaults={"display_order": order},
            )


def remove_room_images(apps, schema_editor):
    RoomImage = apps.get_model("hotel", "RoomImage")
    all_files = [f for files in ROOM_IMAGES.values() for f in files]
    RoomImage.objects.filter(
        image__in=[f"rooms/{f}" for f in all_files]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("hotel", "0002_seed_rooms"),
    ]

    operations = [
        migrations.RunPython(seed_room_images, remove_room_images),
    ]

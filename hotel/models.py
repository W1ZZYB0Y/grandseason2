from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify


class Room(models.Model):
    """A room/suite category shown on the Rooms page.

    Admins edit `price` (and optional `old_price` for showing a
    promo/strikethrough price) directly from the Django admin list view.
    """

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=110, unique=True, blank=True)
    short_description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Short line shown under the room name, e.g. 'Comfortable layout, free WiFi'.",
    )
    amenities = models.TextField(
        blank=True,
        help_text="One amenity per line, e.g.\nWorkspace\nAir-conditioning\nFree WiFi, TV",
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Current nightly rate in Naira (₦).",
    )
    old_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Optional original price to show struck through, for promos/discounts.",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Untick to hide this room from the site without deleting it.",
    )
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def amenity_list(self):
        return [line.strip() for line in self.amenities.splitlines() if line.strip()]


class RoomImage(models.Model):
    """One or more images per room, shown in the room's carousel."""

    room = models.ForeignKey(Room, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="rooms/")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return f"Image for {self.room.name} (#{self.display_order})"


class Review(models.Model):
    """A visitor-submitted review. Published immediately; admin can edit/delete."""

    RATING_CHOICES = [(i, f"{i} star{'s' if i != 1 else ''}") for i in range(1, 6)]

    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, help_text="Optional, not shown publicly.")
    room = models.ForeignKey(
        Room,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviews",
        help_text="Optional — leave blank for a general hotel review.",
    )
    rating = models.PositiveSmallIntegerField(
        choices=RATING_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    comment = models.TextField(max_length=2000)
    is_approved = models.BooleanField(
        default=True,
        help_text="Untick to hide this review from the public site without deleting it.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.rating}★)"

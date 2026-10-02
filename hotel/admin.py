from django.contrib import admin
from django.utils.html import format_html

from .models import Review, Room, RoomImage


class RoomImageInline(admin.TabularInline):
    model = RoomImage
    extra = 1


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "old_price", "is_active", "display_order")
    list_editable = ("price", "old_price", "is_active", "display_order")
    list_display_links = ("name",)
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    inlines = [RoomImageInline]
    fieldsets = (
        (None, {"fields": ("name", "slug", "short_description", "amenities")}),
        ("Pricing", {"fields": ("price", "old_price")}),
        ("Visibility", {"fields": ("is_active", "display_order")}),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "star_display", "room", "short_comment", "is_approved", "created_at")
    list_editable = ("is_approved",)
    list_filter = ("is_approved", "rating", "room")
    search_fields = ("name", "email", "comment")
    date_hierarchy = "created_at"
    actions = ["approve_reviews", "hide_reviews"]

    @admin.display(description="Rating")
    def star_display(self, obj):
        return format_html("{}", "★" * obj.rating + "☆" * (5 - obj.rating))

    @admin.display(description="Comment")
    def short_comment(self, obj):
        return (obj.comment[:60] + "…") if len(obj.comment) > 60 else obj.comment

    @admin.action(description="Approve selected reviews (make visible)")
    def approve_reviews(self, request, queryset):
        queryset.update(is_approved=True)

    @admin.action(description="Hide selected reviews (unapprove)")
    def hide_reviews(self, request, queryset):
        queryset.update(is_approved=False)

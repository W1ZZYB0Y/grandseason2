from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("rooms/", views.room_list, name="rooms"),
    path("reviews/", views.review_list_create, name="reviews"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("gallery/", views.gallery, name="gallery"),
    path("restaurant/", views.restaurant, name="restaurant"),
]

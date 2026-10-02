from django.contrib import messages
from django.shortcuts import redirect, render

from .forms import ReviewForm
from .models import Review, Room


def home(request):
    rooms = Room.objects.filter(is_active=True)[:3]
    all_rooms = Room.objects.filter(is_active=True)
    reviews = Review.objects.filter(is_approved=True)[:3]
    return render(request, "hotel/index.html", {
        "rooms": rooms,
        "all_rooms": all_rooms,
        "reviews": reviews,
    })


def room_list(request):
    rooms = Room.objects.filter(is_active=True).prefetch_related("images")
    return render(request, "hotel/rooms.html", {"rooms": rooms})


def review_list_create(request):
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Thanks for your review! It's now live on the site.")
            return redirect("reviews")
    else:
        form = ReviewForm()

    reviews = Review.objects.filter(is_approved=True)
    return render(request, "hotel/reviews.html", {"form": form, "reviews": reviews})


def about(request):
    return render(request, "hotel/about.html")


def contact(request):
    return render(request, "hotel/contact.html")


def gallery(request):
    return render(request, "hotel/gallery.html")


def restaurant(request):
    return render(request, "hotel/restaurant.html")

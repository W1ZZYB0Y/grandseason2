from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.cache import cache_control
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('hotel.urls')),
]

# Media files (room/review photos) have no other server configured for
# them (no S3/Cloudinary yet), so serve them via Django directly in all
# environments — fine at this traffic level.
#
# NOTE: Django's static() helper silently does nothing when DEBUG=False
# (it's designed to be dev-only), so we call the underlying view
# directly here instead to deliberately keep this working in production.
#
# cache_control tells the visitor's browser to keep a downloaded photo
# for a week instead of re-fetching it on every page view — on repeat
# visits (e.g. browsing Rooms then Gallery), already-seen images load
# instantly from the browser's own cache.
cached_serve = cache_control(public=True, max_age=60 * 60 * 24 * 7)(serve)

urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', cached_serve, {'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])

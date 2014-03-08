from django.conf.urls import patterns, include, url

from django.contrib import admin
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    (r'^$', RedirectView.as_view(url='/chat/')),
    url(r'^chat/', include('chat.urls')),


    # url(r'^admin/', include(admin.site.urls)),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

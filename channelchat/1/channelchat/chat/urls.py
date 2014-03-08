from django.conf.urls import patterns, url
from chat.views import (
    ChatHomeView,
    ChatRoomUpdateView,
)



urlpatterns = patterns('',
    url(r'^$', ChatHomeView.as_view(), name='chat_home'),
    url(r'^update', ChatRoomUpdateView.as_view(), name='chat_update'),

)

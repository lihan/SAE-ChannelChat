from django.views.generic import (
    TemplateView,
    View,
)
from django.http import HttpResponse
from django.conf import settings
from sae import channel
import json

class ChatHomeView(TemplateView):
    template_name = 'chat/home.html'

    def get_context_data(self, **kwargs):
        channel_url = channel.create_channel(settings.PUBLIC_ROOM_NAME)

        return {
            'channel_url': channel_url
        }

class ChatRoomUpdateView(View):

    def get(self, request):
        pass

    def post(self, request):
        data_dict = {
            'message': request.POST['message'],
            'message_id': request.POST['message_id']
        }
        channel.send_message(
            settings.PUBLIC_ROOM_NAME,
            json.dumps(data_dict)
        )
        return HttpResponse('ok')
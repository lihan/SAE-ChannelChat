#!/usr/bin/env python
# encoding: utf-8

import sae
import os
import sys

root = os.path.dirname(__file__)


# sys.path.insert(0, os.path.join(root, 'site-packages'))

sys.path.insert(0, os.path.join(root, 'site-packages.zip'))
sys.path.insert(1, os.path.join(root, 'channelchat'))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "channelchat.settings")

from django.core.wsgi import get_wsgi_application

application = sae.create_wsgi_app(get_wsgi_application())

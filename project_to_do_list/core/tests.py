from django.test import TestCase
from django.test import Client

# Create your tests here.

class TaskTests(TestCase):
    def test_create_task_view(self):
        c = Client()
        c.post('/create_task/')


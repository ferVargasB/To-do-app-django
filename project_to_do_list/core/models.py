from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=200)
    create_date = models.DateField(auto_now_add=True)
    complete_date = models.DateField(auto_now_add=True, null=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.name 

    class Meta:
        ordering = ["name"]    
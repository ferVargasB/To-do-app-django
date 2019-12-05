from django.contrib import admin
from .models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
     readonly_fields = ('create_date', 'complete_date')
admin.site.register(Task, TaskAdmin)
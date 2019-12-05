from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from .form import NameForm
from .models import Task
from datetime import date

# Create your views here.
def home(request):
    all_tasks = Task.objects.all()
    return render(request, 'core/index.html', {'tasks':all_tasks})

def create_task(request):
    if request.is_ajax:
        if request.method == "POST":
            form = NameForm(request.POST)
            if form.is_valid():
                data_post = request.POST
                task = Task(name=data_post['name'], description=data_post['description'])
                task.save()
                response = {"type":"ok","id":task.id,"name":task.name,"description":task.description,"create_date":task.create_date,"complete_date":task.complete_date}
                return JsonResponse(response)
            else:
                return JsonResponse(form.errors)                    

def done_task(request):
    if request.is_ajax:
        if request.method == "POST":
            id_task = int(request.POST['id_task'])
            task = Task.objects.get(id=id_task)
            task.is_done = True
            task.complete_task = date.today()
            task.save()
            response = {"type":"ok","id":task.id,"name":task.name,"description":task.description,"create_date":task.create_date,"complete_date":task.complete_date}
            return JsonResponse(response)

              


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var form = document.getElementById("formTask");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    add_task(data, e.target.action);
});

const btnDone = document.querySelectorAll('.btn-done');
if (btnDone){
    const btnArray = Array.from(btnDone);
    btnArray.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            done_task(e.target.dataset.id, e.target);
        });
    });
}

async function done_task(id_task, taskElement){
    try {
        var csrftoken = getCookie('csrftoken');
        var data = new FormData();
        data.append('id_task',id_task);

        const response = await fetch("/done_task/", {
            method: 'POST',
            body: data,
            headers:{'X-CSRFToken': csrftoken}
        });

        const procededResponse = await response.json();
        remove_task_progress(taskElement);
        show_task_complete(procededResponse);
    } catch (error) {
        alert(error);
    }
}

async function add_task(formData, url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const procededResponse = await response.json();
        show_message(procededResponse);
    } catch (error) {
        alert(error);
    }
}

function show_message(response) {
    if (response.type == "ok") {
        var message = document.createElement('div');
        message.setAttribute("class", "alert alert-success");
        message.setAttribute("role", "alert");
        message.innerText = " La tarea se creó con éxito";
        show_task(response);
        document.getElementById('container_messages').appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }
}

function show_task(taskData) {
    var card = document.createElement('div');
    card.setAttribute("class", "card mt-3");
    card.style.width = "18rem";

    var cardBody = document.createElement('div');
    cardBody.setAttribute("class","card-body");

    var title = document.createElement("h5");
    title.setAttribute("class","card-title");
    title.innerText = taskData.name;

    var description= document.createElement("p");
    description.setAttribute("class","card-text");
    description.innerText = taskData.description;

    var create_date = document.createElement("p");
    create_date.setAttribute("class","card-text");
    create_date.innerText = 'Create date: '+taskData.create_date;

    var btnComepleted= document.createElement("button");
    btnComepleted.setAttribute("class","btn btn-primary");
    btnComepleted.setAttribute("data-id",taskData.id);
    btnComepleted.innerText = "Mark as Completed";

    btnComepleted.addEventListener('click', (e) => {
        done_task(e.target.dataset.id, e.target);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(create_date);
    cardBody.appendChild(btnComepleted);

    card.appendChild(cardBody);

    document.getElementById('tasks_in_progress').appendChild(card);
}

function remove_task_progress(taskElement){
    taskElement.parentNode.parentNode.remove();
}

function show_task_complete(taskData){
    var card = document.createElement('div');
    card.setAttribute("class", "card mt-3");
    card.style.width = "18rem";

    var cardBody = document.createElement('div');
    cardBody.setAttribute("class","card-body");

    var title = document.createElement("h5");
    title.setAttribute("class","card-title");
    title.innerText = taskData.name;

    var description= document.createElement("p");
    description.setAttribute("class","card-text");
    description.innerText = taskData.description;

    var create_date = document.createElement("p");
    create_date.setAttribute("class","card-text");
    create_date.innerText = 'Create date: '+taskData.create_date;

    var complete_date = document.createElement("p");
    complete_date.setAttribute("class","card-text");
    complete_date.innerText = 'Complete date: '+taskData.complete_date;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(create_date);
    cardBody.appendChild(complete_date);

    card.appendChild(cardBody);

    document.getElementById('tasks_completed').appendChild(card);
}

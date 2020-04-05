$(document).ready(init);

let tasks = [];

function init() {
  console.log('Its alive');

  $('#js-submit-task').on('submit', submitTask);
  $('.js-task-out').on('click', deleteTask);

  getTask();
}

function submitTask(event) {
  //event jQ gives us
  event.preventDefault();

  //capture input
  const taskInput = $('#js-input-list').val();

  //   postTask(taskInput); //gives the task input

  clearTask(); // remember to call them once I pull out the thing
}

function postTask(task) {
  const dataForServer = {
    task: task,
  }; //prepares the data, equals an object or the task. Value taken off taskInput. saved in task Input

  $.ajax({
    type: 'POST',
    url: '/task',
    data: dataForServer, //taking data from he client and sends it to the server
  })
    .then((response) => {
      console.log(response);
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function getTask() {
  $.ajax({
    type: 'GET',
    url: '/task',
  })
    .then((response) => {
      tasks = response;
      renderTask();
      console.log(response);
    })
    .catch((err) => {
      console.warn(err);
    });
}

function deleteTask() {
  const taskID = $(this).parent().data('id');
  console.log(taskID);
}

function clearTask() {
  $('#js-input-list').val(''); //clears input after entering so it doesn't show multiple times
}

function renderTask() {
  $('.js-input-list').empty();
  for (let task of tasks) {
    $('#js-input-list').append(`
    <div data-id=${task.id}>
    <span>${task.taskDo}</span> 
    <button class="js-btn-delete">Delete</button>
    </div>`);
  }
}

//taskDo is the property in SQL for the task name

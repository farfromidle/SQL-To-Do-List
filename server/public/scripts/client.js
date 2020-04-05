$(document).ready(init);

let tasks = [];

function init() {
  console.log('Its alive');

  $('#js-submit-task').on('submit', submitTask);
  $('.js-task-out').on('click', '.js-btn-delete', deleteTask);
  $('.js-task-out').on('click', '.js-btn-task-complete', completeTask);

  getTask();
}

function submitTask(event) {
  //event jQ gives us
  event.preventDefault();

  //capture input
  const taskInput = $('#js-input-list').val();
  postTask(taskInput); //gives the task input
  //   console.log(taskInput);

  clearTask(); // remember to call them once I pull out the thing
}

function clearTask() {
  $('#js-input-list').val(''); //clears input after entering so it doesn't show multiple times
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

  $.ajax({
    type: 'DELETE',
    url: `/task/${taskID}`,
  })
    .then((response) => {
      tasks = response;
      getTask();
      renderTask();
      console.log(response);
    })
    .catch((err) => {
      console.warn(err);
    });
}

function completeTask() {
  console.log('Task Complete');
  const taskComplete = {
    taskComplete: $(this).parent().data('taskComplete'),
  };
  const taskID = $(this).parent().data('taskComplete');
  console.log(taskID);

  $.ajax({
    type: 'PUT',
    url: `/task/${taskID}`,
    data: taskComplete,
  })
    .then((response) => {
      tasks = response;
      getTask();
    })
    .catch((err) => {
      console.warn(err);
    });
}

function renderTask() {
  $('.js-task-out').empty();
  for (let task of tasks) {
    $('.js-task-out').append(`
    <div data-id=${task.id} data-taskComplete=${task.taskComplete}>
    <span>${task.taskDo}</span> 
    <button class="js-btn-delete">Delete</button>
    <button class="js-btn-task-complete">Task Complete</button>
    </div>`);

    if (task.taskComplete === true) {
      const $el = $('.js-task-out').children().last();
      $el.addClass('taskComplete');
    }
  }
}

// <button class="js-btn-task-complete">Task Complete</button> (goes in render task)
// data-taskComplete=${task.taskComplete} Need this for the task to complete properly add back to render task id
//taskDo is the property in SQL for the task name

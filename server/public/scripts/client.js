$(document).ready(init);

function init() {
  console.log('Its alive');

  $('#js-submit-task').on('submit', submitTask);
}

function submitTask(event) {
  //event jQ gives us
  event.preventDefault();

  //capture input
  const taskInput = $('#js-input-list').val();

  postTask(taskInput); //gives the task input

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
    })
    .catch((err) => {
      console.warn(err);
    });
}

function clearTask() {
  $('#js-input-list').val(''); //clears input after entering so it doesn't show multiple times
}

$(document).ready(function() {
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate);

  $('.time-block').each(function() {
    var blockId = $(this).attr('id');
    var savedData = localStorage.getItem(blockId);
    if (savedData) {
      $(this).find('.description').val(savedData);
    }
  });

  $('.saveBtn').on('click', function() {
    var block = $(this).closest('.time-block');
    var blockId = block.attr('id');
    var data = block.find('.description').val();
    localStorage.setItem(blockId, data);
    showSaveAlert();
  });

  function showSaveAlert() {
    var saveAlert = $('<div>').addClass('save-alert').text('Your information has been saved!');
    var clearButton = $('<button>').addClass('clearBtn').text('OK').click(function() {
      saveAlert.remove();
    });
    saveAlert.append(clearButton);
    $('.container-lg').prepend(saveAlert);
    saveAlert.fadeIn('fast').delay(2000).fadeOut('fast', function() {
      $(this).remove();
    });
  }

  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var blockId = parseInt($(this).attr('id').split('-')[1]);
    if (blockId < currentHour) {
      $(this).addClass('past');
    } else if (blockId === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });
});
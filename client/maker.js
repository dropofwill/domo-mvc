'use strict';

$(document).ready(function() {

  function handleError(message) {
    $('#errorMessage').text(message);
    $('#domoMessage').animate({width:'toggle'},350);
  }

  function sendAjax(method, action, data) {
    $.ajax({
      cache: false,
      type: method,
      url: action,
      data: data,
      dataType: 'json',
      success: function(result, status, xhr) {
        $('#domoMessage').animate({width:'hide'},350);

        window.location = result.redirect;
      },
      error: function(xhr, status, error) {
        var messageObj = JSON.parse(xhr.responseText);

        handleError(messageObj.error);
      }
    });
  }

  $('#makeDomoSubmit').on('click', function(e) {
    e.preventDefault();

    $('#domoMessage').animate({width:'hide'},350);

    if($('#domoName').val() == '' || $('#domoAge').val() == '') {
      handleError('RAWR! All fields are required');
      return false;
    }

    sendAjax('POST', $('#domoForm').attr('action'), $('#domoForm').serialize());

    return false;
  });


  $('.domoDelete').on('submit', function(e) {
    e.preventDefault();

    sendAjax('DELETE', $(this).attr('action'), $(this).serialize());

    return false;
  });
});

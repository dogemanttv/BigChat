var form = document.getElementById('form');
var input = document.getElementById('input');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      window.location = '/chat/private/' + input.value
      input.value = '';
    }
  });
  function submit() {
    if (document.getElementById('input').value) {
      window.location = '/chat/private/' + input.value
      input.value = '';
    }
  }
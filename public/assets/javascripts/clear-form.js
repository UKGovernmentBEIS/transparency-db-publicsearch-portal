document.querySelectorAll('.js-clear-form').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
  
      const formId = trigger.dataset.formTarget;
      const form = document.getElementById(formId);
  
      if (!form) return;
  
      clearForm(form);
    });
  });
  
  function clearForm(form) {
    form.querySelectorAll('input, textarea, select').forEach((el) => {
      switch (el.type) {
        case 'checkbox':
        case 'radio':
          el.checked = false;
          break;
  
        case 'select-one':
          el.selectedIndex = 0;
          break;
  
        case 'select-multiple':
          Array.from(el.options).forEach(option => {
            option.selected = false;
          });
          break;
  
        case 'hidden':
        case 'submit':
        case 'button':
        case 'reset':
          break;
  
        default:
          el.value = '';
      }
    });
  }
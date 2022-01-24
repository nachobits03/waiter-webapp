

// window.addEventListener('DOMContentLoaded', function () {
//     let button = document.querySelectorAll('.button');
//     let shift = document.querySelectorAll('#shift');

//     for (let i = 0; i <= button.length; i++) {

//         function shiftCheck () {
//             if (shift[i].checked === false) {
//                 shift[i].checked = true;
//                 button[i].classList.remove('oldchecked');
//                 button[i].classList.add('checked');
//             } else if (shift[i].checked === true) {
//                 button[i].classList.remove('checked');
//             }
//         }

//         button[i].addEventListener('click', shiftCheck);
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });

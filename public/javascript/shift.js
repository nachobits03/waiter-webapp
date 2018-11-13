window.addEventListener('DOMContentLoaded', function () {
    let button = document.querySelectorAll('.button');
    let shift = document.querySelectorAll('#shift');

    for (let i = 0; i <= button.length; i++) {


        function setup () {
            if (button[i].classList.conatains('checked')) {
                shift[i].checked = true;
                console.log('lalala')
            }
        }

        function shiftCheck () {
            if (shift[i].checked === false) {
                shift[i].checked = true;
                button[i].classList.remove('oldchecked');
                button[i].classList.add('checked');
            } else if (shift[i].checked === true) {
                button[i].classList.remove('checked');
            }
        }

        button[i].addEventListener('click', shiftCheck);
    }
});

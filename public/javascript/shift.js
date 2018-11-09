window.addEventListener('DOMContentLoaded', function () {
    let button = document.querySelectorAll('.button');
    let shift = document.querySelectorAll('#shift');

    let days = [1, 2, 3, 4, 5, 6, 7];

    for (let i = 0; i <= button.length; i++) {
        function shiftCheck () {
            if (shift[i].checked === false) {
                shift[i].checked = true;
                // shift[i].value = days[i];

                button[i].classList.add('clicked');
            } else if (shift[i].checked === true) {
                shift[i].checked = false;
                // shift[i].value = 1;

                button[i].classList.remove('clicked');
            }
        }

        button[i].addEventListener('click', shiftCheck);
    }

});

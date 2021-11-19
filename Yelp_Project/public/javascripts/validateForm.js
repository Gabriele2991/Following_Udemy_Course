(function () {
    'use strict'
    //fetch all the forms we want to apply custom Bootstrap
    const forms = document.querySelectorAll('.validated-form')
    //loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()
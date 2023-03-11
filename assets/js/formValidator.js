document.addEventListener('DOMContentLoaded', (event) => {

    /*Constantes que se utilizan para realizar requerir elementos html.*/
    const formRegister = document.querySelector('#formRegister');
    const email = document.getElementById('email');
    const peso = document.querySelector('#kg');
    const altura = document.querySelector('#mts');
    const htmlImc = document.querySelector('#imc');
    const htmlCity = document.querySelector('#city');
    const htmlValoration = document.querySelector('#valoration');
    const htmlActivityF = document.querySelector('#activityF');
    const htmlSuccessfulregister = document.querySelector('.successful-register');

    /*Una constante que se utiliza para realizar una solicitud a la API.*/
    const options = {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    };

    /*Una solicitud de búsqueda a una API (api-colombia) que devuelve una lista de ciudades en Colombia por departamentos (Antioquia).*/
    fetch('https://api-colombia.com/api/v1/Department/2/cities', options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            const city = data.map((city => {
                htmlCity.innerHTML += `<option value="${city.id}">${city.name}</option>`;
            }));

        })
        .catch(err => console.error(err));

    /*Una función que se ejecuta cuando se envía el formulario (formRegister).*/
    formRegister.addEventListener('submit', (event) => {

        event.preventDefault();
        const errorsArray = [];
        let refuseEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        /*Esta es una validación para el campo de correo electrónico.*/
        if (email.value != '' && email != undefined) {

            if (refuseEmail.test(email.value) == false) {
                errorsArray.push(` El <strong><span class="obligatory">Email</span>  </strong> que intentas ingresar no es valido `);
            }
        }

        /*Esta es una validación para los campos del formulario.*/
        Array.from(formRegister.elements).forEach(element => {

            if (element.type !== 'submit') {

                if (element.value === '' && element.dataset.label == 'Nombre' || element.dataset.label == 'Identificación' && element.value === '' || element.value == 'None') {
                    errorsArray.push(` El campo <strong><span class="obligatory">${element.dataset.label}</span></strong> debe ser diligenciado obligatoriamente`);
                }
            }
            if (element.value.length < 2 && element.value != "" && element.dataset.label == 'Identificación') {
                errorsArray.push(` El campo <strong><span class="obligatory">${element.dataset.label}</span></strong> debe contener al menos 2 caracteres `);
            }
        });

        /*Esta es una función que se ejecuta cuando se envía el formulario (formRegister).*/
        if (errorsArray.length === 0) {

            /* Esta funcion sirve para mostrar los items de successful-register despues de registrarse*/
            htmlSuccessfulregister.style.display = 'block';

            /*Esta es una función que se ejecuta cuando se envía el formulario (formRegister) para validar si
            los campos son correctos.*/

            alert('¡Su informacion fue almacenada correctamente!')
            errorsDiv.innerHTML = '';


            /*Esta es una función que permite calcular el IMC.*/
            const imc = (peso.value / (altura.value * altura.value)).toFixed(1);

            htmlImc.value = isNaN(imc) ? 'No tenemos datos suficientes para calcular' : imc;

            /*Esta es una funcion que permite calucar si se es acto o no para el maraton. */
            if (imc >= 18.5 && imc <= 24.9 && htmlActivityF.value == 'no') {
                htmlValoration.value = 'ACTO.';
            } else if (imc <= 18.5 || imc >= 24.9 || htmlActivityF.value == 'si') {
                htmlValoration.value = 'NO ACTO.';
            } else {
                htmlValoration.value = 'No se puede calcular sin saber su IMC y si presenta dolor.';
            }

        } else {
            /* Esta es una función que se ejecuta cuando se envía el formulario (formRegister) para validar si
            los campos son incorrectos, esta muestra los errores..*/
            const errorsDiv = document.getElementById('errorsDiv');
            errorsDiv.innerHTML = '';
            errorsArray.forEach(error => {
                errorsDiv.hidden = false;
                errorsDiv.innerHTML += `<p>- ${error}</p>`
            });

        }
    })

})
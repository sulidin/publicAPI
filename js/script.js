const form = document.getElementById('form');
var allEmployees;
var indexEmp = -1;

getData();

//fetch random employees
function getData() {

    let url = 'https://randomuser.me/api/?results=12';

    fetch(url)

        .then(res => {
            if (!res.ok) {
                throw new Error("Error HTTP");
            }
            return res.json();
        })
        .then(data => randomEmp(data.results))
        .catch(err => console.log(err.message));
}


// associate employees
function randomEmp(data) {

    allEmployees = data;

    var galleryDiv = document.getElementById('gallery');

    for (var i = 0; i < data.length; i++) {
        var divCard = document.createElement('div');
        divCard.className = 'card';
        // add modal
        divCard.addEventListener('click', showModal);

        // card name
        var nameH3 = document.createElement('h3');
        nameH3.className = 'card-name cap';
        nameH3.id = `${data[i].name.first}${data[i].name.last}`;
        nameH3.innerText = `${data[i].name.first} ${data[i].name.last}`;

        // card image div
        var divCardImg = document.createElement('div');
        divCardImg.className = 'card-img-container';

        //card image
        var imgCard = document.createElement('img');
        imgCard.className = 'card-img';
        imgCard.src = data[i].picture.large;

        // card email text
        var cardTextEmail = document.createElement('p');
        cardTextEmail.className = 'card-text';
        cardTextEmail.innerText = data[i].email;

        //card information
        var infoContainer = document.createElement('div');
        infoContainer.className = 'card-info-container'

        // City and State text
        var cityStateText = document.createElement('p');
        cityStateText.className = 'card-text cap';
        cityStateText.innerText = `${data[i].location.city}, ${data[i].location.state}`;

        // appends
        infoContainer.appendChild(nameH3);
        infoContainer.appendChild(cardTextEmail);
        infoContainer.appendChild(cityStateText);
        divCardImg.appendChild(imgCard);
        divCard.appendChild(divCardImg);
        divCard.appendChild(divCardImg);
        divCard.appendChild(infoContainer);

        galleryDiv.insertAdjacentElement('afterbegin', divCard);
    }
}


// Modal setup function
function showModal(e) {

    // user selection
    var $element = $(this).children('.card-info-container').children('h3').text();

    // search employees
    allEmployees.forEach((employee, index) => {
        if ($element == (employee.name.first + ' ' + employee.name.last)) {
            indexEmp = index;

            var modalEl = document.createElement('div');
            modalEl.classList.add('modal-container');

            var date = new Date(employee.dob.date);
            var year = date.getFullYear();
            var month = ('0' + (1 + date.getMonth())).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            // set dob
            var dob = year + '-' + month + '-' + day;

            //set innerHTML 
            modalEl.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}., ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${dob}</p>
                 </div>
 
            </div>
            `;

            var x = document.querySelector('body');
            x.appendChild(modalEl);

            var closeBtn = document.getElementById('modal-close-btn');
            closeBtn.addEventListener('click', () => {
                modalEl.remove();
            });

        }
    })
}

// search bar
function search(e) {

    e.preventDefault();

    // user input
    var userInput = form.elements[0].value.toUpperCase();

    // get all employees
    var employees = document.querySelectorAll('.card');

    // search employees for user input
    employees.forEach(employee => {
        const name = employee.querySelector('.card-name').innerText.toUpperCase();
        if (name.indexOf(userInput) > -1) {
            employee.style.display = 'flex';
        } else {
            employee.style.display = 'none';
        }
    })
}


form.addEventListener('submit', search);
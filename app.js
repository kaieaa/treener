const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const saveBtn = document.querySelector('#btn-save');
const cancelBtn = document.querySelector('#btn-cancel');
const usersList = document.querySelector('#users-list');

saveBtn.addEventListener('click', () => {
    console.log('It works!');
    const enteredFirstName = firstName.value;
    const enteredLastName = lastName.value;
    const enteredEmail = email.value;
    const enteredPassword = password.value;
    usersController.create(enteredFirstName, enteredLastName, enteredEmail, enteredPassword);

    const newItem = document.createElement('ion-item');
    const newItem2 = document.createElement('ion-item');
    newItem.textContent = enteredFirstName + ' ' + enteredLastName;
    newItem2.textContent = 'E-mail: ' + enteredEmail + ' Telefon: '+ enteredPassword;

    usersList.appendChild(newItem);
    usersList.appendChild(newItem2);
    console.log(newItem);


});

cancelBtn.addEventListener('click', () => {
    console.log('It also works!');
});
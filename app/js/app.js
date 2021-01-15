@@include('dynamicAdapt.js', {})




let iconMenu =     document.querySelector('.icon-menu');
let menuBody =     document.querySelector('.column-menu__body');
let iconContacts = document.querySelector('.column-contacts__icon');
let contactsBody = document.querySelector('.body-contacts');

iconMenu.addEventListener('click', function() {
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
});

iconContacts.addEventListener('click', function() {
    contactsBody.classList.toggle('active');
});
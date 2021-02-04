/*******************Dynamic block*************************/
@@include('dynamicAdapt.js', {})



/*******************Burger menu*************************/
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


/*******************Slider*************************/
const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    spaceBetween: 130,
    slidesPerView: 3,
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
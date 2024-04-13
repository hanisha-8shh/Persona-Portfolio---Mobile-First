let $ = document;

const header = $.querySelector('header');
const navItems = $.querySelectorAll('.nav__item');
const sections = $.querySelectorAll('section[id]');
const modalViews = $.querySelectorAll('.services__modal');
const modalBtn = $.querySelectorAll('.services__button');
const modalClose = $.querySelectorAll('.services__modal-close');
const linkWork = $.querySelectorAll('.work__item');
const swiperPagination = $.querySelector('.swiper-pagination');
const themeButton = $.querySelector('#theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun';

// === Scroll Sticky Navbar === 

document.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > 0) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
})

// === Active Link === 

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;
  let sectionId = null;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}

// === Services Modal ===

modalBtn.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let modal = event.target.nextElementSibling;
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
    })
})

modalClose.forEach(function (btn) {
    btn.addEventListener('click', function () {
        modalViews.forEach(function (close) {
            close.style.opacity = '0';
            close.style.visibility = 'hidden';
        })
    })
})


// === Mixitup Filter Portfolio === :

let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

// === Link Active Work ===

function activeWork(link) {
    linkWork.forEach(function (item) {
        item.classList.remove('active-work');
    })

    link.classList.add('active-work');
}

linkWork.forEach(function (link) {
    link.addEventListener("click", function () {
        activeWork(link);
    })
})

// === Swiper Testimonial === 

let swiperTestimonial = new Swiper(".testimonial__container", {
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    grabCursor: true,

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

// === Change Theme ===

themeButton.addEventListener('click', function () {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);

    if (document.body.className.includes('light')) {
        localStorage.setItem('selected-theme', 'dark');
        localStorage.setItem('selected-icon', 'bx bx-moon');
    } else {
        localStorage.setItem('selected-theme', 'light');
        localStorage.setItem('selected-icon', 'bx bx-sun');
    }
})

window.addEventListener('load', function () {
    let selectedTheme = localStorage.getItem('selected-theme');
    let selectedIcon = localStorage.getItem('selected-icon');

    if (selectedTheme === 'dark' && selectedIcon === 'bx bx-moon') {
        document.body.classList.add(lightTheme);
        themeButton.classList.add(iconTheme);
    } 
})

// === Scroll Reveal Animation === :

const slideUp = {
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true,
};

ScrollReveal().reveal('.home__data', slideUp);
ScrollReveal().reveal('.home__handle', {delay: 700}, slideUp);
ScrollReveal().reveal('.home__social', '.home__scroll', {delay: 900, origin: 'bottom'}, slideUp);

// sr.reveal('.home__data');
// sr.reveal('.home__handle', {delay: 700});
// sr.reveal('.home__social', '.home__scroll', {delay: 900, origin: 'bottom'});


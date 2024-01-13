
const menuToggle = document.querySelector('.toggle-menu');
const menu = document.querySelector('.menu');
const closeToggle = document.querySelector('.close');
const overlay = document.querySelector('.overlay');


menuToggle.addEventListener('click', () => {
    menu.style.display = 'flex';
    setTimeout(() => {
        menu.classList.add('open');
        document.body.classList.add('no-scroll');
        overlay.classList.add('show');
    }, 10);
});

closeToggle.addEventListener('click', () => {
    closeMenu();
});

overlay.addEventListener('click', () => {
    closeMenu();
});

const closeMenu = () => {
    menu.classList.remove('open');
    setTimeout(() => {
        console.log('transitionend');
        menu.style.display = 'none';
    }, 300);
    document.body.classList.remove('no-scroll');
    overlay.classList.remove('show');
};


const profileToggle = document.querySelector('.profile');
const profileDropDown = document.querySelector('.drop-down');

let profileDropDownOpen = false;

profileToggle.addEventListener('click', (e) => {
    if (!profileDropDownOpen) {
        profileDropDown.style.display = 'block';
        profileDropDownOpen = true;
    } else {
        profileDropDown.style.display = 'none';
        profileDropDownOpen = false;
    }
});

let prevScrollPos = window.scrollY;

document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        header.style.top = '0';
        header.style.opacity = '1';

    } else {
        header.style.top = '-100%';
        header.style.opacity = "0";
    }
    prevScrollPos = currentScrollPos;
});

const slider = document.querySelector(".slider");
const sliderInner = document.querySelector(".slider-inner");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let slideIndex = 0;

slides.forEach(function (_, index) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("data-index", index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots .dot");

showSlide(slideIndex);

prev.addEventListener("click", function () {
    slideIndex--;
    showSlide(slideIndex);
});
next.addEventListener("click", function () {
    slideIndex++;
    showSlide(slideIndex);
});

dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        slideIndex = +dot.getAttribute("data-index");
        showSlide(slideIndex);
    });
});

function buttonState(button, enable) {
    button.disabled = !enable;
    !enable ? button.classList.add("disabled") : button.classList.remove("disabled");
    if (enable) {
        button.firstElementChild.src = button === prev ? "images/chevron-left-active.png" : "images/chevron-right-active.png";
    } else {
        button.firstElementChild.src = button === prev ? "images/chevron-left.png" : "images/chevron-right.png";
    }
}



function showSlide(index) {
    if (index == 0) {
        buttonState(prev);
        buttonState(next, true);
    }
    else if (index == slides.length - 1) {
        buttonState(next);
        buttonState(prev, true);
    } else {
        buttonState(prev, true);
        buttonState(next, true);
    }
    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });
    slides[index].classList.add("active");
    sliderInner.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach(function (dot) {
        dot.classList.remove("active");
        +dot.getAttribute("data-index") === slideIndex && dot.classList.add("active");
    });
}

const selectAll = document.querySelector('#selectall');

selectAll.addEventListener('click', (e) => {
    const checkboxes = document.querySelectorAll('.check input');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });
});

const decrementButton = document.querySelector('.decrement');
const incrementButton = document.querySelector('.increment');
const quantity = document.querySelector('#quantity');
const price = document.querySelector('.purchase .price span');

decrementButton.addEventListener('click', () => {
    if (quantity.value > 1) {
        quantity.value--;
        price.innerHTML = quantity.value * 100;
    } else {
        decrementButton.disabled = true;
    }
});


incrementButton.addEventListener('click', () => {
    quantity.value++;
    price.innerHTML = quantity.value * 100;
});

const postReview = document.querySelector('.post-review');
const reviewInput = document.querySelector('#review');

postReview.addEventListener('click', () => {
    if (reviewInput.value.trim() === '') {

        return;
    };
    const review = document.createElement('div');
    review.classList.add('review');
    review.innerHTML = `
         <div class="review">
                  <div class="user">
                    <div class="image">
                      <img src="./images/user.png" alt="user" />
                    </div>
                  </div>
                  <div class="review-content">
                    <h4 class="name">Ahmed Ali</h4>
                    <div class="rating">
                      <div class="stars">
                        <img src="./images/star-gold.png" alt="star" />
                        <img src="./images/star-gold.png" alt="star" />
                        <img src="./images/star-gold.png" alt="star" />
                        <img src="./images/star-gold.png" alt="star" />
                        <img src="./images/star.png" alt="star" />
                        <span class="time"> . 30m</span>
                      </div>
                    </div>
                    <p>
                        ${reviewInput.value}
                    </p>
                  </div>
                </div>
    `;
    reviewInput.value = '';
    document.querySelector('.add-review').before(review);
    reviewInput.value = '';
}
);

const favouriteButton = document.querySelectorAll('.favourite');

favouriteButton.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('hearted');
        const image = button.firstElementChild;
        button.classList.contains('hearted') ? image.src = 'images/heart.png' : image.src = 'images/fav.png';
    });
})




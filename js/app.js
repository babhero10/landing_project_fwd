/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let active_section = document.querySelector('.active');
let sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function scroll_to_section(event) {
    let newSection = document.querySelector(`${event.target.getAttribute("href")}`);

    event.preventDefault();
    
    window.scrollTo({
       top: newSection.offsetTop,
       behavior: 'smooth' 
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {

    // Fragment
    let ul = document.querySelector('.navbar__menu ul');

    // Main container
    let nav = document.querySelector('.navbar__menu');

    for (let i = 0; i < sections.length; i++)
    {
        let li = document.createElement("li");
        let a = document.createElement("a");

        // Set links
        a.setAttribute("href", `#${sections[i].id}`);
        a.classList.add("menu__link");
        a.textContent = sections[i].getAttribute('data-nav');
        a.addEventListener('click', scroll_to_section);
        
        li.appendChild(a);
        ul.appendChild(li);
    }

    nav.appendChild(ul);
}



// Add class 'active' to section when near top of viewport
function setActive(section) {
    active_section.classList.remove('active');
    section.classList.add('active');
    active_section = section;
}

// Scroll to anchor ID using scrollTO event
function sectionTo(section) {
    window.scrollTo({
        top: 100,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Set sections as active
window.addEventListener("scroll", function () {
    let currentSection;

    for (const section of sections) {
        currentSection = section.getBoundingClientRect();
    
        // Check if the first half entered and if the other half don't
        if (currentSection.top <= currentSection.height/2 && currentSection.top * -1 < currentSection.height/2) {
            setActive(section);
            break;
        }
    }
});


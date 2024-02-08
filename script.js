document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.navbar-nav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navbarToggler.addEventListener('click', function() {
    const isNavVisible = window.getComputedStyle(nav).display !== 'none';
    console.log(isNavVisible);    
    if (isNavVisible) {
        // Start the slideUp animation
        nav.style.animation = 'slideUp 0.5s forwards';
        
        // Wait for animation to complete before hiding the nav
        setTimeout(() => {
            nav.style.display = 'none';
        }, 500); // Match this duration to your animation-duration
    } else {
        // Before making nav visible, ensure display is set correctly without causing reflow
        requestAnimationFrame(() => {
            nav.style.display = 'flex';
            // Resetting animation to ensure it can restart
            requestAnimationFrame(() => {
                nav.style.animation = 'none';
                // Delay the start of the animation slightly to ensure display change has taken effect
                requestAnimationFrame(() => {
                    nav.style.animation = 'slideDown 0.5s forwards';
                });
            });
        });
    }
});

document.querySelectorAll('.navbar-nav .nav-item a').forEach(link => {
    link.addEventListener('click', function() {
        // Check if the navbar toggler is visible indicating a mobile view
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
            // Start a fade-out animation
            nav.style.opacity = '0';
            nav.style.transition = 'opacity 0.5s ease';

            // Wait for the fade-out animation to complete
            setTimeout(() => {
                nav.style.display = 'none';
                // Reset the opacity for the next time the menu is opened
                nav.style.opacity = '1';
            }, 350); // This duration should match the transition duration
        }
    });
});

    // Fix for resizing window with open menu
    window.addEventListener('resize', function() {
        if(window.innerWidth > 768) {
            nav.style.display = 'flex'; // Ensure nav is visible at larger sizes
            nav.style.opacity = '1'; // Reset opacity in case it was faded out
            nav.style.animation = 'none'; // Clear any animation applied
        } else {
            // Only hide nav if toggler is not displayed (which means it was not explicitly opened)
            if(nav.style.display === 'flex' && navbarToggler.offsetParent === null) {
                nav.style.display = 'none';
            }
        }
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if(window.pageYOffset > 0) {
            navbar.style.backgroundColor = '#112D4E'; // Darker shade when scrolled
        } else {
            navbar.style.backgroundColor = '#112D4E'; // Original color
        }
    });
});

document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project-id');
        // Assuming project-detail.html is the details page
        window.location.href = `project-detail.html?id=${projectId}`;
    });
});
const observerOptions = {
    root: null, // Use the viewport as the bounding box.
    rootMargin: '0px', // Margin around the root.
    threshold: 0.025 // Percentage of target's visibility the observer's callback should execute.
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden, .timeline-badge').forEach(ele => observer.observe(ele));

// Observe elements with the '.project' class
const projectElements = document.querySelectorAll('.project');
projectElements.forEach(ele => observer.observe(ele));

// Observe elements with the '.project' class
const invertedElements = document.querySelectorAll('.animate-box');
invertedElements.forEach(ele => observer.observe(ele));


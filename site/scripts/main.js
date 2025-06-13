function animateElement(element, initial, final, delay = 0, duration = 1000) {
    Object.assign(element.style, initial);
    // Reset transition before applying new one
    element.style.transition = 'none';
    setTimeout(() => {
        element.style.transition = `all ${duration / 1000}s cubic-bezier(.77,0,.18,1)`;
        Object.assign(element.style, final);
    }, delay);
}

function observeAndAnimate(selector, initial, final, delayStep = 0, duration = 1000) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                animateElement(entry.target, initial, final, i * delayStep, duration);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
}

function animateSite() {
    // About page animation
    observeAndAnimate(
        '#aboutContent',
        { opacity: 0, transform: 'translateY(40px)' },
        { opacity: 1, transform: 'translateY(0)' },
        0, 1000
    );

    // Animate product cards on homepage
    observeAndAnimate(
        '.product-card',
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' },
        150, 700
    );

    // Animate hero section
    observeAndAnimate(
        '.hero',
        { opacity: 0, transform: 'translateY(-30px)' },
        { opacity: 1, transform: 'translateY(0)' },
        0, 1000
    );
}
window.addEventListener('DOMContentLoaded', () => {
    // Ensure all images and dynamic content are loaded before animating
    setTimeout(animateSite, 100);
});
window.addEventListener('pageshow', () => {
    setTimeout(animateSite, 100);
});
window.addEventListener('DOMContentLoaded', animateSite);
window.addEventListener('pageshow', animateSite);

// Call animateSite() after changing between Home, About, and Contacts
// For example, after loading new content via AJAX or updating the DOM, call animateSite();

window.addEventListener('DOMContentLoaded', () => {
    // Favorite button toggle
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    // Add to Cart animation
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('added');
            this.textContent = 'Added!';
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = 'Add to Cart';
            }, 1200);
        });
    });
});

// (Keep your animation code below this if you have it)
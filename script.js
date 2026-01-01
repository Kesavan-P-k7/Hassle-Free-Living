// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close Hamburger Menu When a Link is Clicked
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handling
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchQuery = document.getElementById('search-input').value.trim();

        if (searchQuery) {
            alert(`You searched for: ${searchQuery}`);
            // Perform search functionality here (e.g., filter properties)
            performSearch(searchQuery);
        } else {
            alert('Please enter a search query.');
        }
    });
}

// Client-Side Search Functionality
const properties = [
    { title: 'PG for Boys', location: 'Coimbatore', description: 'Affordable PG for boys in the city center.' },
    { title: 'PG for Girls', location: 'Coimbatore', description: 'Safe and secure PG for girls.' },
    { title: 'Co-Living Space', location: 'Coimbatore', description: 'Modern co-living spaces for professionals.' }
];

function performSearch(query) {
    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.description.toLowerCase().includes(query.toLowerCase())
    );

    displaySearchResults(filteredProperties);
}

function displaySearchResults(results) {
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'search-results';
    resultsContainer.innerHTML = '<h2>Search Results</h2>';

    if (results.length === 0) {
        resultsContainer.innerHTML += '<p>No results found.</p>';
    } else {
        results.forEach(property => {
            resultsContainer.innerHTML += `
                <div class="property-card">
                    <h3>${property.title}</h3>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p>${property.description}</p>
                </div>
            `;
        });
    }

    // Clear previous results and display new ones
    const existingResults = document.getElementById('search-results');
    if (existingResults) existingResults.remove();
    document.body.appendChild(resultsContainer);
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Simulate form submission (replace with actual AJAX/fetch call)
        console.log('Form Submitted:', { name, email, message });
        alert('Thank you for contacting us! We will get back to you soon.');
        this.reset();
    });
}

// Dynamic Year in Footer
const footer = document.querySelector('footer p');
if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = `&copy; ${year} ZoloStays. All rights reserved.`;
}

// Lazy Loading for Images
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = (img) => {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {
        img.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
        lazyLoad(img);
    });
}

// Scroll to Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Add CSS for Scroll to Top Button
const scrollToTopStyle = document.createElement('style');
scrollToTopStyle.innerHTML = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #ff6600;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        display: none;
        transition: background-color 0.3s ease;
    }

    .scroll-to-top:hover {
        background-color: #e65c00;
    }
`;
document.head.appendChild(scrollToTopStyle);

// Property Card Hover Effect
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});
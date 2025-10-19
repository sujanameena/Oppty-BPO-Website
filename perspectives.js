//header files


document.addEventListener('DOMContentLoaded', () => {
    // This banner is fully functional with HTML and CSS.
    // This script confirms that the page has loaded correctly.
    console.log("Podcast banner section loaded successfully.");
});
//images section


// No JavaScript is needed for the requested hover effects.
// All animations and interactions are handled purely by CSS for better performance.
// This file is included to fulfill the request for HTML, CSS, and JS.
console.log("Page loaded and styles are handled by CSS.");

//footer section
document.addEventListener('DOMContentLoaded', () => {
    // This footer is static and does not require any JavaScript for functionality.
    // This script confirms that the page has loaded correctly.
    console.log("Footer loaded successfully.");
});
// hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('customHamburger');
    const sidebar = document.getElementById('sidebar');
    document.addEventListener('click', function (e) {
        if (hamburger.contains(e.target)) {
            sidebar.classList.toggle('active');
        } else if (!sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
});

// + and - section
document.addEventListener('DOMContentLoaded', () => {
    // Select all accordion headers to make them clickable
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const toggle = header.querySelector('.accordion-toggle');

            // Check if the clicked item is already active (open)
            const isActive = item.classList.contains('active');

            if (isActive) {
                // If it's active, close it
                content.style.maxHeight = null; // This collapses the content smoothly via CSS transition
                item.classList.remove('active'); // Removing this class removes the gradient
                toggle.textContent = '+';
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                // If it's not active, open it
                // scrollHeight gives the actual height of the content, ensuring a perfect animation
                content.style.maxHeight = content.scrollHeight + 'px';
                item.classList.add('active'); // Adding this class applies the gradient
                toggle.textContent = '−'; // Use a proper minus sign for better visuals
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
//case study section
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('large', 'medium', 'hidden-left', 'hidden-right');

            if (index === currentIndex) {
                slide.classList.add('large');
            } else if (index === (currentIndex + 1) % totalSlides) {
                slide.classList.add('medium');
            } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('hidden-left');
            } else {
                slide.classList.add('hidden-right');
            }
        });

        // Update progress bar
        const progress = ((currentIndex + 1) / totalSlides) * 100;
        progressBarFill.style.width = `${progress}%`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event Listeners
    nextBtn.addEventListener('click', showNextSlide);
    prevBtn.addEventListener('click', showPrevSlide);

    // Initialize slider
    updateSlider();
});
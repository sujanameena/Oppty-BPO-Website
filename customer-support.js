//header content
document.addEventListener('DOMContentLoaded', () => {
    // This hero banner is fully functional with HTML and CSS.
    // This script confirms that the page has loaded correctly.
    console.log("Hero banner loaded successfully.");
});
// video and paragraph

document.addEventListener('DOMContentLoaded', () => {
  console.log('Insight section loaded successfully.');
});
//what we do section starts here
 document.querySelectorAll('.hover-image-read-more').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add your logic here, e.g., open modal or navigate
            });
        });
//what we do section ends here
//sliding section for images
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('cx-slider');
    const prevBtn = document.getElementById('cx-prev');
    const nextBtn = document.getElementById('cx-next');
    const progressBar = document.getElementById('cx-progress');

    if (!slider || !prevBtn || !nextBtn || !progressBar) {
        console.error("CX slider component not found. Check your HTML IDs.");
        return;
    }

    const updateProgress = () => {
        const scrollableWidth = slider.scrollWidth - slider.clientWidth;
        if (scrollableWidth <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const progress = (slider.scrollLeft / scrollableWidth) * 100;
        progressBar.style.width = `${progress}%`;
    };

    const scrollSlider = (direction) => {
        const card = slider.querySelector('.cx-card');
        if (!card) return;
        
        // Calculate the width of one card plus its gap
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const cardGap = parseFloat(window.getComputedStyle(slider).gap);
        const scrollAmount = cardWidth + cardGap;

        slider.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    prevBtn.addEventListener('click', () => scrollSlider('prev'));
    nextBtn.addEventListener('click', () => scrollSlider('next'));
    slider.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    
    // Set initial state
    updateProgress();
}); 

//video slider section

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('story-slider-track');
    const nextButton = document.getElementById('story-next');
    const prevButton = document.getElementById('story-prev');
    const progressBar = document.getElementById('story-progress');

    if (!track) return;

    const slides = Array.from(track.children);
    const totalSlides = slides.length;
    let currentIndex = 0;

    // --- Video Pause Function ---
    const pauseAllVideos = () => {
        track.querySelectorAll('.client-video').forEach(video => {
            video.pause();
            video.closest('.video-container').classList.remove('is-playing');
        });
    };

    // --- Slide Movement Function ---
    const moveToSlide = (targetIndex) => {
        // Pause any currently playing video before moving
        pauseAllVideos();

        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        currentIndex = targetIndex;

        const progressPercentage = totalSlides > 1 ? (currentIndex / (totalSlides - 1)) * 100 : 0;
        progressBar.style.width = `${progressPercentage}%`;
    };

    // --- Attach Event Listeners ---

    // Next button
    nextButton.addEventListener('click', () => {
        moveToSlide((currentIndex + 1) % totalSlides);
    });

    // Previous button
    prevButton.addEventListener('click', () => {
        moveToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    });

    // Add click listeners to each video container for play/pause
    document.querySelectorAll('.video-container').forEach(container => {
        const video = container.querySelector('.client-video');
        if (video) {
            container.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    container.classList.add('is-playing');
                } else {
                    video.pause();
                    container.classList.remove('is-playing');
                }
            });
        }
    });
    
    // Initialize the slider
    moveToSlide(0);

    console.log("Real Stories carousel with video support initialized.");
});
//leader ship section

document.addEventListener('DOMContentLoaded', () => {
    console.log("Thought Leadership section loaded.");
});


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
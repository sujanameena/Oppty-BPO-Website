document.addEventListener('DOMContentLoaded', (event) => {
    console.log("Hero section loaded successfully.");
});

document.addEventListener('DOMContentLoaded', () => {
    // Select all the necessary elements from the DOM
    const slider = document.getElementById('awards-slider');
    const prevBtn = document.getElementById('awards-prev');
    const nextBtn = document.getElementById('awards-next');
    const progressBar = document.getElementById('awards-progress');

    // If any element is missing, exit to avoid errors
    if (!slider || !prevBtn || !nextBtn || !progressBar) {
        console.error("Slider component not found. Please check your HTML IDs.");
        return;
    }

    /**
     * Updates the width of the progress bar based on the slider's scroll position.
     */
    const updateProgress = () => {
        // Calculate the maximum scrollable distance
        const scrollableWidth = slider.scrollWidth - slider.clientWidth;
        
        // If there's nothing to scroll, the progress is 0%
        if (scrollableWidth <= 0) {
            progressBar.style.width = '0%';
            return;
        }

        // Calculate the scroll progress as a percentage
        const progress = (slider.scrollLeft / scrollableWidth) * 100;
        
        // Apply the width to the progress bar element
        progressBar.style.width = `${progress}%`;
    };

    /**
     * Scrolls the slider left or right.
     * @param {string} direction - 'next' or 'prev'
     */
    const scrollSlider = (direction) => {
        // Calculate the amount to scroll (e.g., 80% of the visible width)
        const scrollAmount = slider.clientWidth * 0.8;

        // Use scrollBy for a smooth, relative scroll
        slider.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    // --- Attach Event Listeners ---

    // Add click listeners to the navigation buttons
    prevBtn.addEventListener('click', () => scrollSlider('prev'));
    nextBtn.addEventListener('click', () => scrollSlider('next'));

    // Update the progress bar whenever the user scrolls the slider
    slider.addEventListener('scroll', updateProgress, { passive: true });

    // Also update the progress bar if the window is resized
    window.addEventListener('resize', updateProgress);
    
    // Call updateProgress once on load to set the initial state
    updateProgress();
});

//in the news section//
document.addEventListener('DOMContentLoaded', () => {
    // Select all the necessary elements from the DOM
    const slider = document.getElementById('news-slider');
    const prevBtn = document.getElementById('news-prev');
    const nextBtn = document.getElementById('news-next');
    const progressBar = document.getElementById('news-progress');

    // If any element is missing, exit to avoid errors
    if (!slider || !prevBtn || !nextBtn || !progressBar) {
        console.error("News slider component not found. Please check your HTML IDs.");
        return;
    }

    /**
     * Updates the width of the progress bar based on the slider's scroll position.
     */
    const updateProgress = () => {
        const scrollableWidth = slider.scrollWidth - slider.clientWidth;
        
        if (scrollableWidth <= 0) {
            progressBar.style.width = '0%';
            return;
        }

        const progress = (slider.scrollLeft / scrollableWidth) * 100;
        progressBar.style.width = `${progress}%`;
    };

    /**
     * Scrolls the slider left or right.
     * @param {string} direction - 'next' or 'prev'
     */
    const scrollSlider = (direction) => {
        // Scroll by a percentage of the visible width for a fluid feel
        const scrollAmount = slider.clientWidth * 0.8;

        slider.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    // --- Attach Event Listeners ---
    prevBtn.addEventListener('click', () => scrollSlider('prev'));
    nextBtn.addEventListener('click', () => scrollSlider('next'));
    slider.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    
    // Set initial progress bar state on load
    updateProgress();
});

//---clients section//

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('client-slider-track');
  const slides = Array.from(track.children);
  const nextButton = document.getElementById('client-next');
  const prevButton = document.getElementById('client-prev');
  const progressBar = document.getElementById('client-progress');

  if (!track || slides.length === 0) return;

  const totalSlides = slides.length;
  let currentIndex = 0;

  // Pause all videos
  const pauseAllVideos = () => {
    track.querySelectorAll('.client-video').forEach(video => {
      video.pause();
      video.closest('.video-container').classList.remove('is-playing');
    });
  };

  // Move slides
  const moveToSlide = (index) => {
    pauseAllVideos();
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    const progress = totalSlides > 1 ? (currentIndex / (totalSlides - 1)) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  // Next
  nextButton.addEventListener('click', () => {
    moveToSlide((currentIndex + 1) % totalSlides);
  });

  // Prev
  prevButton.addEventListener('click', () => {
    moveToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  });

  // Play/pause videos
  document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('.client-video');
    container.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        container.classList.add('is-playing');
      } else {
        video.pause();
        container.classList.remove('is-playing');
      }
    });
  });

  moveToSlide(0);
});
//Image hover section//
            // Optional: Add click event for "Read More" if needed
        document.querySelectorAll('.hover-image-read-more').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add your logic here, e.g., open modal or navigate
            });
        });

//companies scrooling //
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("companiesTrack");
  if (!track) return;

  const slider = track.parentElement;
  let speed = 1; // pixels per frame
  let pos = 0;
  let trackWidth = track.scrollWidth / 2; // since the icons loop infinitely

  function animate() {
    pos += speed;
    if (pos >= trackWidth) pos = 0;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(animate);
  }

  // Pause on hover
  slider.addEventListener("mouseenter", () => (speed = 0));
  slider.addEventListener("mouseleave", () => (speed = 1));

  animate();
});
// children sliding section//
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('image-slider-track');
    const dotsContainer = document.getElementById('slider-dots');

    if (!track || !dotsContainer) return;

    const slides = Array.from(track.children);
    const slideCount = slides.length;
    let currentIndex = 0;

    // --- Create Dots ---
    // Clear any existing dots first
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dotsContainer.appendChild(dot);
    }
    const dots = Array.from(dotsContainer.children);

    /**
     * Moves the image track to the specified slide index and updates the active dot.
     * @param {number} targetIndex - The index of the slide to move to.
     */
    const moveToSlide = (targetIndex) => {
        track.style.transform = `translateX(-${targetIndex * 100}%)`;

        // Update active dot
        if (dots[currentIndex]) {
            dots[currentIndex].classList.remove('active');
        }
        if (dots[targetIndex]) {
            dots[targetIndex].classList.add('active');
        }
        
        currentIndex = targetIndex;
    };

    // --- Attach Event Listeners ---
    dotsContainer.addEventListener('click', e => {
        const targetDot = e.target.closest('button.dot');
        if (!targetDot) return;

        const targetIndex = dots.findIndex(dot => dot === targetDot);
        if (targetIndex !== -1) {
            moveToSlide(targetIndex);
        }
    });

    // Initialize the first slide and dot
    if (slideCount > 0) {
        moveToSlide(0);
    }

    console.log("Fixed-content image slider initialized.");
});

// global-partner.js
document.querySelectorAll('.partner-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
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

//quality control statrs here
document.addEventListener('DOMContentLoaded', function() {
            
            // Add a class to the body to enable JS-dependent animations
            document.body.classList.add('js-enabled');
            
            const section = document.querySelector('.qa-framework-section');
            if (!section) return;

            // --- 1. Scroll-triggered Animations ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            section.querySelectorAll('.section-header, .qa-content, .qa-slider-wrapper').forEach(el => observer.observe(el));
            
            // --- 2. Custom Image Slider Logic ---
            const imageContainer = section.querySelector('.image-container');
            const sliderNav = section.querySelector('.slider-nav');
            let currentIndex = 0;
            let autoPlayInterval;

            const slides = [
                { img: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
                { img: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
                { img: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
                { img: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
            ];

            // Pre-create image elements
            slides.forEach((slide, index) => {
                const img = document.createElement('img');
                img.src = slide.img;
                img.alt = "Oppty BPO Quality Assurance Process";
                if (index === 0) img.classList.add('active');
                imageContainer.appendChild(img);
            });
            const imageElements = imageContainer.querySelectorAll('img');

            function updateSlider(index) {
                imageElements.forEach((img, imgIndex) => {
                    img.classList.toggle('active', imgIndex === index);
                });

                Array.from(sliderNav.children).forEach((dot, dotIndex) => {
                    dot.classList.remove('active');
                    const existingProgressBar = dot.querySelector('.progress-bar');
                    if (existingProgressBar) dot.removeChild(existingProgressBar);
                    
                    if (dotIndex === index) {
                        dot.classList.add('active');
                        const newProgressBar = document.createElement('span');
                        newProgressBar.className = 'progress-bar';
                        dot.appendChild(newProgressBar);
                    }
                });
            }

            function startAutoPlay() {
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateSlider(currentIndex);
                }, 4000);
            }

            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'nav-dot';
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider(currentIndex);
                    startAutoPlay();
                });
                sliderNav.appendChild(dot);
            });

            updateSlider(currentIndex);
            startAutoPlay();
        });
//quality control ends here

//Continuous Improvement starts here
document.addEventListener('DOMContentLoaded', function() {
    
    const section = document.querySelector('.evolution-section');
    if (!section) return;

    // --- 1. Scroll-triggered Animations ---
    const animatedElements = section.querySelectorAll('.section-header, .hero-stat-wrapper, .highlight-module');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // If the dial's wrapper is visible, trigger its animations
                if (entry.target.classList.contains('hero-stat-wrapper')) {
                    animateDial();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach((el, index) => {
        // Apply staggered delay to highlight modules
        if (el.classList.contains('highlight-module')) {
            el.style.transitionDelay = `${index * 150}ms`;
        }
        observer.observe(el);
    });

    // --- 2. Efficiency Dial Animation Logic ---
    function animateDial() {
        const progressCircle = section.querySelector('.dial-progress');
        const valueElement = section.querySelector('#efficiency-value');
        const targetPercentage = 95;
        
        if (!progressCircle || !valueElement) return;

        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (targetPercentage / 100) * circumference;

        // Animate the circle fill
        progressCircle.style.strokeDashoffset = offset;

        // Animate the number counter
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / targetPercentage));
        
        let timer = setInterval(() => {
            start += 1;
            valueElement.textContent = start;
            if (start >= targetPercentage) {
                clearInterval(timer);
                valueElement.textContent = targetPercentage;
            }
        }, stepTime);
    }
});
//Continuous Improvement ends here

//efficiency-section starts here
document.addEventListener('DOMContentLoaded', function() {
    
    const section = document.querySelector('.efficiency-section');
    if (!section) return;

    // --- 1. Scroll-triggered Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // If it's the dashboard, trigger counters
                if (entry.target.classList.contains('efficiency-dashboard')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    section.querySelectorAll('.section-header, .efficiency-dashboard').forEach(el => observer.observe(el));
    
    // --- 2. Live Counter Animation Logic ---
    function animateCounters() {
        const counters = section.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = current.toFixed(1);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target.toFixed(1);
                }
            };
            updateCount();
        });
    }

    // --- 3. Interactive Image Display Logic ---
    const imageContainer = section.querySelector('.central-image-display');
    const statBlocks = section.querySelectorAll('.stat-block');
    
    const imageData = {
        automation: {
            img: 'https://images.pexels.com/photos/8728383/pexels-photo-8728383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        monitoring: {
            img: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        sla: {
            img: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        uptime: {
            img: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
    };
    
    // Preload images and create the image elements
    Object.keys(imageData).forEach((key, index) => {
        const img = document.createElement('img');
        img.src = imageData[key].img;
        img.dataset.key = key;
        if (index === 0) img.classList.add('active'); // Set the first one as active initially
        imageContainer.appendChild(img);
    });

    statBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            const targetKey = block.dataset.target;
            imageContainer.querySelectorAll('img').forEach(img => {
                img.classList.toggle('active', img.dataset.key === targetKey);
            });
        });
    });
});
//efficiency-section ends here

//Dedicated Account Management starts here
document.addEventListener('DOMContentLoaded', function() {
    
    // Add a class to the body to enable JS-dependent animations.
    // This ensures content is ALWAYS visible, even if JS fails.
    document.body.classList.add('js-enabled');
    
    const section = document.querySelector('.partnership-journey-section');
    if (!section) return;

    // --- 1. Scroll-triggered Animations ---
    const animatedElements = section.querySelectorAll('.section-header, .milestone-text, .milestone-icon');
    const journeyLayout = section.querySelector('.journey-layout');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // If the main journey layout is visible, start drawing the path
                if (entry.target === journeyLayout) {
                    journeyLayout.classList.add('is-drawing');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    // Observe all designated animated elements
    animatedElements.forEach((el, index) => {
        // Apply a staggered delay for a smoother effect
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
    });
    
    // Observe the main layout separately to trigger path animation
    if(journeyLayout) {
        observer.observe(journeyLayout);
    }
});
//Dedicated Account Management ends here

//partnership section starts here
 document.addEventListener('DOMContentLoaded', function() {
            
            const section = document.querySelector('.partner-section');
            if (!section) return;

            // --- 1. Wrap each letter of the heading for animation ---
            const headline = section.querySelector('.headline');
            if (headline) {
                const text = headline.textContent;
                const words = text.split(' ');
                const wrappedText = words.map(word => {
                    const letters = word.split('').map(letter => `<span class="letter-wrapper"><span class="letter">${letter}</span></span>`).join('');
                    return `<span class="word">${letters}</span>`;
                }).join(' ');
                headline.innerHTML = wrappedText;
            }

            // --- 2. Scroll-triggered Animations ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.classList.add('is-visible');
                        
                        const letters = section.querySelectorAll('.headline .letter');
                        letters.forEach((letter, index) => {
                            letter.style.animationDelay = `${index * 20}ms`; // Fast 20ms delay
                        });
                        
                        observer.unobserve(section);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(section);
            
            // --- 3. Canvas Particle Background ---
            const canvas = document.getElementById('particle-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            function resizeCanvas() { canvas.width = section.offsetWidth; canvas.height = section.offsetHeight; initParticles(); }
            window.addEventListener('resize', resizeCanvas);

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.vx = Math.random() * 0.4 - 0.2;
                    this.vy = Math.random() * 0.4 - 0.2;
                    this.radius = Math.random() * 1.5 + 0.5;
                    this.color = Math.random() > 0.1 ? 'rgba(255, 123, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
            function initParticles() {
                const particleCount = (canvas.width * canvas.height) / 10000;
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => { p.update(); p.draw(); });
                requestAnimationFrame(animateParticles);
            }
            resizeCanvas();
            animateParticles();
        });
//partnership section ends here
(function () {
    const container = document.getElementById('awardsSlider');
    const track = document.getElementById('awardsTrack');
    const slides = Array.from(track.children);
    const prev = document.getElementById('awardsPrev');
    const next = document.getElementById('awardsNext');
    const progressInner = document.getElementById('awardsProgress');

    let currentIndex = 0;
    let visibleCount = 4; // will be recalculated
    let slideWidth = 0;
    const gap = parseInt(getComputedStyle(track).gap || 16, 10);

    function calcSizes() {
        // Calculate slide width including gap
        const first = slides[0];
        if (!first) return;
        // Use bounding width (includes padding/border)
        const rect = first.getBoundingClientRect();
        slideWidth = rect.width + gap;
        // visible count based on container width
        visibleCount = Math.max(1, Math.floor(container.clientWidth / slideWidth));
        // If visibleCount greater than total slides, clamp
        visibleCount = Math.min(visibleCount, slides.length);
        // adjust index bounds
        const maxIndex = Math.max(0, slides.length - visibleCount);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
    }

    function updateTrack(animate = true) {
        if (!animate) track.style.transition = 'none';
        else track.style.transition = '';
        const x = currentIndex * slideWidth;
        track.style.transform = `translateX(-${x}px)`;
        updateProgress();
        if (!animate) {
            // force reflow then restore
            void track.offsetWidth;
            track.style.transition = '';
        }
    }

    function updateProgress() {
        const maxIndex = Math.max(0, slides.length - visibleCount);
        const percent = maxIndex === 0 ? 100 : (currentIndex / maxIndex) * 100;
        progressInner.style.width = percent + '%';
    }

    prev.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateTrack();
    });

    next.addEventListener('click', () => {
        const maxIndex = Math.max(0, slides.length - visibleCount);
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateTrack();
    });

    // Allow clicking arrow overlay to act like read more - simple focus demo
    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.award-arrow');
        if (!btn) return;
        const slide = e.target.closest('.award-slide');
        const idx = slides.indexOf(slide);
        // Move clicked slide into view (if needed)
        if (idx !== -1) {
            if (idx < currentIndex) currentIndex = idx;
            else if (idx >= currentIndex + visibleCount) currentIndex = Math.min(idx, slides.length - visibleCount);
            updateTrack();
        }
        // Here you can open a details panel or navigate; demo shows a console log
        console.log('Read more clicked for slide', idx + 1);
    });

    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            calcSizes();
            updateTrack(false);
        }, 120);
    });

    // Init once DOM and images are ready
    function init() {
        calcSizes();
        // ensure track fits initial slides
        updateTrack(false);

        // allow dragging with mouse/touch for quick navigation (optional)
        let isDown = false, startX = 0, startTranslate = 0;
        track.addEventListener('pointerdown', (ev) => {
            isDown = true;
            track.setPointerCapture(ev.pointerId);
            startX = ev.clientX;
            const style = track.style.transform;
            const m = /translateX\(-?([\d.]+)px\)/.exec(style);
            startTranslate = m ? parseFloat(m[1]) : 0;
            track.style.transition = 'none';
        });
        track.addEventListener('pointermove', (ev) => {
            if (!isDown) return;
            const dx = ev.clientX - startX;
            let newTranslate = Math.max(0, startTranslate - dx);
            track.style.transform = `translateX(-${newTranslate}px)`;
        });
        track.addEventListener('pointerup', (ev) => {
            isDown = false;
            track.releasePointerCapture(ev.pointerId);
            track.style.transition = '';
            // snap to nearest slide
            const style = track.style.transform;
            const m = /translateX\(-?([\d.]+)px\)/.exec(style);
            const translate = m ? parseFloat(m[1]) : 0;
            const idx = Math.round(translate / slideWidth);
            const maxIndex = Math.max(0, slides.length - visibleCount);
            currentIndex = Math.min(maxIndex, Math.max(0, idx));
            updateTrack();
        });
        track.addEventListener('pointercancel', () => { isDown = false; });

        // Make sure images loaded before initial sizing (some browsers may not have sizes yet)
        const imgs = track.querySelectorAll('img');
        let loaded = 0;
        if (imgs.length === 0) {
            initFinished();
        } else {
            imgs.forEach(img => {
                if (img.complete) loaded++;
                else img.addEventListener('load', () => { loaded++; if (loaded === imgs.length) initFinished(); });
            });
            if (loaded === imgs.length) initFinished();
        }
    }

    function initFinished() {
        calcSizes();
        updateTrack(false);
    }

    // Kick off
    init();

})();
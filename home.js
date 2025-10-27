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
// first page video script
document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('bgVideo');
    video.play().catch(function () {
    });
});
// js for video speaker button
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('bgVideo');
    const speakerBtn = document.getElementById('speakerToggle');
    const speakerIcon = document.getElementById('speakerIcon');

    if (video && speakerBtn && speakerIcon) {
        speakerBtn.addEventListener('click', function () {
            video.muted = !video.muted;
            speakerIcon.className = video.muted ? 'fa fa-volume-off' : 'fa fa-volume-up';
        });

        video.addEventListener('loadedmetadata', function () {
            speakerIcon.className = video.muted ? 'fa fa-volume-off' : 'fa fa-volume-up';
        });
    }
});
// scroll down button

document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('scrollDownBtn');
    btn.addEventListener('click', function () {
        window.scrollBy({
            top: window.innerHeight,
            left: 0,
            behavior: 'smooth'
        });
    });
});
// images hover hiding arrow third page
document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.custom-image-hover-arrow');
    items.forEach(function (item) {
        var arrow = item.querySelector('.hover-arrow');
        item.addEventListener('mouseenter', function () {
            arrow.style.display = 'inline-block';
        });
        item.addEventListener('mouseleave', function () {
            arrow.style.display = 'none';
        });
    });
});
// fourth page images script
document.querySelectorAll('.hover-image-read-more').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});
// second side bar js
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('capabilitiesToggle');
    const sidebar = document.getElementById('capabilitiesSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const arrow = toggleBtn.querySelector('.capabilities-arrow');

    let isOpen = false;

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        arrow.classList.add('rotated');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        isOpen = true;
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        arrow.classList.remove('rotated');
        document.body.style.overflow = ''; // Restore scroll
        isOpen = false;
    }

    // Toggle sidebar on button click
    toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Close sidebar when clicking close button
    closeBtn.addEventListener('click', closeSidebar);

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            closeSidebar();
        }
    });

    // Close sidebar when clicking outside (additional safety)
    document.addEventListener('click', function (e) {
        if (isOpen && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeSidebar();
        }
    });
});
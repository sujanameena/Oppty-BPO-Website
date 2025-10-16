document.addEventListener('DOMContentLoaded', function () {
    var expandable = document.querySelector('.expandable');
    var expandBtn = expandable.querySelector('.expand-btn');
    var expandContent = expandable.querySelector('.expand-content');
    var expandIcon = expandable.querySelector('.expand-icon');

    expandBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (expandContent.style.display === 'none' || expandContent.style.display === '') {
            expandContent.style.display = 'block';
            expandIcon.innerHTML = '&#9660;';
        } else {
            expandContent.style.display = 'none';
            expandIcon.innerHTML = '&#9654;';
        }
    });
});
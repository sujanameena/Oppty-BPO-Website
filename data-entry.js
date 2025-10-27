// learn more about back office button
document.getElementById('backOfficeBtn').addEventListener('click', function () {
    window.location.href = 'back-office-operations.html';
});

//  why outsource data entry 
function toggleAccordion(index) {
    const content = document.getElementById(`content-${index}`);
    const arrow = document.getElementById(`arrow-${index}`);

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        arrow.classList.remove('rotated');
    } else {
        // Close all other accordions
        for (let i = 1; i <= 4; i++) {
            if (i !== index) {
                document.getElementById(`content-${i}`).classList.remove('active');
                document.getElementById(`arrow-${i}`).classList.remove('rotated');
            }
        }

        content.classList.add('active');
        arrow.classList.add('rotated');
    }
}
// Expandable FAQ Section
function toggleFAQ(index) {
    const content = document.getElementById(`faq-content-${index}`);
    const toggle = document.getElementById(`faq-toggle-${index}`);

    if (content.classList.contains('active')) {
        content.classList.remove('active');
        toggle.textContent = '+';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        toggle.textContent = '-';
        toggle.style.transform = 'rotate(180deg)';
    }
}
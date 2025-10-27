// animation js
document.addEventListener('DOMContentLoaded', function () {
    // Create additional bubbles dynamically
    const bubbleContainer = document.querySelector('.bubble-container');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#00cec9', '#55a3ff'];

    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * 30 + 15;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 5 + 6;

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.background = color;
        bubble.style.animationDuration = duration + 's';

        bubbleContainer.appendChild(bubble);

        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, duration * 1000);
    }, 1000);
});
// reach out to us anytime

        function redirectToContact() {
            window.location.href = 'contactUs.html';
        }
        
        // signup section
const signupForm = document.getElementById('signupForm');
if (!signupForm) {
    console.error('Signup form not found');
    return;
}

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');

    // Check if required elements exist
    if (!emailInput || !emailError || !successMessage) {
        console.error('Required form elements not found');
        return;
    }

    // Clear previous errors
    emailError.style.display = 'none';
    
    // Validate email
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        return;
    }

    // Hide form and show success message
    signupForm.style.display = 'none';
    successMessage.style.display = 'block';

    // Reset form after 3 seconds
    setTimeout(function () {
        signupForm.style.display = 'block';
        successMessage.style.display = 'none';
        signupForm.reset();
    }, 3000);
});
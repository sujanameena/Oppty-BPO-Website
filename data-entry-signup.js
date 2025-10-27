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
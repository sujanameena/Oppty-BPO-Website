document.addEventListener('DOMContentLoaded', () => {
    // Select all card containers
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const glare = card.querySelector('.card-glare');
        const maxRotation = 15; // Max degrees of rotation

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Get mouse position relative to the card center
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation values
            const rotateY = ((mouseX - centerX) / centerX) * maxRotation;
            const rotateX = -((mouseY - centerY) / centerY) * maxRotation;

            // Apply the 3D transform
            card.style.transition = 'transform 0.1s linear';
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Move the glare effect with the mouse
            glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.2), transparent 70%)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset the card to its original state with a smooth transition
            card.style.transition = 'transform 0.5s ease-out';
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });
});
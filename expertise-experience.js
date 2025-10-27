// Healthcare and Life Sciences Analytics Services
        document.addEventListener('DOMContentLoaded', function () {
            const serviceButtons = document.querySelectorAll('.service-btn');
            const serviceItems = document.querySelectorAll('.service-item');

            serviceButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const serviceId = this.getAttribute('data-service');

                    // Remove active class from all buttons and items
                    serviceButtons.forEach(btn => btn.classList.remove('active'));
                    serviceItems.forEach(item => item.classList.remove('active'));

                    // Add active class to clicked button
                    this.classList.add('active');

                    // Show corresponding service item
                    document.getElementById(`service-${serviceId}`).classList.add('active');
                });
            });
        });
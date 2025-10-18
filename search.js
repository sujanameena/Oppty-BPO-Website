document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                // Add your search functionality here
            }
        }
    });

    searchInput.addEventListener('input', function () {
        // Add real-time search suggestions here if needed
    });
});
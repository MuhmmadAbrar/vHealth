document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('grievanceForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get selected category and description
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        // Display confirmation message
        confirmationMessage.innerHTML = `Thank you for submitting your grievance.<br>Category: ${category}<br>Description: ${description}`;
        confirmationMessage.style.display = 'block';
        
        // Reset form fields
        form.reset();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the "Create Token" button
    const createTokenBtn = document.getElementById('createTokenBtn');

    // Get the "Cancel" button inside the create token form
    const cancelCreateTokenBtn = document.getElementById('cancelCreateTokenBtn');

    // Get the create token grid item
    const createTokenGridItem = document.getElementById('createTokenGridItem');

    // Add event listener to "Create Token" button
    createTokenBtn.addEventListener('click', function() {
        // Show the create token grid item
        createTokenGridItem.style.display = 'block';
    });

    // Add event listener to "Cancel" button
    cancelCreateTokenBtn.addEventListener('click', function() {
        // Hide the create token grid item
        createTokenGridItem.style.display = 'none';
    });
});

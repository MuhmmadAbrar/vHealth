document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from the server using an API or AJAX request
    // For demonstration purposes, I'll create a sample data array
    const medicalHistoryData = [
        { sno: 1, tokenNo: "12345", status: "Completed", reasonOfVisit: "Checkup", remarks: "N/A", prescription: "Paracetamol" },
        { sno: 2, tokenNo: "54321", status: "Pending", reasonOfVisit: "Fever", remarks: "Take rest", prescription: "Antibiotics" },
        { sno: 3, tokenNo: "12345", status: "Completed", reasonOfVisit: "Checkup", remarks: "N/A", prescription: "Paracetamol" },
        { sno: 4, tokenNo: "54321", status: "Pending", reasonOfVisit: "Fever", remarks: "Take rest", prescription: "Antibiotics" },
        { sno: 5, tokenNo: "12345", status: "Completed", reasonOfVisit: "Checkup", remarks: "N/A", prescription: "Paracetamol" },
        { sno: 6, tokenNo: "54321", status: "Pending", reasonOfVisit: "Fever", remarks: "Take rest", prescription: "Antibiotics" }
        // Add more data as needed
    ];

    // Function to populate the table with data
    function populateTable(data) {
        const tableBody = document.querySelector("#medicalHistoryTable tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach((row) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${row.sno}</td>
                <td>${row.tokenNo}</td>
                <td>${row.status}</td>
                <td>${row.reasonOfVisit}</td>
                <td>${row.remarks}</td>
                <td>${row.prescription}</td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    // Call the populateTable function with the fetched data
    populateTable(medicalHistoryData);
});

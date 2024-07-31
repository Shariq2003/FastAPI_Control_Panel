document.addEventListener("DOMContentLoaded", () => {
    // Registration Form Submission
    document.getElementById("register-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const is_admin = Boolean(document.getElementById("register-role").value);

        const response = await fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                is_admin,
            }),
        });

        const result = await response.json();
        document.getElementById("output").textContent = "User Register Successfully";
    });

    // Login Form Submission
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const response = await fetch("http://127.0.0.1:8000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: email,
                password,
            }),
        });

        const result = await response.json();
        if (result.access_token) {
            localStorage.setItem("token", result.access_token);
            document.getElementById("output").textContent = "Login successful!";
        } else {
            document.getElementById("output").textContent = "Login failed!";
        }
    });

    // Get All Users (Admin)
    document.getElementById("get-users").addEventListener("click", async () => {
        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:8000/admin/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();

        // Create a table element
        const table = document.createElement("table");
        table.border = 1;

        // Create the header row
        const headerRow = document.createElement("tr");
        const headers = ["ID", "Name", "Email", "Is Admin"];
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Populate the table with the users data
        result.forEach(user => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = user.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = user.name;
            row.appendChild(nameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            const isAdminCell = document.createElement("td");
            isAdminCell.textContent = user.is_admin ? "Yes" : "No";
            row.appendChild(isAdminCell);

            table.appendChild(row);
        });

        // Clear previous output and display the table
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ""; // Clear previous content
        outputDiv.appendChild(table);
    });
});

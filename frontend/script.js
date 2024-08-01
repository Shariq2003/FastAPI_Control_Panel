document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners after DOM content is loaded

    // Registration Form Submission
    document.getElementById("register-form").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way
        await Register(event);
    });

    // Login Form Submission
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way
        await Login(event);
    });

    // Attach the event listener to the "Get All Users" button
    document.getElementById("get-users").addEventListener("click", async () => {
        await getAllUsers();
    });
    // Attach the event listener to the "Create New User" button
    document.getElementById("create-user").addEventListener("click", async () => {
        await addNewUser();
    });
});

// Registration Form Submission
async function Register(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const is_admin = Boolean(parseInt(document.getElementById("register-role").value));

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
    document.getElementById("output").textContent = "User Registered Successfully";
}

async function Login(event) {
    event.preventDefault();
    document.getElementById("admin_actions").style.display = "none";

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
    console.log(result);
    if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        document.getElementById("output").textContent = "Login successful!";

    } else {
        document.getElementById("output").textContent = "Login failed!";
    }
    console.log(result.is_admin);
    if (result.is_admin) {
        document.getElementById("admin_actions").style.display = "block"; // Show admin actions
        document.getElementById("output").style.display = "flex";
        document.getElementById("output").style.flexDirection = "column";
    }
}

async function getAllUsers() {
    const outputDiv = document.getElementById("output");
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/admin/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    if (response.status === 200) {
        const result = await response.json();

        // Create a table element
        const table = document.createElement("table");
        table.border = 1;

        // Create the header row
        const headerRow = document.createElement("tr");
        const headers = ["ID", "Name", "Email", "Is Admin", "Action"];
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

            const actionsCell = document.createElement("td");
            // Add a delete button for admin users

            if (user.is_admin === false) {
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", async () => {
                    await deleteUser(user.id);
                    row.remove(); // Remove the row from the table after deletion
                });
                actionsCell.appendChild(deleteButton);
            }
            row.appendChild(actionsCell);

            table.appendChild(row);
        });

        // Clear previous output and display the table
        outputDiv.innerHTML = ""; // Clear previous content
        outputDiv.appendChild(table);
    }
    else {
        outputDiv.innerHTML = "You are Not allowed";
    }
}


async function deleteUser(userId) {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://127.0.0.1:8000/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    const result = await response.json();
    if (result.status === "User deleted successfully") {
        alert("User deleted successfully");
    } else {
        alert("Failed to delete user");
    }
}


async function addNewUser() {
    const addUserDiv = document.getElementById("output");

    // Clear previous content in the div

    // Create a form element
    const form = document.createElement('form');
    form.id = 'add-user-form';

    // Create an input field for email (username)
    const emailLabel = document.createElement('label');
    emailLabel.for = 'new-user-email';
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'new-user-email';
    emailInput.required = true;

    // Create an input field for password
    const passwordLabel = document.createElement('label');
    passwordLabel.for = 'new-user-password';
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'new-user-password';
    passwordInput.required = true;

    // Create an input field for is_admin
    const adminLabel = document.createElement('label');
    adminLabel.for = 'new-user-admin';
    adminLabel.textContent = 'Admin:';
    const adminSelect = document.createElement('select');
    adminSelect.id = 'new-user-admin';
    adminSelect.required = true;

    // Add options to the dropdown
    const optionYes = document.createElement('option');
    optionYes.value = 'true'; // 'true' for is_admin
    optionYes.textContent = 'Yes';
    const optionNo = document.createElement('option');
    optionNo.value = 'false'; // 'false' for is_admin
    optionNo.textContent = 'No';

    adminSelect.appendChild(optionYes);
    adminSelect.appendChild(optionNo);

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add User';

    // Append all elements to the form
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    // form.appendChild(document.createElement('br')); // Add line break for spacing
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    // form.appendChild(document.createElement('br')); // Add line break for spacing
    form.appendChild(adminLabel);
    form.appendChild(adminSelect);
    form.appendChild(submitButton);

    // Append the form to the div
    addUserDiv.appendChild(form);

    // Add an event listener to handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const email = emailInput.value;
        const password = passwordInput.value;
        const is_admin = adminSelect.value === 'true';

        // Call the function to handle adding a new user
        await handleAddNewUser(email, password,is_admin);
    });
}

async function handleAddNewUser(email, password,is_admin) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name:"",
            email,
            password,
            is_admin,
        }),
    });

    const result = await response.json();
    if (response.ok) {
        alert("User added successfully");
        document.getElementById("add-user-form").reset(); // Clear the form
    } else {
        alert("Failed to add user: " + result.detail);
    }
}

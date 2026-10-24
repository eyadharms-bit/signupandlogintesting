document.getElementById("loginform").addEventListener('submit', function(e) {
    e.preventDefault();
    let errors = [];
    
    // 1. Target your login input boxes securely
    // NOTE: Make sure the input where users type their email/username has id="username" or id="loginInput"
    const usernameInput = document.getElementById("username") || document.getElementById("loginInput");
    const passwordInput = document.getElementById("password");
    const errortext = document.getElementById("error-message");

    // 2. Extract values safely
    const identifierText = usernameInput ? usernameInput.value.trim() : "";
    const passwordText = passwordInput ? passwordInput.value : "";

    // 3. Validation checks
    if (!identifierText || !passwordText) {
        errors.push("All fields must be filled");
    }

    if (errors.length > 0) {
        errortext.innerText = errors.join(". ");
        return;
    }

    // 4. Send the payload using the exact identifier property key expected by your backend
    // Change the URLs in BOTH files to your upcoming Render backend URL:
    fetch('https://onrender.com', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifierText,
          password: passwordText
        })
    })
    .then(response => {
        // Handle successful 200 responses cleanly
        if (response.status === 200) {
            return response.json().then(data => {
                localStorage.setItem('loggedInUser', JSON.stringify(data));
                errortext.innerText = "Log in successful!";
                setTimeout(() => { 
                    window.location.href = 'home.html'; 
                }, 1000);
            });
        }
        
        // Handle credential error responses (e.g., 400 Bad Request)
        return response.json().then(data => {
            if (data && data.error) {
                errortext.innerText = data.error; 
            } else {
                errortext.innerText = "Invalid credentials provided.";
            }
        });
    })
    .catch(err => {
        errortext.innerText = "Cannot connect to backend server.";
        console.error("FRONTEND LOGIN EXCEPTION:", err);
    });
});

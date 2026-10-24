document.getElementById("form").addEventListener('submit', function(e){
e.preventDefault()
 const username = document.getElementById("username");
 const password = document.getElementById("password");
 const confirmpassword = document.getElementById("confirmpassword");
 const email = document.getElementById("email");
 const errortext = document.getElementById("error-message");
 let errors = []


 const usernametext = username ? username.value.trim() : "";
 const emailtext = email ? email.value.trim() : "";
 const passwordtext = password ? password.value.trim() : "";
 const confirmpasswordtext = confirmpassword ? confirmpassword.value.trim() : "";

    
 if (!passwordtext || !emailtext || !usernametext || !confirmpasswordtext) {
    e.preventDefault()
    errors.push("All fields must be filled");
    

 }


 if (passwordtext.length < 8 && passwordtext.length > 0 ) {
        e.preventDefault()
        errors.push("Password must be 8 or more characters");
 }

 if (usernametext.length < 6 && usernametext.length > 0) {
    e.preventDefault()
    errors.push("Username must be longer than 6 characters")
 }

if (passwordtext !== confirmpasswordtext) {
    e.preventDefault()
    errors.push("Passwords dont match")
}

if (errors.length > 0) {
        e.preventDefault()
        errortext.innerText = errors.join(". ");
        return;
    }

    // Change the URLs in BOTH files to your upcoming Render backend URL:
    fetch('https://onrender.com', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: usernametext,
      email: emailtext,
      password: passwordtext
    })
  })
  .then(response => {
    // 1. Check HTTP response codes using the correct web api property 'response.status'
    if (response.status === 201) {
       console.log("Success response received from backend!");
       window.location.href = "login.html"; 
       return;
    }
    
    // 2. If it's not a 201 success, parse the JSON error body
    return response.json().then(data => {
       if (data && data.error) {
          errortext.innerText = data.error;
       } else {
          errortext.innerText = "An unexpected server error occurred.";
       }
    });
  })
  .catch(err => {
    // This catches complete network failure states
    errortext.innerText = "Cannot connect to backend server.";
    console.error("FRONTEND FETCH EXCEPTION:", err);
  });
});
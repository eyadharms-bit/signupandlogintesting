const loggedinuser = localStorage.getItem("loggedInUser");
const logoutbutton = document.getElementById("logoutbutton")
const welcome = document.getElementById("ah1")

if (!loggedinuser) {
    window.location.href = "login.html";
}



logoutbutton.addEventListener('click', function(e) {
    setTimeout(() => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    }, 200);
    

}
)

const user = JSON.parse(loggedinuser);

welcome.innerText = "Welcome back, " + user.username + "!";
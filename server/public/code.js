(function(){
    const app = document.querySelector(".app");
    const socket = io();

    let uname;

    // Define a variable to store the streak points
let streakPoints = 0;

// Function to update streak points display
function updateStreakPoints(points) {
    document.getElementById('streak-points').textContent = points;
}

// Function to handle increasing streak points
function increaseStreakPoints() {
    streakPoints++;
    updateStreakPoints(streakPoints);
}

// Simulate regular logins (increase streak points)
function simulateRegularLogin() {
    setInterval(function() {
        increaseStreakPoints();
    }, 24 * 60 * 60 * 1000); // Increase points every 24 hours
}

// Call simulateRegularLogin to start increasing points (replace with actual logic)
simulateRegularLogin();

    app.querySelector("#join").addEventListener("click", function(){
        let username = app.querySelector("#username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    app.querySelector("#exit-chat").addEventListener("click", function(){
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    });

    app.querySelector("#send-message").addEventListener("click", function(){
        let message = app.querySelector("#message-input").value;
        if(message.length == 0){
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message
        });
        socket.emit("chat", {
            username: uname,
            text: message
        });
        app.querySelector("#message-input").value = "";
    });

    socket.on("update", function(update){
        renderMessage("update", update);
    });

    socket.on("chat", function(message){
        renderMessage("other", message);
    });

    function renderMessage(type, message){
        let messageContainer = app.querySelector(".messages");
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if(type == "other"){
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    document.getElementById("chat-room").addEventListener("click", function(){
        window.location.href = window.location.href; // Navigate to chat room
    });

    document.getElementById("rewards").addEventListener("click", function(){
        alert("Rewards functionality coming soon!");
    });

    document.getElementById("streak").addEventListener("click", function(){
        alert("Streak functionality coming soon!");
    });

    document.getElementById("ask-chatbot").addEventListener("click", function(){
        alert("Chatbot functionality coming soon!");
    });
})();
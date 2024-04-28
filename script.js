const inputUser = document.querySelector("#input");
const profileCard = document.querySelector("#profile-card");

// Function to fetch user data from GitHub API
const fetchUser = (userName) => {
    // Fetch user data from GitHub API
    fetch(`https://api.github.com/users/${userName}`)   // API
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error("User Not Found");
            }
            // Convert response to JSON format
            return response.json();
        })
        .then(userData => {
            // Construct profile card HTML using user data
            const profileHTML = `
                <div class="main-info">
                    <img src="${userData.avatar_url}" alt="avatar" id="prof-img">
                    <span class="name" id="name">${userData.name}</span>
                    <a href="${userData.html_url}" id="username">@${userData.login}</a>
                </div>
                <div class="bio">
                    <p id="bio">${userData.bio || "Bio Not Provided"}</p>
                    <p><span id="repo">${userData.public_repos}</span> Repositories</p>
                </div>
                <div class="follow">
                    <div class="followers">
                        <span class="no" id="followers">${userData.followers}</span> Followers
                    </div>
                    <div class="following">
                        <span class="no" id="following">${userData.following}</span> Following
                    </div>
                </div>
            `;
            // Update profile card's HTML with user data and display it
            profileCard.innerHTML = profileHTML;
            profileCard.style.display = "block";
        })
        .catch(error => {
            alert(error.message);
        });
}

// Search loader
const getUser = () => {
    // Get the entered GitHub username from the input field
    const userName = inputUser.value.trim();
    // Check if username is empty
    if (userName === "") {
        // Display an alert if username is empty
        alert("Please enter a valid GitHub username");
    } else {
        // Call the fetchUser function to fetch and display user data
        fetchUser(userName);
    }
    // Clear the input field after processing
    inputUser.value = "";
}

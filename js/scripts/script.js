// GitHub API URL for Kiran-DA repositories
const githubApiUrl = 'https://api.github.com/users/Kiran-DA/repos';

// Function to fetch GitHub repositories and display them
function fetchRepos(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pythonRepoList = document.getElementById('python-repo-list');
            const powerbiRepoList = document.getElementById('powerbi-repo-list');

            // Filter Python Repositories based on language
            const pythonRepos = data.filter(repo => repo.language === "Python");
            // Filter Power BI Repositories based on name (or other criteria)
            const powerbiRepos = data.filter(repo => repo.name.toLowerCase().includes('powerbi'));

            // Clear the current content
            pythonRepoList.innerHTML = '';
            powerbiRepoList.innerHTML = '';

            // Display Python Repositories
            pythonRepos.forEach(repo => {
                const repoCard = `
                    <div class="col-md-4">
                        <div class="card repo-card">
                            <img src="https://via.placeholder.com/150" class="card-img-top" alt="${repo.name}">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || 'No description available.'}</p>
                                <p><strong>Visibility:</strong> ${repo.private ? 'Private' : 'Public'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                pythonRepoList.innerHTML += repoCard;
            });

            // Display Power BI Repositories
            powerbiRepos.forEach(repo => {
                const repoCard = `
                    <div class="col-md-4">
                        <div class="card repo-card">
                            <img src="https://via.placeholder.com/150" class="card-img-top" alt="${repo.name}">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || 'No description available.'}</p>
                                <p><strong>Visibility:</strong> ${repo.private ? 'Private' : 'Public'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                powerbiRepoList.innerHTML += repoCard;
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
}

// Function to show and hide repository sections based on button click
function toggleRepos(type) {
    const pythonSection = document.getElementById('python-repos');
    const powerbiSection = document.getElementById('powerbi-repos');
    const pythonButton = document.getElementById('python-btn');
    const powerbiButton = document.getElementById('powerbi-btn');

    if (type === 'python') {
        pythonSection.classList.remove('d-none');
        powerbiSection.classList.add('d-none');
        pythonButton.classList.add('active');
        powerbiButton.classList.remove('active');
    } else if (type === 'powerbi') {
        pythonSection.classList.add('d-none');
        powerbiSection.classList.remove('d-none');
        pythonButton.classList.remove('active');
        powerbiButton.classList.add('active');
    }
}

// Fetch repositories when the page loads
window.onload = function () {
    fetchRepos(githubApiUrl);

    // Default to show Python Repositories
    toggleRepos('python');

    // Event Listeners for Navbar Buttons
    document.getElementById('python-btn').addEventListener('click', function() {
        toggleRepos('python');
    });

    document.getElementById('powerbi-btn').addEventListener('click', function() {
        toggleRepos('powerbi');
    });
};

// GitHub API URL for Kiran-DA repositories
const githubApiUrl = 'https://api.github.com/users/Kiran-DA/repos';

// Function to fetch GitHub repositories and display them
function fetchRepos(apiUrl, targetElementId) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const repoListElement = document.getElementById(targetElementId);
            const filteredRepos = data.filter(repo => repo.language === "Python" || repo.name.toLowerCase().includes('powerbi'));

            filteredRepos.forEach(repo => {
                const repoCard = `
                    <div class="col-md-4">
                        <div class="card repo-card">
                            <img src="https://via.placeholder.com/150" class="card-img-top" alt="${repo.name}">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description ? repo.description : 'No description available.'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
                            </div>
                        </div>
                    </div>
                `;
                repoListElement.innerHTML += repoCard;
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));
}

// Fetch repositories on page load
window.onload = function () {
    fetchRepos(githubApiUrl, 'python-repo-list');  // This will display repos from Kiran-DA in Python section as well
};

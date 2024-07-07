const loadUsers = () => {
    fetch('https://randomuser.me/api/?results=40')
        .then(res => res.json())
        .then(data => displayUsers(data.results))
        .catch(error => console.error('Error fetching random users:', error));
};

const displayUsers = users => {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Clear any existing content

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <h4>${index + 1}. ${user.name.title}. ${user.name.first} ${user.name.last}</h4>
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
            <p>Location: ${user.location.city}, ${user.location.country}</p>
            <p>Gender: ${user.gender}</p>
            <p>Phone: ${user.phone}</p>
            <p>Age: ${user.dob.age}</p>
        `;
        userContainer.appendChild(userDiv);
    });
};

loadUsers();

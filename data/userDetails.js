export let userDetails = JSON.parse(localStorage.getItem('user-details')) || [];

export function getUser(email) {
    return userDetails.find(user => user.email === email);
}

export const loggedInUser = JSON.parse(localStorage.getItem('logged-in-user'));
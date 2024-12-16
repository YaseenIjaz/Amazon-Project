export let userDetails = JSON.parse(localStorage.getItem('user-details')) || [];

export function getUser(email){
    let userInfo;

    userDetails.forEach((user) => {
        console.log(user.email);
        
        if(user.email === email){
            userInfo = user;
        };
    }); 
    return userInfo;
}
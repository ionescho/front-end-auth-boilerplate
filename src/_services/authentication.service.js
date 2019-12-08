import axios from "axios"
import config from "../_config/config.service.js"

const authenticationService = {
    login,
    logout,
    signup,
    isLoggedIn,
    getUserCredentials
};

function signup(credentials) {
    var promise = new Promise((resolve, reject) => {
        axios.post(config.api + '/users', {
            email: credentials.email,
            name: credentials.name,
            password: credentials.password,
        })
        .then((response) => {
            setUserDataToLocalStorage(response.data, credentials)
            resolve("success");
        })
        .catch((error) => {
            reject(error);
        });        
    });

    return promise;
}

function login(credentials) {
    var promise = new Promise((resolve, reject) => {
        axios.post(config.api + '/access-tokens', {
            email: credentials.email,
            password: credentials.password,
        })
        .then((response) => {
            setUserDataToLocalStorage(response.data, credentials);
            resolve("success");
        })
        .catch((error) => {
            reject(error);
        });        
    });

    return promise;
}

function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
}

function setUserDataToLocalStorage(data, credentials) {
    credentials = Object.assign({}, credentials);
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('refreshToken', data.refresh_token);
    delete credentials.password;
    localStorage.setItem('currentUser', JSON.stringify(credentials));
}

function isLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false;
}

function getUserCredentials() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export default authenticationService
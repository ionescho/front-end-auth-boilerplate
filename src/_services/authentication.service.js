import axios from "axios"
import config from "../_config/config.service.js"

var jwt, refreshToken;

const authenticationService = {
    login,
    logout,
    signup,
    isLoggedIn,
    currentUser: null
};

function signup(credentials) {
    var promise = new Promise(function(resolve, reject) {
        axios.post(config.api + '/users', {
            email: credentials.email,
            name: credentials.name,
            password: credentials.password,
        })
        .then((response) => {
            jwt = response.data.jwt;
            refreshToken = response.data.refresh_token;
            localStorage.setItem('jwt', this.jwt);
            localStorage.setItem('refreshToken', this.refreshToken);
            this.currentUser = Object.assign({}, credentials);
            resolve("success");
        })
        .catch((error) => {
            reject(error);
        });        
    });

    return promise;
}

function login(username, password) {

}

function logout() {
    this.currentUser = null;
}

function isLoggedIn() {
    return this.currentUser ? true : false;
}

export default authenticationService
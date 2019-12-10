import axios from "axios"
import config from "../_config/config.service.js"
import jwtService from "./jwt.service.js"

const authenticationService = {
    login,
    logout,
    signup,
    isLoggedIn,
    getCurrentUserInfo
};

function signup(credentials) {
    var promise = new Promise((resolve, reject) => {
        axios.post(config.api + '/users', {
            email: credentials.email,
            name: credentials.name,
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
    var promise = new Promise((resolve, reject) => {
        axios.delete(config.api + '/access-tokens', {
            data: {
                refresh_token : localStorage.getItem('refreshToken')
            },        
            headers : {
                'X-Access-Token': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');
            resolve("success");
        })
        .catch((error) => {
            if(error.response.status == 401) {
                jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.logout(); }, resolve);
            } else {
                reject(error);
            }
        });
    });

    return promise;
}

function setUserDataToLocalStorage(data, credentials) {
    if(data) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('refreshToken', data.refresh_token);        
    }
    credentials = Object.assign({}, credentials);
    delete credentials.password;
    localStorage.setItem('currentUser', JSON.stringify(credentials));
}

function isLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false;
}

function getCurrentUserInfo() {
    var promise = new Promise((resolve, reject) => {
        axios.get(config.api + '/me',
        {
            headers : {
                'X-Access-Token': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            resolve(response.data);
        })
        .catch((error) => {
            if(error.response.status == 401) {
                jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.getCurrentUserInfo(); }, resolve);
            } else {
                reject(error);
            }
        });
    });

    return promise;
}

export default authenticationService
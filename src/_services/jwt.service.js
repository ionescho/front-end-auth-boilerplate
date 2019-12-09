import axios from "axios"
import config from "../_config/config.service.js"

const jwtService = {
    getRefreshAccessTokenAndRetryCall
};

function getRefreshAccessTokenAndRetryCall(retryFunction, resolve) {
    refreshAccessToken().then(() => {
        retryFunction().then((data) => {
            resolve(data);
        });
    });
}

function refreshAccessToken() {
    var promise = new Promise((resolve, reject) => {
        axios.post(config.api + '/access-tokens/refresh', {
            refresh_token: localStorage.getItem('refreshToken')
        })
        .then((response) => {
            localStorage.setItem('jwt', response.data.jwt);
            resolve("success");
        })
        .catch((error) => {
            reject(error);
        });
    });

    return promise;
}

export default jwtService;
import axios from "axios"
import config from "../_config/config.service.js"
import jwtService from "./jwt.service.js"

const ideaService = {
	addIdea,
	deleteIdea,
	updateIdea,
	getIdeaPage
};

function addIdea(idea) {
	var promise = new Promise((resolve, reject) => {
		axios.post(config.api + "/ideas",{
			content: idea.content,
			impact: idea.impact,
			ease: idea.ease,
			confidence: idea.confidence
		},
		{
			headers:{
				'X-Access-Token': localStorage.getItem('jwt')
			}
		})
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
        	if(error.response.status == 401) {
            	jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.addIdea(idea); }, resolve);
        	} else {
        		reject(error);
        	}
        });
	});

	return promise;
}

function deleteIdea(idea_id) {
	var promise = new Promise((resolve, reject) => {
        axios.delete(config.api + '/ideas/' + idea_id, {
            data: {
                refresh_token : localStorage.getItem('refreshToken')
            },        
            headers : {
                'X-Access-Token': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
        	resolve("success");
        })
        .catch((error) => {
        	if(error.response.status == 401) {
            	jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.deleteIdea(idea_id); }, resolve);
            } else {
                reject(error);
            }
        });
    });

    return promise;
}

function updateIdea(idea) {
	var promise = new Promise((resolve, reject) => {
		axios.put(config.api + "/ideas/" + idea.id,{
			content: idea.content,
			impact: idea.impact,
			ease: idea.ease,
			confidence: idea.confidence
		},
		{
			headers:{
				'X-Access-Token': localStorage.getItem('jwt')
			}
		})
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
        	if(error.response.status == 401) {
            	jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.updateIdea(idea); }, resolve);
            } else {
                reject(error);
            }
        });
	});

	return promise;
}

function getIdeaPage(page) {
	var promise = new Promise((resolve, reject) => {
        axios.get(config.api + '/ideas?page=' + page,
        {
            headers : {
                'X-Access-Token': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
        	if(error.response.status == 401) {
            	jwtService.getRefreshAccessTokenAndRetryCall(() => { return this.getIdeaPage(page) }, resolve);
            } else {
                reject(error);
            }
        });
    });

    return promise;
}


export default ideaService;

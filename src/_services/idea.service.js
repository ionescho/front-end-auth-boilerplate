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
            jwtService.getRefreshAccessTokenAndRetryCall(this.addIdea.bind(this), resolve);
        });
	});

	return promise;
}

function deleteIdea(idea) {
	var promise = new Promise((resolve, reject) => {
        axios.delete(config.api + '/ideas/' + idea.id, {
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
            jwtService.getRefreshAccessTokenAndRetryCall(this.deleteIdea.bind(this), resolve);
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
            resolve("success");
        })
        .catch((error) => {
            jwtService.getRefreshAccessTokenAndRetryCall(this.updateIdea.bind(this), resolve);
        });
	});

	return promise;
}

function getIdeaPage() {
	var promise = new Promise((resolve, reject) => {
        axios.get(config.api + '/ideas?page=1',
        {
            headers : {
                'X-Access-Token': localStorage.getItem('jwt')
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            jwtService.getRefreshAccessTokenAndRetryCall(this.getIdeaPage.bind(this), resolve);
        });
    });

    return promise;
}


export default ideaService;

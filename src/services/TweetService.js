import axios from 'axios';
const baseUrl = 'http://localhost:8081/api/v1.0/tweets';
class UserService {
	login(user) {
		return axios.post(baseUrl + '/login',user);
	}

	getAllUsers() {
		return axios.get(baseUrl + '/users/all');
	}
    
    registerUser(user){
        return axios.post(baseUrl+'/register',user);
    }

    getUserDetails(userId){
        return axios.get(baseUrl+'/users/search/'+userId);
    }

    getAllTweets() {
		return axios.get(baseUrl + '/all');
	}
    getUserTweets(userId){
        return axios.get(baseUrl + '/'+userId);
    }

    addTweet(userId,tweet){
        return axios.post(baseUrl+'/'+userId+'/add',tweet);
    }
    getTweetById(tweetId){
        return axios.get(baseUrl+ '/getTweet/'+tweetId)
    }

    postReply(userId,tweetId,reply){
        return axios.post(baseUrl+'/'+userId+'/reply/'+tweetId,reply);
    }
    deleteTweet(userId,tweetId){
        return axios.delete(baseUrl+'/'+userId+'/delete/'+tweetId);
    }

    updateTweet(userId,tweetId,tweet){
        return axios.put(baseUrl+'/'+userId+'/update/'+tweetId,tweet);
    }

    likeTweet(userId,tweetId){
        return axios.put(baseUrl+'/'+userId+'/like/'+tweetId);
    }

    searchUsers(username){
        return axios.get(baseUrl+'/users/search/'+username);
    }

    forgotPassword(username,password){
        return axios.get(baseUrl+'/'+username+'/forgotpasswd',{params:{passwd:password}})
    }
}
export default new UserService()


import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async getAllModules(){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/module/allmodules`, {
                withCredentials: true
            })
            console.log(response)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getModuleDetails(moduleId){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/questions/module/${moduleId}`, {
                withCredentials: true
            })
            console.log(response)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserInfo(){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/get-user-info`, {
                withCredentials: true
            })
            console.log(response)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async submitAnswers(answers){
        try {
            const response = await axios.post(`${UserService.BASE_URL}/answers/grade`, answers, 
                { 
                    withCredentials: true, 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error("Error submitting answers: " + error)
            throw(error)
        }
    }

}

export default UserService;
import $api from "~/http"

const AuthService = {
    login: async (data) => {
        try {    
            const response = await $api.post("auth/token/login", data);
            return response.data;        
        } catch (error) {
            throw {
                name: error.name,
                message: error.message,
                stack: error.stack, 
                response: error.response
            }
        }
    },

    register: async (data) => {
        try {
            const response = await $api.post("auth/users", data);
            return response.data;
        } catch (error) {
            throw {
                name: error.name,
                message: error.message,
                stack: error.stack, 
                response: error.response
            }
        }
    },

    logout: async (data) => {
        const response = await $api.post("auth/token/logout", data);
        console.log(response);
        return response.data;
    }
};

export default AuthService;
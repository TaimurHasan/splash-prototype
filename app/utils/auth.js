import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService{
    // retrieve data saved in token
    getProfile() {
        return jwtDecode(this.getToken());
    };

    // check if user is still logged in
    async loggedIn() {
        // checks if there is a saved roken and is still valid
        const token = await this.getToken();
        // use type coersion to check if token is NOT undefined or expired
        return !!token;
    }

    isTokenExpired(token) {
        try {
            const decoded = jwtDecode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    async getToken() {
        // retrieve user token from localStorage
        const token = await AsyncStorage.getItem('id_token');
        return token;
    }

    // set token to local storage and reload to homepage
    login(idToken) {
        AsyncStorage.setItem('id_token', idToken);
    };

    logout() {
        // clear token and profile data from localStorage
        AsyncStorage.removeItem('id_token');
        // window.location.assign('/');
    }
};

export default new AuthService();


import decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

class AuthService{
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    };

    // check if user is still logged in
    loggedIn() {
        // checks if there is a saved roken and is still valid
        const token = this.getToken();
        // use type coersion to check if token is NOT undefined or expired
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    };

    async getToken() {
        // retrieve user token from localStorage
        const token = await SecureStore.getItemAsync('id_token');
        return token;
    }

    // set token to local storage and reload to homepage
    async login(idToken) {
        await SecureStore.setItemAsync('id_token', idToken);
    };

    logout() {
        // clear token and profile data from localStorage
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
};

export default new AuthService();


import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
    constructor(namespace = "auth") {
        this.namespace = namespace;
    }

    async getAccessToken() {
        const accessToken = await AsyncStorage.getItem(
            `${this.namespace}:accessToken`,
        );

        return accessToken ? accessToken : null;
    }

    async setAccessToken(accessToken) {
        try {
            await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
        } catch (e) {
            console.log(e);
        }
        console.log("Done.");
    }

    async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    }
}

export default AuthStorage;

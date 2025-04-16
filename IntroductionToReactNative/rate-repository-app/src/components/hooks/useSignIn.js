import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../../graphql/mutations";

import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const client = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password }) => {
        console.log("try");
        try {
            console.log("in try");
            const response = await mutate({
                variables: { username, password },
            });

            console.log(response);

            const accessToken = response?.data?.authenticate?.accessToken;
            if (!accessToken) {
                throw new Error("No access token found");
            }

            await authStorage.setAccessToken(accessToken);
            client.resetStore();

            return response;
        } catch (error) {
            console.error("Sign-in failed:", error);
            throw error;
        }
    };

    return [signIn, result];
};

export default useSignIn;

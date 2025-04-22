import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "./hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: "row",
        padding: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#333333",
        flexGrow: 0,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    // ...
});

const AppBar = () => {
    const authStorage = useAuthStorage();
    const client = useApolloClient();

    const { data } = useQuery(GET_ME, {
        fetchPolicy: "cache-and-network",
    });

    const handleSignOut = async () => {
        try {
            await authStorage.removeAccessToken();
            await client.resetStore();
            console.log("User signed out");
        } catch (e) {
            console.log(e);
        }
    };

    const isLoggedIn = !!data?.me;

    return (
        <View style={styles.flexContainer}>
            <ScrollView
                horizontal
                contentContainerStyle={{ flexDirection: "row", gap: 15 }}
            >
                <Link to="/" component={Pressable}>
                    <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
                        Repositories
                    </Text>
                </Link>
                {!isLoggedIn ? (
                    <Link to="/sign-in" component={Pressable}>
                        <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
                            Sign in
                        </Text>
                    </Link>
                ) : (
                    <>
                        <Link to="/review" component={Pressable}>
                            <Text
                                color="textSecondary"
                                fontWeight="bold"
                                fontSize="subheading"
                            >
                                Create a review
                            </Text>
                        </Link>
                        <Link to="/my-reviews" component={Pressable}>
                            <Text
                                color="textSecondary"
                                fontWeight="bold"
                                fontSize="subheading"
                            >
                                My reviews
                            </Text>
                        </Link>
                        <Pressable onPress={handleSignOut}>
                            <Text
                                color="textSecondary"
                                fontWeight="bold"
                                fontSize="subheading"
                            >
                                Sign out
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default AppBar;

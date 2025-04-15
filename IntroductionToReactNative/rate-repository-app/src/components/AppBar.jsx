import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";

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
                <Link to="/sign-in" component={Pressable}>
                    <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
                        Sign in
                    </Text>
                </Link>
            </ScrollView>
        </View>
    );
};

export default AppBar;

import { View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";

import theme from "../theme";
import Text from "./Text";
import formatInThousands from "../utils/formatInThousands";

const styles = StyleSheet.create({
    separator: {
        height: 30,
        backgroundColor: "#e1e4e8",
    },
    container: {
        backgroundColor: "white",
        padding: 15,
    },
    topContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    avatarContainer: {
        flexGrow: 0,
        marginRight: 20,
    },
    contentContainer: {
        flexGrow: 1,
        flexShrink: 1,
    },
    nameText: {
        marginBottom: 5,
    },
    descriptionText: {
        flexGrow: 1,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: theme.roundness,
    },
    countItem: {
        flexGrow: 0,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    countItemCount: {
        marginBottom: 5,
    },
    languageContainer: {
        marginTop: 10,
        flexDirection: "row",
    },
    languageText: {
        color: "white",
        backgroundColor: theme.colors.primary,
        borderRadius: theme.roundness,
        flexGrow: 0,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
    gitlinkContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    gitlinkText: {
        color: "white",
        backgroundColor: theme.colors.primary,
        borderRadius: theme.roundness,
        flexGrow: 0,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
});

const CountItem = ({ label, count }) => {
    return (
        <View style={styles.countItem}>
            <Text style={styles.countItemCount} fontWeight="bold">
                {formatInThousands(count)}
            </Text>
            <Text>{label}</Text>
        </View>
    );
};

const RepositoryItem = ({ repository, showUrlButton = false, onPressName }) => {
    const {
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount,
        ownerAvatarUrl,
        url,
    } = repository;
    console.log(repository);

    const handleOpenUrl = () => {
        Linking.openURL(url);
    };

    return (
        <View testID="repositoryItem" style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
                </View>
                <View style={styles.contentContainer}>
                    <Pressable onPress={() => onPressName(repository)}>
                        <Text
                            style={styles.nameText}
                            fontWeight="bold"
                            fontSize="subheading"
                            numberOfLines={1}
                        >
                            {fullName}
                        </Text>
                    </Pressable>
                    <Text style={styles.descriptionText}>{description}</Text>
                    {language ? (
                        <View style={styles.languageContainer}>
                            <Text style={styles.languageText}>{language}</Text>
                        </View>
                    ) : null}
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <CountItem count={stargazersCount} label="Stars" />
                <CountItem count={forksCount} label="Forks" />
                <CountItem count={reviewCount} label="Reviews" />
                <CountItem count={ratingAverage} label="Rating" />
            </View>
            <View>
                {showUrlButton ? (
                    <>
                        <Pressable onPress={handleOpenUrl} style={styles.gitlinkContainer}>
                            <Text style={styles.gitlinkText}>Open in GitHub</Text>
                        </Pressable>
                    </>
                ) : (
                    <Text></Text>
                )}
            </View>
        </View>
    );
};

export default RepositoryItem;

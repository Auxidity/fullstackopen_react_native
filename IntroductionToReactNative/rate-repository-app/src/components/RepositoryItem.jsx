import Text from "./Text";
import { View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "white",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 4,
        marginRight: 15,
    },
    topRow: {
        flexDirection: "row",
        marginBottom: 10,
    },
    info: {
        flex: 1,
    },
    fullName: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    description: {
        marginBottom: 5,
        color: "#555",
    },
    language: {
        alignSelf: "flex-start",
        backgroundColor: "#0366d6",
        color: "white",
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
        overflow: "hidden",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontWeight: "bold",
        fontSize: 16,
    },
    statLabel: {
        color: "#555",
        fontSize: 14,
    },
});

const formatCount = (count) => {
    return count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
};

const RepositoryStats = ({
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
}) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text fontWeight={"bold"}>{formatCount(stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight={"bold"}>{formatCount(forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight={"bold"}>{reviewCount}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.statItem}>
                <Text fontWeight={"bold"}>{ratingAverage}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    );
};

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.fullName}>{item.fullName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <RepositoryStats
                forksCount={item.forksCount}
                stargazersCount={item.stargazersCount}
                ratingAverage={item.ratingAverage}
                reviewCount={item.reviewCount}
            />
        </View>
    );
};

export default RepositoryItem;

import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import useRepositoryReviews from "./hooks/useRepositoryReviews";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: "#e1e4e8",
    },
    reviewItem: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#0366d6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    ratingText: {
        color: "#0366d6",
        fontWeight: "bold",
        fontSize: 16,
    },
    reviewContent: {
        flex: 1,
        flexDirection: "column",
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 3,
    },
    date: {
        color: "#586069",
        marginBottom: 5,
    },
    reviewText: {
        fontSize: 14,
        color: "#333",
    },
    contentPadding: {
        paddingTop: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryReviews = ({ repositoryId, givenRepo, onSelectName }) => {
    const { reviews, fetchMore } = useRepositoryReviews({
        repositoryId,
        first: 2,
    });

    const reviewNodes = reviews?.edges ?? [];

    const renderReviewItem = ({ item }) => {
        const { text, rating, user, createdAt } = item.node;

        return (
            <>
                <View style={styles.separator} />
                <View style={styles.reviewItem}>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                    <View style={styles.reviewContent}>
                        <Text style={styles.username}>{user?.username}</Text>
                        <Text style={styles.date}>
                            {format(new Date(createdAt), "dd.MM.yyyy")}
                        </Text>
                        <Text style={styles.reviewText}>{text}</Text>
                    </View>
                </View>
            </>
        );
    };

    return (
        <FlatList
            data={reviewNodes}
            keyExtractor={({ node }) => node.id}
            renderItem={renderReviewItem}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => (
                <RepositoryItem
                    repository={givenRepo}
                    showUrlButton={true}
                    onPressName={onSelectName}
                />
            )}
            contentContainerStyle={styles.contentPadding}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
        />
    );
};

export default RepositoryReviews;

import React from "react";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { GET_ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import theme from "../theme";

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
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    deleteButtonContainer: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    deleteButtonText: {
        color: "white",
        backgroundColor: theme.colors.error || "red",
        borderRadius: theme.roundness,
        flexGrow: 0,
        paddingVertical: 3,
        paddingHorizontal: 6,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const navigate = useNavigate();
    const { data, refetch } = useQuery(GET_ME, {
        variables: { includeReviews: true },
        fetchPolicy: "cache-and-network",
    });
    const [deleteReview] = useMutation(DELETE_REVIEW);
    const reviews = data?.me?.reviews?.edges || [];

    const renderReviewItem = ({ item }) => {
        const { id, text, rating, createdAt, repositoryId } = item.node;

        const handlePress = () => {
            navigate(`/repository/${repositoryId}`);
        };

        const handleDelete = () => {
            Alert.alert("Delete review", "Do you wish to delete the review?", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await deleteReview({
                                variables: { deleteReviewId: id },
                            });
                            console.log(`Deleted review with id: ${id}`);
                            refetch();
                        } catch (e) {
                            console.error("Failed to delete review:", e);
                        }
                    },
                },
            ]);
        };

        return (
            <View style={styles.reviewItem}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
                <View style={styles.reviewContent}>
                    <Text style={styles.username}>{data.me.username}</Text>
                    <Text style={styles.date}>
                        {format(new Date(createdAt), "dd.MM.yyyy")}
                    </Text>
                    <Text style={styles.reviewText}>{text}</Text>
                    <View style={styles.buttonRow}>
                        <Pressable onPress={handlePress} style={styles.gitlinkContainer}>
                            <Text style={styles.gitlinkText}>View repository</Text>
                        </Pressable>
                        <Pressable
                            onPress={handleDelete}
                            style={styles.deleteButtonContainer}
                        >
                            <Text style={styles.deleteButtonText}>Delete review</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={reviews}
            keyExtractor={({ node }) => node.id}
            renderItem={renderReviewItem}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.contentPadding}
        />
    );
};

export default MyReviews;

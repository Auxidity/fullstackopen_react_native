import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import Text from "./Text";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: { first: 10 },
        fetchPolicy: "cache-and-network",
    });

    const repositories =
        data?.repositories?.edges?.map((edge) => edge.node) ?? [];

    const handleEndReached = () => {
        if (!loading && data?.repositories?.pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: data.repositories.pageInfo.endCursor,
                },
            });
        }
    };
    return (
        <>
            {loading && <ActivityIndicator size="lager" />}
            {error && <Text>Error fetching repositories: {error.message}</Text>}
            {!loading && !error && (
                <FlatList
                    data={repositories}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item }) => <RepositoryItem item={item} />}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                />
            )}
        </>
    );
};

export default RepositoryList;

import { FlatList, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigate, useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "./hooks/useRepositories";
import { useDebounce } from "use-debounce";
import RepositoryReviews from "./RepositoryReviews";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    pickerContainer: {
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
    selectedOrder,
    setSelectedOrder,
    searchKeyword,
    setSearchKeyword,
}) => {
    return (
        <View style={styles.pickerContainer}>
            <TextInput
                style={styles.input}
                placeholder="Search repositories"
                value={searchKeyword}
                onChangeText={setSearchKeyword}
            />
            <Picker
                selectedValue={selectedOrder}
                onValueChange={(itemValue) => setSelectedOrder(itemValue)}
            >
                <Picker.Item label="Latest repositories" value="latest" />
                <Picker.Item label="Highest rated repositories" value="highest" />
                <Picker.Item label="Lowest rated repositories" value="lowest" />
            </Picker>
        </View>
    );
};

export const RepositoryListContainer = ({
    repositories,
    onEndReach,
    onSelectRepository,
    repoId = null,
    selectedOrder,
    setSelectedOrder,
    searchKeyword,
    setSearchKeyword,
}) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    const selectedRepo = repoId
        ? repositoryNodes.find((repo) => repo.id === repoId)
        : null;

    return selectedRepo ? (
        <RepositoryReviews
            repositoryId={repoId}
            givenRepo={selectedRepo}
            onSelectName={() => onSelectRepository(null)}
        />
    ) : (
        <FlatList
            data={repositoryNodes}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
                <RepositoryItem
                    repository={item}
                    onPressName={() => onSelectRepository(item)}
                />
            )}
            ListHeaderComponent={
                <RepositoryListHeader
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                    searchKeyword={searchKeyword}
                    setSearchKeyword={setSearchKeyword}
                />
            }
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

const RepositoryList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedOrder, setSelectedOrder] = useState("latest");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedSearch] = useDebounce(searchKeyword, 500);

    const onEndReach = () => {
        fetchMore();
    };

    let orderBy = "CREATED_AT";
    let orderDirection = "DESC";

    if (selectedOrder === "highest") {
        orderBy = "RATING_AVERAGE";
        orderDirection = "DESC";
    } else if (selectedOrder === "lowest") {
        orderBy = "RATING_AVERAGE";
        orderDirection = "ASC";
    }

    const { repositories, fetchMore } = useRepositories({
        first: 2,
        orderBy,
        orderDirection,
        searchKeyword: debouncedSearch,
    });

    const handlePressName = (repo) => {
        if (repo) {
            navigate(`/repository/${repo.id}`);
        } else {
            navigate("/");
        }
    };

    return (
        <RepositoryListContainer
            repositories={repositories}
            onEndReach={onEndReach}
            repoId={id}
            onSelectRepository={handlePressName}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
        />
    );
};

export default RepositoryList;

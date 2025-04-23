import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../../graphql/queries";

const useRepositoryReviews = (variables) => {
    const { data, loading, fetchMore, refetch, ...result } = useQuery(
        GET_REPOSITORY_REVIEWS,
        {
            variables,
            fetchPolicy: "cache-and-network",
        },
    );

    const handleFetchMore = () => {
        const pageInfo = data?.repository?.reviews?.pageInfo;

        if (!loading && pageInfo?.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                    ...variables,
                },
                //Prevents duplicate key issue that popped up on later debugging, this is sadly a post submission change since I didnt initially catch it
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                        return previousResult;
                    }

                    return {
                        repository: {
                            ...fetchMoreResult.repository,
                            reviews: {
                                ...fetchMoreResult.repository.reviews,
                                edges: [
                                    ...previousResult.repository.reviews.edges,
                                    ...fetchMoreResult.repository.reviews.edges.filter(
                                        (newEdge) =>
                                            !previousResult.repository.reviews.edges.some(
                                                (existingEdge) =>
                                                    existingEdge.node.id === newEdge.node.id,
                                            ),
                                    ),
                                ],
                            },
                        },
                    };
                },
            });
        }
    };

    return {
        reviews: data?.repository?.reviews,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        ...result,
    };
};

export default useRepositoryReviews;

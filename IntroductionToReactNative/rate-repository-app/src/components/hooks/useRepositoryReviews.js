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

import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Pressable,
    Alert,
} from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        color: "#000", // regular text
    },
    inputError: {
        borderColor: "#d73a4a",
    },
    errorText: {
        color: "#d73a4a",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#0366d6",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Repository owner's username is required"),
    repositoryName: yup.string().required("Repository name is required"),
    rating: yup
        .number()
        .required("Rating is required")
        .min(0, "Rating must be at least 0")
        .max(100, "Rating must be at most 100"),
    text: yup.string(),
});

const Review = () => {
    const navigate = useNavigate();
    const [createReview] = useMutation(CREATE_REVIEW);

    const formik = useFormik({
        initialValues: {
            ownerName: "",
            repositoryName: "",
            rating: "",
            text: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const { data } = await createReview({
                    variables: {
                        review: {
                            ownerName: values.ownerName,
                            repositoryName: values.repositoryName,
                            rating: Number(values.rating),
                            text: values.text,
                        },
                    },
                });

                const repoId = data?.createReview?.repositoryId;
                if (repoId) {
                    resetForm();
                    navigate(`/repository/${repoId}`);
                }
            } catch (e) {
                console.error(e);
                Alert.alert("Error", e.message || "Failed to create review.");
            }
        },
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    formik.touched.ownerName &&
                    formik.errors.ownerName &&
                    styles.inputError,
                ]}
                placeholder="Repository owner's username"
                placeholderTextColor="#888"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange("ownerName")}
                onBlur={formik.handleBlur("ownerName")}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}

            <TextInput
                style={[
                    styles.input,
                    formik.touched.repositoryName &&
                    formik.errors.repositoryName &&
                    styles.inputError,
                ]}
                placeholder="Repository name"
                placeholderTextColor="#888"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange("repositoryName")}
                onBlur={formik.handleBlur("repositoryName")}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput
                style={[
                    styles.input,
                    formik.touched.rating && formik.errors.rating && styles.inputError,
                ]}
                placeholder="Rating between 0 and 100"
                placeholderTextColor="#888"
                value={formik.values.rating}
                onChangeText={formik.handleChange("rating")}
                onBlur={formik.handleBlur("rating")}
                keyboardType="numeric"
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <TextInput
                style={[
                    styles.input,
                    { height: 100, textAlignVertical: "top" },
                    formik.touched.text && formik.errors.text && styles.inputError,
                ]}
                placeholder="Review"
                placeholderTextColor="#888"
                multiline
                value={formik.values.text}
                onChangeText={formik.handleChange("text")}
                onBlur={formik.handleBlur("text")}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={styles.errorText}>{formik.errors.text}</Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create Review</Text>
            </Pressable>
        </View>
    );
};

export default Review;

import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "../Text";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputError: {
        borderColor: "red",
    },

    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
});

const validationSchema = yup.object().shape({
    user: yup.string().required("Username is required"),
    pw: yup.string().required("Password is required"),
});

const initialValues = {
    user: "",
    pw: "",
};

export const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    formik.touched.user && formik.errors.user && styles.inputError,
                ]}
                placeholder="Username"
                value={formik.values.user}
                onChangeText={formik.handleChange("user")}
            />
            {formik.touched.user && formik.errors.user && (
                <Text style={styles.errorText}>{formik.errors.user}</Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    formik.touched.pw && formik.errors.pw && styles.inputError,
                ]}
                placeholder="Password"
                secureTextEntry={true}
                value={formik.values.pw}
                onChangeText={formik.handleChange("pw")}
            />
            {formik.touched.pw && formik.errors.pw && (
                <Text style={styles.errorText}>{formik.errors.pw}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const onSubmit = async (values) => {
        const { user, pw } = values;
        try {
            const { data } = await signIn({ username: user, password: pw });
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };
    return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;

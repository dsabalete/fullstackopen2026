import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 15,
    backgroundColor: theme.colors.inputBackground,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    fontFamily: theme.fonts.main,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontFamily: theme.fonts.main,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

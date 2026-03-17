import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-native";
import theme from "../theme";

import useCreateUser from "../hooks/useCreateUser";
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

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters long")
        .max(50, "Username must be at most 50 characters long"),
      password: Yup.string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters long")
        .max(50, "Password must be at most 50 characters long"),
      passwordConfirmation: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
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
      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        placeholder="Password confirmation"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        secureTextEntry
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.errorText}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await createUser({
        variables: {
          username,
          password,
        },
      });
      if (data?.createUser) {
        await signIn({ username, password });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

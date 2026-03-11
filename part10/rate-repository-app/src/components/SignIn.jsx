import { TextInput, Pressable, View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    gap: 5,
    backgroundColor: theme.colors.inputBackground,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
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

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

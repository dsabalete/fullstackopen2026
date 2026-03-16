import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import useCreateReview from "../hooks/useCreateReview";
import theme from "../theme";

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

const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: "", // required
      repositoryName: "", // required
      rating: "", // required, 0-100
      review: "", // optional
    },
    onSubmit,
    validationSchema: Yup.object({
      ownerName: Yup.string().required("Repository owner name is required"),
      repositoryName: Yup.string().required("Repository name is required"),
      rating: Yup.number()
        .required("Rating is required")
        .min(0, "Rating must be at least 0")
        .max(100, "Rating must be at most 100"),
    }),
  });

  const handleRatingChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    if (numericValue > 100) {
      formik.setFieldValue("rating", "100");
    } else {
      formik.setFieldValue("rating", numericValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        placeholder="Repository owner"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input]}
        placeholder="Repository name"
        placeholderTextColor={theme.colors.textSecondary}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[styles.input]}
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.textSecondary}
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={handleRatingChange}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[styles.input]}
        placeholder="Review"
        placeholderTextColor={theme.colors.textSecondary}
        multiline
        numberOfLines={4}
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.errorText}>{formik.errors.review}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: parseInt(rating),
          text: review,
        },
      });

      if (data?.createReview) {
        navigate(`/repositories/${data.createReview.repository.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;

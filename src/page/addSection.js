import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Must be more than 2 words").required("Required"),
  dateofbirth: Yup.string().required("Required"),
  gender: Yup.boolean(),
  class: Yup.string().required("Required"),
  image: Yup.string().url("Must be a valid URL").required("Required"),
  feedback: Yup.string().required("Required"),
});

const AddSection = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      dateofbirth: "",
      gender: false,
      class: "",
      image: "",
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          "https://6680067356c2c76b495ae640.mockapi.io/studentManagement",
          values
        )
        .then((response) => {
          console.log("Student added:", response.data);
          alert("Created Successfully!");
          // Redirect or clear form after submission
        })
        .catch((error) => {
          console.error("Error adding Student:", error);
          alert("Ko Create dc!");

        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Students
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        //name
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        //date
        <TextField
          fullWidth
          id="dateofbirth"
          name="dateofbirth"
          label="Date of Birth"
          value={formik.values.dateofbirth}
          onChange={formik.handleChange}
          error={
            formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)
          }
          helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
          margin="normal"
        />
        //gender
        <FormControlLabel
          control={
            <Switch
              id="gender"
              name="gender"
              checked={formik.values.gender}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Gender"
        />
        //image

        <TextField
          fullWidth
          id="class"
          name="class"
          label="Class"
          value={formik.values.class}
          onChange={formik.handleChange}
          error={formik.touched.class && Boolean(formik.errors.class)}
          helperText={formik.touched.class && formik.errors.class}
          margin="normal"
        />

        <TextField
          fullWidth
          id="image"
          name="image"
          label="Image URL"
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          margin="normal"
        />
        <TextField
          fullWidth
          id="feedback"
          name="feedback"
          label="Feedback"
          value={formik.values.feedback}
          onChange={formik.handleChange}
          error={formik.touched.feedback && Boolean(formik.errors.feedback)}
          helperText={formik.touched.feedback && formik.errors.feedback}
          margin="normal"
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddSection;

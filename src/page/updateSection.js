import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Switch, FormControlLabel, Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const validationSchema = Yup.object({
  sectionName: Yup.string()
    .min(3, 'Must be more than 2 characters')
    .required('Required'),
  image: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
  isMainTask: Yup.boolean(),
  duration: Yup.number()
    .min(1, 'Duration must be a number of minutes')
    .required('Required'),
});

const UpdateSection = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const [section, setSection] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    let mounted = true; // Flag to check if component is mounted
    axios.get(`https://667cbb433c30891b865d665b.mockapi.io/sectionManagement/${id}`)
      .then(response => {
        if (mounted) {
          setSection(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (mounted) {
          console.error('Error fetching section:', error);
          setError('Error fetching data');
          setLoading(false);
        }
      });

    return () => {
      mounted = false; // Cleanup function to prevent memory leaks
    };
  }, [id]);

  const formik = useFormik({
    initialValues: {
      sectionName: '',
      image: '',
      isMainTask: false,
      duration: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios.put(`https://667cbb433c30891b865d665b.mockapi.io/sectionManagement/${id}`, values)
        .then(response => {
          console.log('Section updated:', response.data);
          setSubmitting(false);
          history('/dashboard'); // Redirect after successful update
        })
        .catch(error => {
          console.error('Error updating section:', error);
          setError('Error updating data');
          setSubmitting(false);
        });
    },
    enableReinitialize: true, // This enables form reinitialization when initialValues change
  });

  useEffect(() => {
    if (section) {
      // Populate formik values with fetched section data
      formik.setValues({
        sectionName: section.sectionName,
        image: section.image,
        isMainTask: section.isMainTask,
        duration: section.duration,
      });
    }
  }, [section, formik]);

  if (loading) {
    return <CircularProgress />; // Display loading indicator while fetching data
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Update Section
      </Typography>
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="sectionName"
          name="sectionName"
          label="Section Name"
          value={formik.values.sectionName}
          onChange={formik.handleChange}
          error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
          helperText={formik.touched.sectionName && formik.errors.sectionName}
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
          id="duration"
          name="duration"
          label="Duration (minutes)"
          type="number"
          value={formik.values.duration}
          onChange={formik.handleChange}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              id="isMainTask"
              name="isMainTask"
              checked={formik.values.isMainTask}
              onChange={formik.handleChange}
              color="primary"
            />
          }
          label="Is Main Task"
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};

export default UpdateSection;

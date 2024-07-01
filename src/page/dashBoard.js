import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, TextField, Switch, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Must be more than 2 words").required("Required"),
  dateofbirth: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  class: Yup.string().required("Required"),
  image: Yup.string().url("Must be a valid URL").required("Required"),
  feedback: Yup.string().required("Required"),
});

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    axios.get('https://6680067356c2c76b495ae640.mockapi.io/studentManagement')
      .then(response => {
        setStudents(response.data);
        setLoading(false); // Update loading state after data fetch
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Set error state for error handling
        setLoading(false); // Update loading state in case of error
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      axios.delete(`https://6680067356c2c76b495ae640.mockapi.io/studentManagement/${deleteId}`)
        .then(() => {
          // Update state after successful delete
          setStudents(prevStudents => prevStudents.filter(student => student.id !== deleteId));
          setDeleteDialogOpen(false);
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        });
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setCurrentStudent(null);
    setEditDialogOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: currentStudent ? currentStudent.name : '',
      dateofbirth: currentStudent ? currentStudent.dateofbirth : '',
      gender: currentStudent ? currentStudent.gender : '',
      class: currentStudent ? currentStudent.class : '',
      image: currentStudent ? currentStudent.image : '',
      feedback: currentStudent ? currentStudent.feedback : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (currentStudent) {
        axios.put(`https://6680067356c2c76b495ae640.mockapi.io/studentManagement/${currentStudent.id}`, values)
          .then(response => {
            // Update students state after successful edit
            setStudents(prevStudents => prevStudents.map(student => student.id === currentStudent.id ? response.data : student));
            handleCloseEdit();
          })
          .catch(error => {
            console.error('Error updating student:', error);
          });
      }
    },
    enableReinitialize: true, // Reinitialize form when currentStudent changes
  });

  return (
    <div>
      <Typography variant="h6" style={{ marginLeft: '20px' }}>
        <Link to="/add" style={{ color: 'inherit', textDecoration: 'none' }}>Create Student</Link>
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.dateofbirth}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <img src={student.image} alt={student.name} style={{ width: '100px', height: 'auto' }} />
                  </TableCell>
                  <TableCell>{student.feedback}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/detail/${student.id}`}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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
            <TextField
              fullWidth
              id="dateofbirth"
              name="dateofbirth"
              label="Date of Birth"
              value={formik.values.dateofbirth}
              onChange={formik.handleChange}
              error={formik.touched.dateofbirth && Boolean(formik.errors.dateofbirth)}
              helperText={formik.touched.dateofbirth && formik.errors.dateofbirth}
              margin="normal"
            />
            <TextField
              fullWidth
              id="gender"
              name="gender"
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              margin="normal"
            />
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
            <DialogActions>
              <Button onClick={handleCloseEdit} color="primary">
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;

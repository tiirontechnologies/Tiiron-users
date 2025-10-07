import React, { useState } from 'react';
import { Button, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Modal from '@components/ui/Modal/Modal';
import { useSnackbar } from '@components/ui/Snackbar/SnackBarProvider';

interface AddNewCourseModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (courseData: any) => void;
}

const AddNewCourseModal: React.FC<AddNewCourseModalProps> = ({
  open,
  onClose,
  onAdd
}) => {
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onAdd(formData);
      showSnackbar({
        message: 'Course created successfully',
        severity: 'success'
      });
      setFormData({ title: '', description: '', category: '', difficulty: 'beginner' });
      onClose();
    } catch (error) {
      showSnackbar({
        message: 'Failed to create course',
        severity: 'error'
      });
    }
  };

  const handleChange = (field: string) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Add New Course
        </Typography>
        
        <TextField
          fullWidth
          label="Course Title"
          value={formData.title}
          onChange={handleChange('title')}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={handleChange('description')}
          margin="normal"
          multiline
          rows={3}
        />
        
        <TextField
          fullWidth
          label="Category"
          value={formData.category}
          onChange={handleChange('category')}
          margin="normal"
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={formData.difficulty}
            onChange={handleChange('difficulty')}
            label="Difficulty"
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="advanced">Advanced</MenuItem>
          </Select>
        </FormControl>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create Course
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddNewCourseModal;

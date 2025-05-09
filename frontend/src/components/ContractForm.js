import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ContractForm = ({ open, onClose, onGenerate, template, loading }) => {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (open) {
      setFormData({});
      setError(null);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    const missingFields = template?.fields?.filter(field => !formData[field]);
    if (missingFields?.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    onGenerate(template.title, formData);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  if (!template) return null;

  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Generate {template.title}</Typography>
          <IconButton onClick={onClose} size="small" disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" icon={<ErrorOutlineIcon />} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {template.fields?.map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field}
              value={formData[field] || ''}
              onChange={handleChange(field)}
              margin="normal"
              required
              disabled={loading}
              error={!!error && (!formData[field] || formData[field] === '')}
              helperText={!!error && (!formData[field] || formData[field] === '') ? (
                <span style={{ color: 'red', display: 'flex', alignItems: 'center' }}><ErrorOutlineIcon fontSize="small" style={{ marginRight: 4 }} />Required</span>
              ) : ''}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <PictureAsPdfIcon />}
          >
            {loading ? 'Generating...' : 'Generate Document'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContractForm; 
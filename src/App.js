import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Logout, MoreVert } from '@mui/icons-material';
import ModalForm from './components/ModalForm'; // Importer le ModalForm

const columns = (handleMenuOpen) => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 250 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Badge
        color={params.value === 'Active' ? 'success' : 'error'}
        variant="dot"
        overlap="circular"
      >
        <span className={`badge ${params.value === 'Active' ? 'bg-success' : 'bg-danger'}`}>
          {params.value}
        </span>
      </Badge>
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <>
        <Button
          variant="text"
          onClick={(e) => handleMenuOpen(e, params.row.id)}
        >
          <MoreVert />
        </Button>
      </>
    ),
  },
];

function App() {
  const [equipment, setEquipment] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // État pour gérer l'ouverture du modal

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.slice(0, 10).map((item) => ({
          id: item.id,
          name: `Equipment ${item.id}`,
          description: item.title,
          status: item.id % 2 === 0 ? 'Active' : 'Inactive',
        }));
        setEquipment(transformedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentId(null);
  };

  // Fonction pour ouvrir le modal
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Fonction pour fermer le modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      <AppBar position="static" sx={{ background: 'white', color: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cyber Management
          </Typography>
          <Button variant="text" onClick={handleLogout}>
            <Logout /> Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Equipment Management
        </Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField variant="outlined" label="Search equipment..." fullWidth />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button variant="contained" fullWidth onClick={handleModalOpen}> {/* Ouvre le modal */}
                Add New Equipment
              </Button>
            </Grid>
          </Grid>
          <div style={{ height: 400, width: '100%', marginTop: 20 }}>
            <DataGrid
              rows={equipment}
              columns={columns(handleMenuOpen)}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Paper>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem >Edit</MenuItem>
          <MenuItem >Delete</MenuItem>
        </Menu>
      </Container>
      <ModalForm open={modalOpen} handleClose={handleModalClose} /> {/* Appelle le modal */}
    </div>
  );
}

export default App;

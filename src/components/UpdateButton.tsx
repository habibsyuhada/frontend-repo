import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { fetchUserData, updateUserData } from '../store/actions';
import type { AppDispatch } from '../store/store';
import { logoutUser } from '../apis/userApi';

const UpdateButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, data } = useSelector((state: any) => state.user);
  
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

	useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        dispatch(fetchUserData(storedUserId));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setCity(data.city || '');
      setCountry(data.country || '');
    }
  }, [data]);

  const handleUpdateUser = () => {
    const updatedData = { userId: userId, data: { name, city, country } };
    dispatch(updateUserData(updatedData));
  };

  const handleSignOut = async () => {
		try {
      await logoutUser();
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh"
			sx={{
				p: 2,
			}}
		>
			<Container component="main" maxWidth="xs" sx={{ bgcolor: 'white'}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						p: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography component="h1" variant="h5">
							<b>Your User Data</b>
						</Typography>
					</Box>
					<Box sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoComplete="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="city"
							label="City"
							name="city"
							autoComplete="city"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="country"
							label="Country"
							name="country"
							autoComplete="country"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3 }}
							onClick={handleUpdateUser}
						>
							Update Data
						</Button>
						<Button
							color="error"
							type="button"
							fullWidth
							variant="contained"
							sx={{ mt: 1, mb: 2 }}
							onClick={handleSignOut}
						>
							Sign Out
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
  );

};

export default UpdateButton;

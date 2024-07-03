import React, { useState } from 'react';
import { loginUser } from '../apis/userApi';
import { Container, Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { setLoading, setError } from '../store/actions';
import { store } from '../store/store';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
		store.dispatch(setLoading(true));
    event.preventDefault();
    try {
      const user = await loginUser(email, password);
      localStorage.setItem('token', user.token);
			localStorage.setItem('userId', user.userId);
      window.location.href = '/main';
			
			store.dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
			
			store.dispatch(setError(error instanceof Error ? error.message : 'Login Failed'));
			store.dispatch(setLoading(false));
    }
  };

	const handleSkipLogin = () => {
		window.location.href = '/main';
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
						marginTop: 2,
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
						<Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
							<LockOutlinedIcon sx={{ color: 'white' }}/>
						</Avatar>
						<Typography component="h1" variant="h5">
							<b>Sign in</b>
						</Typography>
					</Box>
					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, }}
						>
							Sign In
						</Button>
						<Button
							color="error"
							type="button"
							fullWidth
							variant="contained"
							sx={{ mt: 1, mb: 2 }}
							onClick={handleSkipLogin}
						>
							Skip Sign In
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
  );
};

export default LoginForm;

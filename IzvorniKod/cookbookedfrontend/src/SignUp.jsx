import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignUp() {
  const [signUpForm, setSignUpForm] = React.useState({ username: '', password: '', email: ''});
  const [error, setError] = React.useState('');

 function onChange(event) {
    const {name, value} = event.target;
    setSignUpForm(oldForm => ({...oldForm, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
    };

    console.log(JSON.stringify(data));

    const options = {
                method: 'POST',
                // withCredentials: true,
                headers:{
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer {{rnd_xET9P8RFqjGRjg2Pi5pikwU3u5AU}}'
                },
                body: JSON.stringify(data)
            };

        fetch('/api/korisnici', options)
        .then(response => {
          if (!response.ok) {
            //throw new Error('Bad credentials');
          }
          return response.text(); // Parse the JSON response
        })
        .then(data => {
          // Handle the data when the request is successful
          console.log(data);
        })
        .catch(error => {
          // Handle any errors that occur during the fetch request
          console.error('There was a problem while registering:', error);
          // You can perform error handling or show appropriate messages to the user
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={onChange} value={signUpForm.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChange} value={signUpForm.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange} value={signUpForm.email}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
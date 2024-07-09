import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import { Box, Button, Typography } from '@mui/material';
import './auth.scss';
import bg from '../../../assets/footer-bg.jpg';

const Auth = () => {
  const [isSigninPage, setIsSigninPage] = useState(true);

  const handleToggle = () => {
    setIsSigninPage(!isSigninPage);
  };

  return (
    <Box
      className="main_box"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'darken',
      }}
    >
      <Box className="main_box--main">
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          {isSigninPage ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box className="main_box--main--login">
          {isSigninPage ? <Signin /> : <Signup />}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggle}
            sx={{ marginTop: 2, width: '50%' }}
          >
            {isSigninPage ? 'Sign Up' : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
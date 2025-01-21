import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { setUserDetails, UserType } from 'src/store/reducer/userReducer';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { handleAuthNavigation } from './authUtils';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const urlParams = new URL(window.location.href).searchParams;

        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        const decodedToken = jwtDecode<UserType>(accessToken);

        dispatch(setUserDetails(decodedToken));
        localStorage.setItem('access_token', `Bearer ${accessToken}`);
        localStorage.setItem('refresh_token', `Bearer ${refreshToken}`);

        handleAuthNavigation(decodedToken, navigate, dispatch);

    }, [navigate]);


    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h4">Authorization in progress...</Typography>
        </Box>
    );
};

export default Auth; 
import { Box , CircularProgress} from '@mui/material';
import React from 'react';

function Loader({ loading }) {
    return (
        <Box display={loading?'flex':'none'} justifyContent="center" alignItems="center" height="10vh">
            {loading && <CircularProgress color="primary" />}
        </Box>
    );
}

export default Loader;
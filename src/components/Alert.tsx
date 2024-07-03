import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { setError } from '../store/actions';
import { store } from '../store/store';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertPopup = () => {
  const error = useSelector((state: any) => state.user.error);
	console.log("Alerrttt")
	console.log(error)
  return (
    <Snackbar open={error !== null} autoHideDuration={1000} onClose={() => {}}>
			<div>
				<Alert onClose={() => {
					store.dispatch(setError(null));
				}} severity="error">
					{error}
				</Alert>
			</div>
    </Snackbar>
  );
};

export default AlertPopup;

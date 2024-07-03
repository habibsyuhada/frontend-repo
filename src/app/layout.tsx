"use client";

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../store/store';
import theme from '../theme/theme';
import LoadingOverlay from '../components/LoadingOverlay';
import AlertPopup from '../components/Alert';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
				<html>
					<body>
						<LoadingOverlay />
						<AlertPopup />
						{children}
					</body>
				</html>
      </ThemeProvider>
    </Provider>
  );
}

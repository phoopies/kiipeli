import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { store } from './store';
import theme from './theme';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

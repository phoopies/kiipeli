import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { store } from './store';
import theme from './theme';
import router from './router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

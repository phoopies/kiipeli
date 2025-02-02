import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
    white: {
      main: string;
    }
  }
}

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#060D0D',
        contrastText: '#FAFAFA',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#FAFAFA',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#060D0D',
      },
      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#ef6c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      white: {
        main: '#ffffff',
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  })
);

export default theme;

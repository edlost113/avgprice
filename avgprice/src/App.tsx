
import { data } from './data'
import Box from '@mui/material/Box';
import { Grid } from './components/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box id="gridD">
        <Grid rows={data} />
      </Box>
    </ThemeProvider>
  )
}

export default App
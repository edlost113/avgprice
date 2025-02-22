
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
      <Box sx={{position: 'absolute', top: '1%', left:'1%', width: '98%', height:'98%'}}>
        <Grid rows={data} />
      </Box>
    </ThemeProvider>
  )
}

export default App
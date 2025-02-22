
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
      <Box sx={{position: 'absolute', top: '1%', left:'1%', width: '98%', height:'87%'}}>
        <Box>
        Same as !avgprice. <br /> 
        The items were looked up in !sane and !price. <br />
        The two prices are then averaged. <br />
        If the item does not exist in either, then the price from dungeonsports is used. <br />
        </Box>
        <Grid rows={data} />
      </Box>
    </ThemeProvider>
  )
}

export default App
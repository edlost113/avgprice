
import { data } from './data'
import Box from '@mui/material/Box';
import { Grid } from './components/Grid'
import { Mobile } from './components/Mobile'
import { Sound } from './components/Sound'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{position: 'absolute', top: '1%', left:'1%', width: '98%', height:'87%'}}>
        <Box>
        <Sound></Sound>
        Same as !avgprice. <br /> 
        The items were looked up in !sane and !price. <br />
        The two prices are then averaged. <br />
        If the item does not exist in either, then the price from dungeonsports is used. <br />
        </Box>
        {!isMobile ? <Grid rows={data} /> : <Mobile rows={data} />}
        </Box>
    </ThemeProvider>
  )
}

export default App

import { data } from './data'
import Box from '@mui/material/Box';
import { Grid } from './components/Grid'
import { Mobile } from './components/Mobile'
import { Sound } from './components/Sound'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import gifPath from './assets/dancingwizard.gif';
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const defaultTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let useThemePick = defaultTheme;

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    let urlParams = new URLSearchParams(window.location.search);
    let isMobile = mediaQuery.matches || ('mobile' === urlParams.get("device"));
    setIsMobile(isMobile);
    let theme = urlParams.get("theme");
    if (theme === 'dark') {
      useThemePick = darkTheme;
    } else if (theme === 'light') {
      useThemePick = lightTheme;
    } else {
      useThemePick = defaultTheme;
    }
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <ThemeProvider theme={useThemePick}>
      <Sound></Sound>
      <CssBaseline />
      <Box sx={{position: 'absolute', top: '1%', left:'1%', width: '98%', height:'87%'}}>
        <Box>
        <div>
          <img src={gifPath} alt="dancing wizard" id="dancingWizardLeft" className="reverse"/>
          <img src={gifPath} alt="ggnore" id="dancingWizardRight" />
        </div>
        <div id="useageText">
          Same as <code className="bold">!avgprice</code>. <br /> 
          The items were looked up in <code className="bold">!sane</code> and <code className="bold">!price</code>. <br />
          The two prices are then averaged. <br />
          If the item does not exist in either, then the price from dungeonsports is used. <br />
        </div>
        </Box>
        {!isMobile ? <Grid rows={data} /> : <Mobile rows={data} />}
        </Box>
    </ThemeProvider>
  )
}

export default App
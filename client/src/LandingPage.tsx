import { useState } from 'react';
import miniCoop from './assets/miniCooper.png';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { createTheme } from '@mui/material/styles'
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import clientActions from './clientActions';

const darkTheme = createTheme({ 
    palette: { 
        mode: 'dark', 
    }, 
});

function LandingPage() {
    const [appId, setAppId] = useState('')

    const handleNewApplication = async () => {
        const newApp = await clientActions.createApplication({});
        window.open(`/application?id=${newApp?.data.app.id}`, '_self')
    }
    
    const handleResumeApplication = async () => {
        window.open(`/application?id=${appId}`, '_self')
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <a href="https://www.linkedin.com/in/sam-schlesinger/" target="_blank">
                    <img src={miniCoop} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Sam's Car Insurance Demo</h1>
            <Grid container columnSpacing={2} rowSpacing={4}>

                <Grid item xs={12}>
                    <Button 
                    variant='contained'
                    onClick={handleNewApplication}
                    >
                        New Application
                    </Button>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        If you have an existing application please enter your application number below, then click Resume:
                    </Typography>
                </Grid>

                <Grid item xs={3} />
                <Grid item xs={3} >
                    <TextField 
                        className='textfield' 
                        id='applciation_number' 
                        label='Application Number' 
                        variant='outlined' 
                        onChange={(e) => setAppId(e.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                    <Button 
                    variant='contained'
                    onClick={handleResumeApplication}
                    >
                        Resume
                    </Button>
                </Grid>
                <Grid item xs={3} />

            </Grid>
        </ThemeProvider>
    );
}

export default LandingPage;

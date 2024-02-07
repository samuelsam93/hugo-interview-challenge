import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import '../App.css';
import { Typography } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function PersonalInfo(props:any) {

    const {appData, setAppData} = props

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left'>
                        Personal Info
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <TextField 
                        className='textfield' 
                        value={appData?.firstName ? appData?.firstName : ''} 
                        id='first-name' 
                        label='First Name' 
                        variant='outlined' 
                        fullWidth 
                        onChange={(e) => setAppData({...appData, firstName: e.target.value})}
                        disabled={appData.isSubmitted}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        className='textfield' 
                        value={appData?.lastName ? appData?.lastName : ''} 
                        id='last-name' 
                        label='Last Name' 
                        variant='outlined' 
                        fullWidth 
                        onChange={(e) => setAppData({...appData, lastName: e.target.value})}
                        disabled={appData.isSubmitted}
                    />
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField 
                            label="Date of Birth" 
                            value={appData.dob ? dayjs(appData.dob) : ''} 
                            fullWidth 
                            onChange={(val:any) => setAppData({...appData, dob: val.$d})}
                            disabled={appData.isSubmitted}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </div>
    );
};

export default PersonalInfo;
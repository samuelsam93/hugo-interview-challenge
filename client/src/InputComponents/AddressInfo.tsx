import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material';
import '../App.css';
import StateSelect from './StateSelect';

function AddressInfo(props:any) {

    const {appData, setAppData} = props

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left'>
                        Home Address
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        className='textfield' 
                        value={appData?.streetAddress ? appData?.streetAddress : ''} 
                        id='street-address' 
                        label='Street Address' 
                        variant='outlined' 
                        fullWidth 
                        onChange={(e) => setAppData({...appData, streetAddress: e.target.value})}
                        disabled={appData.isSubmitted}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        className='textfield' 
                        value={appData?.city ? appData?.city : ''} 
                        id='city' 
                        label='City' 
                        variant='outlined' 
                        fullWidth 
                        onChange={(e) => setAppData({...appData, city: e.target.value})}
                        disabled={appData.isSubmitted}
                    />
                </Grid>
                <Grid item xs={4}>
                    <StateSelect
                        appData={appData}
                        setAppData={setAppData}
                        />
                </Grid>
                <Grid item xs={4}>
                    <TextField 
                        className='textfield' 
                        value={appData?.zip ? appData?.zip : ''} 
                        id='zip' 
                        label='ZIP code' 
                        variant='outlined' 
                        fullWidth 
                        onChange={(e) => setAppData({...appData, zip: e.target.value})}
                        disabled={appData.isSubmitted}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default AddressInfo;

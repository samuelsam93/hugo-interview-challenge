import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import '../App.css';
import { Button, Typography } from '@mui/material';
import { Fragment } from 'react';

function VehicleInfo(props:any) {
    const { appData, setAppData, updateVehicles } = props

    const addVehicle = () => {
        setAppData({...appData, vehicles: [...appData?.vehicles, {}]})
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' key='title'>
                        Vehicle(s)
                    </Typography>
                </Grid>
                {appData.vehicles && appData?.vehicles.map((_: any, i: number) => { return (
                    <Fragment key={`vehicle-${i}`}>
                        <Grid item xs={2} key={`grid-year-vehicle-${i}`}>
                            <TextField 
                                className='textfield' 
                                value={appData?.vehicles[i]?.year ? appData.vehicles[i]['year'] : ''} 
                                id={`year`} 
                                label='Model Year' 
                                key={`year-vehicle-${i}`}
                                variant='outlined' 
                                fullWidth 
                                onChange={(e) => updateVehicles(e.target.id, e.target.value, i)}
                                disabled={appData.isSubmitted}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField 
                                className='textfield' 
                                value={appData?.vehicles[i]?.make ? appData.vehicles[i]['make'] : ''} 
                                id={`make`}
                                label='Make'
                                key={`make-vehicle-${i}`}
                                variant='outlined' 
                                fullWidth 
                                onChange={(e) => updateVehicles(e.target.id, e.target.value, i)}
                                disabled={appData.isSubmitted}    
                            />
                        </Grid>
                        <Grid item xs={2} key={`grid-model-vehicle-${i}`}>
                            <TextField 
                                className='textfield' 
                                value={appData?.vehicles[i]?.model ? appData.vehicles[i]['model'] : ''} 
                                id={`model`} 
                                label='Model'
                                key={`model-vehicle-${i}`} 
                                variant='outlined' 
                                fullWidth 
                                onChange={(e) => updateVehicles(e.target.id, e.target.value, i)}
                                disabled={appData.isSubmitted}
                            />
                        </Grid>
                        <Grid item xs={6} key={`grid-vin-vehicle-${i}`}>
                            <TextField 
                                className='textfield' 
                                value={appData?.vehicles[i]?.vin ? appData.vehicles[i]['vin'] : ''} 
                                id={`vin`} 
                                label='VIN' 
                                variant='outlined'
                                key={`vin-vehicle-${i}`}
                                fullWidth 
                                onChange={(e) => updateVehicles(e.target.id, e.target.value, i)}
                                disabled={appData.isSubmitted}
                            />
                        </Grid>
                    </Fragment>
                )})}
                {!appData.isSubmitted && (appData?.vehicles?.length < 3) &&
                    <Grid item xs={2}>
                        <Button 
                            variant='text'
                            onClick={addVehicle}
                        >
                            + Add Vehicle
                        </Button>
                    </Grid>
                }
            </Grid>
        </div>
    );
}

export default VehicleInfo;

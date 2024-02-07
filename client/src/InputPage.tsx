import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import miniCoop from './assets/miniCooper.png';
import Grid from '@mui/material/Grid'
import { createTheme } from '@mui/material/styles'
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

import clientActions from './clientActions';
import PersonalInfo from './InputComponents/PersonalInfo';
import AddressInfo from './InputComponents/AddressInfo';
import VehicleInfo from './InputComponents/VehicleInfo';

const darkTheme = createTheme({ 
    palette: { 
        mode: 'dark', 
    }, 
});

function InputPage() {
    const [appData, setAppData] = useState<Record<string, any>>({})
    const [appSaved, setAppSaved] = useState(false)
    const [appSavedTime, setAppSavedTime] = useState<any>(null)
    const [dobIsValid, setDobIsValid] = useState(true)
    const [yearIsValid, setYearIsValid] = useState(true)
    const [zipIsValid, setZipIsValid] = useState(true)
    const [formFullyValidated, setFormFullyValidated] = useState(true)
    const [searchParams] = useSearchParams()
    const paramsId = searchParams.get("id");

    useEffect(() => {
        if (paramsId) {
            getApplication()
        }
    }, [paramsId])
    
    const getApplication = async () => {
        const app = await clientActions.getApplication(paramsId ? paramsId : '');
        setAppData(app?.data)
    }

    const validateDOB = () => {
        const today = new Date();
        const sixteenYearsAgo = today.setFullYear(today.getFullYear()-16)
        if (!appData?.dob || appData?.dob > sixteenYearsAgo) {
            return false;
        }
        return true
    }

    const validateModelYear = (year: string) => {
        const numYear = parseInt(year)
        const today = new Date()
        if (year.length != 4 || Number.isNaN(numYear) || numYear < 1985 || numYear > today.getFullYear()+1) {
            return false
        }
        return true
    }

    const validateZIP = () => {
        if (!appData?.zip || appData['zip'].length != 5) {
            return false;
        }
        for (let i=0; i<appData?.zip.length; i++) {
            if (Number.isNaN(parseInt(appData?.zip[i]))) {
                return false
            }
        }
        return true
    }

    const softValidate = () => {
        let dobvalid = true
        if (appData?.dob) {
            dobvalid = validateDOB()
            setDobIsValid(dobvalid)
        }
        let zipvalid = true
        if (appData?.zip) {
            zipvalid = validateZIP()
            setZipIsValid(zipvalid)
        }
        let allVehicleYearsValid = true
        for (let i=0; i<appData?.vehicles.length; i++) {
            if (appData?.vehicles[i]?.year) {
                if (!validateModelYear(appData?.vehicles[i]?.year)) {
                    allVehicleYearsValid = false
                }
            }
        }
        setYearIsValid(allVehicleYearsValid)
        return (dobvalid && zipvalid && allVehicleYearsValid)
    }

    const validateAll = () => {
        let allFilled = true
        let appFields = Object.keys(appData)
        appFields.splice(appFields.indexOf('isSubmitted'), 1)
        appFields.splice(appFields.indexOf('price'), 1)
        appFields.forEach((key) => {
            if (!appData[key]) {
                allFilled = false
            }
        })
        if (appData?.vehicles && appData?.vehicles.length) {
            appData?.vehicles.forEach((v:any) => {
                if (!v['vin'] || !v['year'] || !v['make'] || !v['model']) {
                    allFilled = false
                }
            })
        } else {
            allFilled = false
        }
        setFormFullyValidated(allFilled)
        return allFilled
    }

    useEffect(() => {
        setFormFullyValidated(validateAll())
    }, [appData])

    const saveApplication = () => {
        const shouldSave = softValidate()
        if (shouldSave) {
            const fullAppData = {...appData, id: paramsId}
            clientActions.saveApplication(fullAppData, paramsId);
            setAppSaved(true)
            setAppSavedTime(new Date())
        }
    }

    const submitApplication = async () => {
        const shouldSave = softValidate()
        const shouldSubmit = validateAll()
        if (shouldSave && shouldSubmit) {
            saveApplication()
            let res = await clientActions.submitApplication(paramsId);
            console.log(res)
            setAppData({...appData, isSubmitted: true, price: res?.data?.price})
        }
    }

    const updateVehicles = (key: string, val: string, ind: number) => {
        if ((appData?.vehicles).length) {
            let temp : any[] = [...appData?.vehicles]
            temp[ind][`${key}`] = val
            setAppData({...appData, vehicles: temp})
        } else {
            let temp : any = {}
            temp[`${key}`] = val
            setAppData({...appData, vehicles: [temp]})
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                <a href="https://www.linkedin.com/in/sam-schlesinger/" target="_blank">
                    <img src={miniCoop} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Sam's Car Insurance Demo</h1>
            <h3>Application Number: {appData.id}</h3>
            <Grid container columnSpacing={2} rowSpacing={4}>

                {appData?.isSubmitted && 
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        This application has been submitted. If you need additional coverage, please start a new application.
                    </Typography>
                </Grid>
                }

                <Grid item xs={12}>
                    <PersonalInfo appData={appData} setAppData={setAppData} />
                </Grid>

                <Grid item xs={12}>
                    <AddressInfo appData={appData} setAppData={setAppData} />
                </Grid>

                <Grid item xs={12}>
                    <VehicleInfo appData={appData} setAppData={setAppData} updateVehicles={updateVehicles} />
                </Grid>

                {!formFullyValidated &&
                    <Grid item xs={12}>
                        <Typography variant='body1' color={'white'}>
                            Please fill in all fields including at least one vehicle before submitting.
                        </Typography>
                    </Grid>
                }

                {appData.price &&
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Your price is: {appData.price}
                        </Typography>
                    </Grid>
                }

                {appSaved && appSavedTime && !appData?.isSubmitted &&
                    <Grid item xs={12}>
                        <Typography variant='body1'>
                            Your application was successfully saved on {appSavedTime.toDateString()} at {appSavedTime.toTimeString()}
                        </Typography>
                    </Grid>
                }
                {!dobIsValid &&
                    <Grid item xs={12}>
                        <Typography variant='body1' color={'red'}>
                            You must be 16 years of age or older to apply. Please check provided Date of Birth.
                        </Typography>
                    </Grid>
                }

                {!yearIsValid &&
                    <Grid item xs={12}>
                        <Typography variant='body1' color={'red'}>
                            Vehicle model year must be a valid year be between 1985 and (current year + 1). Please check provided model year for all vehicles.
                        </Typography>
                    </Grid>
                }

                {!zipIsValid &&
                    <Grid item xs={12}>
                        <Typography variant='body1' color={'red'}>
                            ZIP Code provided is invalid. Please confirm five-digit, numeric ZIP code.
                        </Typography>
                    </Grid>
                }

                {!appData?.isSubmitted &&
                    <Grid item xs={6}>
                        <Button 
                        variant='contained'
                        onClick={saveApplication}
                        >
                            Save Application
                        </Button>
                    </Grid>
                }
                {!appData?.isSubmitted &&
                    <Grid item xs={6}>
                        <Button 
                        variant='contained'
                        onClick={submitApplication}
                        disabled={!formFullyValidated}
                        >
                            Submit Application
                        </Button>
                    </Grid>
                }

            </Grid>
        </ThemeProvider>
    );
}

export default InputPage;

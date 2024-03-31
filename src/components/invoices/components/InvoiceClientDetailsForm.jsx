import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import FormHeader from '@/components/invoices/components/FormHeader';

const InvoiceClientDetailsForm = ({ clientDetails, setClientDetails, onFormSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <>
            <FormHeader
                title="Add My Client Details"
                buttonText="Save"
                onButtonClick={ onFormSave } />
            <Box sx={ { overflowY: 'auto', maxHeight: '47vh' } }>
                <Grid container spacing={ 1 }>
                    <Grid item xs={ 12 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Name"
                            name="name"
                            value={ clientDetails.name }
                            onChange={ handleChange }
                            required
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            name="email"
                            value={ clientDetails.email }
                            onChange={ handleChange }
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Phone Number"
                            name="phoneNumber"
                            value={ clientDetails.phoneNumber }
                            onChange={ handleChange }
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Billing Address"
                            name="billingAddress"
                            value={ clientDetails.billingAddress }
                            onChange={ handleChange }
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Shipping Address"
                            name="shippingAddress"
                            value={ clientDetails.shippingAddress }
                            onChange={ handleChange }
                            margin="dense"
                        />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <TextField
                            fullWidth
                            size="small"
                            label="Contact Person"
                            name="contactPerson"
                            value={ clientDetails.contactPerson }
                            onChange={ handleChange }
                            margin="dense"
                        />
                    </Grid>
                    {/*<Grid item xs={ 12 }>*/ }
                    {/*    <Button type="submit" variant="contained" color="primary">*/ }
                    {/*        Save*/ }
                    {/*    </Button>*/ }
                    {/*</Grid>*/ }
                </Grid>
            </Box>
        </>
    );
};

export default InvoiceClientDetailsForm;

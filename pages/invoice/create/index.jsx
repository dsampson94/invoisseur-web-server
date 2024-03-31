'use client';

import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Container, Grid, Paper, Step, StepButton, Stepper } from '@mui/material';
import InvoicePDF from '@/components/invoices/default';
import dynamic from 'next/dynamic';
import InvoiceUserCompanyDetailsForm from '@/components/invoices/components/InvoiceUserCompanyDetailsForm';
import InvoiceDetailsForm from '@/components/invoices/components/InvoiceDetailsForm';
import InvoiceClientDetailsForm from '@/components/invoices/components/InvoiceClientDetailsForm';
import InvoiceItemsForm from '@/components/invoices/components/InvoiceItemsForm';

const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    { ssr: false }
);

const steps = ['Invoice Details', 'Invoice Items', 'Company Details', 'Client Details'];

const InvoiceCreatePage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [items, setItems] = useState([{ name: '', amount: '' }]);
    const [taxRate, setTaxRate] = useState(0.1);
    const [showItems, setShowItems] = useState(false);

    const [userName, setUserName] = useState('');
    const [clientName, setClientName] = useState('');
    const [invoiceName, setInvoiceName] = useState('');

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [companyDetails, setCompanyDetails] = useState({
        name: '',
        taxId: '',
        address: '',
        email: '',
        phoneNumber: '',
        website: '',
        logo: '',
        industry: '',
        companySize: ''
    });

    const [clientDetails, setClientDetails] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        billingAddress: '',
        shippingAddress: '',
        contactPerson: ''
    });

    const handleItemChange = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', amount: '' }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const calculateSubtotal = () => {
        return items.reduce((total, item) => total + parseFloat(item.amount || 0), 0);
    };

    const calculateTaxAmount = () => {
        return calculateSubtotal() * taxRate;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTaxAmount();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    return (
        <Container maxWidth="lg" sx={ { p: 3, overflow: 'hidden' } }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 } md={ 6 } sx={ { p: 2, maxHeight: '450px' } }>
                    <Paper elevation={ 4 } sx={ {
                        p: 2,
                        borderRadius: '8px',
                        bgcolor: 'background.default',
                        boxShadow: '0px 0px 32px black',
                    } }>
                        <Stepper sx={ { pb: 2 } } nonLinear activeStep={ activeStep } alternativeLabel>
                            { steps.map((label, index) => (
                                <Step key={ label } completed={ index < activeStep }>
                                    <StepButton onClick={ handleStep(index) }>{ label }</StepButton>
                                </Step>
                            )) }
                        </Stepper>
                        { activeStep === 0 &&
                            <InvoiceDetailsForm
                                userName={ userName }
                                setUserName={ setUserName }
                                clientName={ clientName }
                                setClientName={ setClientName }
                                invoiceName={ invoiceName }
                                setInvoiceName={ setInvoiceName }
                                handleSubmit={ handleSubmit }
                            /> }
                        { activeStep === 1 &&
                            <InvoiceItemsForm
                                items={ items }
                                onAddItem={ handleAddItem }
                                onItemChange={ handleItemChange }
                                onRemoveItem={ handleRemoveItem } /> }
                        { activeStep === 2 &&
                            <InvoiceUserCompanyDetailsForm
                                userDetails={ userDetails }
                                setUserDetails={ setUserDetails }
                                companyDetails={ companyDetails }
                                setCompanyDetails={ setCompanyDetails } /> }
                        { activeStep === 3 &&
                            <InvoiceClientDetailsForm
                                clientDetails={ clientDetails }
                                setClientDetails={ setClientDetails } /> }
                    </Paper>
                </Grid>

                <Grid item xs={ 12 } md={ 6 } sx={ { p: 2, maxHeight: '450px' } }>
                    <Paper elevation={ 4 } sx={ {
                        borderRadius: '8px',
                        bgcolor: 'background.default',
                        boxShadow: '0px 0px 32px black',
                    } }>
                        <PDFViewer width="100%" height="450px">
                            <InvoicePDF invoiceData={ {
                                clientName,
                                items,
                                subtotal: calculateSubtotal(),
                                taxRate,
                                taxAmount: calculateTaxAmount(),
                                total: calculateTotal()
                            } } />
                        </PDFViewer>
                    </Paper>
                </Grid>
            </Grid>

            { clientName && items.length > 0 && (
                <PDFDownloadLink document={ <InvoicePDF
                    invoiceData={ { clientName, items, subtotal: calculateSubtotal(), taxRate, taxAmount: calculateTaxAmount(), total: calculateTotal() } } /> }
                                 fileName="invoice.pdf">
                    { ({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF') }
                </PDFDownloadLink>
            ) }
        </Container>
    );
};

export default InvoiceCreatePage;

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the invoice
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: '40px',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '2px solid #000000',
        paddingBottom: '20px',
        marginBottom: '30px',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        marginBottom: '5px',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '3px',
    },
    clientInfo: {
        marginBottom: '30px',
    },
    items: {
        marginBottom: '30px',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5px',
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '2px solid #000000',
        paddingTop: '20px',
    },
    totalLabel: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const InvoicePDF = ({ invoiceData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.header}>
                    <Text style={styles.title}>Invoice</Text>
                    <View>
                        <Text style={styles.subtitle}>Invoice Number:</Text>
                        <Text>{invoiceData.invoiceNumber}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Date:</Text>
                        <Text>{invoiceData.date}</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Due Date:</Text>
                        <Text>{invoiceData.dueDate}</Text>
                    </View>
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.subtitle}>User Information</Text>
                    <Text style={styles.label}>Username:</Text>
                    <Text>{invoiceData.username}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text>{invoiceData.email}</Text>
                    <Text style={styles.label}>Company:</Text>
                    <Text>{invoiceData.company}</Text>
                </View>
                <View style={styles.clientInfo}>
                    <Text style={styles.subtitle}>Client Information</Text>
                    <Text style={styles.label}>Name:</Text>
                    <Text>{invoiceData.clientName}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text>{invoiceData.clientEmail}</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text>{invoiceData.clientAddress}</Text>
                </View>
                <View style={styles.items}>
                    <Text style={styles.subtitle}>Invoice Items</Text>
                    {invoiceData.items.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>${item.amount}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.total}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${invoiceData.total}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default InvoicePDF;

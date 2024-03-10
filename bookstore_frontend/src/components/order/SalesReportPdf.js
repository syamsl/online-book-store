import React,{useEffect} from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell,
} from "@david.kucsai/react-pdf-table";


const SalesReportPdf = ({ salesReport }) => {

// console.log("Sales Report--->",salesReport);

    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>
                    ~ {new Date().toLocaleString()} ~
                </Text>
                <Text style={styles.title}>Sales Report</Text>
                <Text style={styles.author}>Book Store</Text>

                <Table>
                    <TableHeader>
                        <TableCell  style={styles.id}>OrderId</TableCell>
                        <TableCell  style={styles.id}>User</TableCell>
                        <TableCell  style={styles.id}>Date</TableCell>
                        <TableCell  style={styles.id}>Price</TableCell>
                        <TableCell  style={styles.id}>Payment Method</TableCell>
                    </TableHeader>
                </Table>

                <Table data={salesReport}>
                    <TableBody>
                        <DataTableCell getContent={(x) => x._id}   style={styles.id}/>
                        <DataTableCell getContent={(x) => x.user[0].email}  style={styles.id} />
                        <DataTableCell getContent={(x) => new Date(x.createdAt).toISOString().split('T')[0]}  style={styles.id}/>
                        <DataTableCell getContent={(x) => `Rs. ${x.paymentIntent.amount}`}  style={styles.id}/>
                        <DataTableCell getContent={(x) => x.paymentIntent.payment_method_types[0]}  style={styles.id} />
                    </TableBody>
                </Table>
                <Text style={styles.text}></Text>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
      },
      section: {
        margin: 5,
        padding: 5,
        flexGrow: 1,
      },
      body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
      },
      author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
      },
      subtitle: {
        fontSize: 18,
        margin: 12,
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
      },
      id: {
        padding: 0,
        fontSize: 9,
        textAlign: 'center',
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
      footer: {
        padding: '100px',
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
});

export default SalesReportPdf;

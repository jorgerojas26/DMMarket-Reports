import { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'components/DatePicker';
import { fetchInvoiceList } from '../../api/invoice';
import InvoicesTable from 'components/InvoicesTable';
import ProductsTable from 'components/ProductsTable';

const InvoicesPage = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const productsSummary = useMemo(() => {
    if (!selectedRows || selectedRows.length === 0) return [];

    const products = {};

    selectedRows.forEach((row) => {
      row.products.forEach((product) => {
        if (!products[product.productId]) {
          products[product.productId] = {
            ...product,
            quantity: 0,
          };
        }

        products[product.productId].quantity += product.quantity;
      });
    });
    //convert products to an array
    return Object.values(products);
  }, [selectedRows]);

  console.log('productsSummary', productsSummary);

  const onSubmit = async (event, dateRange) => {
    event.preventDefault();

    setLoading(true);
    const response = await fetchInvoiceList(dateRange);
    setInvoices(response);
    setLoading(false);
  };

  return (
    <Container fluid>
      <DatePicker onSubmit={onSubmit} loading={loading} />
      <div className='d-flex flex-column flex-xl-row justify-content-center gap-3'>
        <div className='col-12 col-xl-6'>
          <InvoicesTable data={invoices} loading={loading} onRowSelect={setSelectedRows} />
        </div>
        <div className='col-12 col-xl-6'>
          <ProductsTable data={productsSummary} loading={loading} />
        </div>
      </div>
    </Container>
  );
};

export default InvoicesPage;
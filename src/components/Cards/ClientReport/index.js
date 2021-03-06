import ClientReportTable from 'components/ClientReportTable';

const ClientReportCard = ({ loading, data = [], onFilter }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h3>Mejores clientes</h3>
      </div>
      <div className='card-body'>
        {data.length > 0 && (
          <>
            <input
              className='input-filter'
              placeholder='Buscar...'
              type='search'
              onChange={(event) => onFilter(event.target.value, 'client', 'client_report')}
            />
            <ClientReportTable data={data} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
};

export default ClientReportCard;

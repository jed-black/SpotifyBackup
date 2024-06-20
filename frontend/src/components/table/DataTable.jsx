import React from 'react';

const DataTable = ({ data }) => {
  const columns = data && Object.keys(data[0]);

  return (
    <div className="spotify-table">
      <table>
        <thead>
          <tr>
            {columns && columns.map((column) => (
                <th key={column} style={{ color: 'green' }}>{column.toUpperCase()}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
              <tr key={item.id || Math.random()}>
                {columns.map((column) => (
                  <td key={column} style={{ color: 'green' }}>{item[column]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

  
export default DataTable
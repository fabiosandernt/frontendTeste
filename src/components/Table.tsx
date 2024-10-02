import React from 'react';

interface Column {
  header: string;  // Nome do cabeçalho
  key: string;     // Chave que corresponde ao campo dos dados
  render?: (item: any) => JSX.Element; // Função opcional para renderizar elementos customizados, como botões
}

interface TableProps {
  columns: Column[];  // Array de colunas
  data: any[];        // Array de dados
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

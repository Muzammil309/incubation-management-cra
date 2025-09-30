import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface WowTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

const WowTable: React.FC<WowTableProps> = ({
  columns,
  data,
  className = '',
  striped = false,
  hoverable = true,
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 === 1 ? 'bg-neutral-50' : ''}
                ${hoverable ? 'hover:bg-neutral-100 transition-colors duration-150' : ''}
              `}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default WowTable;


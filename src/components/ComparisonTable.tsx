import React from 'react';
import { Check, Minus } from 'lucide-react';

export interface ColumnDef {
  key: string;
  header: string;
  type?: 'text' | 'boolean' | 'badge' | 'highlight';
  align?: 'left' | 'center' | 'right';
}

export interface ComparisonTableProps {
  title?: string;
  description?: string;
  columns: ColumnDef[];
  data: any[];
}

export default function ComparisonTable({ title, description, columns, data }: ComparisonTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 my-12 overflow-x-auto">
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="font-heading font-extrabold text-2xl text-brand-primary mb-2">
              {title}
            </h2>
          )}
          {description && <p className="text-slate-600">{description}</p>}
        </div>
      )}

      <div className="min-w-[800px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-4 px-4 font-bold text-slate-800 ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                }`}
              >
                {columns.map((col) => {
                  const val = row[col.key];

                  let content = val;
                  if (col.type === 'boolean') {
                    content = val ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Minus className="w-5 h-5 text-slate-300 mx-auto" />
                    );
                  } else if (col.type === 'badge') {
                    content = (
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                        {val}
                      </span>
                    );
                  } else if (col.type === 'highlight') {
                    content = <span className="font-bold text-brand-primary">{val}</span>;
                  }

                  return (
                    <td
                      key={col.key}
                      className={`py-4 px-4 text-slate-600 ${
                        col.type === 'highlight' ? 'font-bold' : ''
                      } ${
                        col.align === 'center'
                          ? 'text-center'
                          : col.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                      }`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

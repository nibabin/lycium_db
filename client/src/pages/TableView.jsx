import React, { useState, useEffect, useMemo } from 'react';
import SpecimenAPI from '../../services/SpecimenAPI'; // Adjust the import path as necessary
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
  import '../css/TableView.css'

function TableView() {
  const [specimen, setSpecimen] = useState([]);

  const [sorting, setSorting] = useState([])


  useEffect(() => {
    const fetchSpecimen = async () => {
      try {
        const data = await SpecimenAPI.getAllSpecimen();
        setSpecimen(data);
      } catch (error) {
        console.error('Error fetching specimen:', error);
      }
    };

    fetchSpecimen();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'genus', header: 'Genus' },
      { accessorKey: 'species', header: 'Species' },
      { accessorKey: 'field_pop_id', header: 'Field ID' },
      { accessorKey: 'greenhouse', header: 'Greenhouse' },
      { accessorKey: 'voucher_specimen', header: 'Voucher' },
      { accessorKey: 'collection_date', header: 'Collection Date' },
      { accessorKey: 'provenance', header: 'Provenance' },
      { accessorKey: 'country', header: 'Country' },
      { accessorKey: 'state_province', header: 'State' },
      { accessorKey: 'specific_locality', header: 'Specific Local' },
      { accessorKey: 'latitude', header: 'Latitude' },
      { accessorKey: 'longitude', header: 'Longitude' },
      { accessorKey: 'notes', header: 'Notes' },
      { accessorKey: 'material', header: 'Material' },
      { accessorKey: 'nanodrop_concentration', header: 'Nanodrop Concentration' },
      { accessorKey: 'nanodrop_ratio', header: 'Nanodrop Ratio' },
      { accessorKey: 'published ', header: 'Published' },


    ],
    []
  );

  const table = useReactTable({
    data: specimen,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="tableDiv">
      <div />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th className="tableHeader" key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'sortHeader'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td className="tableCell"  key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )
}

export default TableView;
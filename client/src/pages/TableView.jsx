import React, { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import '../css/TableView.css'
import { Spinner } from '@chakra-ui/react'
import EditButton from '../components/EditButton';
import DeleteButton from '../components/DeleteButton';
import ExportExcelButton from '../components/ExportExcelButton';
import { useDataContext } from '../context/DataProvider';
import Filter from '../components/Filter';

function TableView() {

  const { specimenData, setSpecimenData } = useDataContext();

  const columns = useMemo(
    () => [
      {
        header: 'Actions',
        accessorKey: 'actions', 
        cell: ({ row }) => {
          return (
            <div className="table-buttons">
              <EditButton  row={row.original} />
              <DeleteButton row={row.original}/>
            </div>
          );
        },
      },
      { accessorKey: 'extraction_number', header: 'Extraction Number' },
      { accessorKey: 'extraction_date', header: 'Extraction Date',
        cell: ({ row }) => {
          const collectionDate = new Date(row.original.collection_date);
          return collectionDate.toLocaleDateString();
        }, },      { accessorKey: 'genus', header: 'Genus' },
      { accessorKey: 'species', header: 'Species' },
      { accessorKey: 'field_pop_id', header: 'Field ID' },
      { accessorKey: 'greenhouse', header: 'Greenhouse' },
      { accessorKey: 'voucher_specimen', header: 'Voucher' },
      { accessorKey: 'collection_date', header: 'Collection Date',
        cell: ({ row }) => {
          const collectionDate = new Date(row.original.collection_date);
          return collectionDate.toLocaleDateString();
        }, },
      { accessorKey: 'provenance', header: 'Provenance' },
      { accessorKey: 'country', header: 'Country' },
      { accessorKey: 'state_provenance', header: 'State' },
      { accessorKey: 'specific_locality', header: 'Specific Local' },
      { accessorKey: 'lat', header: 'Latitude' },
      { accessorKey: 'long', header: 'Longitude' },
      { accessorKey: 'notes', header: 'Notes' },
      { accessorKey: 'material', header: 'Material' },
      { accessorKey: 'nanodrop_concentration', header: 'Nanodrop Concentration' },
      { accessorKey: 'nanodrop_ratio', header: 'Nanodrop Ratio' },
      { accessorKey: 'published ', header: 'Published' },
    ],
    []
  );

  const table = useReactTable({
    data: specimenData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
          pageSize: 10,
      },
    },
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <>
    <Filter/>
    <div className="table-wrapper">
          <ExportExcelButton />

      {specimenData.length === 0 ? <Spinner className="spinner" size="xl" /> :
    <div className="tableDiv">
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
            .rows
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
      <div className="table-options-wrapper">
        <button
          className="table-options-button"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="table-options-button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="table-options-button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="table-options-button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>}
</div>
</>
  )
}

export default TableView;
import { useEffect, useMemo, useState } from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Box, Pagination } from "@mui/material"
import { IChangeEvent, IListPayload } from "../interface"
import { SearchBar, ShowPerPage, TableStyle } from "../assets/style"

interface ICustomTableProps {
  columns: any
  data: any[]
  loadList: (payload: IListPayload) => void
  loader: boolean
  totalItemCount: number
}

interface ITableState {
  search: string
  perPage: number
  page: number
}

export default function CustomTableComponent(props: ICustomTableProps) {
  const [tableState, setTableState] = useState<ITableState>({
    search: "",
    perPage: 10,
    page: 1,
  })
  const { data, columns, loadList, totalItemCount, loader } = props
  const { search, perPage, page } = tableState
  const [sorting, setSorting] = useState<SortingState>([])

  const headers = useMemo<ColumnDef<any>[]>(() => columns, [])

  const table = useReactTable({
    data,
    columns: headers,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  })

  const { setPageSize } = table

  const handlePagination = (_e: React.ChangeEvent<unknown>, value: number) => {
    setTableState(state => ({ ...state, page: value }))
  }

  const changeHandler = (e: IChangeEvent) => {
    const { name, value } = e.target
    setTableState(state => ({ ...state, [name]: value }))
    if (name === "perPage") {
      setPageSize(+value)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const clonePayload = JSON.parse(JSON.stringify(tableState))

      if (search.length === 0) {
        delete clonePayload.search
      }

      loadList(clonePayload)
    }, 250)

    return () => clearTimeout(timer)
  }, [search, perPage, page])

  return (
    <>
      <Box display="flex" flexDirection={{xs:"column", lg:"row"}} pt={3} pb={2} justifyContent="space-between" alignItems={{xs:"center"}}>
        <ShowPerPage>
          Show
          <select name="perPage" onChange={changeHandler}>
            {[10, 15, 25, 50].map((item: number, i: number) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              )
            })}
          </select>
          per page
        </ShowPerPage>
        <SearchBar>
          <input type="text" placeholder="Search..." name="search" value={search} onChange={changeHandler} />
        </SearchBar>
      </Box>
      <TableStyle>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loader ? (
              <tr>
                <td className="table_min_height_section" colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div className="table_loader">
                    <div className="loader_content">
                      <span className="tableloader"></span>
                      <p>Loading...</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </TableStyle>

      <Box p={3} display="flex" justifyContent="flex-end">
        <Pagination count={Math.ceil(totalItemCount / perPage)} shape="rounded" onChange={handlePagination} />
      </Box>
    </>
  )
}

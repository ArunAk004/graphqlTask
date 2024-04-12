import { useEffect, useMemo, useState } from "react"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Box, Button, Pagination } from "@mui/material"
import { IChangeEvent, IListPayload } from "../interface"
import { Filters, Loader, SearchBar, ShowPerPage, TableStyle } from "../assets/style"
import arrowDown from "../assets/img/arrowDown.svg"
import arrowUp from "../assets/img/arrowUp.svg"
import empty_item from "../assets/img/empty_item.svg"
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
  type: string
  status: string
  seasonYear: string
}

const intialState = {
  search: "",
  perPage: 10,
  page: 1,
  type: "",
  status: "",
  seasonYear: "",
}

export default function CustomTableComponent(props: ICustomTableProps) {
  const [tableState, setTableState] = useState<ITableState>(intialState)
  const { data, columns, loadList, totalItemCount, loader } = props
  const { search, perPage, page, type, status, seasonYear } = tableState
  const [sorting, setSorting] = useState<SortingState>([])

  const headers = useMemo<ColumnDef<any>[]>(() => columns, [])

  const table = useReactTable({
    data,
    columns: headers,
    state: {
      sorting,
    },
    enableSorting: true,
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

      Object.keys(clonePayload).forEach((key: string) => {
        if (clonePayload[key].length === 0) {
          delete clonePayload[key]
        }
      })

      loadList(clonePayload)
    }, 250)

    return () => clearTimeout(timer)
  }, [search, perPage, page, type, status, seasonYear])

  const yearList = Array.from({ length: 125 }, (_, i) => 1900 + i)

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        pt={3}
        pb={2}
        justifyContent="space-between"
        alignItems={{ xs: "center" }}
      >
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
        <Filters>
          <div className="general_filters">
            {Object.values(tableState).some((s: string) => s.length > 0) && (
              <Button variant="contained" size="small" onClick={() => setTableState(intialState)}>
                Clear Filter
              </Button>
            )}

            <select name="seasonYear" value={seasonYear} onChange={changeHandler}>
              <option value="" defaultChecked>
                --Select Year---
              </option>
              {yearList.map((item: number, i: number) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                )
              })}
            </select>

            <select name="status" value={status} onChange={changeHandler}>
              <option value="" defaultChecked>
                --Select Status---
              </option>
              {["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"].map(
                (item: string, i: number) => {
                  return (
                    <option value={item} key={i}>
                      {item}
                    </option>
                  )
                }
              )}
            </select>

            <select name="type" value={type} onChange={changeHandler}>
              <option value="" defaultChecked>
                --Select Type---
              </option>
              {["ANIME", "MANGA"].map((item: string, i: number) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>

          <SearchBar>
            <input type="text" placeholder="Search..." name="search" value={search} onChange={changeHandler} />
          </SearchBar>
        </Filters>
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
                          <div className="header_text_style">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <div className="columnSort">
                              {{
                                asc: (
                                  <div className="arrows">
                                    <img src={arrowUp} alt="up" />
                                  </div>
                                ),
                                desc: (
                                  <div className="arrows">
                                    <img src={arrowDown} alt="down" />
                                  </div>
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <div className="arrows two">
                                  <img src={arrowUp} alt="up" />
                                  <img src={arrowDown} alt="down" />
                                </div>
                              )}
                            </div>
                          </div>
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
                      <Loader />
                      <p>Loading...</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td className="table_min_height_section" colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div className="table_loader">
                    <div className="loader_content">
                      <img className="empty_image" src={empty_item} alt="empty" />
                      <p>No Record Found</p>
                    </div>
                  </div>
                </td>
              </tr>
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

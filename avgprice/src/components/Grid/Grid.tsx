import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { encode } from '../../utils'
import './grid.css'

export const Grid = ({ rows }: any) => {
const columns = [
  { field: "name", headerName: "Name", width: 350, filterable: true,
    renderCell: (params: any) => (
        <a href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(params.value)}`} target="_blank" rel="noreferrer">
                          {params.value}
                        </a>
    ),
  },
  { field: "priceAverage", headerName: "Price", width: 100, 
    valueGetter: (value: any, row: any) => {
      if (value==0) {
        return 'unknown';
      }
      return `${value}`;
    },
    renderCell: (params: any) => (
      <strong>
        {params.value} gp
      </strong>
    ),
  },
  { field: "book", headerName: "Book", width: 250 },  

  { field: "priceSane", headerName: "Sane Price", width: 100, 
    valueGetter: (value: any, row: any) => {
      if (value==0) {
        return 'unknown';
      }
      return `${value}`;
    },
    renderCell: (params: any) => (
      <strong>
        {params.value} gp
      </strong>
    ),
  },
  { field: "priceMerchant", headerName: "Merchant Price", width: 100, 
    valueGetter: (value: any, row: any) => {
      if (value==0) {
        return 'unknown';
      }
      return `${value}`;
    },
    renderCell: (params: any) => (
      <strong>
        {params.value} gp
      </strong>
    ),
  },
];

function getRowId(row: any) {
  return row.name;
}

    return (<>
        <DataGrid rows={rows} 
          columns={columns} 
          getRowId={getRowId}
          disableColumnFilter
          disableDensitySelector
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          slots={{ toolbar: GridToolbar }}
          initialState={{
            ...rows.initialState,
            columns: {
              ...rows.initialState?.columns,
              columnVisibilityModel: {
                priceMerchant: false,
                priceSane: false,
              },
            },
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          />
           </>)
}
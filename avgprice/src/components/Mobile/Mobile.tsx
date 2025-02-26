import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { encode } from '../../utils'
import './mobile.css'

export const Mobile = ({ rows }: any) => {
const columns = [
  { field: "name", headerName: "Name", width: 250, filterable: true,
    renderCell: (params: any) => (
        <a href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(params.value)}`} target="_blank" rel="noreferrer">
                          {params.value}
                        </a>
    ),
  },
  { field: "priceAverage", headerName: "Price", width: 150, 
    valueGetter: (value: any) => {
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
    valueGetter: (value: any) => {
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
  { field: "priceMerchant", headerName: "Discerning Merchant Price", width: 200, 
    valueGetter: (value: any) => {
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
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          initialState={{
            ...rows.initialState,
            columns: {
              ...rows.initialState?.columns,
              columnVisibilityModel: {
                priceMerchant: false,
                priceSane: false,
                book: false,
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
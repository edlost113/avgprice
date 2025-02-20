
import { data } from './data'
import { DataGrid,GridToolbar } from "@mui/x-data-grid";

import { encode } from './utils'

const columns = [
  { field: "name", headerName: "Name", width: 350, filterable: true,
    renderCell: (params: any) => (
        <a href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(params.value)}`} target="_blank" rel="noreferrer">
                          {params.value}
                        </a>
    ),


  },
  { field: "price", headerName: "Price", width: 100, 
    renderCell: (params: any) => (
      <strong>
        {params.value} gp
      </strong>
    ),
  },
  { field: "book", headerName: "Book", width: 250 },  
];

function getRowId(row: any) {
  return row.name;
}

const App = () => {
  return (
    <div style={{ height: "100%", width: "98%", top: "0", position: "absolute", left: "1%" }}>
      <DataGrid rows={data} 
      columns={columns} 
      getRowId={getRowId}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      />
    </div>
  )
}

export default App
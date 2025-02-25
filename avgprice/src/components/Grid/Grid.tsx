import { DataGrid,GridToolbar, useGridApiRef} from "@mui/x-data-grid";
import { encode } from '../../utils'
import { usePersistColumnSettings } from './GridState'
import imgSrc from '../../assets/wondrousitem.jpg'
import './grid.css'

export const Grid = ({ rows }: any) => {

  function renderSwitch(raw: string) {
    var imgOut: string = imgSrc
    switch (raw) {
    case 'wonderousItem': imgOut = imgSrc;
    }
    return imgOut
  }

const columns = [
  { field: "itemType", headerName: "", width: 20, filterable: false, sortable: false, resizable: false, disableColumnMenu: true,
    renderCell: (params: any) => (
        <img className="imgIcon" src={renderSwitch(params)}></img>
    ),
  },
  { field: "name", headerName: "Name", width: 350, filterable: true,
    renderCell: (params: any) => (
        <a href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(params.value)}`} target="_blank" rel="noreferrer">
                          {params.value}
                        </a>
    ),
  },
  { field: "priceAverage", headerName: "Price", width: 100, 
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
const apiRef = useGridApiRef()
  usePersistColumnSettings(apiRef, 'customers-grid')
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
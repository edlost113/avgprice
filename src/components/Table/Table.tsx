import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
  } from 'mantine-react-table';
  import { data, type Items } from '../../data';
  import { useMemo } from 'react';

const Table = () => {
    const columns = useMemo<MRT_ColumnDef<Items>[]>(
        () => [
          {
            header: 'Item Name',
            accessorKey: 'name',
          },
          {
            header: 'Book',
            accessorKey: 'book',
          },
          {
            header: 'Average Price',
            accessorKey: 'priceAverage',
          },
          {
            header: 'Merchant Price',
            accessorKey: 'priceMerchant',
          },
          {
            header: 'Sane Price',
            accessorKey: 'priceSane',
          },
        ],[]);


    const table = useMantineReactTable({
        columns,
        data,
        enableColumnResizing: true,
        enableGrouping: false,
        enableGlobalFilter: true,
        enableStickyHeader: false,
        enableStickyFooter: false,
        enableBottomToolbar: false,
        enableDensityToggle: false,
        layoutMode: 'grid-no-grow',
        initialState: {
          density: 'md',
          expanded: true,
          columnVisibility: { priceSane: false, priceMerchant: false, },
          pagination: { pageIndex: 0, pageSize: 5000 },
          sorting: [{ id: 'name', desc: false }],
        },
        mantineToolbarAlertBannerBadgeProps: { color: 'blue', variant: 'outline' },
        mantineTableContainerProps: { style: { maxHeight: 700 } },
      });
    return <MantineReactTable table={table} />;
};

export default Table;
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_RowSelectionState,
  } from 'mantine-react-table';
  import imgSrcWonderous from '../../assets/wondrousitem.png'
  import imgSrcArmor from '../../assets/armor.png'
  import imgSrcWeapon from '../../assets/weapon.png'
  import { data, type Items } from '../../data';
  import { useMemo, useState, useEffect } from 'react';
  import { Grid,Image, Anchor, Box, Group} from '@mantine/core';
  import './table.css'
  import {ShoppingList} from '../Drawer/Drawer';


const Table = () => {
    const encode = (str: string) => encodeURIComponent(str)    
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available
    const [totalPrice, setTotalPrice] = useState(0);
    const [filterFnType, setFilterFnType] = useState(getFilterType());
    const [list, setList] = useState<string[]>([]);

    function getFilterType() {
      let fnTypeOut = 'fuzzy';
      let urlParams = new URLSearchParams(window.location.search);
      
      if ('fuzzy' === urlParams.get("filter")) {
        fnTypeOut = 'fuzzy';
      } else if ('contains' === urlParams.get("filter")) {
        fnTypeOut = 'contains'
      } else if ('startsWith' === urlParams.get("filter")) {
        fnTypeOut = 'startsWith'
      } else if ('endsWith' === urlParams.get("filter")) {
        fnTypeOut = 'endsWith'
      } else if ('equals' === urlParams.get("filter")) {
        fnTypeOut = 'equals'
      } else if ('between' === urlParams.get("filter")) {
        fnTypeOut = 'between'
      } 
      return fnTypeOut;
    }
    getFilterType();
    function renderSwitch(raw: string) {
      var imgOut: string = imgSrcWonderous
      switch (raw) {
      case 'wonderousItem': imgOut = imgSrcWonderous; break;
      case 'weaponItem': imgOut = imgSrcWeapon; break;
      case 'armorItem': imgOut = imgSrcArmor; break;
      }
      return imgOut
    }
    const columns = useMemo<MRT_ColumnDef<Items>[]>(
        () => [
          {
            header: 'Item Name',
            accessorKey: 'name',
            grow: true,
            Cell: ({ cell }) => (
              <>
              <Grid>
              <Image className="imgIcon" src={renderSwitch(cell.row.original.itemType)}></Image>
              &nbsp;&nbsp;&nbsp;
              <Anchor underline="hover" href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(cell.getValue<string>())}`} target="_blank" rel="noreferrer">
              {cell.getValue<string>()}
              </Anchor>
              </Grid>
              </>
            ),
          },
          {
            header: 'Book',
            accessorKey: 'book',
          },
          {
            header: 'Average Price',
            minSize: 200, //min size enforced during resizing
            accessorKey: 'priceAverage',
            Cell: ({ cell }) => (
              <>
              {cell.row.original.priceAverage ?  <Box><strong>{cell.row.original.priceAverage} gp</strong></Box>:<Box><strong style={{ color: 'red' }}>Unknown</strong></Box>}
              </>
            ),
          },
          {
            header: 'Merchant Price',
            minSize: 220, //min size enforced during resizing
            accessorKey: 'priceMerchant',
            Cell: ({ cell }) => (
              <>
              {cell.row.original.priceMerchant ?  <Box><strong>{cell.row.original.priceMerchant} gp</strong></Box>:<Box><strong style={{ color: 'red' }}>Unknown</strong></Box>}
              </>
            ),
          },
          {
            header: 'Sane Price',
            minSize: 100, //min size enforced during resizing
            accessorKey: 'priceSane',
            Cell: ({ cell }) => (
              <>
              {cell.row.original.priceSane ?  <Box><strong>{cell.row.original.priceSane} gp</strong></Box>:<Box><strong style={{ color: 'red' }}>Unknown</strong></Box>}
              </>
            ),
          },
        ],[]);

      const table = useMantineReactTable({
        columns,
        data,
        mantinePaginationProps: {
          rowsPerPageOptions: ['100', '200', '300', '2000'],
          withEdges: false, //note: changed from `showFirstLastButtons` in v1.0
        },
        enableColumnResizing: true,
        enableGrouping: true,
        enableGlobalFilter: true,
        enableTopToolbar: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableBottomToolbar: true,
        globalFilterFn: filterFnType,
        enableDensityToggle: false,
        enableRowSelection: (row) => row.original.priceAverage > 0,
        enableBatchRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (row) => row.name,
        renderTopToolbarCustomActions: ({ table }) => (
          <>
          <Group>
          <ShoppingList content={list}/>
          </Group>
          </>
        ),
        layoutMode: 'grid-no-grow',
        initialState: {
          density: 'md',
          expanded: true,
          columnVisibility: { priceSane: false, priceMerchant: false, },
          pagination: { pageIndex: 0, pageSize: 100 },
          sorting: [{ id: 'name', desc: false }],
        },
        mantineToolbarAlertBannerBadgeProps: { color: 'blue', variant: 'outline' },
        mantineTableContainerProps: { style: { maxHeight: 730, } },
        mantineToolbarAlertBannerProps: {title:calcTotal("Total Price: ") },
      });

      useEffect(() => {
        //fetch data based on row selection state or something
        const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
        var shoppingList: [string] = [""];
              var totalPriceA = 0;
              var totalPriceS = 0;
              var totalPriceM = 0;
              selectedRows.forEach(row => {
                var avgPrice = (row.original.priceAverage) ? row.original.priceAverage : "Unknown" 
                var sanePrice = (row.original.priceSane) ? row.original.priceSane : "Unknown" 
                var merchantPrice = (row.original.priceMerchant) ? row.original.priceMerchant : "Unknown" 
                shoppingList.push(row.original.name + ": Average Price: " + avgPrice + ",     Sane Price: " + sanePrice + ",     Merchant Price: " + merchantPrice);
                totalPriceA = totalPriceA + row.original.priceAverage;
                totalPriceS = totalPriceS + row.original.priceSane;
                totalPriceM = totalPriceM + row.original.priceMerchant;
              });
              shoppingList.push( "________________________");
              shoppingList.push( " Total Average Price: " + totalPriceA);
              shoppingList.push(" Total Sane Price: " + totalPriceS);
              shoppingList.push(" Total Merchant Price: " + totalPriceM);
              setTotalPrice(totalPriceA);
              setList(shoppingList);
      }, [table.getState().rowSelection]);

      function calcTotal(raw: string) {
        var priceOut: string = raw
        priceOut = priceOut + totalPrice + " gp"
        return priceOut;
      }
    
    return <MantineReactTable table={table} />;
};

export default Table;
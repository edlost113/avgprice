import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_TableInstance,
    type MRT_RowSelectionState,
  } from 'mantine-react-table';
  import imgSrcWonderous from '../../assets/wondrousitem.png'
  import imgSrcArmor from '../../assets/armor.png'
  import imgSrcWeapon from '../../assets/weapon.png'
  import { data, type Items } from '../../data';
  import { useMemo, useState, useEffect } from 'react';
  import { Grid,Image, Anchor, Button, Box, Stack,Group, useMantineColorScheme} from '@mantine/core';
  import './table.css'
  import { modals } from '@mantine/modals';
const Table = () => {
    const encode = (str: string) => encodeURIComponent(str)
    const { setColorScheme } = useMantineColorScheme();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available
    const [totalPrice, setTotalPrice] = useState(0);
    setColorScheme('auto');
    function renderSwitch(raw: string) {
      var imgOut: string = imgSrcWonderous
      switch (raw) {
      case 'wonderousItem': imgOut = imgSrcWonderous; break;
      case 'weaponItem': imgOut = imgSrcWeapon; break;
      case 'armorItem': imgOut = imgSrcArmor; break;
      }
      return imgOut
    }
    const openModal = (shoppingList: string) => modals.openConfirmModal({
      title: 'Shopping List',
      children: (
        <Stack>
          {shoppingList}
        </Stack>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });
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
        enableColumnResizing: true,
        enableGrouping: true,
        enableGlobalFilter: true,
        enableTopToolbar: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableBottomToolbar: true,
        enableDensityToggle: false,
        enableRowSelection: (row) => row.original.priceAverage > 0,
        enableBatchRowSelection: true,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (row) => row.name,
        renderTopToolbarCustomActions: ({ table }) => (
          <>
          <Group>
          <Button
            onClick={() => {
              const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
              var shoppingList = "";
              var totalPriceA = 0;
              var totalPriceS = 0;
              var totalPriceM = 0;
              selectedRows.forEach(row => {
                var avgPrice = (row.original.priceAverage) ? row.original.priceAverage : "Unknown" 
                var sanePrice = (row.original.priceSane) ? row.original.priceSane : "Unknown" 
                var merchantPrice = (row.original.priceMerchant) ? row.original.priceMerchant : "Unknown" 
                shoppingList = shoppingList + row.original.name + " Average Price: " + avgPrice + " Sane Price: " + sanePrice + " Merchant Price: " + merchantPrice +" | ";
                totalPriceA = totalPriceA + row.original.priceAverage;
                totalPriceS = totalPriceS + row.original.priceSane;
                totalPriceM = totalPriceM + row.original.priceMerchant;
              });
              shoppingList = shoppingList + " Total Average Price: " + totalPriceA +" |";
              shoppingList = shoppingList + " Total Sane Price: " + totalPriceS +" |";
              shoppingList = shoppingList + " Total Merchant Price: " + totalPriceM +" |";
              openModal(shoppingList);
            }}
          >
            Calculate Total Price
          </Button>
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
        var totalPriceA = 0;
        selectedRows.forEach(row => {
          totalPriceA = totalPriceA + row.original.priceAverage;
        });
        setTotalPrice(totalPriceA);
      }, [table.getState().rowSelection]);

      function calcTotal(raw: string) {
        var priceOut: string = raw
        priceOut = priceOut + totalPrice + " gp"
        return priceOut;
      }
    
    return <MantineReactTable table={table} />;
};

export default Table;
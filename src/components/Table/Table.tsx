import { useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'mantine-react-table';
import { Anchor, Box, Grid, Group, Image, Stack, TextInput } from '@mantine/core';
import imgSrcArmor from '../../assets/armor.png';
import imgSrcPotion from '../../assets/potion.png';
import imgSrcRing from '../../assets/ring.png';
import imgSrcSroll from '../../assets/scroll.png';
import imgSrcWand from '../../assets/wand.png';
import imgSrcWeapon from '../../assets/weapon.png';
import imgSrcWonderous from '../../assets/wondrousitem.png';
import { type Items } from '../../data';

import './table.css';

import { ShoppingList } from '../Drawer/Drawer';

const Table = () => {
  const [data, setData] = useState<Items[]>([]);
  const encode = (str: string) => encodeURIComponent(str);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available
  const [totalPrice, setTotalPrice] = useState(0);
  //const [filterFnType, setFilterFnType] = useState(getFilterType());
  const [list, setList] = useState<string[]>([]);

  function getFilterType() {
    let fnTypeOut = 'fuzzy';
    const urlParams = new URLSearchParams(window.location.search);

    const filter = urlParams.get('filter');
    if (filter === 'fuzzy') {
      fnTypeOut = 'fuzzy';
    } else if (filter === 'contains') {
      fnTypeOut = 'contains';
    } else if (filter === 'startsWith') {
      fnTypeOut = 'startsWith';
    } else if (filter === 'endsWith') {
      fnTypeOut = 'endsWith';
    } else if (filter === 'equals') {
      fnTypeOut = 'equals';
    } else if (filter === 'between') {
      fnTypeOut = 'between';
    }
    return fnTypeOut;
  }

  const filterFnType = getFilterType();

  function buildShoppingList(selectedRows: any[]) {
    const shoppingList: [string] = [''];
    let totalPriceA = 0;
    let totalPriceS = 0;
    let totalPriceM = 0;
    let totalQuantity = 0;

    selectedRows.forEach((row) => {
      const quantity = row.original.quantity ?? 1;
      const avgPrice = row.original.priceAverage * quantity;
      const sanePrice = row.original.priceSane * quantity;
      const merchantPrice = row.original.priceMerchant * quantity;
      shoppingList.push(
        `${quantity}x (${row.original.name}): Average Price: ${avgPrice}, Sane Price: ${sanePrice}, Merchant Price: ${merchantPrice}`
      );
      totalPriceA += avgPrice;
      totalPriceS += sanePrice;
      totalPriceM += merchantPrice;
      totalQuantity += quantity;
    });
    if (totalQuantity === 0) {
      shoppingList.push('No Items Selected');
    } else {
      shoppingList.push('________________________');
      shoppingList.push(`${totalQuantity} Total Items Selected`);
      shoppingList.push(` Total Average Price: ${totalPriceA}`);
      shoppingList.push(` Total Sane Price: ${totalPriceS}`);
      shoppingList.push(` Total Merchant Price: ${totalPriceM}`);
    }
    setTotalPrice(totalPriceA);
    setList(shoppingList);
  }

  function renderSwitch(raw: string) {
    let imgOut: string = imgSrcWonderous;
    switch (raw) {
      case 'wonderousItem':
        imgOut = imgSrcWonderous;
        break;
      case 'weaponItem':
        imgOut = imgSrcWeapon;
        break;
      case 'armorItem':
        imgOut = imgSrcArmor;
        break;
      case 'ringItem':
        imgOut = imgSrcRing;
        break;
      case 'potionItem':
        imgOut = imgSrcPotion;
        break;
      case 'scrollItem':
        imgOut = imgSrcSroll;
        break;
      case 'wandItem':
        imgOut = imgSrcWand;
        break;
      default:
        imgOut = imgSrcWonderous;
        break;
    }
    return imgOut;
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
              <TextInput
                size="xs"
                style={{ width: 38 }}
                radius="xs"
                onChange={(e) => {
                  const quantity = parseInt(e.currentTarget.value, 10) || 0;
                  cell.row.original.quantity = quantity;
                  if (quantity > 0) {
                    cell.row.toggleSelected(true);
                  } else {
                    cell.row.toggleSelected(false);
                  }
                  const selectedRows = table.getSelectedRowModel().rows;
                  buildShoppingList(selectedRows);
                }}
              />
              &nbsp;&nbsp;&nbsp;
              <Image className="imgIcon" src={renderSwitch(cell.row.original.itemType)} />
              &nbsp;&nbsp;&nbsp;
              <Anchor
                underline="hover"
                href={`https://www.dndbeyond.com/magic-items?filter-partnered-content=t&filter-search=${encode(cell.getValue<string>())}`}
                target="_blank"
                rel="noreferrer"
              >
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
            {cell.row.original.priceAverage ? (
              <Box>
                <strong>{cell.row.original.priceAverage} gp</strong>
              </Box>
            ) : (
              <Box>
                <strong style={{ color: 'red' }}>Unknown</strong>
              </Box>
            )}
          </>
        ),
      },
      {
        header: 'Merchant Price',
        minSize: 220, //min size enforced during resizing
        accessorKey: 'priceMerchant',
        Cell: ({ cell }) => (
          <>
            {cell.row.original.priceMerchant ? (
              <Box>
                <strong>{cell.row.original.priceMerchant} gp</strong>
              </Box>
            ) : (
              <Box>
                <strong style={{ color: 'red' }}>Unknown</strong>
              </Box>
            )}
          </>
        ),
      },
      {
        header: 'Sane Price',
        minSize: 100, //min size enforced during resizing
        accessorKey: 'priceSane',
        Cell: ({ cell }) => (
          <>
            {cell.row.original.priceSane ? (
              <Box>
                <strong>{cell.row.original.priceSane} gp</strong>
              </Box>
            ) : (
              <Box>
                <strong style={{ color: 'red' }}>Unknown</strong>
              </Box>
            )}
          </>
        ),
      },
    ],
    []
  );

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
    paginationDisplayMode: 'default',
    state: { rowSelection, isLoading: false },
    getRowId: (row) => row.name,
    renderTopToolbarCustomActions: () => (
      <>
        <Group>
          <ShoppingList content={list} />
        </Group>
      </>
    ),
    renderEmptyRowsFallback: () => (
      <Stack gap="xs" align="center" justify="center">
        <Box fz="lg">
          <strong>YOU FAILED YOUR INVESTIGATION CHECK.</strong>
        </Box>
        <Box fz="sm" color="gray">
          (NO MAGIC ITEMS FOUND WITH THOSE FILTERS )
        </Box>
      </Stack>
    ),
    layoutMode: 'grid-no-grow',
    initialState: {
      density: 'md',
      expanded: true,
      columnVisibility: { priceSane: false, priceMerchant: false },
      pagination: { pageIndex: 0, pageSize: 100 },
      sorting: [{ id: 'name', desc: false }],
    },
    mantineToolbarAlertBannerBadgeProps: { color: 'blue', variant: 'outline' },
    mantineTableContainerProps: { style: { maxHeight: 730 } },
    mantineToolbarAlertBannerProps: { title: calcTotal('Total Price: ') },
  });

  function fetchData() {
    fetch('./assets/combined.json')
      .then((response) => response.json())
      .then((dataLoc) => {
        setData(dataLoc);
      });
  }

  useEffect(() => {
    // call api or anything
    fetchData();
  }, ['']);

  useEffect(() => {
    //fetch data based on row selection state or something
    const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
    buildShoppingList(selectedRows);
  }, [table.getState().rowSelection]);

  function calcTotal(raw: string) {
    return `${raw} ${totalPrice} gp`;
  }

  return <MantineReactTable table={table} />;
};

export default Table;

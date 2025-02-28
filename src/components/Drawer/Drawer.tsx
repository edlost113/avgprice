import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Box,Stack } from '@mantine/core';


function ShoppingList({ content }:any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer position="top" opened={opened} onClose={close} title="Shopping List">
        <Stack>
        {content.map((row: string) => <Box key={row}>{row}</Box>)}
        </Stack>
      </Drawer>

      <Button variant="filled" onClick={open}>
        Shopping List
      </Button>
    </>
  );
}

export { ShoppingList }
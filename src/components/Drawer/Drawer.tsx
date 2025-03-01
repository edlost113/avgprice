import { Box, Button, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function ShoppingList({ content }: any) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer position="top" opened={opened} onClose={close} title="Shopping List">
        <Stack gap="xs" justify="flex-start">
          {content.map((row: string) => (
            <Box key={row}>{row}</Box>
          ))}
        </Stack>
      </Drawer>

      <Button variant="filled" onClick={open}>
        Shopping List
      </Button>
    </>
  );
}

export { ShoppingList };

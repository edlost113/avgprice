import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Table from '../components/Table/Table'
import dancingWizard from '../assets/dancingwizard.gif'
import { Box, Group, Stack, Image } from '@mantine/core';
export function HomePage() {
  return (
    <>
      <Stack>
      <Group>
      <Image  src={dancingWizard} style={{width: '32px', height:'32px', transform: 'scaleX(-1)'}}></Image>
      <Box style={{width:'90%'}}>Same as !avgprice. The items were looked up in !sane and !price. The two prices are then averaged. If the item does not exist in either, then the price from dungeonsports is used.
      </Box>
      <Image  src={dancingWizard} style={{width: '32px', height:'32px'}}></Image>
      </Group>
      <ColorSchemeToggle />
      </Stack>
      <Box><Table /></Box>
    </>
  );
}

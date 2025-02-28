import Table from '../components/Table/Table'
import dancingWizard from '../assets/dancingwizard.gif'
import { Box, Group, Stack, Image } from '@mantine/core';
import { IconSwords } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications'
import './avgprice.page.css'

export function HomePage() {

  notifications.show({
    id: 'hello-there',
    position: 'bottom-center',
    withCloseButton: true,
    autoClose: false,
    title: "Welcome",
    message: 'Please report duplicate items, and any other issues.',
    icon: <IconSwords />,
    className: 'my-notification-class',
    loading: false,
  });
  return (
    <>
      <Group>
      <Image  src={dancingWizard} style={{width: '32px', height:'32px', transform: 'scaleX(-1)'}}></Image>
      <Box style={{width:'90%'}}>Same as <strong>!avgprice</strong>. First it comapares the price of the item in <strong>!sane</strong>
      with the price of the item in <strong>!price</strong>. If the item exists in both it will average the two prices. If it only
      exists in one of them, it uses that price. If it does not exist in either it will use dungeonsports.
      </Box>
      <Image  src={dancingWizard} style={{width: '32px', height:'32px'}}></Image>
      </Group>
      <Box><Table /></Box>
    </>
  );
}

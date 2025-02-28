import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)

import { MantineProvider,  } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Button, Group } from '@mantine/core';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider>
      <Router />
      </ModalsProvider>
    </MantineProvider>
  );
}

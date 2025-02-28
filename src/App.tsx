import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css'; //make sure MRT styles were imported in your app root (once)

import { MantineProvider,  } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Sound } from './components/Sound'

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Sound />
      <ModalsProvider>
      <Router />
      </ModalsProvider>
    </MantineProvider>
  );
}

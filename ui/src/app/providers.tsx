import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '@shared/providers/notification-provider';
import { ThemeProvider } from '@shared/providers/theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
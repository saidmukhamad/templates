import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from '@shared/providers/notification-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BrowserRouter>
  );
};
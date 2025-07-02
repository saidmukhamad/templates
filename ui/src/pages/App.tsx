import { Providers } from '@app/providers';
import { Router } from '@app/routes';

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;

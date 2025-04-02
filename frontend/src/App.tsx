import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './components/provider/RotaAutenticada';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;

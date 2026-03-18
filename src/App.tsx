import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import HealthReport from './pages/HealthReport';
import Funding from './pages/Funding';
import Alerts from './pages/Alerts';
import OnboardingWizard from './pages/OnboardingWizard';
import Settings from './pages/Settings';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private/Protected Routes */}
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="health" element={<HealthReport />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="funding" element={<Funding />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

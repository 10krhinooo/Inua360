import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LenderLandingPage from './pages/LenderLandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import HealthReport from './pages/HealthReport';
import Funding from './pages/Funding';
import Alerts from './pages/Alerts';
import OnboardingWizard from './pages/OnboardingWizard';

import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';

import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/lenders" element={<LenderLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected/private Routes */}
          <Route element={<ProtectedRoute requireOnboarding={false} />}>
            <Route path="/onboarding" element={<OnboardingWizard />} />
          </Route>

          <Route element={<ProtectedRoute requireOnboarding={true} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="health" element={<HealthReport />} />
              <Route path="funding" element={<Funding />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

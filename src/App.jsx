import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Manage from "./pages/Manage";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage/" element={<Manage />} />
          <Route path="/manage/:id" element={<Manage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

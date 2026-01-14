import { Routes, Route } from "react-router";
import { IncidentsPage } from "/pages/Incidents";
import { AppLayout } from "/ui/index";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<IncidentsPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

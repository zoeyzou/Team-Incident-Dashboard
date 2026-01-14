import { Routes, Route } from "react-router";
import { Incidents, IncidentDetail } from "/pages/index";
import { AppLayout } from "/ui/index";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Incidents />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

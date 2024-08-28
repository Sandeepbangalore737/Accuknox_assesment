import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import { WidgetProvider } from "./context/WidgetContext";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <WidgetProvider>
        <Navbar onSearch={handleSearch} />
        <Dashboard searchQuery={searchQuery} />
      </WidgetProvider>
    </div>
  );
}

export default App;

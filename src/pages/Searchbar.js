import React, { useState, useContext } from "react";
import { TextField } from "@mui/material";
import { WidgetContext } from "../context/WidgetContext";

function SearchBar() {
  const { categories } = useContext(WidgetContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWidgets = categories
    .flatMap((category) => category.widgets)
    .filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <TextField
        fullWidth
        label="Search Widgets"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Render filtered widgets */}
      {filteredWidgets.map((widget) => (
        <div key={widget.id}>{widget.name}</div>
      ))}
    </div>
  );
}

export default SearchBar;

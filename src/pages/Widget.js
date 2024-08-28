import React, { useContext } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { WidgetContext } from "../context/WidgetContext";

function Widget({ widget, categoryId }) {
  const { removeWidget } = useContext(WidgetContext);

  const handleRemove = () => {
    removeWidget(categoryId, widget.id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{widget.name}</Typography>
        <Typography>{widget.content}</Typography>
        <IconButton onClick={handleRemove} sx={{ position: "absolute", top: 0, right: 0 }}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Widget;

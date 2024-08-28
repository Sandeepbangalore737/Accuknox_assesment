import { Card, CardHeader, Grid } from "@mui/material";
import React from "react";

function CardComponent({ title, children, onRemove }) {
  return (
    <Card
      sx={{
        border: "20px solid rgb(240,240,245)",
        borderRadius: "20px 18px 18px",
        boxShadow: "none",
        paddingBottom: "5%",
        height: "80%",
      }}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{
          fontSize: "16px",
          fontWeight: "600",
        }}
      />
      <Grid container>{children}</Grid>
    </Card>
  );
}

export default CardComponent;

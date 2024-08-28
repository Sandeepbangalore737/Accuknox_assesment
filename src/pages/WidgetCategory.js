import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Widget from "./Widget";

function WidgetCategory({ category }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="900">
        {category.name}
      </Typography>
      <Grid container spacing={2}>
        {category.widgets.map((widget) => (
          <Grid item xs={12} sm={6} md={4} key={widget.id}>
            <Widget widget={widget} categoryId={category.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WidgetCategory;

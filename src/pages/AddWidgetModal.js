import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { WidgetContext } from "../context/WidgetContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function AddWidgetModal({ open, handleClose }) {
  const { categories, removeWidget } = useContext(WidgetContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [checkedWidgets, setCheckedWidgets] = useState({});
  const [initialCheckedState, setInitialCheckedState] = useState({});
  const [alignment, setAlignment] = React.useState("CSPM");

  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
    setSelectedCategory(newAlignment);
  };

  const handleCheckboxChange = (widgetId) => {
    setCheckedWidgets({
      ...checkedWidgets,
      [widgetId]: !checkedWidgets[widgetId],
    });
  };

  const handleSubmit = () => {
    const selectedCategoryData = categories.find(
      (category) => category.shortName === alignment
    );

    selectedCategoryData.widgets.forEach((widget) => {
      if (!checkedWidgets[widget.id]) {
        removeWidget(selectedCategoryData.id, widget.id);
      }
    });

    handleClose();
  };

  useEffect(() => {
    const selectedCategoryData = categories.find(
      (category) => category.shortName === alignment
    );

    if (selectedCategoryData) {
      const initialChecked = {};
      selectedCategoryData.widgets.forEach((widget) => {
        initialChecked[widget.id] = true;
      });
      setCheckedWidgets(initialChecked);
      setInitialCheckedState(initialChecked);
    }
  }, [alignment, categories]);

  const handleCancel = () => {
    setCheckedWidgets(initialCheckedState);
    handleClose();
  };

  const selectedCategoryData = categories.find(
    (category) => category.shortName === alignment
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCancel}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          width: "42%",
          maxWidth: "none",
          overflow: "hidden",
          position: "absolute",
          right: "0",
        },
      }}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#14137D" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Widget
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <Typography>
          Personalize your dashboard by adding or removing widgets
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChangeToggle}
          aria-label="Platform"
          sx={{ mt: 2 }}
        >
          {categories.map((category) => (
            <ToggleButton
              key={category.id}
              value={category.shortName}
              sx={{
                border: "none",
                textTransform: "capitalize",
                backgroundColor: "#ffffff",
                borderBottom:
                  alignment === category.shortName
                    ? "3px solid #14137D"
                    : "1px solid gray",
                color: alignment === category.shortName ? "#14137D" : "gray",
                borderRadius: 0,
                paddingBottom: 1,
              }}
            >
              {category.shortName}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box m={2}>
          {selectedCategoryData && (
            <>
              {selectedCategoryData.widgets.map((widget) => (
                <Box
                  key={widget.id}
                  border="1px solid #E2E2E2"
                  borderRadius="3px 3px 3px"
                  p={1}
                  my={1}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedWidgets[widget.id] || false}
                        onChange={() => handleCheckboxChange(widget.id)}
                      />
                    }
                    label={widget.name}
                  />
                </Box>
              ))}

              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  display: "flex",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    textTransform: "capitalize",
                    color: "#14137D",
                    border: "1px solid #14137D",
                    borderRadius: "3px 4px 4px",
                  }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}   sx={{
                    textTransform: "capitalize",
                    color: "#ffffff",
                    borderRadius: "3px 4px 4px",
                    backgroundColor:"#14137D"
                  }}>
                  Confirm
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

export default AddWidgetModal;

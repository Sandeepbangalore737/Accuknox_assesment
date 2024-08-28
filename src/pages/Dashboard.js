import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CardComponent from "../components/cardComponent/cardComponent";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import {  createTheme } from "@mui/material/styles";
import AddWidgetModal from "./AddWidgetModal";
import { WidgetContext } from "../context/WidgetContext";
import LinearProgress, {
} from "@mui/material/LinearProgress";

const theme = createTheme();

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 16,
  fontWeight: 900,
}));
function PieCenterLabel({ children, xOffset = 0, yOffset = 0 }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2 + xOffset} y={top + height / 2 + yOffset}>
      {children}
    </StyledText>
  );
}

function Dashboard({ searchQuery }) {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { categories } = useContext(WidgetContext);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const MultiColorProgress = styled(LinearProgress)(({ theme, gradient }) => ({
    height: 17,
    borderRadius: 7,
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
      background: gradient,
    },
  }));

  function generateGradient(progressData) {
    const stops = progressData
      .map(
        (data) =>
          `${data.color} ${data.range[0]}%, ${data.color} ${data.range[1]}%`
      )
      .join(", ");
    return `linear-gradient(to right, ${stops})`;
  }
  const Label = ({ color, text }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      <div
        style={{
          width: 15,
          height: 13,
          backgroundColor: color,
          borderRadius: 5,
        }}
      />
      <Typography
        variant="caption"
        sx={{ fontSize: "16px", fontWeight: "400" }}
      >
        {text}
      </Typography>
    </Stack>
  );
  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <Box sx={{ backgroundColor: "rgb(240,245,250)", height: "100%", pb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          gap: isSmallScreen ? 2 : 0,
          p: 5,
        }}
      >
        <Typography variant="h5" fontWeight="900">
          CNAPP Dashboard
        </Typography>
        <Box
          ml={isSmallScreen ? 0 : "auto"}
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "center" : "flex-start",
            alignItems: "center",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: 2,
            mt: isSmallScreen ? 2 : 0,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              color: "rgb(103,110,125)",
              border: "1px solid rgb(236,237,240)",
              backgroundColor: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              width: isSmallScreen ? "100%" : "auto",
            }}
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add Widget
          </Button>
          <AddWidgetModal open={openModal} handleClose={handleCloseModal} />

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "20%",
              border: "1px solid rgb(236,237,240)",
            }}
          >
            <SyncIcon sx={{ color: "rgb(103,110,125)" }} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "20%",
              border: "1px solid rgb(236,237,240)",
            }}
          >
            <MoreVertIcon sx={{ color: "rgb(103,110,125)" }} />
          </IconButton>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #14137D",
              borderRadius: "8px 6px 6px",
              backgroundColor: "#ffffff",
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              onChange={handleChange}
              IconComponent={(props) => (
                <KeyboardArrowDownIcon {...props} sx={{ color: "#14137D" }} />
              )}
              startAdornment={
                <>
                  <InputAdornment position="start">
                    <WatchLaterIcon sx={{ color: "#14137D" }} />
                  </InputAdornment>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      backgroundColor: "#14137D",
                      width: "0.6px",
                    }}
                  />
                  <MenuItem sx={{ color: "#14137D", fontWeight: "700" }}>
                    Last 2 days
                  </MenuItem>
                </>
              }
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {filteredCategories.map((category) => (
        <Box key={category.id} sx={{ px: isSmallScreen ? 2 : 7 }} align="left">
          <Grid container spacing={0.2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="900">
                {category.name}
              </Typography>
            </Grid>

            {category?.widgets?.map((widget) => (
              <Grid item xs={12} sm={4} md={4} key={widget.id}>
                <CardComponent title={widget.name}>
                  {widget.pieChartValues ? (
                    <PieChart
                      series={[
                        {
                          data: widget.pieChartValues,
                          innerRadius: 60,
                          outerRadius: 100,
                          labelOffset: 30,
                        },
                      ]}
                      width={450}
                      height={200}
                      margin={{ right: 200 }}
                    >
                      <PieCenterLabel yOffset={-15}>
                        {widget.pieChartValues.reduce(
                          (total, item) => total + item.value,
                          0
                        )}
                      </PieCenterLabel>
                      <PieCenterLabel yOffset={15}>Workloads</PieCenterLabel>
                    </PieChart>
                  ) : widget?.progressData ? (
                    <Box pt={2} px={3}>
                        <Typography pb={3} fontWeight="600">{widget.content}</Typography>
                      <MultiColorProgress
                        variant="determinate"
                        value={100}
                        gradient={generateGradient(widget.progressData)}
                      />
                      <Grid container spacing={3} sx={{ mt: 0.4 }}>
                        {widget.progressData.map((data, index) => (
                          <Grid item key={index}>
                            <Label color={data.color} text={data.label} />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ) : (
                    <Box
                      width="100%"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        minHeight: "200px",
                      }}
                    >
                      <Typography>{widget.content}</Typography>
                    </Box>
                  )}
                </CardComponent>
              </Grid>
            ))}
            <Grid item xs={12} sm={4} md={4}>
              <CardComponent>
                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    minHeight: "200px",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "capitalize",
                      color: "rgb(103,110,125)",
                      border: "1px solid rgb(236,237,240)",
                      backgroundColor: "#ffffff",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    startIcon={<AddIcon />}
                    onClick={handleOpenModal}
                  >
                    Add Widget
                  </Button>
                </Box>
              </CardComponent>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
export default Dashboard;

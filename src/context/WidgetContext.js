import React, { createContext, useReducer } from "react";

// Initial State
const initialState = {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      shortName: "CSPM",
      widgets: [
        {
          id: 1,
          name: "Cloud Accounts",
          content: "Random text or widget content",
          pieChartValues: [
            { value: 5, label: "Connected(5)", color: "#E1EBFF" },
            { value: 5, label: "Not Connected(5)", color: "#5478FF" },
          ],
        },
        {
          id: 2,
          name: "Cloud Account Risk Assessment",
          content: "Random text or widget content",
          pieChartValues: [
            { value: 7253, label: "Passed(7253)", color: "#17A55A" },
            { value: 36, label: "Not available(36)", color: "#E1EBFF" },
            { value: 681, label: "Warning(681)", color: "#FAD732" },
            { value: 1689, label: "Failed(1689)", color: "#B9130F" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "CWPP Dashboard",
      shortName: "CWPP",
      widgets: [
        {
          id: 1,
          name: "Top 5 Namespace Specific Alerts",
          content: "No Graph data available!",
        },
        { id: 1, name: "Workload Alerts", content: "No Graph data available!" },
      ],
    },
    {
      id: 3,
      name: "Registry Scan",
      shortName: "Image",
      widgets: [
        {
          id: 1,
          name: "Image Risk Assesment",
          content: "1470 Total Vulnerabilities",
          progressData: [
            { range: [0, 0.612], color: "#6E0F0A", label:"Critical(9)" },
            { range: [0.612, 10.816], color: "#C82819", label:"High(150)" },
            { range: [10.816, 69.523], color: "#EB9133", label:"Medium(863)" },
            { range: [69.523, 97.789], color: "#F0C340", label:"Low(415)" },
            { range: [97.789, 100], color: "#AAAAAA", label:"None(33)" },
          ]
        },
        {
          id: 2,
          name: "Image Security Issues",
          content: "8 Total Images",
          progressData: [
            { range: [0, 25], color: "#6E0F0A", label:"Critical(2)" },
            { range: [25, 50], color: "#C82819", label:"High(2)" },
            { range: [50, 75], color: "#EB9133", label:"Medium(2)" },
            { range: [75, 87.5], color: "#F0C340", label:"Low(1)" },
            { range: [87.5, 100], color: "#AAAAAA", label:"None(1)" },
          ]
        },
      ],
    },
    {
      id: 4,
      name: "Ticket",
      shortName: "Ticket",
      widgets: [
        {
          id: 1,
          name: "Widget 1 Name",
          content: "Random text or widget content",
        },
        {
          id: 2,
          name: "Widget 2 Name",
          content: "Random text or widget content",
        },
      ],
    },
  ],
};

const widgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_WIDGET":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.newWidget],
              }
            : category
        ),
      };
    case "REMOVE_WIDGET":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: category.widgets.filter(
                  (widget) => widget.id !== action.payload.widgetId
                ),
              }
            : category
        ),
      };
    
    default:
      return state;
  }
};

export const WidgetContext = createContext();

export const WidgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  // Actions
  const addWidget = (categoryId, newWidget) => {
    dispatch({ type: "ADD_WIDGET", payload: { categoryId, newWidget } });
  };

  const removeWidget = (categoryId, widgetId) => {
    dispatch({ type: "REMOVE_WIDGET", payload: { categoryId, widgetId } });
  };

  return (
    <WidgetContext.Provider
      value={{ categories: state.categories, addWidget, removeWidget }}
    >
      {children}
    </WidgetContext.Provider>
  );
};

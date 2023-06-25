import { createTheme } from "@mui/material";
import {
  cyan,
  deepPurple,
  green,
  lime,
  orange,
  teal,
} from "@mui/material/colors";
import grey from "@mui/material/colors/grey";
import pink from "@mui/material/colors/pink";
import purple from "@mui/material/colors/purple";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[300],
    },
    text: {
      primary: grey[800],
      secondary: pink[300],
    },
  },
  typography: {
    fontFamily: "Consolas, Source Code Pro, Ricty Diminished",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: pink[300],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey[900],
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: pink[300],
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: green[300],
          color: grey[900],
        },
      },
    },
  },
});

export const datePickerTheme = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: pink[300],
    },
    text: {
      primary: "#ffffff",
      secondary: pink[300],
    },
  },
  typography: {
    fontFamily: "Consolas, Source Code Pro, Ricty Diminished",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey[800],
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: pink[300],
        },
      },
    },
  },
});

export const tabListTheme = createTheme({
  palette: {
    primary: {
      main: pink[300],
    },
    text: {
      primary: "#ffffff",
      secondary: pink[300],
    },
  },
  typography: {
    fontFamily: "Consolas, Source Code Pro, Ricty Diminished",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey[800],
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: pink[300],
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "grey",
          },
        },
      },
    },
  },
});

export const colorProps = [
  "primary",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
];
export const colorPropsWithColor = [
  {
    prop: "primary",
    color: "#ba68c8",
  },
  {
    prop: "secondary",
    color: "#4dd0e1",
  },
  {
    prop: "error",
    color: "#dce775",
  },
  {
    prop: "info",
    color: "#9575cd",
  },
  {
    prop: "success",
    color: "#80cbc4",
  },
  {
    prop: "warning",
    color: "#ffb74d",
  },
];
// export const colorProps = 'secondary';

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, 0.07)`;
};

export const chipTheme = (color: string) =>
  createTheme({
    // 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    palette: {
      primary: {
        main: purple[300],
      },
      secondary: {
        main: cyan[300],
      },
      error: {
        main: lime[300],
      },
      info: {
        main: deepPurple[300],
      },
      success: {
        main: teal[200],
      },
      warning: {
        main: orange[300],
      },
    },
    typography: {
      fontFamily: "Consolas, Source Code Pro, Ricty Diminished",
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: hexToRgb(color),
          },
        },
      },
    },
  });

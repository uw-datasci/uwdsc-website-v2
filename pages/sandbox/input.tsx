import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useEffect } from "react";
import MultipleDropdown from "@/components/UI/Inputs/MultipleDropdown";

export default function Test() {
  const formik = useFormik({
    initialValues: {
      test1: [],
      test: null,
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik]);

  // 1) Create a dark theme that matches your design
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#000211", // Main page background
        paper: "#181818", // Surface background (picker dialog)
      },
      primary: {
        // Adjust these for the pink/purple gradient feel
        main: "#FFFFFF",
      },
      secondary: {
        main: "#181818",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#CCCCCC",
      },
    },
    typography: {
      fontFamily: "Satoshi-Variable, sans-serif",
    },
    // (Optional) component style overrides
    components: {
      // Example: override shape for rounded corners
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      // Example: override button styles in the picker
      MuiButtonBase: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
    },
  });

  // 2) You can further style the text field if you want a custom background, etc.
  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      // Dark input background
      backgroundColor: theme.palette.background.paper,
      // Purple/pink focus border
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <>
      {/* <SingleDropdown
        id="test"
        name="test"
        placeholder="nothing"
        options={["test1", "test2", "test3", "test4", "test5", "test6"]}
        value={formik.values.test}
        onChange={formik.handleChange}
      /> */}
      <MultipleDropdown
        id="test1"
        name="test1"
        placeholder="nothing"
        options={["test1", "test2", "test3", "test4", "test5", "test6"]}
        value={formik.values.test1}
        onChange={formik.handleChange}
        maxSelection={3}
      />
      {/* <CheckboxInput
        id="test1"
        name="test1"
        checkboxString="string"
        value={formik.values.test1}
        onChange={formik.handleChange}
        wrapperClasses="m-4"
      /> */}
      <div className="m-auto">
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select a Date"
              value={formik.values.test}
              onChange={formik.handleChange}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

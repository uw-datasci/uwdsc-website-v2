import SingleDropdown from "@/components/UI/Inputs/SingleDropdown";
import MultipleDropdown from "@/components/UI/Inputs/MultipleDropdown";
import CheckboxInput from "@/components/UI/Inputs/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useEffect } from "react";

export default function Test() {
  const formik = useFormik({
    initialValues: {
      test: null,
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik]);

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
      {/* <MultipleDropdown
        id="test"
        name="test"
        placeholder="nothing"
        options={["test1", "test2", "test3", "test4", "test5", "test6"]}
        value={formik.values.test}
        onChange={formik.handleChange}
        maxSelection={3}
      /> */}
      {/* <CheckboxInput
        id="test1"
        name="test1"
        checkboxString="string"
        value={formik.values.test1}
        onChange={formik.handleChange}
        wrapperClasses="m-4"
      /> */}
      <div className="m-auto">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select a Date"
            value={formik.values.test}
            onChange={formik.handleChange}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}

import { useFormik } from "formik";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import ToggleSwitch from "@/components/UI/Inputs/UWDSC/ToggleSwitch";
import Button from "@/components/UI/Button";
import { EventFormValues } from "@/types/types";

// Helper function to format datetime for input field
const formatDateTimeForInput = (dateTimeStr: string) => {
  if (!dateTimeStr) return "";
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

interface EventFormProps {
  formik: ReturnType<typeof useFormik<EventFormValues>>;
  success: boolean;
  error: boolean;
  isEditing?: boolean;
}

export default function EventForm({
  formik,
  success,
  error,
  isEditing = false,
}: EventFormProps) {
  formik.values.startTime = formatDateTimeForInput(formik.values.startTime);
  formik.values.endTime = formatDateTimeForInput(formik.values.endTime);
  formik.values.bufferedStartTime = formatDateTimeForInput(
    formik.values.bufferedStartTime,
  );
  formik.values.bufferedEndTime = formatDateTimeForInput(
    formik.values.bufferedEndTime,
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? "Edit Event" : "Add New Event"}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Event Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <InputFeedback state="error">
              {String(formik.errors.name)}
            </InputFeedback>
          )}
        </div>

        <div>
          <div className="relative">
            <TextInput
              id="location"
              name="location"
              type="text"
              placeholder="Event Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              classes="pr-10"
            />
          </div>
          {formik.touched.location && formik.errors.location && (
            <InputFeedback state="error">
              {String(formik.errors.location)}
            </InputFeedback>
          )}
        </div>
      </div>

      <div>
        <TextArea
          id="description"
          name="description"
          placeholder="Event Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          classes="max-h-[7rem]"
        />
        {formik.touched.description && formik.errors.description && (
          <InputFeedback state="error">
            {String(formik.errors.description)}
          </InputFeedback>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startTime"
            className="mb-2 block text-sm font-medium text-white"
          >
            Event Start Time
          </label>
          <TextInput
            id="startTime"
            name="startTime"
            type="datetime-local"
            placeholder="Start Time"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <InputFeedback state="error">
              {String(formik.errors.startTime)}
            </InputFeedback>
          )}
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="mb-2 block text-sm font-medium text-white"
          >
            Event End Time
          </label>
          <TextInput
            id="endTime"
            name="endTime"
            type="datetime-local"
            placeholder="End Time"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.endTime && formik.errors.endTime && (
            <InputFeedback state="error">
              {String(formik.errors.endTime)}
            </InputFeedback>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="bufferedStartTime"
            className="mb-2 block text-sm font-medium text-white"
          >
            Buffered Start Time (Optional)
          </label>
          <TextInput
            id="bufferedStartTime"
            name="bufferedStartTime"
            type="datetime-local"
            placeholder="Buffered Start Time (Optional)"
            value={formik.values.bufferedStartTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bufferedStartTime &&
            formik.errors.bufferedStartTime && (
              <InputFeedback state="error">
                {String(formik.errors.bufferedStartTime)}
              </InputFeedback>
            )}
        </div>

        <div>
          <label
            htmlFor="bufferedEndTime"
            className="mb-2 block text-sm font-medium text-white"
          >
            Buffered End Time (Optional)
          </label>
          <TextInput
            id="bufferedEndTime"
            name="bufferedEndTime"
            type="datetime-local"
            placeholder="Buffered End Time (Optional)"
            value={formik.values.bufferedEndTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bufferedEndTime && formik.errors.bufferedEndTime && (
            <InputFeedback state="error">
              {String(formik.errors.bufferedEndTime)}
            </InputFeedback>
          )}
        </div>
      </div>

      <p className="px-4 text-sm text-grey1">
        <strong>Note:</strong> If no buffered start and end times are selected,
        they will automatically be set to 1 hour before the event start time and
        1 hour after the event end time respectively.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <ToggleSwitch
            id="isRegistrationRequired"
            name="isRegistrationRequired"
            label="Registration Required"
            checked={formik.values.isRegistrationRequired}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <ToggleSwitch
            id="requirements"
            name="requirements"
            label="User Payment Required"
            checked={formik.values.requirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <Button
        type="submit"
        hierarchy="primary"
        font="font-bold"
        text="sm:text-lg 2xl:text-xl"
        rounded="rounded-[15px]"
        classes="w-full"
      >
        {isEditing ? "Update Event" : "Create Event"}
      </Button>

      {success && (
        <InputFeedback state="success">
          Event {isEditing ? "updated" : "created"} successfully!
        </InputFeedback>
      )}
      {error && (
        <InputFeedback state="error">
          Failed to {isEditing ? "update" : "create"} event. Please try again.
        </InputFeedback>
      )}
    </form>
  );
}

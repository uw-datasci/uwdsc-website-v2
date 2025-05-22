import { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { MapPin } from "react-feather";
import SectionTitle from "@/components/UI/SectionTitle";
import withAuth from "@/components/permissions/authPage";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import SingleDropdown from "@/components/UI/Inputs/UWDSC/SingleDropdown";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import ToggleSwitch from "@/components/UI/Inputs/UWDSC/ToggleSwitch";
import Button from "@/components/UI/Button";
import { createEvent } from "@/utils/apiCalls";
import { EventValidationSchema } from "@/utils/formValidation";

interface EventFormValues {
  name: string;
  isRegistrationRequired: boolean;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  bufferedStartTime: string;
  bufferedEndTime: string;
  requirements: boolean;
}

const initialFormValues: EventFormValues = {
  name: "",
  isRegistrationRequired: false,
  description: "",
  location: "",
  startTime: "",
  endTime: "",
  bufferedStartTime: "",
  bufferedEndTime: "",
  requirements: false,
};

function EventForm({
  formik,
  success,
  error,
}: {
  formik: ReturnType<typeof useFormik<EventFormValues>>;
  success: boolean;
  error: boolean;
}) {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
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
            placeholder="Buffered Start Time"
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
            placeholder="Buffered End Time"
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
        padding="py-3 sm:px-7 sm:py-4"
        rounded="rounded-[15px]"
        classes="w-full"
      >
        Create Event
      </Button>

      {success && (
        <InputFeedback state="success">
          Event created successfully!
        </InputFeedback>
      )}
      {error && (
        <InputFeedback state="error">
          Failed to create event. Please try again.
        </InputFeedback>
      )}
    </form>
  );
}

function Events() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const formik = useFormik<EventFormValues>({
    initialValues: initialFormValues,
    validationSchema: EventValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setSuccess(false);
        setError(false);

        // Create date objects from form values
        const startTimeDate = new Date(values.startTime);
        const endTimeDate = new Date(values.endTime);

        // Set buffered times if not provided
        let bufferedStartTimeDate = values.bufferedStartTime
          ? new Date(values.bufferedStartTime)
          : new Date(startTimeDate.getTime() - 60 * 60 * 1000); // 1 hour before

        let bufferedEndTimeDate = values.bufferedEndTime
          ? new Date(values.bufferedEndTime)
          : new Date(endTimeDate.getTime() + 60 * 60 * 1000); // 1 hour after

        const formattedValues = {
          ...values,
          startTime: startTimeDate,
          endTime: endTimeDate,
          bufferedStartTime: bufferedStartTimeDate,
          bufferedEndTime: bufferedEndTimeDate,
          isRegistrationRequired: values.isRegistrationRequired,
          requirements: values.requirements,
        };

        const response = await createEvent(formattedValues);

        if (response.data.success) {
          resetForm();
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (error: any) {
        setError(true);
      }
    },
  });

  return (
    <section className="mx-container mb-section mt-14 lg:mt-20">
      <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        Events
      </h1>
      <div className="flex flex-col gap-2 overflow-visible">
        <SectionTitle mb="mb-12">Manage Events</SectionTitle>
        <div className="mx-auto w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-white">Add New Event</h2>
          <p className="text-gray-300 mb-8">
            Fill out the form below to create a new event.
          </p>
          <EventForm formik={formik} success={success} error={error} />
        </div>
      </div>
    </section>
  );
}

export default withAuth(Events, ["admin"]);

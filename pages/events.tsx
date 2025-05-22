import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SectionTitle from "@/components/UI/SectionTitle";
import withAuth from "@/components/permissions/authPage";
import TextInput from "@/components/UI/Inputs/UWDSC/TextInput";
import TextArea from "@/components/UI/Inputs/UWDSC/TextArea";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import ToggleSwitch from "@/components/UI/Inputs/UWDSC/ToggleSwitch";
import Button from "@/components/UI/Button";
import PopUpPanels from "@/components/sections/templates/PopUpPanels";
import EventCard from "@/components/cards/EventCard";
import { createEvent, getEvents } from "@/utils/apiCalls";
import { EventValidationSchema } from "@/utils/formValidation";
import {
  displayEventForm,
  removeEventForm,
} from "@/store/slices/eventFormPageSlice";
import { StaticImageData } from "next/image";
import placeholderImage from "@/public/placeholder/event.png";

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

// Type for API event data
interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  isRegistrationRequired: boolean;
}

// Type for formatted event data with fields matching EventCard
interface FormattedEvent {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  date: string;
  location: string;
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
  onClose,
}: {
  formik: ReturnType<typeof useFormik<EventFormValues>>;
  success: boolean;
  error: boolean;
  onClose: () => void;
}) {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Event</h2>
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
  const [upcomingEvents, setUpcomingEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const eventFormOpen = useSelector(
    (state: RootState) => state.eventFormPage.value,
  );

  // Format date for display
  const formatEventDate = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const formattedDate = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const startTimeStr = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const endTimeStr = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${startTimeStr} - ${endTimeStr}`;
  };

  // Fetch events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        // Get current date for fromDate parameter
        const currentDate = new Date();

        const response = await getEvents(currentDate);

        if (response.data && response.data.events) {
          // Format events to match EventCard component
          const formattedEvents = response.data.events.map(
            (event: EventData) => ({
              id: event.id,
              title: event.name,
              description: event.description,
              image: placeholderImage, // Using placeholder image
              date: formatEventDate(event.startTime, event.endTime),
              location: event.location,
            }),
          );

          setUpcomingEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setFetchError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, [success]); // Refetch when a new event is created successfully

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
          setTimeout(() => {
            setSuccess(false);
            dispatch(removeEventForm());
          }, 3000);
        }
      } catch (error: any) {
        setError(true);
      }
    },
  });

  const handleOpenEventForm = () => dispatch(displayEventForm());

  const handleCloseEventForm = () => dispatch(removeEventForm());

  return (
    <section className="mx-container mb-section mt-14 lg:mt-20">
      <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        Events
      </h1>
      <div className="flex flex-col gap-2 overflow-visible">
        <SectionTitle mb="mb-12">Manage Events</SectionTitle>

        <div className="mx-auto mb-12 w-full max-w-2xl text-center">
          <Button
            type="button"
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-[15px]"
            classes="w-full max-w-md mx-auto"
            onClick={handleOpenEventForm}
          >
            Create New Event
          </Button>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-12">
          <SectionTitle mb="mb-6">Upcoming Events</SectionTitle>

          {loading ? (
            <p className="text-center text-white">Loading events...</p>
          ) : fetchError ? (
            <p className="text-red-500 text-center">{fetchError}</p>
          ) : upcomingEvents.length === 0 ? (
            <p className="text-center text-white">No upcoming events found.</p>
          ) : (
            <div className="no-scrollbar overflow-x-auto">
              <div className="flex gap-6 pb-4 pt-2">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    image={event.image}
                    date={event.date}
                    location={event.location}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Event Form Popup */}
        <PopUpPanels
          isPopUp={eventFormOpen}
          moveDownFunc={handleCloseEventForm}
          panelIndex={0}
          panels={[
            <div key="event-form" className="no-scrollbar w-full overflow-auto">
              <div className="mx-auto w-full max-w-2xl p-6">
                <p className="text-gray-300 mb-8">
                  Fill out the form below to create a new event.
                </p>
                <EventForm
                  formik={formik}
                  success={success}
                  error={error}
                  onClose={handleCloseEventForm}
                />
              </div>
            </div>,
          ]}
        />
      </div>
    </section>
  );
}

export default withAuth(Events, ["admin"]);

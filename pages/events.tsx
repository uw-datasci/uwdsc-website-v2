import { useState, useEffect, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SectionTitle from "@/components/UI/SectionTitle";
import withAuth from "@/components/permissions/authPage";
import Button from "@/components/UI/Button";
import PopUpPanels from "@/components/sections/templates/PopUpPanels";
import EventCard from "@/components/cards/EventCard";
import {
  createEvent,
  editEvent,
  deleteEvent,
  getEvents,
} from "@/utils/apiCalls";
import { EventValidationSchema } from "@/utils/formValidation";
import {
  displayEventForm,
  removeEventForm,
} from "@/store/slices/eventFormPageSlice";
import { StaticImageData } from "next/image";
import placeholderImage from "@/public/placeholder/event.png";
import EventForm from "@/components/forms/EventForm";
import { EventFormValues } from "@/types/types";
import { Edit3, Trash2 } from "react-feather";

// Format date for display - pure function outside component
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
  isRegistrationRequired: boolean;
  name: string;
  description: string;
  image: StaticImageData;
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  bufferedStartTime: string;
  bufferedEndTime: string;
  requirements: boolean;
}

const initialFormValues: EventFormValues = {
  id: "",
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

function Events() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [upcomingEvents, setUpcomingEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<FormattedEvent | null>(
    null,
  );
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const dispatch = useDispatch();
  const eventFormOpen = useSelector(
    (state: RootState) => state.eventFormPage.value,
  );

  // Fetch events
  useEffect(() => {
    let isMounted = true;

    const fetchUpcomingEvents = async () => {
      if (!isMounted) return;

      try {
        setLoading(true);
        setFetchError(null);

        // Get current date for fromDate parameter
        const currentDate = new Date();

        const response = await getEvents(currentDate);

        if (isMounted && response.data && response.data.events) {
          // Format events to match EventCard component
          const formattedEvents = response.data.events.map(
            (event: EventFormValues) => ({
              id: event.id,
              name: event.name,
              description: event.description,
              image: placeholderImage, // Using placeholder image
              date: formatEventDate(event.startTime, event.endTime),
              location: event.location,
              startTime: event.startTime,
              endTime: event.endTime,
              isRegistrationRequired: event.isRegistrationRequired,
              bufferedStartTime: event.bufferedStartTime, // Default values for missing fields
              bufferedEndTime: event.bufferedEndTime,
              requirements: false,
            }),
          );

          setUpcomingEvents(formattedEvents);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching events:", error);
          setFetchError("Failed to load events. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUpcomingEvents();

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]); // Refetch when refresh is triggered

  const formikInitialValues = useMemo(
    () => (selectedEvent ? { ...selectedEvent } : initialFormValues),
    [selectedEvent],
  );

  const formik = useFormik<EventFormValues>({
    initialValues: formikInitialValues,
    validationSchema: EventValidationSchema,
    enableReinitialize: true,
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

        if (selectedEvent) {
          // Update existing event
          console.log("Updating event:", selectedEvent.id, formattedValues);
          const response = await editEvent(selectedEvent.id, formattedValues);
          if (response.data.success) {
            resetForm();
            setSuccess(true);
            dispatch(removeEventForm());
            // Trigger events refresh
            setRefreshTrigger((prev) => prev + 1);
            // Reset success after a delay
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }
        } else {
          const response = await createEvent(formattedValues);
          if (response.data.success) {
            resetForm();
            setSuccess(true);
            dispatch(removeEventForm());
            // Trigger events refresh
            setRefreshTrigger((prev) => prev + 1);
            // Reset success after a delay
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }
        }
      } catch (error: any) {
        setError(true);
      }
    },
  });

  const handleOpenEventForm = () => {
    setSelectedEvent(null);
    dispatch(displayEventForm());
  };

  const handleEditEvent = (event: FormattedEvent) => {
    setSelectedEvent(event);
    dispatch(displayEventForm());
  };

  const handleCloseEventForm = () => {
    setSelectedEvent(null);
    dispatch(removeEventForm());
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone.",
      )
    ) {
      try {
        const response = await deleteEvent(eventId);
        if (response.data.success) {
          // Trigger events refresh to remove the deleted event from the list
          setRefreshTrigger((prev) => prev + 1);
        }
      } catch (error: any) {
        console.error("Error deleting event:", error);
        // You could add a toast notification here for better UX
      }
    }
  };

  return (
    <section className="mx-container mb-section mt-14 lg:mt-20">
      <h1 className="mb-14 text-center text-3xl font-bold text-white 3xs:text-6xl sm:text-8xl lg:text-10xl 2xl:text-12xl">
        Manage Events
      </h1>
      <div className="flex flex-col gap-2 overflow-visible">
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
                  <div key={event.id} className="group relative">
                    <EventCard
                      id={event.id}
                      title={event.name}
                      image={event.image}
                      date={event.date}
                      location={event.location}
                    />

                    <div className="absolute right-4 top-4 z-10 flex gap-2 transition-opacity duration-300">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="bg-gray-800 cursor-pointer rounded-full p-2 text-white hover:text-grey1"
                        aria-label="Edit event"
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="bg-gray-800 cursor-pointer rounded-full p-2 text-white hover:text-darkRed"
                        aria-label="Delete event"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <PopUpPanels
          isPopUp={eventFormOpen}
          moveDownFunc={handleCloseEventForm}
          panelIndex={0}
          panels={[
            <div key="event-form" className="no-scrollbar w-full overflow-auto">
              <div className="mx-auto w-full max-w-2xl p-6">
                <p className="text-gray-300 mb-8">
                  {selectedEvent
                    ? "Edit the event details below."
                    : "Fill out the form below to create a new event."}
                </p>
                <EventForm
                  formik={formik}
                  success={success}
                  error={error}
                  isEditing={!!selectedEvent}
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

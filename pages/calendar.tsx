import { useState, useEffect } from "react";
import { getEvents } from "@/utils/apiCalls/eventApiCalls";
import moment from "moment-timezone";
import Button from "@/components/UI/Button";
import {
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
} from "react-feather";
import SEO from "@/components/SEO/SEO";
import { exportMonthEvents } from "@/utils/calendarExport";

interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  isRegistrationRequired: boolean;
}

const EventTooltip = ({
  event,
  position,
  isVisible,
  isPersistent,
  onClose,
}: {
  event: EventData | null;
  position: { x: number; y: number };
  isVisible: boolean;
  isPersistent: boolean;
  onClose: () => void;
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!event || !isVisible) return null;

  const startDate = moment(event.startTime);
  const endDate = moment(event.endTime);
  const isMultiDay = !startDate.isSame(endDate, "day");

  const formatDateTime = (timeString: string) => {
    return moment(timeString).format("MMM D, h:mm A");
  };

  const handleDescriptionClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div
      className="absolute z-50 w-72 rounded-lg border border-grey3 bg-grey4 shadow-2xl sm:w-80"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -100%)",
        marginTop: "-10px",
      }}
    >
      <div className="relative p-3 sm:p-4">
        <div className="bg-gradient absolute inset-0 rounded-lg opacity-10" />
        <div className="relative">
          <div className="mb-2 flex items-start justify-between">
            <h4 className="text-base pr-2 font-bold text-white sm:text-lg">
              {event.name}
            </h4>
            {isPersistent && (
              <button
                onClick={onClose}
                className="flex-shrink-0 text-grey1 transition-colors hover:text-white"
                aria-label="Close event details"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {event.description && (
            <div className="mb-3">
              <p
                className={`cursor-pointer text-xs leading-relaxed text-grey1 transition-colors hover:text-white sm:text-sm ${
                  isDescriptionExpanded ? "" : "line-clamp-2"
                }`}
                onClick={handleDescriptionClick}
                title={
                  isDescriptionExpanded
                    ? "Click to collapse"
                    : "Click to expand"
                }
              >
                {event.description}
              </p>
              {event.description.length > 100 && (
                <button
                  className="mt-1 text-xs text-blue transition-colors hover:text-blue/80"
                  onClick={handleDescriptionClick}
                >
                  {isDescriptionExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}

          <div className="space-y-2">
            {isMultiDay ? (
              <div className="flex items-start gap-2">
                <CalendarIcon className="mt-0.5 h-3 w-3 flex-shrink-0 text-blue sm:h-4 sm:w-4" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium text-white">
                    {formatDateTime(event.startTime)}
                  </p>
                  <p className="text-xs text-grey1">
                    to {formatDateTime(event.endTime)}
                  </p>
                  <div className="mt-1 inline-block rounded-full bg-blue/20 px-2 py-0.5">
                    <p className="text-xs font-medium text-blue">
                      Multi-day event
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 flex-shrink-0 text-blue sm:h-4 sm:w-4" />
                <div className="text-xs sm:text-sm">
                  <p className="font-medium text-white">
                    {formatDateTime(event.startTime)}
                  </p>
                  <p className="text-xs text-grey1">
                    to {moment(event.endTime).format("h:mm A")}
                  </p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 flex-shrink-0 text-blue sm:h-4 sm:w-4" />
                <p className="text-xs text-white sm:text-sm">
                  {event.location}
                </p>
              </div>
            )}

            {event.isRegistrationRequired && (
              <div className="mt-3 inline-block rounded-full bg-blue/20 px-2 py-1">
                <p className="text-xs font-medium text-blue">
                  Registration Required
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_OF_WEEK_MOBILE = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Tooltip state
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipPersistent, setIsTooltipPersistent] = useState(false);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get events for the entire current month
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );

        const response = await getEvents(startOfMonth, endOfMonth);

        if (response.data && response.data.events) {
          setEvents(response.data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  const getEventsForDate = (date: number) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      date,
    );

    return events.filter((event) => {
      const eventStart = moment(event.startTime).startOf("day");
      const eventEnd = moment(event.endTime).startOf("day");
      const target = moment(targetDate).startOf("day");

      // Check if the target date falls within the event's date range
      return target.isBetween(eventStart, eventEnd, "day", "[]");
    });
  };

  const getMultiDayEventInfo = (event: EventData, date: number) => {
    const targetDate = moment(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), date),
    ).startOf("day");

    const eventStart = moment(event.startTime).startOf("day");
    const eventEnd = moment(event.endTime).startOf("day");

    const isMultiDay = !eventStart.isSame(eventEnd, "day");

    // Calculate the first day this event should be rendered in the current month view
    const monthStart = moment(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    ).startOf("day");
    const monthEnd = moment(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    ).startOf("day");

    const renderStartDate = moment.max(eventStart, monthStart);
    const renderEndDate = moment.min(eventEnd, monthEnd);

    const shouldRender = targetDate.isSame(renderStartDate, "day");

    if (!shouldRender) {
      return { shouldRender: false, spanDays: 0, isMultiDay };
    }

    // Calculate how many days this event spans in the visible calendar
    const spanDays = renderEndDate.diff(renderStartDate, "days") + 1;

    // Calculate position within the week to handle week wrapping
    const startDayOfWeek = renderStartDate.day();
    const remainingDaysInWeek = 7 - startDayOfWeek;
    const daysToShow = Math.min(spanDays, remainingDaysInWeek);

    return {
      shouldRender: true,
      spanDays: daysToShow,
      isMultiDay,
      startsBeforeMonth: eventStart.isBefore(monthStart),
      endsAfterMonth: eventEnd.isAfter(monthEnd),
      totalSpanDays: spanDays,
    };
  };

  const getEventsToRender = (date: number) => {
    if (loading) return [];
    const dayEvents = getEventsForDate(date);

    return dayEvents.filter((event) => {
      const info = getMultiDayEventInfo(event, date);
      return info.shouldRender;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth()
    );
  };

  const handleEventClick = (
    event: EventData,
    mouseEvent: React.MouseEvent | React.TouchEvent,
  ) => {
    const rect = mouseEvent.currentTarget.getBoundingClientRect();
    const calendarContainer = document.querySelector(".calendar-container");
    const containerRect = calendarContainer?.getBoundingClientRect();

    if (containerRect) {
      setTooltipPosition({
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top - containerRect.top,
      });
    } else {
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
    setSelectedEvent(event);
    setIsTooltipVisible(true);
    setIsTooltipPersistent(true);
  };

  const handleEventLeave = () => {
    if (!isTooltipPersistent) {
      setIsTooltipVisible(false);
      setTimeout(() => {}, 100);
    }
  };

  const handleCloseTooltip = () => {
    setIsTooltipVisible(false);
    setIsTooltipPersistent(false);
    setSelectedEvent(null);
    //setHoveredEvent(null);
  };

  const handleExportMonthEvents = () => {
    if (events.length > 0) {
      const icsFileName = `dsc ${
        MONTHS[currentDate.getMonth()]
      } ${currentDate.getFullYear()} Events`;
      exportMonthEvents(events, icsFileName);
    }
  };

  const renderCalendarDays = () => {
    const days = [];

    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      0,
    );
    const prevMonthDays = prevMonth.getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${day}`}
          className="min-h-[80px] border border-grey3 bg-grey4/5 p-1 opacity-50 sm:min-h-[120px] sm:p-2"
        >
          <div className="text-xs font-semibold text-grey2 sm:text-sm">
            {day}
          </div>
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const eventsToRender = getEventsToRender(day);
      const isToday =
        new Date().toDateString() ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day,
        ).toDateString();

      days.push(
        <div
          key={day}
          className={`relative min-h-[80px] border border-grey3 bg-grey4/10 p-1 sm:min-h-[120px] sm:p-2 ${
            isToday ? "border-blue bg-blue/20" : ""
          }`}
        >
          <div
            className={`mb-1 text-xs font-semibold sm:mb-2 sm:text-sm ${
              isToday ? "text-blue" : "text-white"
            }`}
          >
            {day}
          </div>
          <div className="relative h-16 space-y-1 sm:h-28">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 animate-pulse rounded-full bg-grey2 sm:h-3 sm:w-3"></div>
              </div>
            ) : (
              eventsToRender.map((event, index) => {
                const eventInfo = getMultiDayEventInfo(event, day);

                if (!eventInfo.shouldRender) return null;

                const cellWidth = 100; // Percentage width of one cell
                const spanWidth = cellWidth * eventInfo.spanDays - 0.5; // Slight gap between cells

                return (
                  <div
                    key={`${event.id}-${day}`}
                    className="absolute top-[calc(var(--i)*16px)] z-10 cursor-pointer touch-manipulation overflow-hidden whitespace-nowrap rounded-sm bg-blue px-1 py-0.5 text-2xs font-medium text-white transition-colors hover:bg-blue/80 active:bg-blue/60 sm:top-[calc(var(--i)*40px)] sm:px-2 sm:py-1 sm:text-xs"
                    style={
                      {
                        width: `${spanWidth}%`,
                        "--i": index,
                      } as React.CSSProperties
                    }
                    //onMouseEnter={(e) => handleEventHover(event, e)}
                    onMouseLeave={handleEventLeave}
                    onClick={(e) => handleEventClick(event, e)}
                    onTouchStart={(e) => handleEventClick(event, e)}
                  >
                    <div className="truncate font-semibold">
                      {eventInfo.startsBeforeMonth && "← "}
                      {event.name}
                      {eventInfo.endsAfterMonth && " →"}
                    </div>
                    <div className="hidden truncate text-2xs text-white/80 sm:block">
                      {moment(event.startTime).format("h:mm A")}
                      {eventInfo.isMultiDay &&
                        ` - ${moment(event.endTime).format("MMM D, h:mm A")}`}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>,
      );
    }

    // Calculate how many cells are used so far
    const cellsUsed = startingDayOfWeek + daysInMonth;

    // Only add next month days if we need to complete the current week (not a full 6-week grid)
    const remainingInWeek = 7 - (cellsUsed % 7);

    // Only add next month days if we're not at the end of a complete week
    if (remainingInWeek < 7) {
      for (let day = 1; day <= remainingInWeek; day++) {
        days.push(
          <div
            key={`next-${day}`}
            className="min-h-[80px] border border-grey3 bg-grey4/5 p-1 opacity-50 sm:min-h-[120px] sm:p-2"
          >
            <div className="text-xs font-semibold text-grey2 sm:text-sm">
              {day}
            </div>
            <div className="h-16 space-y-1 sm:h-28"></div>
          </div>,
        );
      }
    }

    return days;
  };

  return (
    <>
      <SEO title="Event Calendar" />
      <div className="mx-container mb-section mt-24 px-2 sm:mt-14 sm:px-4 lg:mt-[122px]">
        <h1 className="mb-8 text-center text-2xl font-bold text-white 3xs:text-4xl xs:text-3xl sm:mb-14 sm:text-6xl lg:text-8xl xl:text-10xl 2xl:text-12xl">
          Event Calendar
        </h1>

        {error && (
          <div className="sm:text-base mb-4 rounded-lg border border-red bg-red/20 p-3 text-center text-sm text-red sm:mb-6 sm:p-4">
            {error}
          </div>
        )}

        <div className="calendar-container relative rounded-lg bg-grey4/50 p-3 sm:p-6">
          {/* Mobile Header - Inline Navigation */}
          <div className="mb-4 flex items-center justify-between sm:mb-6 sm:hidden">
            <div className="flex flex-col items-start gap-2">
              <h2 className="text-center text-xl font-bold text-white">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              {events.length > 0 && (
                <Button
                  type="button"
                  hierarchy="secondary"
                  font="font-medium"
                  text="text-xs"
                  rounded="rounded-sm"
                  padding="px-2 py-1"
                  onClick={handleExportMonthEvents}
                  classes="border-[1px] border-white hover:bg-blue/20 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export {MONTHS[currentDate.getMonth()]} Events
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="p-1"
                onClick={goToPreviousMonth}
                classes="hover:bg-grey4 flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="px-3 py-1"
                onClick={goToToday}
                classes={`text-xs ${
                  isCurrentMonth()
                    ? "bg-blue/20 hover:cursor-default"
                    : "hover:bg-grey4"
                }`}
                disabled={isCurrentMonth()}
              >
                Today
              </Button>
              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="p-1"
                onClick={goToNextMonth}
                classes="hover:bg-grey4 flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Desktop Header - Original Layout */}
          <div className="mb-4 hidden items-center justify-between sm:mb-6 sm:flex">
            <div className="flex items-center gap-4">
              <h2 className="text-center text-2xl font-bold text-white lg:text-3xl">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
            {events.length > 0 && (
              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="px-3 py-2"
                onClick={handleExportMonthEvents}
                classes="border-[1px] border-white hover:bg-blue/20 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Export {MONTHS[currentDate.getMonth()]} Events
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="p-2"
                onClick={goToPreviousMonth}
                classes="hover:bg-grey4 flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>

              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="px-3 py-2"
                onClick={goToToday}
                classes={`${
                  isCurrentMonth()
                    ? "bg-blue/20 hover:cursor-default"
                    : "hover:bg-grey4"
                }`}
                disabled={isCurrentMonth()}
              >
                Today
              </Button>

              <Button
                type="button"
                hierarchy="secondary"
                font="font-medium"
                rounded="rounded-md"
                padding="p-2"
                onClick={goToNextMonth}
                classes="hover:bg-grey4 flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-0">
            {DAYS_OF_WEEK.map((day, index) => (
              <div
                key={day}
                className="border-b border-grey3 p-2 text-center text-xs font-semibold text-grey1 sm:p-3 sm:text-sm"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{DAYS_OF_WEEK_MOBILE[index]}</span>
              </div>
            ))}
          </div>

          <div className="grid min-h-[480px] grid-cols-7 gap-0 sm:min-h-[720px]">
            {renderCalendarDays()}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-grey1 sm:mt-6 sm:gap-4 sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="rounded h-3 w-3 bg-blue sm:h-4 sm:w-4"></div>
              <span>Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded h-3 w-3 border border-blue bg-blue/20 sm:h-4 sm:w-4"></div>
              <span>Today</span>
            </div>
          </div>

          <div className="mt-6 text-center text-grey1 sm:mt-8">
            <p className="sm:text-base text-sm">
              {loading ? (
                <>
                  Loading events for {MONTHS[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}...
                </>
              ) : (
                <>
                  Showing {events.length} event{events.length !== 1 ? "s" : ""}{" "}
                  for {MONTHS[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </>
              )}
            </p>
            {!loading && events.length > 0 && (
              <p className="mt-2 text-xs sm:text-sm">
                Tap events to see more details and export options
              </p>
            )}
          </div>

          <EventTooltip
            event={selectedEvent}
            position={tooltipPosition}
            isVisible={isTooltipVisible}
            isPersistent={isTooltipPersistent}
            onClose={handleCloseTooltip}
          />
        </div>
      </div>
    </>
  );
}

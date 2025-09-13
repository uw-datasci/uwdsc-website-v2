interface EventData {
  id: string;
  name: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  isRegistrationRequired: boolean;
}

// Format date for ICS format (YYYYMMDDTHHMMSSZ)
const formatICSDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
};

// Escape special characters in ICS format
const escapeICSText = (text: string): string => {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "");
};

// Generate ICS content for a single event
export const generateICSEvent = (event: EventData): string => {
  const dtStart = formatICSDate(event.startTime);
  const dtEnd = formatICSDate(event.endTime);
  const dtStamp = formatICSDate(new Date().toISOString());

  let description = escapeICSText(event.description || "");
  if (event.isRegistrationRequired) {
    description += description
      ? "\\n\\nRegistration Required"
      : "Registration Required";
  }

  return [
    "BEGIN:VEVENT",
    `UID:${event.id}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `DTSTAMP:${dtStamp}`,
    `SUMMARY:${escapeICSText(event.name)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${escapeICSText(event.location || "")}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
  ].join("\r\n");
};

// Generate complete ICS file content
export const generateICSFile = (
  events: EventData[],
  calendarName = "Events",
): string => {
  const icsEvents = events.map(generateICSEvent).join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Your App//Event Calendar//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeICSText(calendarName)}`,
    "X-WR-TIMEZONE:UTC",
    icsEvents,
    "END:VCALENDAR",
  ].join("\r\n");
};

// Download ICS file
export const downloadICSFile = (
  content: string,
  filename = "events.ics",
): void => {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Export multiple events
export const exportMonthEvents = (
  events: EventData[],
  calendarName = "Events",
): void => {
  const icsContent = generateICSFile(events, calendarName);
  const filename = `${calendarName
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase()}.ics`;
  downloadICSFile(icsContent, filename);
};

import { useState } from "react";
import { createEvent } from "@/utils/apiCalls/adminApiCalls";
import { useRouter } from "next/router";
import withAuth from "@/components/permissions/authPage";

function AddEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    isRegistrationRequired: true,
    description: "",
    location: "",
    startTime: "",
    bufferedStartTime: "",
    endTime: "",
    bufferedEndTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createEvent({
        ...formData,
        requirements: {
          user: { hasPaid: true },
          checkedIn: false,
          selected: true,
        },
        toDisplay: {
          before: {
            user: {
              username: "Name",
              faculty: "Faculty",
              hasPaid: "Has user paid?",
            },
            checkedIn: "Is checked-in",
          },
          after: {
            user: {
              username: "Name",
              faculty: "Faculty",
            },
            checkedIn: "Is checked-in",
          },
        },
        additionalFieldsSchema: {},
      });
      console.log("Event created successfully:", response.data);
      router.push("/memberships"); // Redirect to admin page after successful creation
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="container mx-auto mt-24 px-4 py-8 lg:mt-[122px]">
      <h1 className="mb-8 text-3xl font-bold text-white">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white">
            Event Name
          </label>
          <p className="text-gray-300 mb-1 text-sm">
            Enter a clear, descriptive name for your event (e.g., &quot;Data
            Science Workshop: Introduction to Python&quot;)
          </p>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Description
          </label>
          <p className="text-gray-300 mb-1 text-sm">
            Provide a detailed description of the event, including what
            participants will learn or experience
          </p>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Location
          </label>
          <p className="text-gray-300 mb-1 text-sm">
            Specify the physical location or virtual meeting link for the event
          </p>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white">
              Start Time
            </label>
            <p className="text-gray-300 mb-1 text-sm">When the event begins</p>
            <input
              type="datetime-local"
              required
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              End Time
            </label>
            <p className="text-gray-300 mb-1 text-sm">
              When the event concludes
            </p>
            <input
              type="datetime-local"
              required
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Buffered Start Time (Optional)
            </label>
            <p className="text-gray-300 mb-1 text-sm">
              If set, this is when participants can start checking in (e.g., 15
              minutes before the event)
            </p>
            <input
              type="datetime-local"
              value={formData.bufferedStartTime}
              onChange={(e) =>
                setFormData({ ...formData, bufferedStartTime: e.target.value })
              }
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Buffered End Time (Optional)
            </label>
            <p className="text-gray-300 mb-1 text-sm">
              If set, this is when participants can start checking out (e.g., 15
              minutes after the event)
            </p>
            <input
              type="datetime-local"
              value={formData.bufferedEndTime}
              onChange={(e) =>
                setFormData({ ...formData, bufferedEndTime: e.target.value })
              }
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isRegistrationRequired}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isRegistrationRequired: e.target.checked,
                })
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
            />
            <div className="ml-2">
              <span className="text-sm text-white">Registration Required</span>
              <p className="text-gray-300 text-xs">
                If checked, participants must register before attending
              </p>
            </div>
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 rounded-md px-4 py-2 text-white"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddEvent, ["admin"]);

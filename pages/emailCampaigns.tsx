import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { EmailRecipient, EmailFilter } from "@/types/email";
import { getFilterSummary } from "@/utils/emailFilters";
import {
  fetchFilteredUsers,
  sendBulkEmail,
} from "@/utils/apiCalls/adminApiCalls";
import Navbar from "@/components/navigation/Navbar";
import SEO from "@/components/SEO/SEO";

type CampaignFormData = {
  title: string;
  templateType: "welcome" | "confirmation" | "custom";
  customSubject: string;
  customContent: string;
  fromName: string;
  fromEmail: string;
  filters: EmailFilter;
  selectedRecipients: EmailRecipient[];
};

export default function EmailCampaignsPage() {
  const token = useSelector((state: RootState) => state.loginToken.token);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form validation
  const validateComposeStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Campaign title is required";
    }

    if (formData.templateType === "custom") {
      if (!formData.customSubject.trim()) {
        newErrors.customSubject = "Email subject is required";
      }
      if (!formData.customContent.trim()) {
        newErrors.customContent = "Email content is required";
      }
    }

    if (!formData.fromName.trim()) {
      newErrors.fromName = "From Name is required";
    }

    if (!formData.fromEmail.trim()) {
      newErrors.fromEmail = "From Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.fromEmail)) {
      newErrors.fromEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStepChange = (
    nextStep: "compose" | "recipients" | "preview" | "send",
  ) => {
    // Validation before moving to next step
    if (step === "compose" && nextStep === "recipients") {
      if (!validateComposeStep()) {
        return; // Stop if validation fails
      }
    }

    setStep(nextStep);
  };

  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    templateType: "welcome",
    customSubject: "",
    customContent: "",
    fromName: "UW Data Science Club",
    fromEmail: "noreply@uwdatascience.ca",
    filters: {},
    selectedRecipients: [],
  });

  const [filteredUsers, setFilteredUsers] = useState<EmailRecipient[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [step, setStep] = useState<
    "compose" | "recipients" | "preview" | "send"
  >("compose");

  // Load users when filters change
  useEffect(() => {
    fetchFilteredUsersData();
  }, []);

  const fetchFilteredUsersData = async () => {
    setLoading(true);
    try {
      const response = await fetchFilteredUsers(formData.filters);

      if (response.data.success && response.data.data) {
        setFilteredUsers(response.data.data.users);
      } else {
        console.error("Failed to fetch users:", response.data.error);
        // Fallback to empty array
        setFilteredUsers([]);
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      // Fallback to empty array
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await fetchFilteredUsers(formData.filters);

      if (response.data.success && response.data.data) {
        setFilteredUsers(response.data.data.users);
      } else {
        console.error("Failed to apply filters:", response.data.error);
      }
    } catch (error: any) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async () => {
    setSending(true);
    setResult(null);

    try {
      const recipients = formData.selectedRecipients;

      const response = await sendBulkEmail({
        templateType: formData.templateType,
        recipients,
        customSubject:
          formData.templateType === "custom"
            ? formData.customSubject
            : undefined,
        customContent:
          formData.templateType === "custom"
            ? formData.customContent
            : undefined,
        fromName: formData.fromName,
        fromEmail: formData.fromEmail,
        campaignTitle: formData.title,
        filterSummary: getFilterSummary(formData.filters),
        appliedFilters: formData.filters,
      });

      setResult(response.data);

      if (response.data.success) {
        setStep("send");
      }
    } catch (error: any) {
      setResult({
        success: false,
        error:
          error.response?.data?.message || error.message || "Unknown error",
      });
    } finally {
      setSending(false);
    }
  };

  const renderComposeStep = () => (
    <div className="space-y-6 rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
      <h2 className="text-gray-900 text-xl font-bold">
        Compose Email Campaign
      </h2>

      <div>
        <label className="text-gray-900 mb-2 block text-sm font-medium">
          Campaign Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
          placeholder="e.g., Welcome New Members - October 2025"
        />
      </div>

      <div>
        <label className="text-gray-700 mb-2 block text-sm font-medium">
          Email Template
        </label>
        <select
          value={formData.templateType}
          onChange={(e) =>
            setFormData({ ...formData, templateType: e.target.value as any })
          }
          className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
        >
          <option value="welcome">Welcome Email</option>
          <option value="confirmation">Membership Confirmation</option>
          <option value="custom">Custom Email</option>
        </select>
      </div>

      {formData.templateType === "custom" && (
        <>
          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Email Subject
            </label>
            <input
              type="text"
              value={formData.customSubject}
              onChange={(e) =>
                setFormData({ ...formData, customSubject: e.target.value })
              }
              className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block text-sm font-medium">
              Email Content
            </label>
            <textarea
              value={formData.customContent}
              onChange={(e) =>
                setFormData({ ...formData, customContent: e.target.value })
              }
              rows={10}
              className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              placeholder="Enter email content (HTML allowed)"
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 mb-2 block text-sm font-medium">
            From Name
          </label>
          <input
            type="text"
            value={formData.fromName}
            onChange={(e) =>
              setFormData({ ...formData, fromName: e.target.value })
            }
            className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="text-gray-700 mb-2 block text-sm font-medium">
            From Email
          </label>
          <input
            type="email"
            value={formData.fromEmail}
            onChange={(e) =>
              setFormData({ ...formData, fromEmail: e.target.value })
            }
            className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep("compose")}
          className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          Back
        </button>
        <button
          onClick={() => handleStepChange("recipients")}
          className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          Next: Select Recipients
        </button>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border-red-200 mt-4 rounded-lg border p-3">
          <ul className="text-red-600 list-inside list-disc text-sm">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderRecipientsStep = () => (
    <div className="space-y-6 rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
      <h2 className="text-gray-900 text-xl font-bold">Select Recipients</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-gray-900 mb-4 text-lg font-medium">
            Filter Options
          </h3>{" "}
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 mb-2 block text-sm font-medium">
                Payment Status
              </label>
              <select
                value={
                  formData.filters.hasPaid === undefined
                    ? ""
                    : formData.filters.hasPaid.toString()
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      hasPaid:
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true",
                    },
                  })
                }
                className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              >
                <option value="">All Members</option>
                <option value="true">Paid Members Only</option>
                <option value="false">Unpaid Members Only</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 mb-2 block text-sm font-medium">
                Email Verification
              </label>
              <select
                value={
                  formData.filters.isEmailVerified === undefined
                    ? ""
                    : formData.filters.isEmailVerified.toString()
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      isEmailVerified:
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true",
                    },
                  })
                }
                className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              >
                <option value="">All Members</option>
                <option value="true">Verified Emails Only</option>
                <option value="false">Unverified Emails Only</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 mb-2 block text-sm font-medium">
                User Role
              </label>
              <select
                multiple
                value={formData.filters.userStatus || []}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      userStatus: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      ),
                    },
                  })
                }
                className="border-gray-300 focus:ring-blue-500 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              >
                <option value="member">Members</option>
                <option value="exec">Executives</option>
                <option value="admin">Administrators</option>
              </select>
              <p className="text-gray-500 mt-1 text-xs">
                Hold Ctrl/Cmd to select multiple
              </p>
            </div>

            <button
              onClick={applyFilters}
              className="w-full rounded-lg bg-[#2563eb] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div>
          <div className="flex flex-row justify-between">
            <h3 className="text-gray-900 mb-4 text-lg font-medium">
              Recipients ({filteredUsers.length})
            </h3>
            {filteredUsers.length > 0 && (
              <button
                onClick={() => {
                  const allSelected = filteredUsers.every((user) =>
                    formData.selectedRecipients.some((r) => r._id === user._id),
                  );
                  if (allSelected) {
                    // Deselect all
                    setFormData({
                      ...formData,
                      selectedRecipients: formData.selectedRecipients.filter(
                        (recipient) =>
                          !filteredUsers.some(
                            (user) => user._id === recipient._id,
                          ),
                      ),
                    });
                  } else {
                    // Select all
                    setFormData({
                      ...formData,
                      selectedRecipients: [
                        ...formData.selectedRecipients,
                        ...filteredUsers.filter(
                          (user) =>
                            !formData.selectedRecipients.some(
                              (r) => r._id === user._id,
                            ),
                        ),
                      ],
                    });
                  }
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
              >
                {filteredUsers.every((user) =>
                  formData.selectedRecipients.some((r) => r._id === user._id),
                )
                  ? "Deselect All"
                  : "Select All"}
              </button>
            )}
          </div>

          <div className="border-gray-300 max-h-96 overflow-y-auto rounded-md border">
            {loading ? (
              <div className="text-gray-500 p-8 text-center">
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-gray-500 p-8 text-center">
                No users match the current filters
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="border-gray-200 hover:bg-gray-50 flex items-center justify-between border-b p-3"
                >
                  <div>
                    <div className="text-gray-900 font-medium">
                      {user.username}
                    </div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                    <div className="text-gray-400 text-xs">
                      {user.faculty} • {user.hasPaid ? "Paid" : "Unpaid"} •{" "}
                      {user.userStatus}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.selectedRecipients.some(
                      (r) => r._id === user._id,
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          selectedRecipients: [
                            ...formData.selectedRecipients,
                            user,
                          ],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          selectedRecipients:
                            formData.selectedRecipients.filter(
                              (r) => r._id !== user._id,
                            ),
                        });
                      }
                    }}
                    className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded h-4 w-4"
                  />
                </div>
              ))
            )}
          </div>

          {formData.selectedRecipients.length > 0 && (
            <div className="bg-blue-50 mt-4 rounded-md p-3">
              <p className="text-blue-800 text-sm">
                {formData.selectedRecipients.length} recipients manually
                selected
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep("compose")}
          className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back: Compose
        </button>
        <button
          onClick={() => handleStepChange("preview")}
          disabled={formData.selectedRecipients.length === 0}
          className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next: Preview & Send
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => {
    const recipients = formData.selectedRecipients;

    return (
      <div className="space-y-6 rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-gray-900 text-xl font-bold">
          Preview & Send Campaign
        </h2>

        <div className="rounded-lg bg-white/80 p-6 shadow-sm">
          <h3 className="text-gray-900 mb-4 text-lg font-medium">
            Campaign Summary
          </h3>{" "}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-700 font-medium">Title:</span>
              <span className="text-gray-900 ml-2">
                {formData.title || "Untitled Campaign"}
              </span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Template:</span>
              <span className="text-gray-900 ml-2 capitalize">
                {formData.templateType}
              </span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">From:</span>
              <span className="text-gray-900 ml-2">
                {formData.fromName} &lt;{formData.fromEmail}&gt;
              </span>
            </div>
            <div>
              <span className="text-gray-700 font-medium">Recipients:</span>
              <span className="text-gray-900 ml-2">
                {recipients.length} users
              </span>
            </div>
          </div>
          {formData.templateType === "custom" && (
            <div className="mt-4">
              <div className="text-gray-700 mb-2 font-medium">Subject:</div>
              <div className="text-gray-900 rounded border bg-white p-3">
                {formData.customSubject}
              </div>
            </div>
          )}
          <div className="mt-4">
            <div className="text-gray-700 mb-2 font-medium">
              Filter Summary:
            </div>
            <div className="text-gray-900">
              {getFilterSummary(formData.filters)}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-yellow-200 rounded-md border p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-yellow-800 text-sm font-medium">
                Ready to send?
              </h3>
              <div className="text-yellow-700 mt-2 text-sm">
                <p>
                  This will send {recipients.length} emails immediately. This
                  action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep("recipients")}
            className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          >
            Back: Recipients
          </button>
          <button
            onClick={sendCampaign}
            disabled={sending || recipients.length === 0}
            className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending
              ? "Sending..."
              : `Send Campaign (${recipients.length} emails)`}
          </button>
        </div>
      </div>
    );
  };

  const renderSendStep = () => (
    <div className="space-y-6 rounded-lg bg-white/50 p-6 shadow-sm backdrop-blur-sm">
      <h2 className="text-gray-900 text-xl font-bold">Campaign Results</h2>

      {result && (
        <div
          className={`rounded-lg p-6 ${
            result.success ? "bg-green-50/90" : "bg-red-50/90"
          }`}
        >
          <h3
            className={`mb-4 text-lg font-medium ${
              result.success ? "text-green-800" : "text-red-800"
            }`}
          >
            {result.success
              ? "✅ Campaign Sent Successfully!"
              : "❌ Campaign Failed"}
          </h3>

          {result.success && result.summary && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-600 text-2xl font-bold">
                  {result.summary.total}
                </div>
                <div className="text-green-800">Total</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 text-2xl font-bold">
                  {result.summary.sent}
                </div>
                <div className="text-green-800">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 text-2xl font-bold">
                  {result.summary.failed}
                </div>
                <div className="text-green-800">Failed</div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <pre className="rounded overflow-auto border bg-white p-3 text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => {
            setStep("compose");
            setFormData({
              title: "",
              templateType: "welcome",
              customSubject: "",
              customContent: "",
              fromName: "UW Data Science Club",
              fromEmail: "noreply@uwdatascience.ca",
              filters: {},
              selectedRecipients: [],
            });
            setResult(null);
          }}
          className="rounded-lg bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        >
          Create New Campaign
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SEO title="Email Campaigns" />
      <Navbar />
      <div className="bg-gray-100 min-h-screen pb-8 pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white/95 shadow-xl backdrop-blur-sm">
            <div className="border-gray-200 border-b px-6 py-4">
              <h1 className="text-gray-900 text-2xl font-bold">
                Email Campaigns
              </h1>

              {/* Progress Steps */}
              <div className="mt-4">
                <div className="flex items-center">
                  {["compose", "recipients", "preview", "send"].map(
                    (stepName, index) => (
                      <div key={stepName} className="flex items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                            step === stepName
                              ? "bg-blue-600 text-white"
                              : index <
                                  [
                                    "compose",
                                    "recipients",
                                    "preview",
                                    "send",
                                  ].indexOf(step)
                                ? "bg-green-600 text-white"
                                : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`ml-2 text-sm font-medium capitalize ${
                            step === stepName
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {stepName}
                        </span>
                        {index < 3 && (
                          <div
                            className={`mx-4 h-0.5 w-12 ${
                              index <
                              [
                                "compose",
                                "recipients",
                                "preview",
                                "send",
                              ].indexOf(step)
                                ? "bg-green-600"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-6">
              {step === "compose" && renderComposeStep()}
              {step === "recipients" && renderRecipientsStep()}
              {step === "preview" && renderPreviewStep()}
              {step === "send" && renderSendStep()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

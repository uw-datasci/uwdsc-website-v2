import { useState, useEffect } from 'react';
import { EmailRecipient, EmailFilter } from '@/types/email';
import { filterUsers, validateEmailFilters, getFilterSummary } from '@/utils/emailFilters';

type CampaignFormData = {
  title: string;
  templateType: 'welcome' | 'confirmation' | 'custom';
  customSubject: string;
  customContent: string;
  fromName: string;
  fromEmail: string;
  filters: EmailFilter;
  selectedRecipients: EmailRecipient[];
};

export default function EmailCampaignsPage() {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    templateType: 'welcome',
    customSubject: '',
    customContent: '',
    fromName: 'UW Data Science Club',
    fromEmail: 'noreply@uwdatascience.ca',
    filters: {},
    selectedRecipients: [],
  });

  const [allUsers, setAllUsers] = useState<EmailRecipient[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<EmailRecipient[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [step, setStep] = useState<'compose' | 'recipients' | 'preview' | 'send'>('compose');

  // Load users when filters change
  useEffect(() => {
    fetchFilteredUsers();
  }, []);

  const fetchFilteredUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/UWDSC/admin/getFilteredUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'admin-token', // Replace with real token
          filters: formData.filters,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setAllUsers(data.data.users);
        setFilteredUsers(data.data.users);
      } else {
        console.error('Failed to fetch users:', data.error);
        // Fallback to empty array
        setAllUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback to empty array
      setAllUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/UWDSC/admin/getFilteredUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'admin-token', // Replace with real token
          filters: formData.filters,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setFilteredUsers(data.data.users);
      } else {
        console.error('Failed to apply filters:', data.error);
      }
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async () => {
    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/UWDSC/admin/sendBulkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: 'admin-token', // Replace with real token
          templateType: formData.templateType,
          recipients: formData.selectedRecipients.length > 0 ? formData.selectedRecipients : filteredUsers,
          customSubject: formData.templateType === 'custom' ? formData.customSubject : undefined,
          customContent: formData.templateType === 'custom' ? formData.customContent : undefined,
          fromName: formData.fromName,
          fromEmail: formData.fromEmail,
          campaignTitle: formData.title,
          filterSummary: getFilterSummary(formData.filters),
          appliedFilters: formData.filters,
        }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        setStep('send');
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setSending(false);
    }
  };

  const renderComposeStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Compose Email Campaign</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Campaign Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Welcome New Members - October 2025"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Template
        </label>
        <select
          value={formData.templateType}
          onChange={(e) => setFormData({ ...formData, templateType: e.target.value as any })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="welcome">Welcome Email</option>
          <option value="confirmation">Membership Confirmation</option>
          <option value="custom">Custom Email</option>
        </select>
      </div>

      {formData.templateType === 'custom' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={formData.customSubject}
              onChange={(e) => setFormData({ ...formData, customSubject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email subject"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Content
            </label>
            <textarea
              value={formData.customContent}
              onChange={(e) => setFormData({ ...formData, customContent: e.target.value })}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email content (HTML allowed)"
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Name
          </label>
          <input
            type="text"
            value={formData.fromName}
            onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Email
          </label>
          <input
            type="email"
            value={formData.fromEmail}
            onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep('recipients')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next: Select Recipients
        </button>
      </div>
    </div>
  );

  const renderRecipientsStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Select Recipients</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Options</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <select
                value={formData.filters.hasPaid === undefined ? '' : formData.filters.hasPaid.toString()}
                onChange={(e) => setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    hasPaid: e.target.value === '' ? undefined : e.target.value === 'true'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Members</option>
                <option value="true">Paid Members Only</option>
                <option value="false">Unpaid Members Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Verification
              </label>
              <select
                value={formData.filters.isEmailVerified === undefined ? '' : formData.filters.isEmailVerified.toString()}
                onChange={(e) => setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    isEmailVerified: e.target.value === '' ? undefined : e.target.value === 'true'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Members</option>
                <option value="true">Verified Emails Only</option>
                <option value="false">Unverified Emails Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role
              </label>
              <select
                multiple
                value={formData.filters.userStatus || []}
                onChange={(e) => setFormData({
                  ...formData,
                  filters: {
                    ...formData.filters,
                    userStatus: Array.from(e.target.selectedOptions, option => option.value)
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="member">Members</option>
                <option value="exec">Executives</option>
                <option value="admin">Administrators</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
            </div>

            <button
              onClick={applyFilters}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recipients ({filteredUsers.length})
          </h3>
          
          <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-md">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading users...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No users match the current filters
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-3 border-b border-gray-200 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400">
                      {user.faculty} • {user.hasPaid ? 'Paid' : 'Unpaid'} • {user.userStatus}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.selectedRecipients.some(r => r._id === user._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          selectedRecipients: [...formData.selectedRecipients, user]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          selectedRecipients: formData.selectedRecipients.filter(r => r._id !== user._id)
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              ))
            )}
          </div>

          {formData.selectedRecipients.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                {formData.selectedRecipients.length} recipients manually selected
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep('compose')}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back: Compose
        </button>
        <button
          onClick={() => setStep('preview')}
          disabled={filteredUsers.length === 0 && formData.selectedRecipients.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Preview & Send
        </button>
      </div>
    </div>
  );

  const renderPreviewStep = () => {
    const recipients = formData.selectedRecipients.length > 0 ? formData.selectedRecipients : filteredUsers;
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Preview & Send Campaign</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <span className="ml-2 text-gray-900">{formData.title || 'Untitled Campaign'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Template:</span>
              <span className="ml-2 text-gray-900 capitalize">{formData.templateType}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">From:</span>
              <span className="ml-2 text-gray-900">{formData.fromName} &lt;{formData.fromEmail}&gt;</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Recipients:</span>
              <span className="ml-2 text-gray-900">{recipients.length} users</span>
            </div>
          </div>

          {formData.templateType === 'custom' && (
            <div className="mt-4">
              <div className="font-medium text-gray-700 mb-2">Subject:</div>
              <div className="text-gray-900 bg-white p-3 rounded border">{formData.customSubject}</div>
            </div>
          )}

          <div className="mt-4">
            <div className="font-medium text-gray-700 mb-2">Filter Summary:</div>
            <div className="text-gray-900">{getFilterSummary(formData.filters)}</div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Ready to send?</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>This will send {recipients.length} emails immediately. This action cannot be undone.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep('recipients')}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back: Recipients
          </button>
          <button
            onClick={sendCampaign}
            disabled={sending || recipients.length === 0}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : `Send Campaign (${recipients.length} emails)`}
          </button>
        </div>
      </div>
    );
  };

  const renderSendStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Campaign Results</h2>
      
      {result && (
        <div className={`p-6 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className={`text-lg font-medium mb-4 ${result.success ? 'text-green-800' : 'text-red-800'}`}>
            {result.success ? '✅ Campaign Sent Successfully!' : '❌ Campaign Failed'}
          </h3>
          
          {result.success && result.summary && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.summary.total}</div>
                <div className="text-green-800">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.summary.sent}</div>
                <div className="text-green-800">Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{result.summary.failed}</div>
                <div className="text-green-800">Failed</div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <pre className="text-xs bg-white p-3 rounded border overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => {
            setStep('compose');
            setFormData({
              title: '',
              templateType: 'welcome',
              customSubject: '',
              customContent: '',
              fromName: 'UW Data Science Club',
              fromEmail: 'noreply@uwdatascience.ca',
              filters: {},
              selectedRecipients: [],
            });
            setResult(null);
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Campaign
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
            
            {/* Progress Steps */}
            <div className="mt-4">
              <div className="flex items-center">
                {['compose', 'recipients', 'preview', 'send'].map((stepName, index) => (
                  <div key={stepName} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        step === stepName
                          ? 'bg-blue-600 text-white'
                          : index < ['compose', 'recipients', 'preview', 'send'].indexOf(step)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium capitalize ${
                      step === stepName ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {stepName}
                    </span>
                    {index < 3 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        index < ['compose', 'recipients', 'preview', 'send'].indexOf(step)
                          ? 'bg-green-600'
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            {step === 'compose' && renderComposeStep()}
            {step === 'recipients' && renderRecipientsStep()}
            {step === 'preview' && renderPreviewStep()}
            {step === 'send' && renderSendStep()}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { X, ExternalLink } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface Question {
  id: string;
  role: string;
  question: string;
}

interface ExecApp {
  _id: string;
  status: string;
  resumeUrl: string;
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
  termApplyingFor: {
    termName: string;
  };
  rolesApplyingFor: string[];
  roleQuestionAnswers: {
    [role: string]: {
      [questionId: string]: string | string[];
    };
  };
}

interface ExecAppViewCardProps {
  isOpen: boolean;
  onClose: () => void;
  application: ExecApp | null;
  questions: Question[];
}

export default function ExecAppViewCard({
  isOpen,
  onClose,
  application,
  questions,
}: ExecAppViewCardProps) {
  if (!isOpen || !application) return null;

  const formatDate = (d: string) => {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const generalAnswers = application.roleQuestionAnswers.general || {};
  const generalQuestions = questions.filter((q) => q.role === "general");

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join(", ");
    }
    return answer;
  };

  return (
    <div className={`${poppins.className} fixed inset-0 z-50 flex items-center justify-center p-4`}>
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#7CA3DE] bg-[#F2F6FC] shadow-2xl">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#CADAF3] bg-gradient-to-r from-[#314077] to-[#496AC7] px-6 py-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Application Details
            </h2>
            <p className="text-sm text-white/80">
              {application.termApplyingFor.termName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white transition-colors hover:text-white/80"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${
                  application.status === "submitted"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {application.status === "submitted" ? "Submitted" : "Draft"}
              </span>
              {application.submittedAt && (
                <span className="text-sm text-gray-600">
                  on {formatDate(application.submittedAt)}
                </span>
              )}
            </div>
            {application.resumeUrl && (
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-[#496AC7] px-4 py-2 text-sm font-medium text-white hover:bg-[#314077] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Resume
              </a>
            )}
          </div>

          <div className="rounded-lg bg-[#F2F6FC] p-4">
            <p className="text-sm font-medium text-gray-600">Application ID</p>
            <p className="mt-1 font-mono text-sm text-gray-900 break-all">
              {application._id}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#314077] border-b border-[#CADAF3] pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="mt-1 text-gray-900">{generalAnswers.full_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Program</p>
                <p className="mt-1 text-gray-900">{generalAnswers.program}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Waterloo Email
                </p>
                <p className="mt-1 text-gray-900">
                  {generalAnswers.waterloo_email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Personal Email
                </p>
                <p className="mt-1 text-gray-900">
                  {generalAnswers.personal_email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Academic Term
                </p>
                <p className="mt-1 text-gray-900">
                  {generalAnswers.academic_term}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="mt-1 text-gray-900">{generalAnswers.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Previous Club Experience
              </p>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                {generalAnswers.club_experience? "Yes": "No"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#314077] border-b border-[#CADAF3] pb-2">
                General Questions
              </h3>
              {generalQuestions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <p className="font-medium text-gray-700">
                    {question.question}
                  </p>
                  <p className="rounded-lg bg-[#F2F6FC] p-3 text-gray-900 whitespace-pre-wrap">
                    {renderAnswer(generalAnswers[question.id]) || "No answer provided"}
                  </p>
                </div>
              ))}
            </div>
            
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#314077] border-b border-[#CADAF3] pb-2">
              Role Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {application.rolesApplyingFor.map((role, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-[#CADAF3] px-4 py-1.5 text-sm font-medium text-[#314077]"
                >
                  {index + 1}. {role}
                </span>
              ))}
            </div>
          </div>

          {application.rolesApplyingFor.map((role, roleIndex) => {
            const roleQuestions = questions.filter((q) => q.role === role);
            const roleAnswers = application.roleQuestionAnswers[role] || {};

            if (roleQuestions.length === 0) return null;

            return (
              <div key={roleIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-[#314077] border-b border-[#CADAF3] pb-2">
                  {role} - Questions
                </h3>
                {roleQuestions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <p className="font-medium text-gray-700">
                      {question.question}
                    </p>
                    <p className="rounded-lg bg-[#F2F6FC] p-3 text-gray-900 whitespace-pre-wrap">
                      {renderAnswer(roleAnswers[question.id]) || "No answer provided"}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 border-t border-[#CADAF3] bg-[#F2F6FC] px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-md bg-gradient-to-b from-[#314077] to-[#496AC7] px-6 py-2 font-medium text-white hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

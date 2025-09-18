import { getAllAppsByTerm, getAllTerms } from "@/utils/apiCalls/adminApiCalls";
import {
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
  NotebookPen,
} from "lucide-react";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { MAX_ALLOWED_ROLES_TO_APPLY } from "@/constants/application";
import withAuth from "@/components/permissions/authPage";
import StatCard from "@/components/cards/StatCard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface Question {
  id: string;
  role: string;
  question: string;
}

interface QuestionByRole {
  [role: string]: Question[];
}

interface TermData {
  id: string;
  termName: string;
  questions: Question[];
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

function ExecAppView() {
  const [currentTerm, setCurrentTerm] = useState<TermData | null>(null);
  const [termApps, setTermApps] = useState<ExecApp[] | null>(null);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchCurrentTerm = async () => {
      try {
        const response = await getAllTerms();
        const term = response.data[0];
        const { _id, termName, questions } = term;
        setCurrentTerm({ id: _id, termName: termName, questions: questions });
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchCurrentTerm();
  }, []);

  useEffect(() => {
    const fetchTermApps = async () => {
      try {
        if (currentTerm) {
          const response = await getAllAppsByTerm(currentTerm.id);
          const sorted = response.data.sort((a: ExecApp, b: ExecApp) => {
            // Sort submitted first
            const a_status = a.status === "submitted" ? 0 : 1;
            const b_status = b.status === "submitted" ? 0 : 1;
            if (a_status - b_status !== 0) {
              return a_status - b_status;
            }
            return (
              new Date(a.updatedAt || a.createdAt).getTime() -
              new Date(b.updatedAt || b.createdAt).getTime()
            );
          });
          setTermApps(sorted);
        }
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchTermApps();
    setPageNumber(0);
  }, [currentTerm]);

  const calculateCompletionRate = () => {
    if (termApps) {
      const submittedCount = termApps.filter(
        (app) => app.status === "submitted",
      ).length;
      return Math.round((submittedCount / termApps.length) * 100);
    }
    return 0;
  };

  const exportToCSV = () => {
    if (!termApps || !currentTerm) {
      console.log("Current term or term applications are undefined");
      return null;
    }
    // defined hard coded headers
    const headers = [
      "Application ID",
      "Full Name",
      "UW Email",
      "Personal Email",
      "Program",
      "Academic Term",
      "Location",
      "Status",
      "Resume URL",
      "Previous Club Experience",
    ];
    // add general questions from term app
    const generalTermHeaders = currentTerm.questions
      .filter((q) => q.role === "general")
      .map((q) => q.question);
    generalTermHeaders.forEach((q) => headers.push(q));
    // add header for applied roles
    headers.push("Role Preferences (in order)");

    const maxQuetionsPerRoleRank = new Array(MAX_ALLOWED_ROLES_TO_APPLY).fill(
      0,
    );

    // add role specific headers for each ranked role
    for (let i = 0; i < MAX_ALLOWED_ROLES_TO_APPLY; i++) {
      // Get all unique roles for role ranked {i}
      const allRoles = Array.from(
        new Set(
          termApps
            .map((app) => app.rolesApplyingFor?.[i])
            .filter((role): role is string => Boolean(role)),
        ),
      );

      const questionsByRole: QuestionByRole = {};
      // group questions by role
      allRoles.forEach((role) => {
        const roleQuestions = currentTerm.questions.filter(
          (q) => q.role === role,
        );
        questionsByRole[role] = roleQuestions;
      });

      // calculate max number of qeustions possible that can appear in role rank
      let maxQuestions = 0;
      for (const role in questionsByRole) {
        maxQuestions = Math.max(questionsByRole[role].length, maxQuestions);
      }
      maxQuetionsPerRoleRank[i] = maxQuestions;

      // add max question headers
      if (maxQuestions) {
        headers.push(`Role ${i + 1}`);
        for (let j = 0; j < maxQuestions; j++) {
          headers.push(`Role ${i + 1} - Q${j + 1}`);
          headers.push(`Role ${i + 1} - Q${j + 1} Answer`);
        }
      }
    }
    // supplementary questions removed - no longer needed

    // formulate applicant data info
    const csvData = termApps.map((app) => {
      const row = [
        app._id,
        app.roleQuestionAnswers.general.full_name,
        app.roleQuestionAnswers.general.waterloo_email,
        app.roleQuestionAnswers.general.personal_email,
        app.roleQuestionAnswers.general.program,
        app.roleQuestionAnswers.general.academic_term,
        app.roleQuestionAnswers.general.location,
        app.status,
        app.resumeUrl,
        app.roleQuestionAnswers.general.club_experience,
      ];
      // add answers to general term questions
      const generalTermQuestions = currentTerm.questions.filter(
        (q) => q.role === "general",
      );
      generalTermQuestions.forEach((q) =>
        row.push(app.roleQuestionAnswers.general[q.id]),
      );
      row.push(app.rolesApplyingFor.join(", "));

      // add role specific question answer pair for each ranked role
      for (let i = 0; i < MAX_ALLOWED_ROLES_TO_APPLY; i++) {
        const roleApplyingFor = app.rolesApplyingFor?.[i];
        if (roleApplyingFor) {
          row.push(roleApplyingFor);
          const roleQuestions = currentTerm.questions.filter(
            (q) => q.role === roleApplyingFor,
          );
          // add question answer pair for role specific questions
          for (let j = 0; j < maxQuetionsPerRoleRank[i]; j++) {
            const question = roleQuestions?.[j];
            if (question) {
              row.push(question.question);
              row.push(
                app.roleQuestionAnswers[roleApplyingFor]?.[question.id] ?? "",
              );
            } else {
              row.push(""); // empty question
              row.push(""); // empty ans
            }
          }
        } else if (maxQuetionsPerRoleRank[i]) {
          row.push(""); // empty role
          for (let j = 0; j < maxQuetionsPerRoleRank[i]; j++) {
            row.push(""); // empty question
            row.push(""); // empty ans
          }
        }
      }

      // supplementary question data removed - no longer needed

      return row;
    });

    const csvContent = [headers, ...csvData]
      .map((row) =>
        row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${currentTerm.termName}_applications.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  if (!currentTerm || !termApps) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // pagination
  const appsPerPage = 8;
  const pagesVisited = pageNumber * appsPerPage;
  const pageCount = Math.ceil(termApps.length / appsPerPage);
  const displayedApplications =
    termApps.length > appsPerPage
      ? termApps?.slice(pagesVisited, pagesVisited + appsPerPage)
      : termApps;

  const goToNextPage = () => {
    if (pageNumber + 1 < pageCount) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber !== 0) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`${poppins.className} min-h-screen w-full bg-[#E1EAF8] py-5 md:py-10`}
    >
      <div className="flex flex-col items-center justify-center gap-1 p-5 md:p-10">
        <p className="text-center text-3xl font-semibold">
          DSC Exec Application Form
        </p>
        {/* replace with term name after */}
        <div className="relative inline-block px-10 align-middle">
          <div className="rounded absolute inset-x-0 top-4 z-0 bg-[#7CA3DE33]/20 py-3"></div>
          <p className="z-10 m-0 text-2xl font-semibold text-[#5D84D4]">
            {currentTerm.termName}
          </p>
        </div>
      </div>

      {/* Application Table with Stats*/}
      <div className="px-2 md:px-[10%]">
        {/* Stats + CSV */}
        <div className="flex flex-col items-center gap-5 py-8 sm:flex-row sm:justify-start">
          {/* Total Applications Card */}
          <StatCard
            value={termApps.length}
            label="Total Applications"
            icon={<NotebookPen className="h-6 w-6 text-white" />}
            iconBgColour="bg-[#5c7fe1]"
            cardBgColour="bg-[#CADAF3]"
            borderColour="border-[#7CA3DE]"
            statColour="text-[#314077]"
            labelColour="text-[#222949B2]/70"
          />
          {/* Completion Rate Card */}
          <StatCard
            value={`${calculateCompletionRate()}%`}
            label="Completion Rate"
            icon={<Check className="h-6 w-6 text-white" strokeWidth={3} />}
            iconBgColour="bg-[#4ADE80]"
            cardBgColour="bg-[#CADAF3]"
            borderColour="border-[#7CA3DE]"
            statColour="text-[#314077]"
            labelColour="text-[#314077]"
          />

          {/* Export to CSV Button */}
          <button
            className="mt-auto flex w-fit items-center gap-3 rounded-md bg-gradient-to-b from-[#314077] to-[#496AC7] px-4 py-3 text-md font-medium text-white hover:opacity-90 sm:ml-auto sm:px-6 sm:py-4"
            onClick={exportToCSV}
          >
            <Download className="h-5 w-5" strokeWidth={2.75} />
            Export to CSV
          </button>
        </div>
        {/* Table */}
        <div
          className={`rounded-xl border-[1px] border-[#CADAF3] bg-[#F2F6FC] text-[#030712] ${
            termApps.length > appsPerPage
              ? "px-5 pt-5 sm:px-10 sm:pt-10"
              : "p-6 sm:p-10"
          }`}
        >
          <p className="text-xl font-semibold sm:text-2xl xl:text-4xl">
            Applications
          </p>
          <div className="grid grid-cols-4 justify-between gap-3 pb-3 pt-5 text-sm font-medium sm:gap-8 sm:text-md">
            <p className="col-span-1 text-left">Application ID</p>
            <p className="col-span-1">Applicant</p>
            <p className="col-span-1">Program</p>
            <p className="col-span-1">Submitted</p>
          </div>
          <div className="h-[1px] w-full bg-[#A6C3EA]" />
          {displayedApplications.map((app, i) => (
            <div key={app._id}>
              <div className="grid grid-cols-4 gap-8 pb-3 pt-5 text-xs sm:text-md">
                <p className="col-span-1 flex items-center break-all">
                  {app._id}
                </p>
                <div className="col-span-1 flex flex-col items-start break-all">
                  <span>{app.roleQuestionAnswers.general?.full_name}</span>
                  <span className="text-black/70">
                    {app.roleQuestionAnswers.general?.waterloo_email}
                  </span>
                </div>
                <p className="col-span-1 flex items-center break-all">
                  {app.roleQuestionAnswers.general?.program}
                </p>
                <p className="col-span-1 flex items-center break-all">
                  {app.submittedAt && app.status === "submitted"
                    ? formatDate(app.submittedAt)
                    : app.status}
                </p>
              </div>
              {i !== displayedApplications.length - 1 && (
                <div className="h-[1px] w-full bg-[#A6C3EA]" />
              )}
            </div>
          ))}
          <div
            className={`${
              termApps.length > appsPerPage ? "flex" : "hidden"
            } flex-row items-center justify-between py-4 sm:justify-center sm:gap-8 sm:p-7`}
          >
            <div>
              <button
                className="mr-2 cursor-pointer rounded-sm bg-[#496AC7] px-2 py-1 hover:bg-[#314077] sm:px-3 sm:py-2"
                onClick={goToPrevPage}
                disabled={pageNumber === 0}
              >
                <ChevronLeft
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              </button>
              <button
                className="cursor-pointer rounded-sm bg-[#496AC7] px-2 py-1 hover:bg-[#314077] sm:px-3 sm:py-2"
                onClick={goToNextPage}
                disabled={pageNumber + 1 >= pageCount}
              >
                <ChevronRight
                  className="h-4 w-4 text-white sm:h-5 sm:w-5"
                  strokeWidth={2}
                />
              </button>
            </div>
            <p className="text-center text-xs sm:text-md">
              Page {pageNumber + 1} out of {pageCount}
            </p>
            <div className="flex flex-row items-center gap-2 text-xs sm:text-md">
              <p> Go to: </p>
              {/* check for integer input if time */}
              <input
                type="number"
                defaultValue={pageNumber + 1}
                min={1}
                max={pageCount}
                onChange={(e) => {
                  let page = Number(e.target.value);
                  if (isNaN(page)) page = 1;
                  if (page < 1) page = 1;
                  if (page > pageCount) page = pageCount;
                  setPageNumber(page - 1);
                }}
                className="w-16 rounded-sm border py-0.5 text-center text-xs sm:text-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ExecAppView, ["admin"]);

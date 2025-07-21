import { FormikProps } from "formik";
import { ApplicationFormValues, Question } from "@/types/application";
import { Crown, Users, InfoIcon } from "lucide-react";
import Dropdown from "@/components/UI/Dropdown";
import RenderDynamicQuestion from "@/components/forms/application/RenderDynamicQuestions";
import { useEffect, useState } from "react";
import InputFeedback from "@/components/UI/Inputs/UWDSC/InputFeedback";
import { MAX_ALLOWED_ROLES_TO_APPLY } from "@/constants/application";

interface PositionsProps {
  formik: FormikProps<ApplicationFormValues>;
  questions: Question[];
  isNextValid: (valid: boolean) => void;
}

export default function Positions({
  formik,
  questions,
  isNextValid,
}: PositionsProps) {
  const [positionError, setPositionError] = useState("");
  const [formTouched, setFormTouched] = useState(false);

  const roles = Array.from(
    new Set([
      ...questions
        .filter((q) => !["general", "supplementary"].includes(q.role))
        .map((q) => q.role)
        .sort(),
      "None",
    ]),
  );

  // determine if all questions in position page is filled out correctly
  const isStepValid = () => {
    const currentRoles = formik.values.rolesApplyingFor;
    const currentRolesWithoutNone = currentRoles.filter(
      (role) => role !== "None",
    );

    const len = currentRoles.length;
    const lenWithoutNone = currentRolesWithoutNone.length;

    if (!currentRolesWithoutNone || lenWithoutNone === 0) {
      setPositionError("Please select at least one role.");
      return false;
    }

    // find last index a valid role appears
    const reversedIndex = [...currentRoles]
      .reverse()
      .findIndex((role) => role && role !== "None");
    const lastRoleIndex =
      reversedIndex === -1 ? -1 : currentRoles.length - 1 - reversedIndex;
    // find first occurance an empty gap appears
    const firstEmptyIndex = [...currentRoles].findIndex(
      (role) => !role || role === "None",
    );

    // check that chosen roles have consecutive order (i.e. 1,3 or 2,3 is not valid => 1, 2 or 1 is)
    // if first empty gap appears before last role -> invalid
    if (
      firstEmptyIndex !== -1 &&
      lastRoleIndex !== -1 &&
      firstEmptyIndex < lastRoleIndex
    ) {
      setPositionError(
        "Role preferences must be in consecutive order and no gaps in rank (i.e. selecting #1 and #3 is invalid).",
      );
      return false;
    }

    // check if all roles chosen are unique
    if (lenWithoutNone !== new Set(currentRolesWithoutNone).size) {
      setPositionError("Selected roles must be unique.");
      return false;
    }

    // check that all required qeustions for chosen roles are answered
    const validRequired = currentRolesWithoutNone.every((role) => {
      const roleRequiredQuestions = getRoleSpecificQuestions(role).filter(
        (q) => q.required,
      );
      if (roleRequiredQuestions.length === 0) {
        return true;
      }

      return roleRequiredQuestions.every((question) => {
        const value = formik.values.roleQuestionAnswers?.[role]?.[question.id];
        if (!value) {
          setPositionError(
            "Please answer all required questions for each role selected.",
          );
          return false;
        }
        if (question.type === "checkbox") {
          const noCheckboxError = Array.isArray(value) && value.length > 0;
          if (!noCheckboxError) {
            setPositionError(
              "Please select at least one option for all required multi-select questions.",
            );
          }
          return noCheckboxError;
        }
        const noError = value && value.toString().trim() !== "";
        if (!noError) {
          setPositionError(
            "Please answer all required questions for each role selected.",
          );
        }
        return noError;
      });
    });
    if (validRequired) {
      setPositionError("");
    }
    return validRequired;
  };

  useEffect(() => {
    // Only validate and update next button state if the form has been touched
    // or if there are already roles selected (for when returning to this step)
    const hasRoles = formik.values.rolesApplyingFor.some(
      (role) => role && role !== "None",
    );
    if (formTouched || hasRoles) {
      isNextValid(isStepValid());
    } else {
      // Initially disable next button without showing an error
      isNextValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values, formTouched]);

  const positionPreferences = Array.from(
    { length: MAX_ALLOWED_ROLES_TO_APPLY },
    (_, i) => i,
  );

  // update roleApplyingFor accordingly when user changes dropdown role choice
  const handlePositionChange = (val: any, index: number) => {
    // Mark the form as touched when user makes a selection
    setFormTouched(true);

    const roles = formik.values.rolesApplyingFor || [];
    const updatedRoles = [...roles];
    const len = updatedRoles.length;
    if (len > index) {
      updatedRoles[index] = val;
    } else {
      for (let i = 0; i < index - len; i++) {
        updatedRoles.push("");
      }
      updatedRoles.push(val);
    }
    formik.setFieldValue("rolesApplyingFor", updatedRoles);
  };

  // Handle form interaction for dynamic questions
  const handleFieldInteraction = () => {
    if (!formTouched) {
      setFormTouched(true);
    }
  };

  const getRoleSpecificQuestions = (role: string) => {
    const roleSpecificQuestions = questions.filter((q) => q.role === role);
    return roleSpecificQuestions;
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3">
        {/* VP Role Consideration Banner */}
        <div className="flex gap-4 rounded-lg border border-solid border-orange/50 bg-orange/30 p-4">
          <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orangeText/20">
            <Crown className="h-4 w-4 text-orangeText" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-orangeText">
              VP Role Consideration:
            </p>
            <p className="text-sm text-orange">
              If you are applying for a VP Role, we will also consider you for
              an exec role in the same sub-team. Make sure to clearly indicate
              your preferences!
            </p>
          </div>
        </div>
        {/* Info about Overlapping Questions Banner */}
        <div className="flex gap-4 rounded-lg border border-solid border-aqua/50 bg-aqua/30 p-4">
          <div className="mx-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-aquaTextPrimary/20">
            <InfoIcon className="h-4 w-4 text-aquaTextPrimary" />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-aquaTextPrimary">
              Duplicate Questions:
            </p>
            <p className="text-sm text-aquaTextSecondary">
              If any roles have overlapping questions, please only answer one
              and put &apos;N/A&apos; for the overlapping
            </p>
          </div>
        </div>
      </div>

      {/* Position Preferences Card */}
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-lighterBlue" />
          <h2 className="text-xl font-semibold text-white">
            Position Preferences
          </h2>
        </div>
        <p className="mb-2 block text-md text-white">
          Please select <b>at least 1 and up to 3</b> positions you are
          interested in, and answer the corresponding questions.
        </p>
      </div>
      {positionPreferences.map((pos, i) => {
        const selectedRole = formik.values.rolesApplyingFor[i];
        const roleQuestions = selectedRole
          ? getRoleSpecificQuestions(selectedRole)
          : [];
        return (
          <div
            key={i}
            className="mb-4 rounded-lg border-0.5 border-solid border-white/20 bg-slateBlue px-8 pb-8 pt-6"
          >
            <p className="mb-2 block text-md font-semibold text-white">
              Position Preference #{i + 1}{" "}
              {i === 0 && <span className="text-red">*</span>}
            </p>
            <Dropdown
              id={`role_choice_${i}`}
              name={`rolesApplyingFor[${i}]`}
              placeholder={`Select position #${i + 1}`}
              options={roles || []}
              value={selectedRole || ""}
              onChange={(e) => handlePositionChange(e.target.value, i)}
              background="bg-white/10"
            />
            {/* render specific questions for each role if they exists */}
            {formik.values.rolesApplyingFor[i] &&
              roleQuestions.length > 0 &&
              roleQuestions.map((q, index) => (
                <div key={index} className={`${index === 0 ? "pt-10" : ""}`}>
                  <RenderDynamicQuestion
                    formik={formik}
                    question={q}
                    onInteract={handleFieldInteraction}
                  />
                </div>
              ))}
          </div>
        );
      })}
      {/* dynamic error message if inputs are invalid */}
      {positionError && formTouched && (
        <InputFeedback state="error">{positionError}</InputFeedback>
      )}
    </div>
  );
}

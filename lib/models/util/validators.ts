import mongoose from "mongoose";

/**
 * Validator to ensure keys of a Map match the fields of a Mongoose schema.
 * @param {mongoose.Schema} schema - The Mongoose schema object to validate against.
 * @returns {function} - A validation function for Mongoose schema.
 */
const mapKeysValidator = (schema: mongoose.Schema) => {
  return function (map: Map<string, any>): boolean {
    const validKeys = Object.keys(schema.paths);
    return Array.from(map.keys()).every((key) => validKeys.includes(key));
  };
};

/**
 * Custom error message generator for invalid keys.
 * @param {mongoose.Schema} schema - The Mongoose schema object to validate against.
 * @returns {function} - A message function for the validator.
 */
const mapKeysErrorMessage = (schema: mongoose.Schema) => {
  return (props: { value: Map<string, any> }): string => {
    const invalidKeys = Array.from(props.value.keys()).filter(
      (key) => !Object.keys(schema.paths).includes(key),
    );
    return `Invalid keys in Map: ${invalidKeys.join(
      ", ",
    )}. Allowed keys are: ${Object.keys(schema.paths).join(", ")}`;
  };
};

export { mapKeysValidator, mapKeysErrorMessage };
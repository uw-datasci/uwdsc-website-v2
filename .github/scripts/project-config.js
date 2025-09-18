/**
 * Configuration for GitHub Projects v2 automation
 */

module.exports = {
  ORG_NAME: "uw-datasci",
  PROJECT_NUMBER: 14,

  // Replace these with your actual IDs after running the GraphQL query
  PROJECT_ID: "PVT_kwDOBaIigc4BCCdQ",
  STATUS_FIELD_ID: "PVTSSF_lADOBaIigc4BCCdQzg0XblQ",
  IN_REVIEW_OPTION_ID: "3a001194",

  // Regex patterns for detecting linked issues
  ISSUE_PATTERNS: [
    /#(\d+)/g,
    /closes #(\d+)/gi,
    /fixes #(\d+)/gi,
    /resolves #(\d+)/gi,
    /connected to #(\d+)/gi,
  ],
};

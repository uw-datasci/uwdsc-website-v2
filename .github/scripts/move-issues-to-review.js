/**
 * Main script to move linked issues to "In Review" status
 */

const config = require("./project-config.js");
const {
  extractIssueNumbers,
  getLinkedIssues,
  processIssue,
} = require("./project-utils.js");

async function main(github, context) {
  console.log("🚀 Starting issue processing workflow...");

  // Check if IDs are configured
  if (config.PROJECT_ID === "YOUR_PROJECT_ID_HERE") {
    console.log(
      "❌ ERROR: Project IDs not configured. Please run the GraphQL queries to find your project IDs.",
    );
    console.log("📖 See .github/README.md for setup instructions");
    return;
  }

  // Get the PR details
  const { data: pr } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  });

  // Method 1: Extract issue numbers from PR title and body text
  const text = `${pr.title} ${pr.body || ""}`;
  const textIssues = extractIssueNumbers(text, config.ISSUE_PATTERNS);

  // Method 2: Get issues linked through GitHub's Development section
  const linkedIssues = await getLinkedIssues(
    github,
    context.repo.owner,
    context.repo.repo,
    context.issue.number,
  );

  // Combine both methods and remove duplicates
  const allIssues = [...new Set([...textIssues, ...linkedIssues])];

  console.log(`🔍 Found issues in text: [${textIssues.join(", ") || "none"}]`);
  console.log(
    `🔗 Found issues in Development section: [${
      linkedIssues.join(", ") || "none"
    }]`,
  );
  console.log(`📋 Total unique issues to process: [${allIssues.join(", ")}]`);

  if (allIssues.length === 0) {
    console.log("ℹ️  No linked issues found in PR text or Development section");
    return;
  }

  const issueNumbers = allIssues;

  // Process each linked issue
  const results = [];
  for (const issueNumber of issueNumbers) {
    try {
      await processIssue(github, config, context, issueNumber);
      results.push({ issue: issueNumber, success: true });
    } catch (error) {
      results.push({
        issue: issueNumber,
        success: false,
        error: error.message,
      });
    }
  }

  // Summary
  const successful = results.filter((r) => r.success).length;
  const failed = results.filter((r) => !r.success).length;

  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully processed: ${successful} issues`);
  console.log(`  ❌ Failed: ${failed} issues`);

  if (failed > 0) {
    console.log(`\n❌ Failed issues:`);
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`  - Issue #${r.issue}: ${r.error}`);
      });
  }
}

module.exports = { main };

/**
 * Main script to move linked issues to "In Review" status
 */

const config = require("./project-config.js");
const { extractIssueNumbers, processIssue } = require("./project-utils.js");

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

  // Extract issue numbers from PR title and body
  const text = `${pr.title} ${pr.body || ""}`;
  const issueNumbers = extractIssueNumbers(text, config.ISSUE_PATTERNS);

  console.log(`🔍 Found linked issues: ${issueNumbers.join(", ")}`);

  if (issueNumbers.length === 0) {
    console.log("ℹ️  No linked issues found in PR title or body");
    return;
  }

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

/**
 * Utilities for GitHub Projects v2 operations
 */

/**
 * Extract issue numbers from text using various patterns
 */
function extractIssueNumbers(text, patterns) {
  const issueNumbers = new Set();

  patterns.forEach((pattern) => {
    const matches = [...text.matchAll(pattern)];
    matches.forEach((match) => {
      // Extract the number from the match groups
      const issueNumber =
        match[1] || match[2] || match[3] || match[4] || match[5];
      if (issueNumber) {
        issueNumbers.add(parseInt(issueNumber, 10));
      }
    });
  });

  return Array.from(issueNumbers);
}

/**
 * GraphQL query to find project items for issues
 */
function createFindItemQuery() {
  return `
    query($org: String!, $projectNumber: Int!, $issueNumber: Int!, $repo: String!) {
      organization(login: $org) {
        projectV2(number: $projectNumber) {
          id
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  number
                  repository {
                    name
                  }
                }
              }
            }
          }
        }
      }
      repository(owner: $org, name: $repo) {
        issue(number: $issueNumber) {
          id
          number
        }
      }
    }
  `;
}

/**
 * GraphQL mutation to add item to project
 */
function createAddItemMutation() {
  return `
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {
        projectId: $projectId
        contentId: $contentId
      }) {
        item {
          id
        }
      }
    }
  `;
}

/**
 * GraphQL mutation to update item status
 */
function createUpdateStatusMutation() {
  return `
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { singleSelectOptionId: $optionId }
      }) {
        projectV2Item {
          id
        }
      }
    }
  `;
}

/**
 * Process a single issue: add to project and/or move to In Review
 */
async function processIssue(github, config, context, issueNumber) {
  console.log(`Processing issue #${issueNumber}...`);

  try {
    // Find the project item for this issue
    const itemResult = await github.graphql(createFindItemQuery(), {
      org: config.ORG_NAME,
      projectNumber: config.PROJECT_NUMBER,
      issueNumber: issueNumber,
      repo: context.repo.repo,
    });

    // Find the project item that matches our issue
    const projectItem = itemResult.organization.projectV2.items.nodes.find(
      (item) =>
        item.content &&
        item.content.number === issueNumber &&
        item.content.repository.name === context.repo.repo,
    );

    if (!projectItem) {
      console.log(
        `Issue #${issueNumber} not found in project. Adding it first...`,
      );

      // Add the issue to the project first
      const addResult = await github.graphql(createAddItemMutation(), {
        projectId: config.PROJECT_ID,
        contentId: itemResult.repository.issue.id,
      });

      const newItemId = addResult.addProjectV2ItemById.item.id;

      // Now update the status
      await github.graphql(createUpdateStatusMutation(), {
        projectId: config.PROJECT_ID,
        itemId: newItemId,
        fieldId: config.STATUS_FIELD_ID,
        optionId: config.IN_REVIEW_OPTION_ID,
      });

      console.log(
        `✅ Added issue #${issueNumber} to project and moved to "In Review"`,
      );
    } else {
      // Update existing item status
      await github.graphql(createUpdateStatusMutation(), {
        projectId: config.PROJECT_ID,
        itemId: projectItem.id,
        fieldId: config.STATUS_FIELD_ID,
        optionId: config.IN_REVIEW_OPTION_ID,
      });

      console.log(`✅ Moved issue #${issueNumber} to "In Review"`);
    }
  } catch (error) {
    console.error(`❌ Error processing issue #${issueNumber}:`, error.message);
    if (error.errors) {
      console.error("GraphQL errors:", error.errors);
    }
    throw error;
  }
}

module.exports = {
  extractIssueNumbers,
  processIssue,
};

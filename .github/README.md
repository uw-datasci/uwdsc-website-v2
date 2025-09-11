# GitHub Actions: Auto-Move Issues to "In Review"

This automation automatically moves linked issues to the "In Review" column when a Pull Request (PR) is opened.

## 🎯 What It Does

When a developer creates a PR that mentions an issue (like "fixes #123"), this workflow will:

1. **Find** the issue number (#123)
2. **Add** the issue to your GitHub Project (if it's not already there)
3. **Move** the issue to the "In Review" column

## 🚀 How It Works

### The Trigger

The automation runs when:

- A PR is **opened**
- A draft PR is marked **ready for review**
- A PR title or description is **edited** (to catch newly added `#123` references)

### What About Development Section Linking?

If you link an issue through the Development section **after** the PR is already open:

- 🤖 **Sometimes triggers automatically** (if it causes a PR edit event)
- 🔄 **Manual option**: Go to Actions tab → "Move linked issues to In Review" → "Run workflow" → Select your branch

### Issue Detection

The workflow finds linked issues in **two ways**:

#### 1. Text Patterns (in PR title/description):

- `#123` - Simple issue reference
- `fixes #123` - Indicates this PR fixes the issue
- `closes #123` - Indicates this PR closes the issue
- `resolves #123` - Indicates this PR resolves the issue
- `connected to #123` - Indicates this PR is related to the issue

#### 2. Development Section (GitHub's built-in linking):

- Issues linked through the "Development" section in the PR sidebar
- Created by typing issue numbers when creating a branch or manually linking

### Examples

✅ **PR Title**: `"Fix login bug - resolves #142"`  
→ Issue #142 moves to "In Review"

✅ **PR Description**: `"This update fixes #98 and closes #101"`  
→ Issues #98 and #101 move to "In Review"

✅ **Development Section**: Linked "sample ticket to test workflow"  
→ That issue moves to "In Review"

## 📁 Files Structure

```
.github/
├── scripts/
│   ├── project-config.js         # ⚙️  Project settings and IDs
│   ├── project-utils.js          # 🔧  Helper functions
│   └── move-issues-to-review.js  # 🎯  Main automation logic
└── workflows/
    └── move-issue-to-review-v2.yml # 🚀  The GitHub Action workflow
```

## ⚙️ Configuration

All the settings are in `.github/scripts/project-config.js`:

```javascript
module.exports = {
  ORG_NAME: "uw-datasci", // Your GitHub organization
  PROJECT_NUMBER: 14, // Your project number (from URL)
  PROJECT_ID: "PVT_...", // Your project's unique ID
  STATUS_FIELD_ID: "PVTSSF_...", // The "Status" field ID
  IN_REVIEW_OPTION_ID: "d4c16...", // The "In Review" option ID
  // ... issue detection patterns
};
```

## 🔍 How to Get Your Project IDs

1. Go to [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
2. Run this query (replace with your org and project number):

```graphql
query {
  organization(login: "<org>") {
    projectV2(number: <project-number>) {
      id # ← This is PROJECT_ID
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id # ← This is STATUS_FIELD_ID (for "Status" field)
            name
            options {
              id # ← This is IN_REVIEW_OPTION_ID (for "In Review")
              name
            }
          }
        }
      }
    }
  }
}
```

3. Copy the IDs into `project-config.js`

## 🐛 Troubleshooting

### Check if it's working:

1. Go to your repo → **Actions** tab
2. Look for "Move linked issues to In Review" workflow runs
3. Click on a run to see the logs

### Common issues:

- **No issues found**: Make sure you either include `#123` in the PR **title/body** OR link issues through the **Development section**
- **"Could not resolve ProjectV2"**: Organization projects need repository access
  - Go to your project → Settings → Manage access → Add your repository
  - OR create a Personal Access Token with project permissions and add it as `PROJECT_TOKEN` secret
- **Permission errors**: The GitHub token might not have access to your project
- **Wrong IDs**: Double-check the IDs in `project-config.js`

### Logs will show:

```
🚀 Starting issue processing workflow...
🔍 Found issues in text: [123]
🔗 Found issues in Development section: [456]
📋 Total unique issues to process: [123, 456]
✅ Moved issue #123 to "In Review"
✅ Moved issue #456 to "In Review"
📊 Summary: ✅ Successfully processed: 2 issues
```

## 🎉 That's It!

Once configured, this runs automatically. Your developers can either mention issue numbers in their PRs OR link issues through the Development section, and the issues will automatically move to "In Review" for you!

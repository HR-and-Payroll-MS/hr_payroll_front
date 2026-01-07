# Contributing to HR & Payroll Management System - Frontend

Thank you for contributing to the HR & Payroll Management System! This guide will help you set up your environment correctly to ensure your contributions are properly credited on GitHub.

## 🚨 Important: GitHub Contribution Setup

### Why Your Contributions Might Not Show Up

GitHub only counts contributions to your profile when:

1. **Your commit email matches a verified email on your GitHub account**
2. The commits are made to the default branch (or gh-pages)
3. The repository is not a fork (or you're committing to your own fork)

**Most common issue**: Using an email address that isn't verified on your GitHub account.

### Step 1: Verify Your Email on GitHub

1. Go to [GitHub Email Settings](https://github.com/settings/emails)
2. Check if your email address is listed and verified
3. If not verified, click "Resend verification email" and follow the instructions
4. **Recommended**: Enable "Keep my email addresses private" and note your `@users.noreply.github.com` email

### Step 2: Configure Git with Your GitHub Email

Before making any commits, configure your Git username and email:

```bash
# Set your GitHub username
git config --global user.name "Your GitHub Username"

# Option 1: Use your verified email address
git config --global user.email "your-verified-email@example.com"

# Option 2: Use GitHub's private email (recommended for privacy)
git config --global user.email "your-github-id+username@users.noreply.github.com"
```

#### To find your GitHub private email:
1. Go to [GitHub Email Settings](https://github.com/settings/emails)
2. Check "Keep my email addresses private"
3. Your private email will be shown (format: `ID+username@users.noreply.github.com`)

### Step 3: Verify Your Configuration

```bash
# Check your current Git configuration
git config --global user.name
git config --global user.email
```

Make sure the email matches one of your verified emails on GitHub!

### Step 4: Fix Previous Commits (If Needed)

If you've already made commits with the wrong email, you can fix them:

```bash
# For the last commit only
git commit --amend --author="Your Name <your-verified-email@example.com>"

# For multiple commits (be careful with this)
git rebase -i HEAD~N  # Replace N with number of commits to fix
# Then for each commit, use:
# git commit --amend --author="Your Name <your-verified-email@example.com>"
# git rebase --continue
```

**⚠️ Warning**: Changing commit history requires force pushing. Only do this if you haven't pushed yet or coordinate with your team!

## 📋 Development Workflow

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git configured with your GitHub email (see above)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/HR-and-Payroll-MS/hr_payroll_front.git
   cd hr_payroll_front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### Commit Message Guidelines

We follow conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: Add employee overtime request form
fix: Correct salary calculation logic
docs: Update API documentation
```

## 🔍 Troubleshooting Contribution Issues

### My contributions still don't show up!

1. **Check the email in your recent commits**:
   ```bash
   git log --pretty=format:"%h - %an <%ae> - %s" -5
   ```
   The email shown must match a verified email on your GitHub account.

2. **Verify your GitHub email settings**:
   - Go to https://github.com/settings/emails
   - Make sure the email from step 1 is listed and has a green checkmark

3. **Check if you're committing to the right branch**:
   - Contributions only count on the default branch (usually `main` or `master`)
   - Check with: `git branch --show-current`

4. **Wait up to 24 hours**:
   - GitHub can take up to 24 hours to update contribution graphs

5. **Make sure the repository settings are correct**:
   - The repository must not be marked as a fork if you want contributions to count
   - Private repository contributions only show if you've enabled "Private contributions" in your GitHub profile settings

### Getting Help

If you're still having issues:
1. Check [GitHub's contribution documentation](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)
2. Ask in the team chat
3. Contact the repository maintainers

## 📞 Contact

For questions or issues, please contact the project maintainers:
- **Seud** (Backend lead)
- **Eyob** (Frontend contributor)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

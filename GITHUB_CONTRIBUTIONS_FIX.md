# Quick Fix for Eyob's GitHub Contribution Issue

## The Problem
Eyob's commits to this repository are not showing up on his GitHub profile contribution graph.

## Why This Happens
GitHub only counts contributions when the email address used in commits matches a **verified email** on your GitHub account.

Looking at the git history:
```
eyob <et83026319@gmail.com>
```

This email (`et83026319@gmail.com`) must be verified on Eyob's GitHub account.

## Solution for Eyob

### Step 1: Verify Your Email on GitHub
1. Go to https://github.com/settings/emails
2. Check if `et83026319@gmail.com` is in the list
3. If it's there but not verified (no green checkmark):
   - Click "Resend verification email"
   - Check your email inbox
   - Click the verification link
4. If it's not in the list at all:
   - Add it using the form at the top
   - Then verify it as above

### Step 2: Make Sure Git is Configured Correctly
Run these commands in your terminal:

```bash
# Check current configuration
git config user.name
git config user.email

# If the email doesn't match, set it correctly
git config --global user.name "eyob"
git config --global user.email "et83026319@gmail.com"
```

### Step 3: Verify It's Working
```bash
# Check the configuration
git config --global user.email

# Should output: et83026319@gmail.com
```

### Step 4: Make a Test Commit
After configuring your email:
1. Make any small change (add a comment, update a file)
2. Commit and push
3. Wait up to 24 hours for GitHub to update your contribution graph

## Alternative: Use GitHub Private Email

If you prefer to keep your email private:

1. Go to https://github.com/settings/emails
2. Check the box "Keep my email addresses private"
3. GitHub will show you a private email like: `123456+eyob@users.noreply.github.com`
4. Use that email instead:
   ```bash
   git config --global user.email "YOUR_ID+eyob@users.noreply.github.com"
   ```

## Important Notes

- **Future commits** will now count (changes are not retroactive)
- Old commits with the wrong email won't automatically update on your profile
- Contributions only count on the default branch (usually `main` or `master`)
- Private repository contributions need to be enabled in profile settings

## Verification Checklist

- [ ] Email is verified on GitHub (green checkmark at https://github.com/settings/emails)
- [ ] Git is configured with the same email (`git config user.email`)
- [ ] Made a new commit with the correct email
- [ ] Pushed to the default branch
- [ ] Waited up to 24 hours for GitHub to update

## Still Not Working?

1. Double-check that the repository is not a fork
2. Make sure you're committing to the default branch
3. Verify your GitHub profile settings allow private contributions (if this is a private repo)
4. See the full [CONTRIBUTING.md](./CONTRIBUTING.md) guide for more troubleshooting

## For Seud

Your contributions work because your Git is configured with an email that's verified on your GitHub account. Make sure all team members follow the same setup process!

---

**Once this is fixed, all future contributions will be properly credited! 🎉**

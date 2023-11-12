# Project Workflow

This is a living document which outlines the methods, practices and workflows used to deliver the project besides programming itself.

## Table of Contents

- [Summary](#summary)
- [Creating Issues](#creating-issues)
- [Trunk Based Development](#trunk-based-development)
  - [Rules](#rules)
  - [General Workflow](#general-workflow)
  - [Push to Trunk Workflow](#push-to-trunk-workflow)
  - [Short Lived Branch Workflow](#short-lived-branch-workflow)
    - [Before Review](#before-review)
    - [After Review](#after-review)
  - [Squash in Vim](#squash-in-vim)
  - [Rebase with Changes](#rebase-with-changes)
  - [TBD Resources](#tbd-resources)
- [Semantic Versioning](#semantic-versioning)
  - [Bare Process](#bare-process)
  - [NPM Process](#npm-process)
  - [Move Tag](#move-tag)
  - [SV Resources](#sv-resources)

## Summary

The project is being actively developed using:

- GitHub issues and milestones
- trunk based development
- feature toggles
- non-blocking reviews
- semantic versioning with Git tags
- squash and rebase strategy
- conventional commits

## Creating Issues

If you would like to create an issue with a template, simply click "Get started" when creating an issue. If you would like to create an issue without a template, click on "Open a blank issue".

## Trunk Based Development

### Rules

- if you break the build - fix (-forward) immediately
- small changes of 1-3 commits => push to trunk
- bigger changes of > 3 commits => short lived branch + feature toggle
- never force push to master
- rebase when working on trunk
- squash and rebase when working on a branch

### General Workflow

Every once in while:

```bash
# '-p' = prune, cleans up deleted branches
git fetch --all -p
```

### Push to Trunk Workflow

Incorporate your commits using rebase [1]:

```bash
git fetch
git rebase origin/master
```

If there are conflicts [2], resolve, save, stage and run:

```bash
git rebase --continue
```

[1] [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

[2] [merge conflicts](https://code.visualstudio.com/docs/sourcecontrol/overview#_understanding-conflicts)

### Short Lived Branch Workflow

#### Before Review

Create a branch, start working and create commits. When ready for the PR and a review "squash and rebase" [3]:

```bash
# '-i' = interactive rebase
git rebase -i origin/master
```

[3] [rewrite history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

With interactive rebase you can reword and squash multiple commits into one by using short commands like s for squash  or r for reword:

```bash
# example from the git book
# three commits which you rebase

pick f7f3f6d Change my name a bit
pick 310154e Update README formatting and add blame
pick a5f4a0d Add cat-file
```

Squash into one commit:

```bash
pick f7f3f6d Change my name a bit
s 310154e Update README formatting and add blame
s a5f4a0d Add cat-file
```

Will result in one commit the changes of the three, with this message: "Change my name a bit"

Or squash all three into one and reword if needed with this commands:

```bash
r f7f3f6d Change my name a bit
s 310154e Update README formatting and add blame
s a5f4a0d Add cat-file
```

Saving will prompt a new window where you can change the commit message.

Push your new squashed and rebased history to remote:

```bash
git push origin <branch> --force
```

#### After Review

When you made changes after a review, first "squash and rebase" from master as shown above and then squash your new local commits:

```bash
# HEAD~2 indicates how far back (2 commits including the current) you want to rewrite
git rebase -i HEAD~2
```

The same procedure as described above will be started and can be followed to rewrite and squash commits.

### Squash in Vim

When squashing using vim, do:

- place the cursor at the start of the line with the first commit you want to squash
- enter visual block mode (CTRL-V)
- select all the rows you wish squash
- hit 'c' and type 'squash' to replace the 'pick' command
- press ESC to apply that change to all the selected rows

### Rebase with Changes

If you encounter this:

```bash
> git rebase origin/master
error: cannot rebase: You have unstaged changes.
error: Please commit or stash them.
```

Do this:

```bash
git rebase origin/master --autostash
```

It is short for:

```bash
git stash
git fetch --all -p
git rebase origin/master
git stash pop
```

### TBD Resources

- Article: [Git and Trunk Based Development](https://medium.com/contino-engineering/git-to-know-this-before-you-do-trunk-based-development-tbd-476bc8a7c22f)
- Article: [Guide to Trunk Based Development](https://hackernoon.com/a-guide-to-git-with-trunk-based-development-93a350c)
- Article: [Squash Multiple Lines in Vim](https://coderwall.com/p/d6gifw/use-vim-visual-blocks-to-squash-multiple-git-commits)

## Semantic Versioning

As a last step before merge to master do:

- add a tag to package.json
- squash the commits
- add a git tag to the commit
- tag naming pattern is: `<backend|frontend>/v<MAJOR>.<MINOR>.<PATCH>`
  - e.g. `backend/v0.35.12`
  - e.g. `frontend/v0.12.1`
- push commit and tags

### Bare Process

```bash
# 1. Commit first
git commit -m "fix: added missing type"

# 2. Squash
git rebase -i <origin/master|HEAD~#>

# 3. Tags the last commit
git tag -a backend/v0.2.1 -m "backend version 0.2.1"

# 4. Push to remote with tags
git push origin <branch> --follow-tags
```

### NPM Process

```bash
# 1. Commit first
git commit -m "fix: added missing type"

# 2. Bump version in package*.json, 0.35.12 -> 0.35.13
npm -w backend version patch

# 3. Add and commit version
git commit -am "bump package to v0.35.13"

# 4. Squash
git rebase -i <origin/master|HEAD~#>

# 5. Tag the last commit
git tag -a backend/v0.35.13 -m "backend version 0.35.13"

# 6. Push to remote with tags
git push origin <branch> --follow-tags
```

**Note:** npm-version does not git-commit nor git-tag when package in subdirectory. [Bug-Issue #2012](https://github.com/npm/cli/issues/2010)

### Move Tag

When having new commits in the branch with a tag and you need to move [1] the tag to the latest or other commit:

```bash
# Delete the tag on any remote before you push
git push origin :refs/tags/<tagname>

# Replace the tag to reference the most recent commit
git tag -fa <tagname>

# Push just the tag to the remote origin OR
git push origin --tags

# Push commits and tags OR
git push origin <branch> --follow-tags

# Force push if you rebased before
git push origin <branch> --force --follow-tags
```

[1] [move tag](https://stackoverflow.com/a/8044605)

### Tag Operations

```bash
# show all tags
git tag

# show tag details
git show <tagname>

# delete tag
git tag -d <tagname>
```

### Tag Validation

The pull request pipeline checks in the last step if the latest commit contains a git tag in the [tagging naming pattern](#semantic-versioning) defined above. We are using an extended regex which works in bash to validate the tag as explained here: [semver issue 981](https://github.com/semver/semver/issues/981). The regex provided in the semver spec does not work in bash.

### SV Resources

- Spec: [Semver](https://semver.org/)
- Article: [Semantic Versioning with Git Tags](https://travishorn.com/semantic-versioning-with-git-tags-1ef2d4aeede6)
- Docu: [Git-Basics Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- Stackoverflow: [Squashed Commits and Git Tags](https://stackoverflow.com/a/54281481)
- Stackoverflow: [Tagging in Monorepos](https://stackoverflow.com/a/56558343)

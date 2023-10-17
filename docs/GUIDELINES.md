# Guidelines

This guide was developed to kickoff the development in the best way possible, ensuring everyone has the chance to work as leveled as possible with the rest of the team.

## Index
<ul>
	<li><a href="#angular-1">1. AngularJS prototype</a></li>
	<li><a href="#git-2">2. Using Git and GitHub</a></li>
	<ul>
		<li><a href="#branches-2.1">2.1 How teams and developers will branch</a></li>
		<li><a href="#git-suggestions-2.2">2.2 Other Git and GitHub related suggestions</a></li>
		<li><a href="#git-commands-2.3">2.3 Git commands and variations</a></li>
		<ul>
			<li><a href="#git-stash-2.3.1">2.3.1. git stash</a></li>
			<li><a href="#git-branch-2.3.2">2.3.2. git branch</a></li>
			<li><a href="#git-checkout-2.3.3">2.3.3. git checkout</a></li>
			<li><a href="#git-add-2.3.4">2.3.4. git add</a></li>
			<li><a href="#git-reset-2.3.5">2.3.5. git reset</a></li>
			<li><a href="#git-commit-2.3.6">2.3.6. git commit</a></li>
			<li><a href="#git-log-2.3.7">2.3.7. git log</a></li>
			<li><a href="#git-rebase-2.3.8">2.3.8. git rebase</a></li>
			<li><a href="#git-aliases-2.3.9">2.3.9. git aliases</a></li>
			<li><a href="#git-status-2.3.10">2.3.10. git status</a></li>
			<li><a href="#git-remote-2.3.11">2.3.11. git remote</a></li>
		</ul>
	</ul>
</ul>


## <a name="angular-1">1. AngularJS prototype</a>

- This is a very basic prototype
- Still need to verify if there's a better approach regarding the repetition of imports on components and on the app module
- You can study the tutorials in <https://angular.io/tutorial>, I recommend Tour of Heroes.
- You'll need to install Angular CLI <https://angular.io/cli>
- Angular flex <https://github.com/angular/flex-layout> and Angular material <https://material.angular.io/components/categories> will be used to help with Frontend development

## <a name="git-2">2. Using Git and GitHub</a>

Hey there, this is Nuno from T3!

Below, you'll find some instructions and tips about using Git and GitHub properly during the development of this project. We're also presenting some useful Git commands that should enhance the synergy of version control both inside and between teams.

### <a name="branches-2.1">2.1 How teams and developers will branch</a>
Branches are primal to work on the central repository, avoiding multiple merge conflicts. So, **each team will have a branch**, created from the `prototype` one. Confused? Take a look at the following image.

![branching_1](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/assets/93390807/4deafb6f-c346-4f42-978d-2ee48c795311)


- Each team will have a branch named after them. So team 1 will get a branch called `t1`, team 2 will have a branch called `t2` and so on and so forth. These 4 **are to be considered the main branches for each team**.

- Every branch team 2 needs to create will branch from `t2`. Merging will also be done on `t2`. These actions apply for each team.

- Branches naming won't be random as well. Each branch should be named following this syntax

```
team_branch_name-category-description-in-kebab-case
```

For instance, if **team 2** needed to create a branch to deploy a **hotfix** about a **broken link** on an HTML file, the branch name could be something like this

```
t2-hotfix-broken-link
```

Some categories include `test`, `hotfix`, `bug`, `refactoring`, `feature`, `docs`, etc. There are several reasons to choose this type of naming, which can be discussed briefly on the first Sprint Planning.

The following image illustrates the previous 3 paragraphs

![branching_2](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/assets/93390807/312f5b81-5ea0-4e6a-900b-50f50e1c54b1)


- **Absolutely no developer** will be pushing directly on the `main` branch. Mistakes can happen and that's fine, but please avoid to do so. Any commit that breaks this boundaries, is to be removed and placed on its respective branch upon detection. Opportunities to merge to the `main` branch will still be discussed. For now, you should only worry about your own team branch, which can be merged as you like.

### <a name="git-suggestions-2.2">2.2 Other Git and GitHub related suggestions</a>
- You should use **Pull Requests**. Why? Because it takes someone else to review your code and not you. And no, you can't validate your own Pull Requests, that will be checked for!

- Your commit messages shouldn't be based on some 5-year-old-baby-like sentences, like "aaaaaaaaaaaaaaaaaaa" or "done" or "more stuff". Keep in mind, you are working with several people. These messages can be crucial for a developer to understand what was done so far. The message should contain a message describing what changed on that commit

Just like branch naming, you can use a similar syntax to write your commit messages

```
Category: message.
```

- Don't forget to make your commits as often as you implement an important piece of code. Delaying the commit until the end of the day, will gather a lot of changes in one commit, which costs to describe in the commit message. Also, if the code comes out as faulty, you'll need to figure out exacly which part of the commit is causing the malfunctioning.

### <a name="git-commands-2.3">2.3 Git commands and variations</a>

As promised, here goes a list of commands and flags combinations that can promise to be of high impact on your workflow. The following descriptions are short and you should search and experiment on your own as well.

---------------------------------------------------

#### <a name="git-stash-2.3.1">2.3.1 git stash</a>

If you need to discard the current changes but still save them, this is the perfect command. When applying `git stash`, the changes since the last commit will be removed from the current working directory, but saved on the stash locally.

When stashing changes, you are creating a new version that was discarded, but you won't be overwritting previous stashes.

``` bash
➜  ds git:(prototype) ✗ git stash
Saved working directory and index state WIP on prototype: c5be1cd INFO.md: added information about git status and git remote.
➜  ds git:(prototype)
```

- `git stash pop` - the opposite of `git stash`, it re-applies the last changes into the current working directory and removes the entry from the stash list
- `git stash apply <reference>` - identical to `git stash pop`, but it doesn't remove the entry from the stash list
- `git stash list` - lists all the stash entries done so far
- `git stash clear` - empties out the stash list

This one is quite powerful. If you start developing on the wrong branch, you can just stash the changes, checkout to the correct branch and pop the last stash entry.

---------------------------------------------------

#### <a name="git-branch-2.3.2">2.3.2 git branch</a>

Used to create branches, but not only. Remember that local branches (the one created on your computer) do not always have an **upstream** (a remote branch to link to) Sometimes, we need to also delete, rename branches or link a local branch with a remote one. This command provides flags to help on those configurations, among others.

- `git branch -u origin <name-of-the-remote-branch>` - Given you're in a branch named X, this command allows to connect your local branch X to a remote branch named after the parameter passed on the command. This can also be done in push-time by running `git push --set-upstream origin <name-of-the-remote-branch>`.

> **Note**
> If this is not performed, each `git push` on a branch command should follow the syntax: `git push <remote-name> <remote-branch-name>`. Usually `<remote-name>` is named **origin**. After setting the upstream, you can just simply use `git push`.

- `git branch -M <old-branch-name> <new-branch-name>` - renames a branch together with its configurations

```shell
➜  ds git:(branch-team-3) ✗ git branch -M branch-team-3 t3/hotfix/broken-link
➜  ds git:(t3/hotfix/broken-link) ✗
```

- `git branch -D <branch-name>` - forcefull deletes a local branch, even if the branch is not fully merged.
- `git branch -C <old-branch-name> <new-branch-name>` - copies a branch to a new one

---------------------------------------------------

#### <a name="git-checkout-2.3.3">2.3.3 git checkout</a>

Used to switch between branches, there's not much to say about it, just a nice flag that you can use.

- `git checkout -b <branch-name>` - Creates a new branch locally with a given name and immediately checkouts out to it. It's the same as running `git branch <branch-name>` and `git checkout <branch-name>` sequentially.

```shell
➜  ds git:(prototype) ✗ git checkout -b branch-team-3
Switched to a new branch 'branch-team-3'
➜  ds git:(branch-team-3) ✗
```

---------------------------------------------------

#### <a name="git-add-2.3.4">2.3.4 git add</a>

Adds the specified files to the staging area, so those files can be prepared to the next commit.

- `git add -A` - adds any file that had any change whatsoever to the staging area, no matter its place in the working directory
- `git add .` - adds only the current directory to the staging area

> **Warning**
> This command is often mistaked with `git add -A`. If you're in a nested directory and execute `git add .`, any changes surrounding the nested directory won't be included!

- `git add <files>` - the most common way to use this command, by specifying a list of files or folders are to be submitted to the staging area. 
- `git add -p` - by using the `-p` flag, you're allowed to choose which snippets of changes you'll be submitting. To know what snippets you'll be able to choose from, use `git diff`.

```shell
➜  ds git:(prototype) ✗ git add -p
diff --git a/INFO.md b/INFO.md
index 4439738..2f873ad 100644 
--- a/INFO.md
+++ b/INFO.md
@@ -84,6 +84,12 @@ If you need to discard the current changes but still save them, this is the perf

+➜  ds git:(prototype) ✗ git stash
+Saved working directory and index state WIP on prototype: c5be1cd INFO.md: added information about git status and git remote.
+➜  ds git:(prototype)
+
(1/4) Stage this hunk [y,n,q,a,d,j,J,g,/,e,?]? 
```

---------------------------------------------------

#### <a name="git-reset-2.3.5">2.3.5 git reset</a>

`HEAD` in git is a reference to a commit. When switching branches, the HEAD revision changes to the tip of that branch. The `git reset` command allows to re-position the `HEAD` reference and discard changes made in the reseted commits.

> **Warning**
> This command is to be used with caution, as it might result in data loss. If you're not sure about what you're about to do, please use git stash to keep a version of the discarded changes.

- `git reset HEAD` - goes back on the last commit
- `git reset HEAD~3` - goes back on the last 3 commits
- `git reset --hard <hash>` - moves the HEAD pointer to the commit specified by `<hash>`, reseting the staging area to match that commit and discards any changes made after that commit as well.
- `git reset -p` - this flag allows you to choose which changes you want to discard and which not, the opposite of `git add -p`.

---------------------------------------------------

#### <a name="git-commit-2.3.6">2.3.6 git commit</a>

Takes the files from the staging area and saves those changes on your local repository (in the `.git` folder). At this point, the remote repository doesn't know about this changes yet.

- `git commit --amend -m <commit-message>` - replaces the latest commit message with a new one specified in the parameter

---------------------------------------------------

#### <a name="git-log-2.3.7">2.3.7 git log</a>

Displays a list of the latest commits informations, including commit hashes, commit dates and commit messages.

- `git log --oneline` - logs using the 7 first characters of a commit hash and the commit message, squashing the commit display to 1 line, most of the times.

```bash
➜  ds git:(prototype) ✗ git log --oneline
c5be1cd (HEAD -> prototype, origin/prototype) INFO.md: added information about git status and git remote.
e846313 INFO.md: added information about git commit, log, aliases and rebase.
a9c7a8a INFO.md: added new git branch commands and info about git add and reset.
027ca62 (local) INFO.md: added information about git stash, branch and checkout.
f0d068d INFO.md: added a temporary command list to update tommorrow.
➜  ds git:(prototype) ✗
```

- `git log --decorate` - prints out the references for each commit (like branches or tags), if any
- `git log --graph` - prints the commit list alongside a commit graph, highlighting branches formation

```bash
* commit c5be1cd19c444f9f86cbae8f744f0c4516ed05d9 (HEAD -> prototype, origin/prototype)
| Author: Nuno Jesus <up201905477@edu.fe.up.pt>
| Date:   Sun Oct 8 15:40:06 2023 +0100
|
|     INFO.md: added information about git status and git remote.
|
* commit e846313b799fd32822e7463b5a4aea071da64ee0
| Author: Nuno Jesus <up201905477@edu.fe.up.pt>
| Date:   Sun Oct 8 15:28:33 2023 +0100
|
|     INFO.md: added information about git commit, log, aliases and rebase.
|
* commit a9c7a8a37b1fc5e9aad539cef045b800c0bb90ff
| Author: Nuno Jesus <up201905477@edu.fe.up.pt>
| Date:   Sun Oct 8 14:51:03 2023 +0100
|
|     INFO.md: added new git branch commands and info about git add and reset.
...
```
- `git log --graph --decorate --oneline` - combining all the above, outputs the commit list using a small notation, organized in a commit graph.

```bash
* b8c4d75 (HEAD -> main, tag: v1.0.0) Latest commit message
|\
| * 42a9b1f (feature-branch) Another feature commit
| * a1b2c3d Add new feature
|/
* 789abc1 Fix a bug
* 1234567 Initial commit
```

---------------------------------------------------

#### <a name="git-rebase-2.3.8">2.3.8 git rebase</a>

Appends the commits of a branch on the tip of another branch. It is often confused with git merge, even thought it has big differences. 

Merging implies creating a new commit, unlike rebasing, which integrates the changes from one branch into another by appending. Merging preserves chronological changes, but rebasing does not, since it takes other commits into the current branch.

Rebasing is mostly used with private branches (where you're working alone and you know no other interferences will change the original branch) and merging is used with public branches (inputs can come from multiple users).

- `git rebase branch-name` - takes the commits from `branch-name` and applies them on top of the current branch
- `git rebase -i branch-name` - rebases in iterative mode. Opens a window displaying the commits about to be added to the branch stream. You can edit how these commits will be integrated by using several keywords (which will not be covered here).

```bash
pick abc1234 Commit message for commit 1
pick def5678 Commit message for commit 2
pick 4567890 Commit message for commit 3

# Rebase cdef987 onto 1234567
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

---------------------------------------------------

#### <a name="git-aliases-2.3.9">2.3.9 git aliases</a>

It's not a command, but the title introduces a command. Just like shell command aliases, you can create your own alias to execute a complicated command or multiple commands at once, using a synonym.

- `git config --global alias.graph 'git log --oneline --graph --decorate'` - creates a new command called `git graph`, which is then expanded onto `git log --oneline --graph --decorate`
- `git config --global alias.send '!git add -A && git commit -m'` - creates a new command called `git send`, which is then expanded to `git add -A && git commit -m`.

> **Note**
> The `!` is used on the second command to specify that more than 1 command is to be used in the alias.

---------------------------------------------------

#### <a name="git-status-2.3.10">2.3.10 git status</a>

Displays the working tree status (modified files, staged and unstaged files, deleted files, etc).

- `git status -s` - minimizes output by using symbols to characterizing the status of a file.

```bash
M file1.txt - modified
?? file2.txt - untracked file
A  file3.txt - added to the staging area
D file4.txt - deleted file
...
```

---------------------------------------------------

#### <a name="git-remote-2.3.11">2.3.11 git remote</a>

Used to track remote repositories.

- `git remote add <name> <URL>` - We often skip this command, since we directly clone repos from GitHub or GitLab. This command links a remote repository to link to the local one, using it's URL and giving it a name.
- `git remote remove <name>` - removes an added remote repository by it's name.
- `git remote show <name>` - displays information about an added remote repo
- `git remote update --prune` - removes local branches that had their corresponding remote branches deleted, basically cleaning your local repository.

---------------------------------------------------

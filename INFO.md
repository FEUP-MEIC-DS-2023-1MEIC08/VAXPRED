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
	</ul>
</ul>


## <a name="#angular-1">1. AngularJS prototype</a>

- This is a very basic prototype
- Still need to verify if there's a better approach regarding the repetition of imports on components and on the app module
- You can study the tutorials in <https://angular.io/tutorial>, I recommend Tour of Heroes.
- You'll need to install Angular CLI <https://angular.io/cli>
- Angular flex <https://github.com/angular/flex-layout> and Angular material <https://material.angular.io/components/categories> will be used to help with Frontend development

## <a name="#git-2">2. Using Git and GitHub</a>

Hey there, this is Nuno from T3!

Below, you'll find some instructions and tips about using Git and GitHub properly during the development of this project. We're also presenting some useful Git commands that should enhance the synergy of version control both inside and between teams.

### <a name="#branches-2.1">2.1 How teams and developers will branch</a>
Branches are primal to work on the central repository, avoiding multiple merge conflicts. So, **each team will have a branch**, created from the `prototype` one. Confused? Take a look at the following image.

![branching_1](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/assets/93390807/4deafb6f-c346-4f42-978d-2ee48c795311)


- Each team will have a branch named after them. So team 1 will get a branch called `t1`, team 2 will have a branch called `t2` and so on and so forth. These 4 **are to be considered the main branches for each team**.

- Every branch team 2 needs to create will branch from `t2`. Merging will also be done on `t2`. These actions apply for each team.

- Branches naming won't be random as well. Each branch should be named following this syntax

```
team_branch_name/category/description-in-kebab-case
```

For instance, if **team 2** needed to create a branch to deploy a **hotfix** about a **broken link** on an HTML file, the branch name could be something like this

```
t2/hotfix/broken-link
```

Some categories include `test`, `hotfix`, `bug`, `refactoring`, `feature`, `docs`, etc. There are several reasons to choose this type of naming, which can be discussed briefly on the first Sprint Planning.

The following image illustrates the previous 3 paragraphs

![branching_2](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/assets/93390807/c45d3cfd-9ad6-4490-adb8-a5e716265085)


- **Absolutely no developer** will be pushing directly on the `main` branch. Mistakes can happen and that's fine, but please avoid to do so. Any commit that breaks this boundaries, is to be removed and placed on its respective branch upon detection. Opportunities to merge to the `main` branch will still be discussed. For now, you should only worry about your own team branch, which can be merged as you like.

### <a name="#git-suggestions-2.2">2.2 Other Git and GitHub related suggestions</a>
- You should use **Pull Requests**. Why? Because it takes someone else to review your code and not you. And no, you can't validate your own Pull Requests, that will be checked for!

- Your commit messages shouldn't be based on some 5-year-old-baby-like sentences, like "aaaaaaaaaaaaaaaaaaa" or "done" or "more stuff". Keep in mind, you are working with several people. These messages can be crucial for a developer to understand what was done so far. The message should contain a message describing what changed on that commit

Just like branch naming, you can use a similar syntax to write your commit messages

```
Category: message.
```

- Don't forget to make your commits as often as you implement an important piece of code. Delaying the commit until the end of the day, will gather a lot of changes in one commit, which costs to describe in the commit message. Also, if the code comes out as faulty, you'll need to figure out exacly which part of the commit is causing the malfunctioning.

### <a name="#git-commands-2.3">2.3 Git commands and variations</a>

As promised, here goes a list of commands and flags combinations that can promise to be of high impact on your workflow. The following descriptions are short and you should search and experiment on your own as well.

---------------------------------------------------

**git stash**

If you need to discard the current changes but still save them, this is the perfect command. When applying `git stash`, the changes since the last commit will be removed from the current working directory, but saved on the stash locally.

When stashing changes, you are creating a new version that was discarded, but you won't be overwritting previous stashes.

- `git stash pop` - the opposite of `git stash`, it re-applies the last changes into the current working directory and removes the entry from the stash list
- `git stash apply <reference>` - identical to `git stash pop`, but it doesn't remove the entry from the stash list
- `git stash list` - lists all the stash entries done so far
- `git stash clear` - empties out the stash list

This one is quite powerful. If you start developing on the wrong branch, you can just stash the changes, checkout to the correct branch and pop the last stash entry.

---------------------------------------------------

**git branch**

Used to create branches, but not only. Remember that local branches (the one created on your computer) do not always have an **upstream** (a remote branch to link to) Sometimes, we need to also delete, rename branches or link a local branch with a remote one. This command provides flags to help on those configurations, among others.

- `git branch -u origin <name-of-the-remote-branch>` - Given you're in a branch named X, this command allows to connect your local branch X to a remote branch named after the parameter passed on the command. This can also be done in push-time by running `git push --set-upstream origin <name-of-the-remote-branch>`.

> **Note**
> If this is not performed, each git push command should follow the syntax: `git push origin <remote-branch-name>`. After setting the upstream, you can just simply use `git push`.

- `git branch -M <old-branch-name> <new-branch-name>` - renames a branch together with its configurations
- `git branch -D <branch-name>` - forcefull deletes a local branch, even if the branch is not fully merged.
- `git branch -C <old-branch-name> <new-branch-name>` - copies a branch to a new one

---------------------------------------------------

**git checkout**

Used to switch between branches, there's not much to say about it, just a nice flag that you can use.

- `git checkout -b <branch-name>` - Creates a new branch locally with a given name and immediately checkouts out to it. It's the same as running `git branch <branch-name>` and `git checkout <branch-name>` sequentially.

---------------------------------------------------

**git add**

Adds the specified files to the staging area, so those files can be prepared to the next commit.

- `git add -A` - adds any file that had any change whatsoever to the staging area, no matter its place in the working directory
- `git add .` - adds only the current directory to the staging area

> **Warning**
> This command is often mistaked with `git add -A`. If you're in a nested directory and execute `git add .`, any changes surrounding the nested directory won't be included!

- `git add <files>` - the most common way to use this command, by specifying a list of files or folders are to be submitted to the staging area. 
- `git add -p` - by using the `-p` flag, you're allowed to choose which snippets of changes you'll be submitting. To know what snippets you'll be able to choose from, use `git diff`.

---------------------------------------------------

**git reset**

`HEAD` in git is a reference to a commit. When switching branches, the HEAD revision changes to the tip of that branch. The `git reset` command allows to re-position the `HEAD` reference and discard changes made in the reseted commits.

> **Warning**
> This command is to be used with caution, as it might result in data loss. If you're not sure about what you're about to do, please use git stash to keep a version of the discarded changes.

- `git reset HEAD` - goes back on the last commit
- `git reset HEAD~3` - goes back on the last 3 commits
- `git reset --hard <hash>` - moves the HEAD pointer to the commit specified by `<hash>`, reseting the staging area to match that commit and discards any changes made after that commit as well.
- `git reset -p` - this flag allows you to choose which changes you want to discard and which not, the opposite of `git add -p`.

---------------------------------------------------

**git commit**

Takes the files from the staging area and saves those changes on your local repository (in the `.git` folder). At this point, the remote repository doesn't know about this changes yet.

- `git commit --amend -m <commit-message>` - replaces the latest commit message with a new one specified in the parameter

---------------------------------------------------

**git log**

Displays a list of the latest commits informations, including commit hashes, commit dates and commit messages.

- `git log --oneline` - logs using the 7 first characters of a commit hash and the commit message, squashing the commit display to 1 line, most of the times.
- `git log --decorate` - prints out the references for each commit (like branches or tags), if any
- `git log --graph` - prints the commit list alongside a commit graph, highlighting branches formation
- `git log --graph --decorate --oneline` - combining all the above, outputs the commit list using a small notation, organized in a commit graph.

---------------------------------------------------

**git rebase**

Appends the commits of a branch on the tip of another branch. It is often confused with git merge, even thought it has big differences. 

Merging implies creating a new commit, unlike rebasing, which integrates the changes from one branch into another by appending. Merging preserves chronological changes, but rebasing does not, since it takes other commits into the current branch.

Rebasing is mostly used with private branches (where you're working alone and you know no other interferences will change the original branch) and merging is used with public branches (inputs can come from multiple users).

- `git rebase branch-name` - takes the commits from `branch-name` and applies them on top of the current branch
- `git rebase -i branch-name` - rebases in iterative mode. Opens a window displaying the commits about to be added to the branch stream. You can edit how these commits will be integrated by using several keywords (which will not be covered here).

---------------------------------------------------

**git aliases**

It's not a command, but the title introduces a command. Just like shell command aliases, you can create your own alias to execute a complicated command or multiple commands at once, using a synonym.

- `git config --global alias.graph 'git log --oneline --graph --decorate'` - creates a new command called `git graph`, which is then expanded onto `git log --oneline --graph --decorate`
- `git config --global alias.send '!git add -A && git commit -m'` - creates a new command called `git send`, which is then expanded to `git add -A && git commit -m`.

> **Note**
> The `!` is used on the second command to specify that more than 1 command is to be used in the alias.

---------------------------------------------------

**git status**

Displays the working tree status (modified files, staged and unstaged files, deleted files, etc).

- `git status -s` - minimizes output by using symbols to characterizing the status of a file.

		M file1.txt - modified
		?? file2.txt - untracked file
		A  file3.txt - added to the staging area
		D file4.txt - deleted file
		...

---------------------------------------------------

**git remote**

Used to track remote repositories.

- `git remote add <name> <URL>` - We often skip this command, since we directly clone repos from GitHub or GitLab. This command links a remote repository to link to the local one, using it's URL and giving it a name.
- `git remote remove <name>` - removes an added remote repository by it's name.
- `git remote show <name>` - displays information about an added remote repo
- `git remote update --prune` - removes local branches that had their corresponding remote branches deleted, basically cleaning your local repository.

---------------------------------------------------

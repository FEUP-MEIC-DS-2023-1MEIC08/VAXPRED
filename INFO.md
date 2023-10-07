# Guidelines

This guide was developed to kickoff the development in the best way possible, ensuring everyone has the chance to work as leveled as possible with the rest of the team.

## Index
-

## 1. AngularJS prototype

- This is a very basic prototype
- Still need to verify if there's a better approach regarding the repetition of imports on components and on the app module
- You can study the tutorials in <https://angular.io/tutorial>, I recommend Tour of Heroes.
- You'll need to install Angular CLI <https://angular.io/cli>
- Angular flex <https://github.com/angular/flex-layout> and Angular material <https://material.angular.io/components/categories> will be used to help with Frontend development

## 2. Using Git and GitHub

Below, you'll find some instructions and tips about using Git and GitHub properly during the development of this project. We're also presenting some useful Git commands that should enhance the synergy of version control both inside and between teams.

### 2.1 How teams and developers will branch
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

### 2.2 Other Git and GitHub related suggestions
- You should use **Pull Requests**. Why? Because it takes someone else to review your code and not you. And no, you can't validate your own Pull Requests, that will be checked for!

- Your commit messages shouldn't be based on some 5-year-old-baby-like sentences, like "aaaaaaaaaaaaaaaaaaa" or "done" or "more stuff". These messages can be crucial for a developer to understand what was done so far (for instance when acessing the commit logs). Just like branch naming, you can use a similar syntax to write your commits

```
Category: message.
```

### 2.3 Git commands and variations

As promised, here goes a list of commands and flags combinations that can promise to be of high impact on your development.

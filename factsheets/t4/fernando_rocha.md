# Factsheet for Fernando Rocha

## Sprint 0

### The two user stories that I am most proud of

User Stories were conceived by the POs and estimated by the SMs. In this sprint I was a Scrum Master and helped prioritize, estimate and discuss the user stories with the fellow SMs, in preparation for the next Sprint Planning. It's important to note that the User Stories were changed shortly after the Sprint 0 forced-closure, so we had to rediscuss them in the next Sprint Planning.

### The two pull requests that I am most proud of

No Pull Requests were made during this sprint.

### Two contributions of other types that I am most proud of

- Meeting with the remaining three Scrum Masters to discuss and estimate the User Stories.
- Informing my team of the progress and development of the project, as well as the next steps to be taken during this initial phase.
- Contributing with ideas and suggestions to the User Stories and general project development.

## Sprint 1

This sprint was successful in terms of team work and collaboration. We, as a whole (all teams), started communicating with each other a bit too late but we managed to unify our code so we could merge and form a release. For example, we had to communicate with Team 2 to understand how the Database API setup was working, and how we could integrate it.

### The two user stories that I am most proud of

- [(#34) As a researcher, I want to have a profile page, so that I can see all the plugins I am using.](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/34)

My team and I are proud of this User Story because it includes all the tasks we did in this Sprint as Team 4.

In particular, I worked on the following:

- Issue #38 (Mockups for the researcher's profile): I created mockups on a Figma canvas with the entire team (Rodrigo, João, Juan and Pedro). I created a common Figma project to join every team's mockups.
- Issue #46 (Create a profile page): I worked with Rodrigo on creating the user profile page component with its frontend and basic backend, ready for the other team members to work on
- Issue #74 (Connect user profile page to API (use real data)): I worked with Rodrigo (and later Pedro) on fetching data for the user & their plugins.

### The two pull requests that I am most proud of

- [(#90) User profile page (work by Team 4)](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/90)

This is the team's pull request that merges all of our common work into the dev branch which will form the next release into main.

- [(#30) Sprint 0 release](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/30)

### Two contributions of other types that I am most proud of

- As a scrum master, I believe I did my job well in orienting and supporting my team in accomplishing their tasks. I provided organisation and kept everyone up to date with each other's progress. We kept the team's to-do list updated nad were always communicating with each other. I managed to get every one to meet before the closure of Sprint 1.
- I also participated with other Scrum Masters in weighing user story efforts and discussing the product and sprint backlogs.

## Sprint 2

In this sprint I remained the team's scrum master. We were productive and communicated efficiently. Tasks were planned in the beginning of the sprint, and developers assigned themselves or got assigned as the sprint progressed. We managed to complete almost all of our tasks. I did some valuable tasks for the project such as setting up the base of the CI/CD pipeline and some GitHub Actions workflows.

### The two user stories that I am most proud of

- [(#116) User Profile: remove CoreUI dependency](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/116)

This was a crucial task of remaking the user profile page by stripping it of CoreUI, which was conflicting with other parts of the project. I helped Rodrigo accomplish this by investigating with him the possibilities using Google Material Design and regular CSS.

- [(#135) As an admin, I want to remove a plugin from the store on the admin dashboard.](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/135)

I made the API route that actually removes the plugin when the user confirms the action, and also guided Rodrigo as we pair-programmed the admin dashboard/page remove plugins feature.

### The two pull requests that I am most proud of

- [(#160) Feat: GitHub Action for Frontend Tests](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/160)

This PR introduces one of the multiple GitHub workflows I created, which is a GitHub Action that runs the frontend tests on every push to the `dev` branch. This is a crucial step in the CI/CD pipeline, and it was a challenge to set up because of the way the frontend tests are run (requiring a browser to be opened).

- [(#171) Feat: Deployment with Docker](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/171)

This was also challenging to come up with, but it still a base for our future work regarding real live server deployment. This allows for developers to run the project in Docker containers, which is a good step towards a production-ready deployment. A GitHub Workflow was created to build the Docker containers and run them, checking if the project is working as expected.

### Two contributions of other types that I am most proud of

- The remaining GitHub Workflows for linting frontend & backend, and running the backend tests.
- Contributing to the good functioning of the project by being active in the team's Discord channel and organizing our general to-do's and pending tasks for the sprint.

## Sprint 3

In this sprint I remained the team's scrum master. We were productive and communicated efficiently. Tasks were planned in the beginning of the sprint, and developers assigned themselves or got assigned as the sprint progressed. We managed to complete all of our tasks!

### The two user stories that I am most proud of

- [(#196) As a researcher, I want to see a footer on all pages, so that I can have a better looking and more pleasant experience.](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/196)
- [(#77) As an admin, I want to have a page where I can manage plugins in the store, so that I can add, edit and/or remove the plugins from the store.](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/77)

### The two pull requests that I am most proud of

- [(#201) T4 - Feat: Add footer to all pages](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/201) - I created this feature.
- [(#227) T4 - Admin dashboard: ability to Edit Plugins](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/pull/227) - I created this feature with João Félix.

### Two contributions of other types that I am most proud of

- Contributing to the good functioning of the project by being active in the team's Discord channel and organizing our general to-do's and pending tasks for the sprint.
- Meeting with the client online on 29/11/2023 as a Scrum Master, to discuss the project's progress and future steps.

## Sprint 4

...

## Overall Product

Reflect on your specific contributions to the product, technically and as perceived by a user, along the three dimensions below (see Dashboard > Final outcomes > Product). Keep each section below to a maximum of 50 words.

### Technical Soundness

...

### Product Realization

...

### Value for the Client

...

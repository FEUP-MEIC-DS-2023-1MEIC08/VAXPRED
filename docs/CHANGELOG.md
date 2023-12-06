# Project Changelog

This file contains the changelogs for each sprint release, each identified with a version number.

## Sprint 1 Release: [v0.1](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/releases/tag/v0.1)

- Created a functional backend for the application using FastAPI and SQLite
- Created a functional frontend for the application using NodeJS and AngularJS
- Added plugin store page
- Added plugin information modal/popup
- Added user (researcher) profile page

Completed PBIs are marked with `Sprint 1` on the Project Board, and they can be found in the `Accepted` column. For the exact detail, refer to the commits made until this release.

## Sprint 2 Release [v0.2](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/releases/tag/v0.2)

- Created and updated mockups in the project's Figma page
- Added support for categories and tags for the plugins
- Added new plugin fields and new search mechanisms
- Updated plugin information popup
- Updated plugin page with its dependencies and supplier information
- Implemented grid layout for the plugin store
- Added plugin search by tag or category
- Added plugin search by name or other attributes
- Added admin dashboard page (URL/admin)
- Added ability to remove plugins from the store by the admin
- Added ability for users to remove plugins from their profile page
- Added ability for users to add plugins to their profile
- Added page for error "page not found" (404)
- Added GitHub Action as automatic code linter for frontend (CI/CD)
- Added GitHub Action as automatic code linter for backend (CI/CD)
- Added GitHub Action as automatic testing for frontend (CI/CD)
- Added GitHub Action as automatic testing for backend (CI/CD)
- Added GitHub Action as automatic app building with Docker (CI/CD)

Completed PBIs are marked with `Sprint 2` on the Project Board, and they can be found in the `Accepted` column. For the exact detail, refer to the commits made until this release.

## Sprint 3 Release [v0.3](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/releases/tag/v0.3)

- Database refactor with changes to how a plugin's tags, categories and FAQs are stored
- Added new plugin fields, "type" and "price" to the database
- Database route to get one or multiple plugins now returns all the items related to each plugin in a single call instead of having to call multiple routes
- Implemented the storage in the database of one or more images per plugin
- Reworked existing database calls in the frontend to accomodate new backend changes 
- Designed and implemented a UI for the home page
- Added a new FREE/PREMIUM badge to plugin cards
- Added new type icons to plugin cards to display the type of plugin they hold
- The search results' page is now responsive
- Added a FAQ tab in the plugin details page that displays the plugin's questions & answers
- Added a form in the Admin Panel to create new plugins
- Added a button to edit store plugins from the list in the Admin Panel
- Added a confirmation dialog for disassociating a user plugin in the Profile
- Added a footer to the website that is shared across all pages
- Added a display of the tags corresponding to a plugin on its page
- Added the indication of a plugin's category to its page   

Completed PBIs are marked with `Sprint 3` on the Project Board, and they can be found in the `Accepted` column. For the exact detail, refer to the commits made until this release.

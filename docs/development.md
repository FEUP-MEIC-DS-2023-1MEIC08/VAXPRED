# Development

## Architecture and design

This deployment diagram represents the selected technologies by the team/imposed by the client and how they interact with each other:

![deployment_diagram](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/blob/po/docs/deployment_diagram.drawio.png)



## Technology

The main technologies used are:
* Fast API (restriction by the client) - A modern, high-performance Python web framework for building APIs with automatic documentation generation (https://fastapi.tiangolo.com);
* Angular (restriction by the client) - A popular open-source JavaScript framework for building dynamic and interactive web applications (https://angular.io);
* Core UI (restriction by the client) -  A specific UI framework for designing and implementing user interfaces with tailored design principles and technical capabilities (https://coreui.io);
* Figma (for the mockups, already being used by the client) - A cloud-based design and prototyping tool for creating collaborative and interactive user interface designs and design systems (https://www.figma.com).

All of the technologies used by the teams were proposed by the client. The small summary next to each of the technologies names acts as an explanation why the client chose it for the development of the project.

The prototype implemented in Sprint 0 consisted of a simple plugin page, with the possibility to search for another workspaces. Besides that, it has access to the plugin's description, requirements, changelog and extra items. In addition, the plugin still has a designated space for its (future) categories and how to contact the supplier.


##  Development guide

The guidelines for the project are present here: https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/blob/po/docs/GUIDELINES.md.


## Security concerns

Since the project mainly consists of the construction of a plugin store, there weren't many security vulnerabilities that concerned the development. Since the reseracher will need to be logged in in order to use the plugin store and its plugins, there may be a security concerned relative to the accessing of another researcher's account, but that part of the project is not of this teams concern.


## Quality assurance


Acceptance tests were made by the teams to test if the final product of each user story made goes accordingly to what was expected (based on the description of the user story).


## Metrics

Describe how you captured each of the "four key metrics" (e.g., automatic mechanism, survey to the team on the end of each sprint).

Provide here an historical record (for each sprint) of the four key metrics and velocity.


## Restrospectives

- [Global Project Retrospective](./retrospective/retrospective.md)

- [Team 1 Retrospective](./retrospective/retrospective-t1.md)

- [Team 2 Retrospective](./retrospective/retrospective-t2.md)

- [Team 3 Retrospective](./retrospective/retrospective-t3.md)

- [Team 4 Retrospective](./retrospective/retrospective-t4.md)
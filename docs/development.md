# Development

## Architecture and design

This deployment diagram represents the selected technologies by the team/imposed by the client and how they interact with eachother:

![deployment_diagram](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/blob/po/docs/deployment_diagram.drawio.png)

Be clear about what is the current architecture/design and what is the one you envision in the future, in case they are different. 
Identify main risks and justify the most important choices to show the soundness of the architecture and design that you have implemented or plan to implement.


## Technology

The main technologies used are:
* Fast API (restriction by the client);
* Angular (restriction by the client);
* Core UI;
* Figma (for the mockups, already being used by the client).

Identify the main technologies, languages and frameworks used. Clearly identify which ones were restrictions imposed by the client and which were your own choices. Justify your choices and explain in your own words the motivation for the restrictions of your client.

Explain the prototype or base implementation that you have implemented in Sprint 0, and how that has informed the rest of the development.

The prototype implemented in Sprint 0 consisted of a simple plugin page, with the possibility to search for another workspaces. Besides that, it has access to the plugin's description, requirements, changelog and extra items. Besides that, the plugin still has a designated space for its (future) categories and hpw to contact the supplier.


##  Development guide

The guidelines for the project are present here: https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/blob/po/docs/GUIDELINES.md .

Explain what a new developer to the project should know in order to develop the system, including who to build, run and test it in a development environment. 

Document any APIs, formats and protocols needed for development (but don't forget that public APIs should also be accessible from the "How to use" section in your README.md file).

Describe coding conventions and other guidelines adopted by the project.


## Security concerns

Since the project mainly consists in the construction of a plugin store, there weren't many security vulnerabilities that concerned the development. Since the reseracher will need to be logged in in order to use the plugin store and its plugins, there may be a security concerned relative to the accessing of another researcher's account, but that part of the project is not of this teams concern.


## Quality assurance

Describe which tools are used for quality assurance and link to relevant resources. Namely, provide access to reports for coverage and mutation analysis, static analysis, and other tools that may be used for QA.


## Metrics

Describe how you captured each of the "four key metrics" (e.g., automatic mechanism, survey to the team on the end of each sprint).

Provide here an historical record (for each sprint) of the four key metrics and velocity.


## Restrospectives

Describe (possibly as separate markdown files linked form this section) a written account of your retrospectives. There should be, for each sprint, one retrospective for the entire project, and one for each team.

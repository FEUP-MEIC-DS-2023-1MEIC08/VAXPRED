# Factsheet for André Soares

## Sprint 0

In this first sprint, I have been part of initial product vision and domain model building, which were better discussed and implemented between the PO's and the SM's.

### The two user stories that I am most proud of

No user stories have been added or reviews by me.

### The two pull requests that I am most proud of

No important pull requests have been made by me.

### Two contributions of other types that I am most proud of

Envolved at initial development of domain model and product vision.

## Sprint 1

In this second sprint, I have been part of the integration of the web framework FastAPI as well as part of the creation and population of the database for the product.

### The two user stories that I am most proud of

In this sprint I was involved with user [story #32](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/32). Even though we only had 1 user story assigned to our team in this sprint, I worked on 2 items [#60](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/60) and [#54](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/54) where I and Aníbal Ferreira developed the web routes regarding the relation between users and plugins as well as populating the plugins table, respectively.

### The two pull requests that I am most proud of

No important pull requests have been made by me.

### Two contributions of other types that I am most proud of

In this sprint I also helped my team in the decision of which attributes we would need to store concerning users and plugins and helped populate the users table. 

## Sprint 2

In this second sprint, I have been part of the integration of the web framework FastAPI as well as adding aditional features to the backend so that the front end has more direct routes.

### The two user stories that I am most proud of

In this sprint I was involved with [user story #23](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/23), where I implemented a full text search feature on the database and made it possible for the frontend to send a get request with either the parts of the name or a word in the description and receive the correspondent(s) plugin(s)
I was also involved with [user story #153](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/153) where I created tests to verify if the full text search worked properly.
### The two pull requests that I am most proud of

No important pull requests have been made by me.

### Two contributions of other types that I am most proud of

In this sprint I also helped my team to have sql scripts to automatically populate the db and helped in the decision process of how the tags would be implemented.


## Sprint 3

In this second sprint, I have been part of the improvement of the database with more features so that the front end can be improved and display more information

### The two user stories that I am most proud of

In this sprint I was involved with [user story #188](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/188), where I added a field to the plugin class to determine whether or not a plugin is premium (paid) or free. I used a simple integer (isFree) signifying if it is paid or not, this way the load on the database will be smaller if at scale.
I was also involved with [user story #119](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/issues/119) where I created a dependencies class as well as an association class between dependencies and plugins, to this effect I also created a way to add a dependency to a plugin and to see both plugins that use a dependency and what dependencies a plugin uses (I made more routes but these are the most important).
### The two pull requests that I am most proud of

No important pull requests have been made by me.

### Two contributions of other types that I am most proud of

In this sprint I also helped my team by improving prior sql scripts to account for new changes to the database, this means that post changes we can quickly recover our database preset


## Sprint 4

During this sprint I was involved in the refactor of the database code, implementation of new routes and addition of new fields. The main change I did was to allow dependencies to work in the new refactored code as well as add new fields to them. 

### The two user stories that I am most proud of

In this sprint I was involved with item #240 where I added new fields to the dependencies table and item #238 since I modified several dependencies related functions and response models so that they could be returned as a list containing name, vendor and version inside a plugin response return, allowing this information to be fethced in one call.

### The two pull requests that I am most proud of

No important pull requests have been made by me.

### Two contributions of other types that I am most proud of

In addition to what I mentioned above, I was also involved in testing some of the new refactored code as well as making sure all of the limit cases and exceptions concerning dependencies changes worked without problem. 


## Overall Product


### Technical Soundness

My contributions helped the backend of the application reach a final state where all the necessary information is stored and this information is retrieved in an efficient way that minimizes the number of required calls.


### Product Realization

My work during the sprints helped the product reach its final stage in a complete state with the required features implemented. As as Dev in this project, I made sure I was always available to implement any change that was required quite quickly so the frontend could move forward efficiently. 



### Value for the Client

The product developed shows value for the client and in the meetings that my scrum master had that value was acknowledged. This final result was only possible due to the work of the rest of my team and myself.

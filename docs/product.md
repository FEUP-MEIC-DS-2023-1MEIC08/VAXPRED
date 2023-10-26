# Product Management

## Product Vision

### Vision Statement

Towards a healthier future, VAXPRED aims to improve the field of vaccine development by allying the power of several technologies to allow researchers and scientists to advance in their investigations. Supplying a cloud-based system that supports different datasets from various sources and model pipelines, researchers can run simulations to generate predictions that assess the efficacy of immune responses against pathogens. These tools are provided through plugins that can be chosen accordingly to the experiment ran by the researcher in a cloud-based store.


### Key Features

- A plugin store, from which researchers will be able to download the desired plugins for their experiments;
- Models and analytical tools will be made available, provided under the form of plugins at the store;
- The plugin store will be divided in distinct categories, allowing the researchers to choose several types of plugins for the many phases of their experiments;
- The researcher will be able to check the plugin's description, allowing them to know more about them;
- Synthetic data generation tools will be available and also data curation and quality-check tools for the considered data types;
- It should be user-friendly, allowing a smooth use by its users.


### Who Benefits from VAXPRED:

VAXPRED aims to improve the lives of:
- researchers and scientists, since their work will be made easier by being able to use, in a simple way, the plugins available in the plugin store.

## Market Research

### Azure AI | Machine Learning Studio

The “Azure AI | Machine Learning Studio” aims to help developers and data scientists creating their own machine learning models faster using the AI services available in the platform. Various tools are available to be used on the platform, like Jupyter Notebooks and Visual Studio Code, as well as open-source frameworks like TensorFlow and PyTorch. High-quality vision, speech, language, and decision-making AI models are also made available. The users have access to their Workspaces, where they can keep track of all the artifacts they create while performing experiments, to Feature Stores to create features, Registries that make it possible to share models with other people, and users can also store their data in the platform. 
The “Azure Ai | Machine Learning Studio” bears similarities with the VAXPRED platform on the presence of workspaces, various tools and models to choose from and the ability to store data, as well as having been created with the intention of being used by scientists. However, unlike VAXPRED, Azure AI is not focused on the study of epitopes, lacking tools related to that.
[Source.](https://azure.microsoft.com/en-us/solutions/ai/)

### Baidu's LinearFold

Baidu's LinearFold is an AI powered tool designed to predict the secondary structure of RNA molecules, particularly focusing on the structure of RNA molecules in viruses like the Covid-19 coronavirus. LinearFold uses AI algorithms to predict the secondary structure of RNA molecules. RNA molecules are essential components of viruses, and understanding their structure is crucial for various aspects of virus research, including vaccine development. By accurately predicting RNA structure, LinearFold aids in understanding the genetic makeup of viruses like Covid-19. This information is valuable for researchers working on vaccines. The tool relies on AI and machine learning techniques to improve the accuracy of RNA structure prediction. It leverages AI to make predictions based on large datasets of RNA sequences.
Both LinearFold and Inno4Vac use advanced technology to accelerate vaccine research using large datasets. Inno4Vac incorporates scientific and technological advances into vaccine development, while LinearFold applies AI to predict RNA structures for virus research. Both initiatives highlight the importance of AI in addressing public health challenges. Inno4Vac incorporates AI for predictive modeling and data analysis in vaccine development, while LinearFold directly applies AI to RNA structure prediction.
Sources: http://research.baidu.com/Blog/index-view?id=131, https://www.technologyreview.com/2020/03/11/905366/how-baidu-is-bringing-ai-to-the-fight-against-coronavirus/


### Market IEDB


https://www.iedb.org

IEDB is a well-known resource for immunology and vaccine development. It provides information on immune epitopes, which are important for vaccine design.

The Immune Epitope Database and Analysis Resource (IEDB) is a collaborative project led by researchers at the La Jolla Institute for Allergy and Immunology (LIAI), with generous support from the National Institute of Allergy and Infectious Diseases (NIAID), a division of the National Institutes of Health (NIH), and the Department of Health and Human Services (HHS). The primary aim of this project is to disseminate comprehensive information about immune epitopes, this way facilitating the development of new research tools, diagnostic techniques, vaccines, and therapeutic solutions.
The IEDB is a repository of data concerned to antibody and T cell epitopes, encompassing various species, including humans, non-human primates, rodents, and other animals. A significant emphasis is placed on selecting data related to NIAID's Category A, B, and C priority pathogens, including Influenza, as well as emerging and re-emerging infectious diseases. This selecting effort is continuous and constantly updated. Furthermore, the database includes epitope information from other infectious agents, allergens, and autoantigens.
The IEDB also houses valuable MHC binding data originating from a wide range of antigenic sources, as well as immune epitope data contributed by trusted databases such as FIMM (Brusic), HLA Ligand (Hildebrand), TopBank (Sette), and MHC binding (Buus). These databases and their investigators are significant contributors to the IEDB's wealth of knowledge.
In addition to its database, the IEDB website offers an Analysis Resource, comprising a suite of tools designed for the prediction and analysis of epitopes.

Similarities with VaxPred:

- Catalogs experimental data on epitopes and T-cells studied in humans or other animal species, in the context of infectious diseases, allergies, transplants, etc.

- It allows the researcher to pinput info about what they are experimenting (in this, case, about epitopes and their source, host,...) and returns a listo f epitopes, antigens, papers on the searched matter, the receptores and references.


## Domain Analysis

An high-level class diagram with key domain concepts.

![domainmodel](https://github.com/FEUP-MEIC-DS-2023-1MEIC08/VAXPRED/assets/72468538/900d561b-80c3-42d4-8a13-e6a9a1faced8)

## Sprint Reviews

Record of each sprint review, stating *when* they happened, *which version* was demonstrated (refer to specific git tags and/or version number of the product increment), and the main feedback provided by the customer. Refer also to the consequences of that feedback to the planning of the product, when relevant.

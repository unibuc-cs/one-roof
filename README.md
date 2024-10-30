# One Roof

## Product vison
▎**FOR** renters and landlords  
▎**WHO** need a transparent, community-driven, and user-friendly platform to find, evaluate, and rent properties  
▎**One Roof** is a rental marketplace  
▎**THAT** allows renters to discover properties through detailed listings, interactive maps, and community-generated reviews, while enabling landlords to effectively showcase properties and connect with potential tenants  
▎**UNLIKE** traditional rental platforms that primarily focus on listings and basic filters  
▎**OUR PRODUCT** offers an enhanced search experience with features such as heat maps, neighborhood insights, direct communication between renters, reviewers, and landlords, as well as tools like notifications, shared lists, roommate matching, appointment scheduling,  while maintaining a comprehensive database of rental options.

## User stories
User Stories - https://github.com/annna7/one-roof/wiki/User-Stories
Backlog - https://github.com/users/annna7/projects/1

## 
## Diagrame
### Diagrama workflow
![Workflow drawio](https://github.com/annna7/one-roof/assets/96103743/65f7929d-2e33-4e3f-bd15-63075456913d)

### Diagrama E/R
![E_R drawio](https://github.com/annna7/one-roof/assets/96103743/fffb7a9c-8e02-4050-9bbe-8c53308939a4)

## Raportare de Buguri
Am creat issues care explicau cum pot fi reproduse bug-urile si pull request-uri care erau legate de acestea si explicau solutia gasita.
https://github.com/annna7/one-roof/pull/61
https://github.com/annna7/one-roof/pull/63

## Refactoring, Code Standards
Am folosit linter-ul ESLint pentru formatarea codului si am incercat sa impartim codul in repo-uri corespunzatoare pentru a fi cat mai modular.

## Teste automate
Am folosit Mocha si Chai pentru crearea de teste in backend.
![WhatsApp Image 2024-06-17 at 14 49 19](https://github.com/annna7/one-roof/assets/96103743/93239a0e-244d-4ded-a5ad-f1d3ccd84fa4)

## Folosirea AI-ului
Am generat logul cu ajutorul Dall-e

![WhatsApp Image 2024-06-17 at 15 14 02](https://github.com/annna7/one-roof/assets/96103743/42a7ac95-00a6-4b4a-9efb-02e4aed41d1d)

De asemenea, am utilizat Copilot si ChatGPT pe parcursul dezvoltarii aplicatiei.
## Design patterns
_Observer design pattern_ - Pentru implememnatrea chatului am folosit socket.io, o librarie care faciliteaza comincarea in timp real. Cu ajutorul ei am realizat design pattern-ul observer, in implementarea noastra serverul joaca rolul de subiect, iar socket-urile sunt observatorii. In momentul in care exista o schimbare in baza de date subiectul anunta observatorii.

_Strategy design pattern_ - Am implementat functionalitatea de Search cu ajutorul unui Strategy - pentru cautarea geospatiala, aplicabila si chiriilor, si review-urilor, am folosit GeospatialSearchStrategy, iar pentru filtrele specifice fiecarei entitati, am folosit ListingFiltersStrategyPattern si ReviewFiltersStrategyPattern; aplicam strategiile corespunzatoare succesiv cu ajutorul unei functii helper `applyCombinedStrategies`, pe care o apelam apoi din `SearchService`. Implementarea pattern-ului se regaseste in directory-ul `strategy` din `backend`.




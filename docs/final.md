----------------------------------------------------------------------------------------------------------------
# Finder FM Final Report
## Team Members: 
 Chris Tang, Kavita Kothari, Marisa Pesce, Meagan Griffith, Sonia Morgan, Travis Johnson

## Link: 
[FinderFM](https://practical-hopper-3ac28a.netlify.com/)

## Information Problem: 
PG County has many farmers’ markets, but there is not an application that compiles all of them and lets users filter the results for farmers’ markets that they want to go to. Additionally, the websites available are not scalable. For example, farmpgc.com has a clean interface, but only provides a text list of farmers’ markets for farmers markets in one county. The format of the website could prove problematic if one were to create a similar website that included farmers markets from more areas. Users, especially ones that are not tech-savvy, would have to scroll through the whole page to perhaps find what they are looking for. Also, limited information is available about these markets. There are no details about what the markets sell. This may be an issue for stakeholders who want to plan their shopping experience in advance.

## Stakeholders: 
The stakeholders of our application would be the farmers’ market vendors, who could potentially see an increase in business once the application is finished, and community members who wish to attend farmers’ markets, by providing them a tool to search for the right one. 

## Data We Chose to Work With: 
We chose to work with an API from Prince George’s County that listed all farmers’ markets in the area, what each market was selling, and possible ways that you could pay. 

## Chosen Strategies and Solutions for the Problem: 
Our group decided to build a website where you could filter data fetched from the API and find specific farmers’ markets based on the day that they were available. We also wanted to give users a way to decide which farmers’ market to go to based on their location, provided and grown ingredients, and other filters for user needs and resources.

## Technical Decision Rationale:
Filtering our dataset was ultimately the biggest underlying issue we had and came up with the decision to filter our data from within the front end using basic javascript, rather than filtering on the backend when the API was pulled. We found this easier to do when certain characteristics and buttons were selected by our users. We used async and await rather than .then for ease and familiarity.

Local storage was implemented for faster loading, but also for extra credit.

Leaflet and React were becoming overwhelming to learn, so they were unfortunately cut from the project. We hope to come back to it within the future to enhance user experience.


## How Solution Addresses Problem:
Our solution helps bring attention to and resolve the lack of resources available for local farmers markets, and helps fulfill the information need by providing a resource for those who wish to go support local farms directly. There are currently resources available for those who wish to use farmers markets within the area such as [farmpgc.com](farmpgc.com), but they have limited search capabilities. The lack of resources is something we hope to fill with our resource as it does have filter capabilities and a scalable structure. 

## Challenges:
Initially, we wanted to use React to add specific features to our website, but we encountered problems incorporating the code, so we ended up deciding not to use React. Additionally, we seemed to encounter issues with dividing the work mainly because we were not sure how the work could have been divided according to our skillset. To overcome this challenge, we talked about everyone’s strengths and let the people who were strong coders work on the website, while others focused on reports and presentations. Lastly, we had issues with getting everyone on the same page because of varying skill sets. To resolve this issue, people who were not as advanced with coding, helped wherever possible, but primarily focused on reports. 

## Possible Future Work:
This website could be expanded in the future to add farmers’ markets from other areas, not just PG county. In this way, people in other counties can find farmers’ markets in their areas. This was a big possibility for us as we wanted to structure the site to be scalable to other datasets. We also had the intention of a map feature and calendar feature, but we did not have enough time and resources to dedicate to it by the deadline of our project. We hope to eventually further develop our skills to implement these features within our Find page or an additional page. We hope to use Leaflet to implement our map and React to implement our calendar.
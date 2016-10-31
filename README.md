# League Friends
A d3js replication of this cool blog post I saw

#Goal
Create a (very minimal) web app that ~~replicates~~ attempts to simulate the functionality of this [blogpost](http://na.leagueoflegends.com/en/page/find-your-lunch-table-which-champs-are-friends).

#Synopsis
League of Legends is a MOBA game. Two teams of five players pick roles and characters to play as -- typically referred to as champions. Players have champion preferences i.e if you like playing as __champion A__ you'll enjoy playing __champion B__ and for the same reasons avoid __champion C__. The goal is to visualize these preferences in the form of a node-link graph. Let one node represent a champion __A__, and a link be the tendency in which players choose another __champion B__ given that they prefer __champion A__

#Steps towards Completion - Edited while in progress

* ~~Figure out how to do grunt stuff from scratch~~ Cut out in interest of time.
* ~~Query champion mastery data from Riot API on client-side w/ jQuery AJAX~~ Bad idea.
* ~~Move Riot API interfacing to server-side functionality~~
* ~~Study up on d3js node graph creation~~ Not enough v4 examples doing it in v3
* ~~Organize data into format that can be plotted in a graph~~ Still needs more investivating
* ~~Plot that graph~~
* Touchup visuals
* Add database stuff ... ? 
* Find out if querying match data is better than mastery data


#Motivation
Data stuff is interest

#Usage

```sh
npm install
node server.js
open public/index.html
```

#Installation

#Things I am required by Riot to say about this project
[The title of Your Application] isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

#License
I don't know anything about this yet





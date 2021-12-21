# 25 years of Pokemon

On the occasion of the 25th anniversary of Pokemon, I created an app related to
Pokemon with the data fetched from the [PokeAPI](https://pokeapi.co/) a Pokedex
using ReactJS and Bootstrap, deployed with Netlify, which allows the user to click
on each Pokemon to show detailed information.

The user can scroll through the Pokedex which contains more than 800 different
Pokemon. A button on the lower right corner will appear shortly after starting to
scroll to bring the user to the top of the page in one click.

[![App preview](https://github.com/YuriDevAT/pokemon/blob/master/public/images/thumbnail-pokemon.png)](https://youtu.be/dBOb1VuNnA4)

## Fetched data

The user can click on each Pokemon to show detailed information of each Pokemon,
like stats, moves, abilities, types and their evolution, fetched from different
API links. Depending of the type ofthe clicked Pokemon the background color is
customized.

Used API links:
- https://pokeapi.co/api/v2/pokemon?limit=898 to fetch all Pokemon
- https://pokeapi.co/api/v2/pokemon/${id} to fetch an individual Pokemon by its id
- https://pokeapi.co/api/v2/pokemon-species/${id} to fetch an individual Pokemon by its id
- https://pokeapi.co/api/v2/evolution-chain/${id}/ to fetch the evolution chain of each pokemon
- https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png to fetch img of each pokemon


## Live view of the app

The app was deployed with Netlify. Follow the link to check out the app:
[Pokemon app](https://pokemon25.netlify.app/).

## Evolution

The appearance of evolution and its value depends on the evolution chain of each
Pokemon. \
Four examples will demonstrate these differences:

- Pokemon [115: Kangaskhan](https://pokemon25.netlify.app/pokemon/265), which
  does not have an evolution. Therefore, the tab is disabled.
  
  <img width="400" src="https://github.com/YuriDevAT/pokemon/blob/master/public/images/kangaskhan.png" />
- Pokemon [133: Eevee](https://pokemon25.netlify.app/pokemon/133), whish has
  several evolutions depending on which stone is used to force an evolution.
  
  <img width="400" src="https://github.com/YuriDevAT/pokemon/blob/master/public/images/eevee.png" />
- Pokemon [265: Wurmple](https://pokemon25.netlify.app/pokemon/265), which has
  two different first evolutions (depending on their nature) which then evolutes to
  an individuell second state.
  
  <img width="400" src="https://github.com/YuriDevAT/pokemon/blob/master/public/images/wurmple.png" />
- Pokemon [280: Ralts](https://pokemon25.netlify.app/pokemon/280), which has two
  different second evolution depending on its nature.
  
  <img width="400" src="https://github.com/YuriDevAT/pokemon/blob/master/public/images/ralts.png" />

There may be other Pokemon with other kind of singularities which I am not aware
at this stage now.

## Open issues

The app is still a work in progress. To see open issues please take a look on
the GitHub Repo [issue section](https://github.com/YuriDevAT/pokemon/issues).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Download the app by cloning the repository

Use `git clone https://github.com/YuriDevAT/pokemon.git` do download the app.

Open the project directory by running the command `cd pokemon` in the command line.\
When using VSC run the command `code .` to open the project in VSC.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Once tests are fully written, `npm test` will launch the test runner in the
interactive watch mode.

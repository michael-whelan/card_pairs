# card_pairs
Simple card pairs game in JS

## Starting the Game
 - Run your local server on whatever port you want e.g. py -m SimpleHTTPServer 8080
 - Open your browser and travel to you selected localhost port.

## Playing the game
 - Enter a bet amount using the up and down arrows.
 - Press enter to start the game.
 - Clicking a card will flip it over.
 - Getting a pair will eliminate that pair.

## Changes
 - If this was something I was aiming to release or host, obviously I'd load in images for the different cards.
 - Of the content I am loading in here (sounds) I am just grabbing them locally and attaching them to an audio tag.
 	this is obviously not the way to manage assets using JS as there is no guarantee the asset is found.
 	An example of how to load these assets in a live game would be some sort of simple asset manager. Using that
 	you can queue all of the assets that need to be loaded for a scene have callbacks on each load to empty the queue and
 	only start the scene when the queue is empty. 
 - Other things to add are menu/proper splash screens/ decent textures. 
 - A good chunk of this was pulled from [another very old project](https://github.com/michael-whelan/JavaScript).
 	This was to save time, but it meant I had to structure the project in a similar way, which has meant that the object files are lacluster.


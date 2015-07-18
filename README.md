frontend-nanodegree-arcade-game
===============================

Assignment 3 for Udacity's Frontend Web Developer Nanodegree
Leon Tabak
18 July 2015

To play this game, open index.html in a Web browser.
This can be done in the Chrome browswer by selecting
File/Open File from the menu.

The gameboard features background images and actors.
  * The background has three parts.
      - There is grass (near the bottom). 
      - There is stone (near the middle).
      - There is water (at the top).
  * There are two kinds of actors.
      - "Enemies" (resembling bugs) move from left to right over 
          the stony part of the terrain.
      - A single "player" (resembling a little person) starts at 
          the bottom center of the gameboard.

Use the arrow keys on the keyboard to move the image
of the person from the bottom to the top of the gameboard.
Avoid the bugs that move from left to right.
A collision with a bug will return the player to the
starting position.
The game is won by getting the player to the water
at the top of the gameboard.

The current version places just three enemies on the board. 
There are three possible speeds for the enemies. The program
assigns speeds to enemies randomly. It also assigns a starting
position randomly to each enemy. This starting position is
equally likely to be anywhere in a row.

The current version does not announce or count wins. It does
not offer optional or special challenges.



Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797
for self-checking their submission.

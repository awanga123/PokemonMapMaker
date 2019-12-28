/*eslint-env browser */
/*globals $ */

// The size of a swatch (in pixels)
var SWATCH_SIZE = 25
var curx
var cury

// Utility function - checks if a given swatch name is walkable terrain.
var isTerrain = function(swatchType) {
  return (
    [
      'grass',
      'flowers-red',
      'flowers-orange',
      'flowers-blue',
      'weed',
      'weed-4x',
      'weed-small',
      'weed-2x',
      'field',
      'sand-patch',
      'sand',
      'sand-nw',
      'sand-n',
      'sand-ne',
      'sand-w',
      'sand-e',
      'sand-sw',
      'sand-s',
      'sand-se',
      'sand-nw-inverse',
      'sand-ne-inverse',
      'sand-sw-inverse',
      'sand-se-inverse',
    ].indexOf(swatchType) >= 0
  )
}

/*
 * Constructor for the player (Pikachu sprite).
 *
 * @param x - The beginning x coordinate (usually zero)
 * @param y - The beginning y coordinate (usually zero)
 * @param builder - The MapBuilder object, with information about the map.
 * In particular, this builder object should have the container element
 * as a property so the '.map' div can be found using a jQuery 'find' call.
 */
var Player = function(x, y, builder) {
  this.builder = builder
  this.$map = builder.$elem.find('.map')

  var $newPlayer = $('<div>').attr('class', 'player facing-down')
  this.setUp(x, y, $newPlayer)

  var $document = $(window.document)

  function keyClick(e) {
    var key = e.which
    var nextx = curx
    var nexty = cury
    if (key === 37) {
      nextx = nextx - 1
      $newPlayer.attr('class', 'player facing-left')
    } else if (key === 38) {
      nexty = nexty - 1
      $newPlayer.attr('class', 'player facing-up')
    } else if (key === 39) {
      nextx = nextx + 1
      $newPlayer.attr('class', 'player facing-right')
    } else if (key === 40) {
      nexty = nexty + 1
      $newPlayer.attr('class', 'player facing-down')
    }
    if (nextx >= 0 && nextx <= builder.w - 1 && nexty >= 0 && nexty <= builder.h - 1) {
      if (isTerrain(builder.$elem.find('.row').eq(nexty).children().eq(nextx).attr('class').replace('tile swatch ', ''))) {
        $newPlayer.css('top', (nexty * SWATCH_SIZE) + 'px')
        $newPlayer.css('left', (nextx * SWATCH_SIZE) + 'px')
        cury = nexty
        curx = nextx
      } 
    }
  }

  $document.on('keydown', keyClick)

  // TODO: Initialize the player class. You'll need to
  // 1. Create an element for the player and add it to the DOM, with a class
  //    specifying orientation. The classes are 'facing-{up, down, left, right}.'
  // 2. Listen to *keydown* events *on the document* to move the player.
  //    Keycodes for [left, up, right, down] are [37, 38, 39, 40], respectively.
  // 3. Change the player position and orientation based on key presses.

  // You are highly encouraged to implement helper methods. See the class
  // website for more details.

}

Player.prototype.setUp = function(x, y, $newPlayer) {
  curx = x
  cury = y
  $newPlayer.css('top', (y * SWATCH_SIZE) + 'px' )
  $newPlayer.css('left', (x * SWATCH_SIZE) + 'px')
  this.$map.prepend($newPlayer)
}

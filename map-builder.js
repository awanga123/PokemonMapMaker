/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
var DEFAULT_WIDTH = 30
var DEFAULT_HEIGHT = 15
var selectedswatch 

var MapBuilder = function($container, params) {
  this.$elem = $container 
  //console.log(this.$elem)
  if (params) {
    this.w = params.width
    this.h = params.height
  } else {
    this.w = DEFAULT_WIDTH
    this.h = DEFAULT_HEIGHT
  }
}

// TODO: Implement MapBuilder.setupPalette()
MapBuilder.prototype.setupPalette = function() {
  this.$elem.find('.palette > ul > li').each(function(index) {
    if (index == 0) {
      selectedswatch = $(this)
    }
    var cur = $(this)
    cur.click(function() {
      selectedswatch.removeClass('selected')
      cur.addClass('selected')
      selectedswatch = cur
      //console.log('current swatch: ' + selectedswatch.attr('class'))
    })
  })
}

// TODO: Implement MapBuilder.setupMapCanvas
MapBuilder.prototype.setupMapCanvas = function() {
  var $m = this.$elem.find('.map')
  for (var row = 0; row < this.h; row++) {
    var $newDiv = $('<div>')
    $newDiv.addClass('row')
    $m.append($newDiv)
  }

  function onMouseEnter(e) {
    if (e.which == 1) {
      var $this = $(this)
      $this.attr('class', 'tile ' + selectedswatch.attr('class').replace(' selected', ''))
      $this.data('prev',$this.attr('class'))
    } else {
      var $this2 = $(this)
      $this2.attr('class', 'tile ' + selectedswatch.attr('class').replace(' selected', ''))
    }
  }

  function onMouseOut() {
    var $this = $(this)
    var prev = $this.data('prev')
    $this.attr('class', prev)
  }

  function onMouseDown() {
    var $this = $(this)
    $this.attr('class', 'tile ' + selectedswatch.attr('class').replace(' selected', ''))
    $this.data('prev',$this.attr('class'))
  }

  for (var rowi = 0; rowi < this.h; rowi++) {
    for (var col = 0; col < this.w; col++) {
      var $newSwatch = $('<div>')
      $newSwatch.addClass('tile').addClass('swatch').addClass('grass')
      $newSwatch.data('prev','tile swatch grass')
      $newSwatch.mouseenter(onMouseEnter)
      $newSwatch.mouseleave(onMouseOut)
      $newSwatch.mousedown(onMouseDown)
      $m.find('.row').eq(rowi).append($newSwatch)
    }
  }
}
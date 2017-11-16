var logos = document.getElementsByClassName('logo')
var icons = document.getElementsByClassName('icon')
var container = document.getElementById('novelties_container')

  function normalize (arrayOfElements) {
    for (var i = 0; i < arrayOfElements.length; i++) {
      arrayOfElements[i].style.height = arrayOfElements[i].clientWidth + 'px'
    }
  }

  normalize(logos)
  normalize(icons)

  new ResizeSensor(jQuery('.logo'), function () {
    normalize(logos)
  })

  new ResizeSensor(jQuery('.icon'), function () {
    normalize(icons)
  })

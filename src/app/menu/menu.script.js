var menu = document.getElementById('menu')
var isMenuOpened = false

  function openMenu () {
    menu.style.top = '50px'
    menu.style.left = document.body.offsetLeft + 50 + 'px'
    menu.style.width = '250px'
    isMenuOpened = true
  }

  function closeMenu () {
    menu.style.top = '-110%'
    menu.style.width = '0px'
    isMenuOpened = false
  }

  export function menuInOut () {
    if (!isMenuOpened) {
      openMenu()
    }
    else {
      closeMenu()
    }
  }



window.addEventListener('load', function () {
  let isMenuOpened = false
  let menu = document.getElementById('menu')

  function openMenu () {
    menu.style.left = '0px'
    menu.style.visibility = 'visible'
    menu.style.width = '250px'
    isMenuOpened = true
  }

  function closeMenu () {
    menu.style.visibility = 'hidden'
    menu.style.left = -menu.clientWidth + 'px'
    menu.style.width = '0px'
    isMenuOpened = false
  }

  function menuInOut () {
    if (!isMenuOpened) {
      openMenu()
    }
    else {
      closeMenu()
    }
  }

  let menuButton = document.getElementById('menu-button')
  menuButton.addEventListener('click', menuInOut)
})

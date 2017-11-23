var body = document.body,
  html = document.documentElement

var height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight)

window.addEventListener('load', function () {
  document.getElementById('menu-container').style.height = height + 'px'
})

var tracks = []
var audio
var audioPreload
var preloaded = false
var passed = document.getElementById('passed')
var slider = document.getElementById('slider')
var overall = document.getElementById('overall')
passed.style.fontFamily = 'inherit'
overall.style.fontFamily = 'inherit'

slider.addEventListener('click', function (e) {
  audio.currentTime = (e.clientX - slider.getBoundingClientRect().left)
    / (slider.getBoundingClientRect().right - slider.getBoundingClientRect().left)
    * audio.duration
})

function toMinutes (time) {
  if (isNaN(time)) {
    return '0:00'
  }
  var sec = Math.round(time)
  var min = Math.floor(sec / 60)
  if (sec - min * 60 < 10)
    return min + ':0' + (sec - min * 60)
  return min + ':' + (sec - min * 60)
}

export function playTrack (e) {
  e.preventDefault()
  var track = e.target.href
  audio.src = track
  $('#playlist li').removeClass('playing')
  $(e.target).parent().addClass('playing')
  $(audio).on('canplay', function () {
    play()
  })
  preloaded = false
}

export function queueAudio () {
  audioPreload = document.createElement('audio')
  audioPreload.controls = false
  var track = tracks.indexOf(audio.src) + 1
  if (tracks.length > track) {
    audioPreload.src = tracks[track]
  }
  else {
    audioPreload.src = tracks[0]
  }
  audioPreload.id = 'playbar'
}

function newSong () {
  if (preloaded) {
    var parentEl = audio.parentNode
    var newTrack = tracks.indexOf(audioPreload.src)
    $('#playlist li').removeClass('playing')
    $($('#playlist').children()[newTrack]).addClass('playing')
    parentEl.replaceChild(audioPreload, audio)
    audio = audioPreload
    play()
    audio.addEventListener('timeupdate', audioUpdate, false)
    audio.addEventListener('ended', newSong, false)
    preloaded = false
  } else {
    var track = tracks.indexOf(audio.src) + 1
    $('#playlist li').removeClass('playing')
    $($('#playlist').children()[track]).addClass('playing')
    audio.src = tracks[track]
  }
  // var playbar = document.getElementById('playbar')
  // playbar.style.display = 'none'
}

function audioUpdate () {
  var duration = parseInt(audio.duration),
    currentTime = parseInt(audio.currentTime),
    timeLeft = duration - currentTime

  passed.innerHTML = toMinutes(currentTime)
  overall.innerHTML = toMinutes(duration)
  var progress = (audio.currentTime + 1) / duration
  if (timeLeft <= 5 && !preloaded) {
    preloaded = true
    queueAudio()
  }
  TweenMax.set($('.fill'), {
    scaleX: progress
  })
}

export function initTracks () {
  tracks = []
  var trackElements = document.getElementsByClassName('track')
  var i
  for (i = 0; i < trackElements.length; i++) {
    trackElements[i].addEventListener('click', function (e) {
      playTrack(e)
    }, false)
    tracks.push(trackElements[i].href)
  }
  audio = document.getElementById('playbar')
  audio.addEventListener('timeupdate', audioUpdate, false)
  audio.addEventListener('ended', newSong, false)
}

// ------- ON LOAD ---------

//audio.src = tracks[0]
// $(audio).on('canplay', function() {
//   play();
// })


export function isPlayed () {
  if (audio && audio.src && audio.paused) {
    return false
  }
  else if (audio && audio.src && !audio.paused) {
    return true
  }
  else
    return false
}

export function pause () {
  audio.pause()
  $('#playpause').addClass('fa-play').removeClass('fa-pause')
}

export function play () {
  audio.play()
  $('#playpause').removeClass('fa-play').addClass('fa-pause').removeClass('loading')
  var index = tracks.indexOf(audio.src)
  $('#title').text($($('#playlist a')[index]).text())
}

export function playPause () {
  if (audio) {
    if (audio.src) {
      if (audio.src && audio.paused) {
        play()
      } else {
        pause()
      }
    }
    else {
      audio.src = tracks[0]
      $(audio).on('canplay', function () {
        play()
      })
    }
  }
}

$('#playpause').click(playPause)

function next () {
  var track = tracks.indexOf(audio.src)
  if (track == -1) {
    // WAT
  } else if (tracks.length - track === 1) {
    pause()
    $('#playpause').addClass('loading')
    audio.src = tracks[0]
    track = -1
  } else {
    pause()
    $('#playpause').addClass('loading')
    audio.src = tracks[track + 1]
  }
  $('#playlist li').removeClass('playing')
  $($('#playlist').children()[track + 1]).addClass('playing')
  $(audio).on('canplay', function () {
    play()
  })
}

$('#next').click(next)

function back () {
  var track = tracks.indexOf(audio.src)
  if (track == -1) {
    // WAT
  } else if (track <= 0 || audio.currentTime > 2) {
    audio.currentTime = 0
  } else {
    pause()
    $('#playpause').addClass('loading')
    audio.src = tracks[track - 1]
    $('#playlist li').removeClass('playing')
    $($('#playlist').children()[track - 1]).addClass('playing')
    $(audio).on('canplay', function () {
      play()
    })
  }
}

$('#back').click(back)
$('.menu').click(function () {
  $('#player').toggleClass('show')
})



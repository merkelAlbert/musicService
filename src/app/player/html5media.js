!function () {
  function e(e) {
    console.log("$f.fireEvent", [].slice.call(e))
  }

  function t(e) {
    if (!e || "object" != typeof e) return e;
    var n = new e.constructor;
    for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
    return n
  }

  function n(e, t) {
    if (e) {
      var n, r = 0,
        i = e.length;
      if (void 0 === i) {
        for (n in e)
          if (t.call(e[n], n, e[n]) === !1) break
      } else
        for (var o = e[0]; i > r && t.call(o, r, o) !== !1; o = e[++r]) ;
      return e
    }
  }

  function r(e) {
    return document.getElementById(e)
  }

  function i(e, t, r) {
    return "object" != typeof t ? e : (e && t && n(t, function (t, n) {
      r && "function" == typeof n || (e[t] = n)
    }), e)
  }

  function o(e) {
    var t = e.indexOf(".");
    if (-1 != t) {
      var r = e.slice(0, t) || "*",
        i = e.slice(t + 1, e.length),
        o = [];
      return n(document.getElementsByTagName(r), function () {
        this.className && -1 != this.className.indexOf(i) && o.push(this)
      }), o
    }
  }

  function a(e) {
    return e = e || window.event, e.preventDefault ? (e.stopPropagation(), e.preventDefault()) : (e.returnValue = !1, e.cancelBubble = !0), !1
  }

  function l(e, t, n) {
    e[t] = e[t] || [], e[t].push(n)
  }

  function u() {
    return "_" + ("" + Math.random()).slice(2, 10)
  }

  function s(o, s, f) {
    function g() {
      function e(e) {
        var t = S.hasiPadSupport && S.hasiPadSupport();
        return !/iPad|iPhone|iPod/i.test(navigator.userAgent) || /.flv$/i.test(C[0].url) || t ? (S.isLoaded() || S._fireEvent("onBeforeClick") === !1 || S.load(), a(e)) : !0
      }

      function t() {
        "" !== h.replace(/\s/g, "") ? o.addEventListener ? o.addEventListener("click", e, !1) : o.attachEvent && o.attachEvent("onclick", e) : (o.addEventListener && o.addEventListener("click", a, !1), S.load())
      }

      $f(o) ? ($f(o).getParent().innerHTML = "", w = $f(o).getIndex(), p[w] = S) : (p.push(S), w = p.length - 1), E = parseInt(o.style.height, 10) || o.clientHeight, y = o.id || "fp" + u(), m = s.id || y + "_api", s.id = m, f.playerId = y, "string" == typeof f && (f = {clip: {url: f}}), "string" == typeof f.clip && (f.clip = {url: f.clip}), f.clip = f.clip || {}, o.getAttribute("href", 2) && !f.clip.url && (f.clip.url = o.getAttribute("href", 2)), v = new c(f.clip, -1, S), f.playlist = f.playlist || [f.clip];
      var r = 0;
      n(f.playlist, function () {
        var e = this;
        "object" == typeof e && e.length && (e = {url: "" + e}), n(f.clip, function (t, n) {
          void 0 !== n && void 0 === e[t] && "function" != typeof n && (e[t] = n)
        }), f.playlist[r] = e, e = new c(e, r, S), C.push(e), r++
      }), n(f, function (e, t) {
        "function" == typeof t && (v[e] ? v[e](t) : l(x, e, t), delete f[e])
      }), n(f.plugins, function (e, t) {
        t && (P[e] = new d(e, t, S))
      }), f.plugins && void 0 !== f.plugins.controls || (P.controls = new d("controls", null, S)), P.canvas = new d("canvas", null, S), h = o.innerHTML, setTimeout(t, 0)
    }

    var h, v, y, m, w, b, _, E, S = this,
      L = null,
      k = !1,
      C = [],
      P = {},
      x = {};
    if (i(S, {
        id: function () {
          return y
        }, isLoaded: function () {
          return null !== L && void 0 !== L.fp_play && !k
        }, getParent: function () {
          return o
        }, hide: function (e) {
          return e && (o.style.height = "0px"), S.isLoaded() && (L.style.height = "0px"), S
        }, show: function () {
          return o.style.height = E + "px", S.isLoaded() && (L.style.height = _ + "px"), S
        }, isHidden: function () {
          return S.isLoaded() && 0 === parseInt(L.style.height, 10)
        }, load: function (e) {
          if (!S.isLoaded() && S._fireEvent("onBeforeLoad") !== !1) {
            var t = function () {
                h = o.innerHTML, h && !flashembed.isSupported(s.version) && (o.innerHTML = ""), e && (e.cached = !0, l(x, "onLoad", e)), flashembed(o, s, {config: f})
              },
              r = 0;
            n(p, function () {
              this.unload(function (e) {
                ++r == p.length && t()
              })
            })
          }
          return S
        }, unload: function (e) {
          if (this.isFullscreen() && /WebKit/i.test(navigator.userAgent)) return e && e(!1), S;
          if ("" !== h.replace(/\s/g, "")) {
            if (S._fireEvent("onBeforeUnload") === !1) return e && e(!1), S;
            k = !0;
            try {
              L && (L.fp_close(), S._fireEvent("onUnload"))
            } catch (t) {
            }
            var n = function () {
              L = null, o.innerHTML = h, k = !1, e && e(!0)
            };
            setTimeout(n, 50)
          } else e && e(!1);
          return S
        }, getClip: function (e) {
          return void 0 === e && (e = b), C[e]
        }, getCommonClip: function () {
          return v
        }, getPlaylist: function () {
          return C
        }, getPlugin: function (e) {
          var t = P[e];
          if (!t && S.isLoaded()) {
            var n = S._api().fp_getPlugin(e);
            n && (t = new d(e, n, S), P[e] = t)
          }
          return t
        }, getScreen: function () {
          return S.getPlugin("screen")
        }, getControls: function () {
          return S.getPlugin("controls")._fireEvent("onUpdate")
        }, getLogo: function () {
          try {
            return S.getPlugin("logo")._fireEvent("onUpdate")
          } catch (e) {
          }
        }, getPlay: function () {
          return S.getPlugin("play")._fireEvent("onUpdate")
        }, getConfig: function (e) {
          return e ? t(f) : f
        }, getFlashParams: function () {
          return s
        }, loadPlugin: function (e, t, n, r) {
          "function" == typeof n && (r = n, n = {});
          var i = r ? u() : "_";
          S._api().fp_loadPlugin(e, t, n, i);
          var o = {};
          o[i] = r;
          var a = new d(e, null, S, o);
          return P[e] = a, a
        }, getState: function () {
          return S.isLoaded() ? L.fp_getState() : -1
        }, play: function (e, t) {
          var n = function () {
            void 0 !== e ? S._api().fp_play(e, t) : S._api().fp_play()
          };
          return S.isLoaded() ? n() : k ? setTimeout(function () {
            S.play(e, t)
          }, 50) : S.load(function () {
            n()
          }), S
        }, getVersion: function () {
          var e = "flowplayer.js 3.2.6";
          if (S.isLoaded()) {
            var t = L.fp_getVersion();
            return t.push(e), t
          }
          return e
        }, _api: function () {
          if (!S.isLoaded()) throw "Flowplayer " + S.id() + " not loaded when calling an API method";
          return L
        }, setClip: function (e) {
          return S.setPlaylist([e]), S
        }, getIndex: function () {
          return w
        }, _swfHeight: function () {
          return L.clientHeight
        }
      }), n("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut".split(","), function () {
        var e = "on" + this;
        if (-1 != e.indexOf("*")) {
          e = e.slice(0, e.length - 1);
          var t = "onBefore" + e.slice(2);
          S[t] = function (e) {
            return l(x, t, e), S
          }
        }
        S[e] = function (t) {
          return l(x, e, t), S
        }
      }), n("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled".split(","), function () {
        var e = this;
        S[e] = function (t, n) {
          if (!S.isLoaded()) return S;
          var r = null;
          return r = void 0 !== t && void 0 !== n ? L["fp_" + e](t, n) : void 0 === t ? L["fp_" + e]() : L["fp_" + e](t), "undefined" === r || void 0 === r ? S : r
        }
      }), S._fireEvent = function (t) {
        "string" == typeof t && (t = [t]);
        var i = t[0],
          o = t[1],
          a = t[2],
          l = t[3],
          u = 0;
        if (f.debug && e(t), S.isLoaded() || "onLoad" != i || "player" != o || (L = L || r(m), _ = S._swfHeight(), n(C, function () {
            this._fireEvent("onLoad")
          }), n(P, function (e, t) {
            t._fireEvent("onUpdate")
          }), v._fireEvent("onLoad")), "onLoad" != i || "player" == o) {
          if ("onError" == i && ("string" == typeof o || "number" == typeof o && "number" == typeof a) && (o = a, a = l), "onContextMenu" == i) return void n(f.contextMenu[o], function (e, t) {
            t.call(S)
          });
          if ("onPluginEvent" != i && "onBeforePluginEvent" != i) {
            if ("onPlaylistReplace" == i) {
              C = [];
              var s = 0;
              n(o, function () {
                C.push(new c(this, s++, S))
              })
            }
            if ("onClipAdd" == i) {
              if (o.isInStream) return;
              for (o = new c(o, a, S), C.splice(a, 0, o), u = a + 1; u < C.length; u++) C[u].index++
            }
            var d = !0;
            if ("number" == typeof o && o < C.length) {
              b = o;
              var p = C[o];
              p && (d = p._fireEvent(i, a, l)), p && d === !1 || (d = v._fireEvent(i, a, l, p))
            }
            return n(x[i], function () {
              return d = this.call(S, o, a), this.cached && x[i].splice(u, 1), d === !1 ? !1 : void u++
            }), d
          }
          var g = o.name || o,
            h = P[g];
          if (h) return h._fireEvent("onUpdate", o), h._fireEvent(a, t.slice(3))
        }
      }, "string" == typeof o) {
      var T = r(o);
      if (!T) throw "Flowplayer cannot access element: " + o;
      o = T, g()
    } else g()
  }

  function f(e) {
    this.length = e.length, this.each = function (t) {
      n(e, t)
    }, this.size = function () {
      return e.length
    }
  }

  var c = function (e, t, r) {
      var o = this,
        a = {},
        s = {};
      if (o.index = t, "string" == typeof e && (e = {url: e}), i(this, e, !0), n("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop".split(","), function () {
          var e = "on" + this;
          if (-1 != e.indexOf("*")) {
            e = e.slice(0, e.length - 1);
            var n = "onBefore" + e.slice(2);
            o[n] = function (e) {
              return l(s, n, e), o
            }
          }
          o[e] = function (t) {
            return l(s, e, t), o
          }, -1 == t && (o[n] && (r[n] = o[n]), o[e] && (r[e] = o[e]))
        }), i(this, {
          onCuepoint: function (e, n) {
            if (1 == arguments.length) return a.embedded = [null, e], o;
            "number" == typeof e && (e = [e]);
            var i = u();
            return a[i] = [e, n], r.isLoaded() && r._api().fp_addCuepoints(e, t, i), o
          }, update: function (e) {
            i(o, e), r.isLoaded() && r._api().fp_updateClip(e, t);
            var n = r.getConfig(),
              a = -1 == t ? n.clip : n.playlist[t];
            i(a, e, !0)
          }, _fireEvent: function (e, l, u, f) {
            if ("onLoad" == e) return n(a, function (e, n) {
              n[0] && r._api().fp_addCuepoints(n[0], t, e)
            }), !1;
            if (f = f || o, "onCuepoint" == e) {
              var c = a[l];
              if (c) return c[1].call(r, f, u)
            }
            l && -1 != "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(e) && (i(f, l), l.metaData && (f.duration ? f.fullDuration = l.metaData.duration : f.duration = l.metaData.duration));
            var d = !0;
            return n(s[e], function () {
              d = this.call(r, f, l, u)
            }), d
          }
        }), e.onCuepoint) {
        var f = e.onCuepoint;
        o.onCuepoint.apply(o, "function" == typeof f ? [f] : f), delete e.onCuepoint
      }
      n(e, function (t, n) {
        "function" == typeof n && (l(s, t, n), delete e[t])
      }), -1 == t && (r.onCuepoint = this.onCuepoint)
    },
    d = function (e, t, r, o) {
      var a = this,
        l = {},
        s = !1;
      o && i(l, o), n(t, function (e, n) {
        "function" == typeof n && (l[e] = n, delete t[e])
      }), i(this, {
        animate: function (n, i, o) {
          if (!n) return a;
          if ("function" == typeof i && (o = i, i = 500), "string" == typeof n) {
            var s = n;
            n = {}, n[s] = i, i = 500
          }
          if (o) {
            var f = u();
            l[f] = o
          }
          return void 0 === i && (i = 500), t = r._api().fp_animate(e, n, i, f), a
        }, css: function (n, o) {
          if (void 0 !== o) {
            var l = {};
            l[n] = o, n = l
          }
          return t = r._api().fp_css(e, n), i(a, t), a
        }, show: function () {
          return this.display = "block", r._api().fp_showPlugin(e), a
        }, hide: function () {
          return this.display = "none", r._api().fp_hidePlugin(e), a
        }, toggle: function () {
          return this.display = r._api().fp_togglePlugin(e), a
        }, fadeTo: function (t, n, i) {
          if ("function" == typeof n && (i = n, n = 500), i) {
            var o = u();
            l[o] = i
          }
          return this.display = r._api().fp_fadeTo(e, t, n, o), this.opacity = t, a
        }, fadeIn: function (e, t) {
          return a.fadeTo(1, e, t)
        }, fadeOut: function (e, t) {
          return a.fadeTo(0, e, t)
        }, getName: function () {
          return e
        }, getPlayer: function () {
          return r
        }, _fireEvent: function (t, o, u) {
          if ("onUpdate" == t) {
            var f = r._api().fp_getPlugin(e);
            if (!f) return;
            i(a, f), delete a.methods, s || (n(f.methods, function () {
              var t = "" + this;
              a[t] = function () {
                var n = [].slice.call(arguments),
                  i = r._api().fp_invoke(e, t, n);
                return "undefined" === i || void 0 === i ? a : i
              }
            }), s = !0)
          }
          var c = l[t];
          if (c) {
            var d = c.apply(a, o);
            return "_" == t.slice(0, 1) && delete l[t], d
          }
          return a
        }
      })
    },
    p = [];
  window.flowplayer = window.$f = function () {
    var e = null,
      a = arguments[0];
    if (!arguments.length) return n(p, function () {
      return this.isLoaded() ? (e = this, !1) : void 0
    }), e || p[0];
    if (1 == arguments.length) return "number" == typeof a ? p[a] : "*" == a ? new f(p) : (n(p, function () {
      return this.id() == a.id || this.id() == a || this.getParent() == a ? (e = this, !1) : void 0
    }), e);
    if (arguments.length > 1) {
      var l = arguments[1],
        u = 3 == arguments.length ? arguments[2] : {};
      if ("string" == typeof l && (l = {src: l}), l = i({
          bgcolor: "#000000",
          version: [9, 0],
          expressInstall: "http://static.flowplayer.org/swf/expressinstall.swf",
          cachebusting: !1
        }, l), "string" == typeof a) {
        if (-1 != a.indexOf(".")) {
          var c = [];
          return n(o(a), function () {
            c.push(new s(this, t(l), t(u)))
          }), new f(c)
        }
        var d = r(a);
        return new s(null !== d ? d : a, l, u)
      }
      if (a) return new s(a, l, u)
    }
    return null
  }, i(window.$f, {
    fireEvent: function () {
      var e = [].slice.call(arguments),
        t = $f(e[0]);
      return t ? t._fireEvent(e.slice(1)) : null
    }, addPlugin: function (e, t) {
      return s.prototype[e] = t, $f
    }, each: n, extend: i
  }), "function" == typeof jQuery && (jQuery.fn.flowplayer = function (e, n) {
    if (!arguments.length || "number" == typeof arguments[0]) {
      var r = [];
      return this.each(function () {
        var e = $f(this);
        e && r.push(e)
      }), arguments.length ? r[arguments[0]] : new f(r)
    }
    return this.each(function () {
      $f(this, t(e), n ? t(n) : {})
    })
  })
}(),
  function () {
    function e() {
      if (s.done) return !1;
      var e = document;
      if (e && e.getElementsByTagName && e.getElementById && e.body) {
        clearInterval(s.timer), s.timer = null;
        for (var t = 0; t < s.ready.length; t++) s.ready[t].call();
        s.ready = null, s.done = !0
      }
    }

    function t(e, t) {
      if (t)
        for (key in t) t.hasOwnProperty(key) && (e[key] = t[key]);
      return e
    }

    function n(e) {
      switch (r(e)) {
        case "string":
          return e = e.replace(new RegExp('(["\\\\])', "g"), "\\$1"), e = e.replace(/^\s?(\d+)%/, "$1pct"), '"' + e + '"';
        case "array":
          return "[" + i(e, function (e) {
            return n(e)
          }).join(",") + "]";
        case "function":
          return '"function()"';
        case "object":
          var t = [];
          for (var o in e) e.hasOwnProperty(o) && t.push('"' + o + '":' + n(e[o]));
          return "{" + t.join(",") + "}"
      }
      return String(e).replace(/\s/g, " ").replace(/\'/g, '"')
    }

    function r(e) {
      if (null === e || void 0 === e) return !1;
      var t = typeof e;
      return "object" == t && e.push ? "array" : t
    }

    function i(e, t) {
      var n = [];
      for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r]));
      return n
    }

    function o(e, r) {
      var i = t({}, e),
        o = document.all,
        a = '<object width="' + i.width + '" height="' + i.height + '"';
      o && !i.id && (i.id = "_" + ("" + Math.random()).substring(9)), i.id && (a += ' id="' + i.id + '"'), i.cachebusting && (i.src += (-1 != i.src.indexOf("?") ? "&" : "?") + Math.random()), a += i.w3c || !o ? ' data="' + i.src + '" type="application/x-shockwave-flash"' : ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', a += ">", (i.w3c || o) && (a += '<param name="movie" value="' + i.src + '" />'), i.width = i.height = i.id = i.w3c = i.src = null;
      for (var l in i) null !== i[l] && (a += '<param name="' + l + '" value="' + i[l] + '" />');
      var u = "";
      if (r) {
        for (var s in r) null !== r[s] && (u += s + "=" + ("object" == typeof r[s] ? n(r[s]) : r[s]) + "&");
        u = u.substring(0, u.length - 1), a += '<param name="flashvars" value=\'' + u + "' />"
      }
      return a += "</object>"
    }

    function a(e, n, r) {
      var i = flashembed.getVersion();
      t(this, {
        getContainer: function () {
          return e
        }, getConf: function () {
          return n
        }, getVersion: function () {
          return i
        }, getFlashvars: function () {
          return r
        }, getApi: function () {
          return e.firstChild
        }, getHTML: function () {
          return o(n, r)
        }
      });
      var a = n.version,
        l = n.expressInstall,
        u = !a || flashembed.isSupported(a);
      if (u ? (n.onFail = n.version = n.expressInstall = null, e.innerHTML = o(n, r)) : a && l && flashembed.isSupported([6, 65]) ? (t(n, {src: l}), r = {
          MMredirectURL: location.href,
          MMplayerType: "PlugIn",
          MMdoctitle: document.title
        }, e.innerHTML = o(n, r)) : "" !== e.innerHTML.replace(/\s/g, "") || (e.innerHTML = "<h2>Flash version " + a + " or greater is required</h2><h3>" + (i[0] > 0 ? "Your version is " + i : "You have no flash plugin installed") + "</h3>" + ("A" == e.tagName ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>"), "A" == e.tagName && (e.onclick = function () {
          location.href = "http://www.adobe.com/go/getflashplayer"
        })), !u && n.onFail) {
        var s = n.onFail.call(this);
        "string" == typeof s && (e.innerHTML = s)
      }
      document.all && (window[n.id] = document.getElementById(n.id))
    }

    var l = "function" == typeof jQuery,
      u = {
        width: "100%",
        height: "100%",
        allowfullscreen: !0,
        allowscriptaccess: "always",
        quality: "high",
        version: null,
        onFail: null,
        expressInstall: null,
        w3c: !1,
        cachebusting: !1
      };
    l && (jQuery.tools = jQuery.tools || {}, jQuery.tools.flashembed = {version: "1.0.4", conf: u});
    var s = l ? jQuery : function (t) {
      return s.done ? t() : void(s.timer ? s.ready.push(t) : (s.ready = [t], s.timer = setInterval(e, 13)))
    };
    window.attachEvent && window.attachEvent("onbeforeunload", function () {
      __flash_unloadHandler = function () {
      }, __flash_savedUnloadHandler = function () {
      }
    }), window.flashembed = function (e, n, r) {
      if ("string" == typeof e) {
        var i = document.getElementById(e);
        if (!i) return void s(function () {
          flashembed(e, n, r)
        });
        e = i
      }
      if (e) {
        "string" == typeof n && (n = {src: n});
        var o = t({}, u);
        return t(o, n), new a(e, o, r)
      }
    }, t(window.flashembed, {
      getVersion: function () {
        var e = [0, 0];
        if (navigator.plugins && "object" == typeof navigator.plugins["Shockwave Flash"]) {
          var t = navigator.plugins["Shockwave Flash"].description;
          if ("undefined" != typeof t) {
            t = t.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
            var n = parseInt(t.replace(/^(.*)\..*$/, "$1"), 10),
              r = /r/.test(t) ? parseInt(t.replace(/^.*r(.*)$/, "$1"), 10) : 0;
            e = [n, r]
          }
        } else if (window.ActiveXObject) {
          try {
            var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
          } catch (o) {
            try {
              i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), e = [6, 0], i.AllowScriptAccess = "always"
            } catch (a) {
              if (6 == e[0]) return e
            }
            try {
              i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (l) {
            }
          }
          "object" == typeof i && (t = i.GetVariable("$version"), "undefined" != typeof t && (t = t.replace(/^\S+\s+(.*)$/, "$1").split(","), e = [parseInt(t[0], 10), parseInt(t[2], 10)]))
        }
        return e
      }, isSupported: function (e) {
        var t = flashembed.getVersion(),
          n = t[0] > e[0] || t[0] == e[0] && t[1] >= e[1];
        return n
      }, domReady: s, asString: n, getHTML: o
    }), l && (jQuery.fn.flashembed = function (e, t) {
      var n = null;
      return this.each(function () {
        n = flashembed(this, e, t)
      }), e.api === !1 ? this : n
    })
  }(),
  function () {
    function e() {
      if (!l && (l = !0, u)) {
        for (var e = 0; e < u.length; e++) u[e].call(window, []);
        u = []
      }
    }

    function t(e) {
      var t = window.onload;
      "function" != typeof window.onload ? window.onload = e : window.onload = function () {
        t && t(), e()
      }
    }

    function n() {
      if (!a) {
        if (a = !0, document.addEventListener && !o.opera && document.addEventListener("DOMContentLoaded", e, !1), o.msie && window == top && function () {
            if (!l) {
              try {
                document.documentElement.doScroll("left")
              } catch (t) {
                return void setTimeout(arguments.callee, 0)
              }
              e()
            }
          }(), o.opera && document.addEventListener("DOMContentLoaded", function () {
            if (!l) {
              for (var t = 0; t < document.styleSheets.length; t++)
                if (document.styleSheets[t].disabled) return void setTimeout(arguments.callee, 0);
              e()
            }
          }, !1), o.safari) {
          var n;
          !function () {
            if (!l) {
              if ("loaded" != document.readyState && "complete" != document.readyState) return void setTimeout(arguments.callee, 0);
              if (void 0 === n) {
                for (var t = document.getElementsByTagName("link"), r = 0; r < t.length; r++) "stylesheet" == t[r].getAttribute("rel") && n++;
                var i = document.getElementsByTagName("style");
                n += i.length
              }
              return document.styleSheets.length != n ? void setTimeout(arguments.callee, 0) : void e()
            }
          }()
        }
        t(e)
      }
    }

    var r = window.DomReady = {},
      i = navigator.userAgent.toLowerCase(),
      o = {
        version: (i.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(i),
        opera: /opera/.test(i),
        msie: /msie/.test(i) && !/opera/.test(i),
        mozilla: /mozilla/.test(i) && !/(compatible|webkit)/.test(i)
      },
      a = !1,
      l = !1,
      u = [];
    r.ready = function (e, t) {
      n(), l ? e.call(window, []) : u.push(function () {
        return e.call(window, [])
      })
    }, n()
  }(),
  function (e, t, n) {
    "use strict";

    function r(e, t) {
      return e.canPlayType(t) || v && t.search("mp4") > -1
    }

    function i(e) {
      for (var n = t.getElementsByTagName(e), i = [], a = 0; a < n.length; a++) i.push(n[a]);
      for (a = 0; a < i.length; a++) {
        var u = i[a],
          s = !0;
        if (u.canPlayType)
          if (u.src) r(u, l(e, u.src)) && (s = !1);
          else
            for (var f = u.getElementsByTagName("source"), c = 0; c < f.length; c++) {
              var d = f[c];
              if (r(u, l(e, d.src, d.type))) {
                s = !1;
                break
              }
            }
        s || o.forceFallback(e, u) ? o.createFallback(e, u) : v && u.addEventListener("click", function () {
          this.play()
        }, !1)
      }
    }

    function o() {
      i("video"), i("audio")
    }

    function a(e) {
      return e.split("/").slice(0, -1).join("/") + "/"
    }

    function l(e, t, n) {
      if (n) return n;
      var r = /\.([a-z1-9]+)(\?|#|\s|$)/i.exec(t);
      if (r) {
        var i = x[e][r[1]];
        if (i) return i
      }
      return C[e]
    }

    function u(e, t) {
      var n = e.getAttribute(t);
      return !!n || "string" == typeof n
    }

    function s(e) {
      var n = t.createElement("a");
      return n.href = e, n.href
    }

    function f(n, r, i) {
      var o = n.getAttribute(r);
      if (o) return o + "px";
      var a;
      if (n.currentStyle) a = n.currentStyle[r];
      else {
        if (!e.getComputedStyle) return i;
        a = t.defaultView.getComputedStyle(n, null).getPropertyValue(r)
      }
      return "auto" == a ? i : a
    }

    function c(e) {
      return e.match(/\s*([\w-]+\/[\w-]+)(;|\s|$)/)[1]
    }

    function d(e, t) {
      return c(e) == c(t)
    }

    var p = "video",
      g = "audio",
      h = e.navigator.userAgent.toLowerCase();
    t.createElement(p).canPlayType || (t.createElement(g), t.createElement("source"));
    var v = null !== h.match(/android 2\.[12]/) || null !== h.match(/android 6/),
      y = null !== h.match(/opera/);
    o.forceFallback = function (e, t) {
      return !1
    };
    var m = function () {
      for (var e = t.getElementsByTagName("script"), n = 0; n < e.length; n++) {
        var r = e[n];
        if (r.src.match(/html5media(\.min|)\.js/)) return a(r.src)
      }
      return ""
    }();
    o.flowplayerSwf = m + "flowplayer.swf", o.flowplayerAudioSwf = m + "flowplayer.audio.swf", o.flowplayerControlsSwf = m + "flowplayer.controls.swf", o.expressInstallSwf = m + "expressInstall.swf", o.videoFallbackClass = "html5media-video-fallback", o.audioFallbackClass = "html5media-audio-fallback";
    var w = 'video/ogg; codecs="theora, vorbis"',
      b = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      _ = 'audio/ogg; codecs="vorbis"',
      E = "video/webm;",
      S = "audio/x-m4a;",
      L = "audio/mpeg;",
      k = 'audio/wav; codecs="1"',
      C = {video: b, audio: L},
      P = [b, S, L],
      x = {
        video: {
          ogg: w,
          ogv: w,
          avi: b,
          mp4: b,
          mkv: b,
          h264: b,
          264: b,
          avc: b,
          m4v: b,
          "3gp": b,
          "3gpp": b,
          "3g2": b,
          mpg: b,
          mpeg: b,
          webm: E
        }, audio: {ogg: _, oga: _, aac: S, m4a: S, mp3: L, wav: k}
      };
    o.configureFlowplayer = function (e, t) {
      return t
    }, o.createFallback = function (e, n) {
      var r = u(n, "controls"),
        i = n.getAttribute("poster") || "",
        a = n.getAttribute("src") || "";
      if (!a)
        for (var c = n.getElementsByTagName("source"), g = 0; g < c.length; g++) {
          var h = c[g],
            v = h.getAttribute("src");
          if (v)
            for (var m = 0; m < P.length; m++) {
              var w = P[m];
              if (d(w, l(e, v, h.getAttribute("type")))) {
                a = v;
                break
              }
            }
          if (a) break
        }
      if (a) {
        var b = t.createElement("span");
        b.id = n.id, b.style.cssText = n.style.cssText, b.className = n.className, b.title = n.title, n.style.display || (b.style.display = "block"), b.style.width = f(n, "width", "300px"), "audio" == e ? (b.style.height = f(n, "height", "26px"), b.className = (b.className ? b.className + " " : "") + o.audioFallbackClass) : (b.style.height = f(n, "height", "200px"), b.className = (b.className ? b.className + " " : "") + o.videoFallbackClass), n.parentNode.replaceChild(b, n);
        var _ = (n.getAttribute("preload") || "").toLowerCase(),
          E = [];
        i && E.push({url: s(i)}), a && E.push({
          url: s(a),
          autoPlay: u(n, "autoplay"),
          autoBuffering: u(n, "autobuffer") || u(n, "preload") && ("" === _ || "auto" == _),
          onBeforeFinish: function () {
            return !u(n, "loop")
          }
        });
        var S = {
          controls: r && {
            url: s(o.flowplayerControlsSwf),
            opacity: .8,
            backgroundColor: "#181818",
            backgroundGradient: "none",
            fullscreen: e == p,
            autoHide: e == p && {fullscreenOnly: !1, enabled: !0, hideStyle: "fade", mouseOutDelay: 0} || {enabled: !1}
          } || null
        };
        y && S.controls && (S.controls.autoHide.enabled = !1), "audio" == e && (S.audio = {url: s(o.flowplayerAudioSwf)}, r || (S.controls = {
          url: s(o.flowplayerControlsSwf),
          display: "none"
        }, b.style.height = 0), E[E.length - 1].autoBuffering = !1);
        var L = {
          play: null,
          playlist: E,
          clip: {scaling: "fit", fadeInSpeed: 0, fadeOutSpeed: 0},
          canvas: {backgroundGradient: "none", backgroundColor: "#000000"},
          plugins: S
        };
        L = o.configureFlowplayer(n, L), flowplayer(b, {
          src: s(o.flowplayerSwf),
          expressInstall: s(o.expressInstallSwf),
          wmode: "opaque"
        }, L)
      }
    }, DomReady.ready(o), e.html5media = o
  }(this, document);

/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      97: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, s = arguments.length; i < s; i++)
                    for (var n in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              thumbnail: !0,
              animateThumb: !0,
              currentPagerPosition: "middle",
              alignThumbnails: "middle",
              thumbWidth: 100,
              thumbHeight: "80px",
              thumbMargin: 5,
              appendThumbnailsTo: ".lg-components",
              toggleThumb: !1,
              enableThumbDrag: !0,
              enableThumbSwipe: !0,
              thumbnailSwipeThreshold: 10,
              loadYouTubeThumbnail: !0,
              youTubeThumbSize: 1,
            },
            i = "lgContainerResize",
            s = "lgUpdateSlides",
            n = "lgBeforeOpen",
            o = "lgBeforeSlide";
          return (function () {
            function r(e, t) {
              return (
                (this.thumbOuterWidth = 0),
                (this.thumbTotalWidth = 0),
                (this.translateX = 0),
                (this.thumbClickable = !1),
                (this.core = e),
                (this.$LG = t),
                this
              );
            }
            return (
              (r.prototype.init = function () {
                (this.settings = e(e({}, t), this.core.settings)),
                  (this.thumbOuterWidth = 0),
                  (this.thumbTotalWidth =
                    this.core.galleryItems.length *
                    (this.settings.thumbWidth + this.settings.thumbMargin)),
                  (this.translateX = 0),
                  this.setAnimateThumbStyles(),
                  this.core.settings.allowMediaOverlap ||
                    (this.settings.toggleThumb = !1),
                  this.settings.thumbnail &&
                    (this.build(),
                    this.settings.animateThumb
                      ? (this.settings.enableThumbDrag &&
                          this.enableThumbDrag(),
                        this.settings.enableThumbSwipe &&
                          this.enableThumbSwipe(),
                        (this.thumbClickable = !1))
                      : (this.thumbClickable = !0),
                    this.toggleThumbBar(),
                    this.thumbKeyPress());
              }),
              (r.prototype.build = function () {
                var e = this;
                this.setThumbMarkup(),
                  this.manageActiveClassOnSlideChange(),
                  this.$lgThumb
                    .first()
                    .on("click.lg touchend.lg", function (t) {
                      var i = e.$LG(t.target);
                      i.hasAttribute("data-lg-item-id") &&
                        setTimeout(function () {
                          if (e.thumbClickable && !e.core.lgBusy) {
                            var t = parseInt(i.attr("data-lg-item-id"));
                            e.core.slide(t, !1, !0, !1);
                          }
                        }, 50);
                    }),
                  this.core.LGel.on(o + ".thumb", function (t) {
                    var i = t.detail.index;
                    e.animateThumb(i);
                  }),
                  this.core.LGel.on(n + ".thumb", function () {
                    e.thumbOuterWidth = e.core.outer.get().offsetWidth;
                  }),
                  this.core.LGel.on(s + ".thumb", function () {
                    e.rebuildThumbnails();
                  }),
                  this.core.LGel.on(i + ".thumb", function () {
                    e.core.lgOpened &&
                      setTimeout(function () {
                        (e.thumbOuterWidth = e.core.outer.get().offsetWidth),
                          e.animateThumb(e.core.index),
                          (e.thumbOuterWidth = e.core.outer.get().offsetWidth);
                      }, 50);
                  });
              }),
              (r.prototype.setThumbMarkup = function () {
                var e = "lg-thumb-outer ";
                this.settings.alignThumbnails &&
                  (e += "lg-thumb-align-" + this.settings.alignThumbnails);
                var t =
                  '<div class="' +
                  e +
                  '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
                this.core.outer.addClass("lg-has-thumb"),
                  ".lg-components" === this.settings.appendThumbnailsTo
                    ? this.core.$lgComponents.append(t)
                    : this.core.outer.append(t),
                  (this.$thumbOuter = this.core.outer
                    .find(".lg-thumb-outer")
                    .first()),
                  (this.$lgThumb = this.core.outer.find(".lg-thumb").first()),
                  this.settings.animateThumb &&
                    this.core.outer
                      .find(".lg-thumb")
                      .css(
                        "transition-duration",
                        this.core.settings.speed + "ms"
                      )
                      .css("width", this.thumbTotalWidth + "px")
                      .css("position", "relative"),
                  this.setThumbItemHtml(this.core.galleryItems);
              }),
              (r.prototype.enableThumbDrag = function () {
                var e = this,
                  t = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  },
                  i = !1;
                this.$thumbOuter.addClass("lg-grab"),
                  this.core.outer
                    .find(".lg-thumb")
                    .first()
                    .on("mousedown.lg.thumb", function (s) {
                      e.thumbTotalWidth > e.thumbOuterWidth &&
                        (s.preventDefault(),
                        (t.cords.startX = s.pageX),
                        (t.startTime = new Date()),
                        (e.thumbClickable = !1),
                        (i = !0),
                        (e.core.outer.get().scrollLeft += 1),
                        (e.core.outer.get().scrollLeft -= 1),
                        e.$thumbOuter
                          .removeClass("lg-grab")
                          .addClass("lg-grabbing"));
                    }),
                  this.$LG(window).on(
                    "mousemove.lg.thumb.global" + this.core.lgId,
                    function (s) {
                      e.core.lgOpened &&
                        i &&
                        ((t.cords.endX = s.pageX), (t = e.onThumbTouchMove(t)));
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.thumb.global" + this.core.lgId,
                    function () {
                      e.core.lgOpened &&
                        (t.isMoved
                          ? (t = e.onThumbTouchEnd(t))
                          : (e.thumbClickable = !0),
                        i &&
                          ((i = !1),
                          e.$thumbOuter
                            .removeClass("lg-grabbing")
                            .addClass("lg-grab")));
                    }
                  );
              }),
              (r.prototype.enableThumbSwipe = function () {
                var e = this,
                  t = {
                    cords: { startX: 0, endX: 0 },
                    isMoved: !1,
                    newTranslateX: 0,
                    startTime: new Date(),
                    endTime: new Date(),
                    touchMoveTime: 0,
                  };
                this.$lgThumb.on("touchstart.lg", function (i) {
                  e.thumbTotalWidth > e.thumbOuterWidth &&
                    (i.preventDefault(),
                    (t.cords.startX = i.targetTouches[0].pageX),
                    (e.thumbClickable = !1),
                    (t.startTime = new Date()));
                }),
                  this.$lgThumb.on("touchmove.lg", function (i) {
                    e.thumbTotalWidth > e.thumbOuterWidth &&
                      (i.preventDefault(),
                      (t.cords.endX = i.targetTouches[0].pageX),
                      (t = e.onThumbTouchMove(t)));
                  }),
                  this.$lgThumb.on("touchend.lg", function () {
                    t.isMoved
                      ? (t = e.onThumbTouchEnd(t))
                      : (e.thumbClickable = !0);
                  });
              }),
              (r.prototype.rebuildThumbnails = function () {
                var e = this;
                this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),
                  setTimeout(function () {
                    (e.thumbTotalWidth =
                      e.core.galleryItems.length *
                      (e.settings.thumbWidth + e.settings.thumbMargin)),
                      e.$lgThumb.css("width", e.thumbTotalWidth + "px"),
                      e.$lgThumb.empty(),
                      e.setThumbItemHtml(e.core.galleryItems),
                      e.animateThumb(e.core.index);
                  }, 50),
                  setTimeout(function () {
                    e.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                  }, 200);
              }),
              (r.prototype.setTranslate = function (e) {
                this.$lgThumb.css(
                  "transform",
                  "translate3d(-" + e + "px, 0px, 0px)"
                );
              }),
              (r.prototype.getPossibleTransformX = function (e) {
                return (
                  e > this.thumbTotalWidth - this.thumbOuterWidth &&
                    (e = this.thumbTotalWidth - this.thumbOuterWidth),
                  e < 0 && (e = 0),
                  e
                );
              }),
              (r.prototype.animateThumb = function (e) {
                if (
                  (this.$lgThumb.css(
                    "transition-duration",
                    this.core.settings.speed + "ms"
                  ),
                  this.settings.animateThumb)
                ) {
                  var t = 0;
                  switch (this.settings.currentPagerPosition) {
                    case "left":
                      t = 0;
                      break;
                    case "middle":
                      t =
                        this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                      break;
                    case "right":
                      t = this.thumbOuterWidth - this.settings.thumbWidth;
                  }
                  (this.translateX =
                    (this.settings.thumbWidth + this.settings.thumbMargin) * e -
                    1 -
                    t),
                    this.translateX >
                      this.thumbTotalWidth - this.thumbOuterWidth &&
                      (this.translateX =
                        this.thumbTotalWidth - this.thumbOuterWidth),
                    this.translateX < 0 && (this.translateX = 0),
                    this.setTranslate(this.translateX);
                }
              }),
              (r.prototype.onThumbTouchMove = function (e) {
                return (
                  (e.newTranslateX = this.translateX),
                  (e.isMoved = !0),
                  (e.touchMoveTime = new Date().valueOf()),
                  (e.newTranslateX -= e.cords.endX - e.cords.startX),
                  (e.newTranslateX = this.getPossibleTransformX(
                    e.newTranslateX
                  )),
                  this.setTranslate(e.newTranslateX),
                  this.$thumbOuter.addClass("lg-dragging"),
                  e
                );
              }),
              (r.prototype.onThumbTouchEnd = function (e) {
                (e.isMoved = !1),
                  (e.endTime = new Date()),
                  this.$thumbOuter.removeClass("lg-dragging");
                var t = e.endTime.valueOf() - e.startTime.valueOf(),
                  i = e.cords.endX - e.cords.startX,
                  s = Math.abs(i) / t;
                return (
                  s > 0.15 && e.endTime.valueOf() - e.touchMoveTime < 30
                    ? ((s += 1) > 2 && (s += 1),
                      (s += s * (Math.abs(i) / this.thumbOuterWidth)),
                      this.$lgThumb.css(
                        "transition-duration",
                        Math.min(s - 1, 2) + "settings"
                      ),
                      (i *= s),
                      (this.translateX = this.getPossibleTransformX(
                        this.translateX - i
                      )),
                      this.setTranslate(this.translateX))
                    : (this.translateX = e.newTranslateX),
                  Math.abs(e.cords.endX - e.cords.startX) <
                    this.settings.thumbnailSwipeThreshold &&
                    (this.thumbClickable = !0),
                  e
                );
              }),
              (r.prototype.getThumbHtml = function (e, t) {
                var i,
                  s = this.core.galleryItems[t].__slideVideoInfo || {};
                return (
                  (i =
                    s.youtube && this.settings.loadYouTubeThumbnail
                      ? "//img.youtube.com/vi/" +
                        s.youtube[1] +
                        "/" +
                        this.settings.youTubeThumbSize +
                        ".jpg"
                      : e),
                  '<div data-lg-item-id="' +
                    t +
                    '" class="lg-thumb-item ' +
                    (t === this.core.index ? " active" : "") +
                    '" \n        style="width:' +
                    this.settings.thumbWidth +
                    "px; height: " +
                    this.settings.thumbHeight +
                    ";\n            margin-right: " +
                    this.settings.thumbMargin +
                    'px;">\n            <img data-lg-item-id="' +
                    t +
                    '" src="' +
                    i +
                    '" />\n        </div>'
                );
              }),
              (r.prototype.getThumbItemHtml = function (e) {
                for (var t = "", i = 0; i < e.length; i++)
                  t += this.getThumbHtml(e[i].thumb, i);
                return t;
              }),
              (r.prototype.setThumbItemHtml = function (e) {
                var t = this.getThumbItemHtml(e);
                this.$lgThumb.html(t);
              }),
              (r.prototype.setAnimateThumbStyles = function () {
                this.settings.animateThumb &&
                  this.core.outer.addClass("lg-animate-thumb");
              }),
              (r.prototype.manageActiveClassOnSlideChange = function () {
                var e = this;
                this.core.LGel.on(o + ".thumb", function (t) {
                  var i = e.core.outer.find(".lg-thumb-item"),
                    s = t.detail.index;
                  i.removeClass("active"), i.eq(s).addClass("active");
                });
              }),
              (r.prototype.toggleThumbBar = function () {
                var e = this;
                this.settings.toggleThumb &&
                  (this.core.outer.addClass("lg-can-toggle"),
                  this.core.$toolbar.append(
                    '<button type="button" aria-label="Toggle thumbnails" class="lg-toggle-thumb lg-icon"></button>'
                  ),
                  this.core.outer
                    .find(".lg-toggle-thumb")
                    .first()
                    .on("click.lg", function () {
                      e.core.outer.toggleClass("lg-components-open");
                    }));
              }),
              (r.prototype.thumbKeyPress = function () {
                var e = this;
                this.$LG(window).on(
                  "keydown.lg.thumb.global" + this.core.lgId,
                  function (t) {
                    e.core.lgOpened &&
                      e.settings.toggleThumb &&
                      (38 === t.keyCode
                        ? (t.preventDefault(),
                          e.core.outer.addClass("lg-components-open"))
                        : 40 === t.keyCode &&
                          (t.preventDefault(),
                          e.core.outer.removeClass("lg-components-open")));
                  }
                );
              }),
              (r.prototype.destroy = function () {
                this.settings.thumbnail &&
                  (this.$LG(window).off(".lg.thumb.global" + this.core.lgId),
                  this.core.LGel.off(".lg.thumb"),
                  this.core.LGel.off(".thumb"),
                  this.$thumbOuter.remove(),
                  this.core.outer.removeClass("lg-has-thumb"));
              }),
              r
            );
          })();
        })();
      },
      363: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, s = arguments.length; i < s; i++)
                    for (var n in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              autoplayFirstVideo: !0,
              youTubePlayerParams: !1,
              vimeoPlayerParams: !1,
              wistiaPlayerParams: !1,
              gotoNextSlideOnVideoEnd: !0,
              autoplayVideoOnSlide: !1,
              videojs: !1,
              videojsOptions: {},
            },
            i = "lgHasVideo",
            s = "lgSlideItemLoad",
            n = "lgBeforeSlide",
            o = "lgAfterSlide",
            r = "lgPosterClick",
            a = function (e) {
              return Object.keys(e)
                .map(function (t) {
                  return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
                })
                .join("&");
            };
          return (function () {
            function l(i) {
              return (
                (this.core = i),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (l.prototype.init = function () {
                var e = this;
                this.core.LGel.on(i + ".video", this.onHasVideo.bind(this)),
                  this.core.LGel.on(r + ".video", function () {
                    var t = e.core.getSlideItem(e.core.index);
                    e.loadVideoOnPosterClick(t);
                  }),
                  this.core.LGel.on(
                    s + ".video",
                    this.onSlideItemLoad.bind(this)
                  ),
                  this.core.LGel.on(
                    n + ".video",
                    this.onBeforeSlide.bind(this)
                  ),
                  this.core.LGel.on(o + ".video", this.onAfterSlide.bind(this));
              }),
              (l.prototype.onSlideItemLoad = function (e) {
                var t = this,
                  i = e.detail,
                  s = i.isFirstSlide,
                  n = i.index;
                this.settings.autoplayFirstVideo &&
                  s &&
                  n === this.core.index &&
                  setTimeout(function () {
                    t.loadAndPlayVideo(n);
                  }, 200),
                  !s &&
                    this.settings.autoplayVideoOnSlide &&
                    n === this.core.index &&
                    this.loadAndPlayVideo(n);
              }),
              (l.prototype.onHasVideo = function (e) {
                var t = e.detail,
                  i = t.index,
                  s = t.src,
                  n = t.html5Video;
                t.hasPoster ||
                  (this.appendVideos(this.core.getSlideItem(i), {
                    src: s,
                    addClass: "lg-object",
                    index: i,
                    html5Video: n,
                  }),
                  this.gotoNextSlideOnVideoEnd(s, i));
              }),
              (l.prototype.onBeforeSlide = function (e) {
                if (this.core.lGalleryOn) {
                  var t = e.detail.prevIndex;
                  this.pauseVideo(t);
                }
              }),
              (l.prototype.onAfterSlide = function (e) {
                var t = this,
                  i = e.detail,
                  s = i.index,
                  n = i.prevIndex,
                  o = this.core.getSlideItem(s);
                this.settings.autoplayVideoOnSlide &&
                  s !== n &&
                  o.hasClass("lg-complete") &&
                  setTimeout(function () {
                    t.loadAndPlayVideo(s);
                  }, 100);
              }),
              (l.prototype.loadAndPlayVideo = function (e) {
                var t = this.core.getSlideItem(e);
                this.core.galleryItems[e].poster
                  ? this.loadVideoOnPosterClick(t, !0)
                  : this.playVideo(e);
              }),
              (l.prototype.playVideo = function (e) {
                this.controlVideo(e, "play");
              }),
              (l.prototype.pauseVideo = function (e) {
                this.controlVideo(e, "pause");
              }),
              (l.prototype.getVideoHtml = function (e, t, i, s) {
                var n = "",
                  o = this.core.galleryItems[i].__slideVideoInfo || {},
                  r = this.core.galleryItems[i],
                  l = r.title || r.alt;
                l = l ? 'title="' + l + '"' : "";
                var d =
                  'allowtransparency="true"\n            frameborder="0"\n            scrolling="no"\n            allowfullscreen\n            mozallowfullscreen\n            webkitallowfullscreen\n            oallowfullscreen\n            msallowfullscreen';
                if (o.youtube) {
                  var c = "lg-youtube" + i,
                    u =
                      "?" +
                      (o.youtube[2] ? o.youtube[2] + "&" : "") +
                      "wmode=opaque&autoplay=0&mute=1&enablejsapi=1" +
                      (this.settings.youTubePlayerParams
                        ? "&" + a(this.settings.youTubePlayerParams)
                        : "");
                  n =
                    '<iframe allow="autoplay" id=' +
                    c +
                    ' class="lg-video-object lg-youtube ' +
                    t +
                    '" ' +
                    l +
                    ' src="//www.youtube.com/embed/' +
                    (o.youtube[1] + u) +
                    '" ' +
                    d +
                    "></iframe>";
                } else if (o.vimeo)
                  (c = "lg-vimeo" + i),
                    (u = (function (e, t) {
                      if (!t || !t.vimeo) return "";
                      var i = t.vimeo[2] || "";
                      return (
                        (i = "?" == i[0] ? "&" + i.slice(1) : i || ""),
                        "?autoplay=0&muted=1" + (e ? "&" + a(e) : "") + i
                      );
                    })(this.settings.vimeoPlayerParams, o)),
                    (n =
                      '<iframe allow="autoplay" id=' +
                      c +
                      ' class="lg-video-object lg-vimeo ' +
                      t +
                      '" ' +
                      l +
                      ' src="//player.vimeo.com/video/' +
                      (o.vimeo[1] + u) +
                      '" ' +
                      d +
                      "></iframe>");
                else if (o.wistia) {
                  var h = "lg-wistia" + i;
                  (u = (u = a(this.settings.wistiaPlayerParams))
                    ? "?" + u
                    : ""),
                    (n =
                      '<iframe allow="autoplay" id="' +
                      h +
                      '" src="//fast.wistia.net/embed/iframe/' +
                      (o.wistia[4] + u) +
                      '" ' +
                      l +
                      ' class="wistia_embed lg-video-object lg-wistia ' +
                      t +
                      '" name="wistia_embed" ' +
                      d +
                      "></iframe>");
                } else if (o.html5) {
                  for (var p = "", g = 0; g < s.source.length; g++)
                    p +=
                      '<source src="' +
                      s.source[g].src +
                      '" type="' +
                      s.source[g].type +
                      '">';
                  if (s.tracks) {
                    var m = function (e) {
                      var t = "",
                        i = s.tracks[e];
                      Object.keys(i || {}).forEach(function (e) {
                        t += e + '="' + i[e] + '" ';
                      }),
                        (p += "<track " + t + ">");
                    };
                    for (g = 0; g < s.tracks.length; g++) m(g);
                  }
                  var f = "",
                    v = s.attributes || {};
                  Object.keys(v || {}).forEach(function (e) {
                    f += e + '="' + v[e] + '" ';
                  }),
                    (n =
                      '<video class="lg-video-object lg-html5 ' +
                      (this.settings.videojs ? "video-js" : "") +
                      '" ' +
                      f +
                      ">\n                " +
                      p +
                      "\n                Your browser does not support HTML5 video.\n            </video>");
                }
                return n;
              }),
              (l.prototype.appendVideos = function (e, t) {
                var i,
                  s = this.getVideoHtml(
                    t.src,
                    t.addClass,
                    t.index,
                    t.html5Video
                  );
                e.find(".lg-video-cont").append(s);
                var n = e.find(".lg-video-object").first();
                if (
                  (t.html5Video &&
                    n.on("mousedown.lg.video", function (e) {
                      e.stopPropagation();
                    }),
                  this.settings.videojs &&
                    (null ===
                      (i = this.core.galleryItems[t.index].__slideVideoInfo) ||
                    void 0 === i
                      ? void 0
                      : i.html5))
                )
                  try {
                    return videojs(n.get(), this.settings.videojsOptions);
                  } catch (e) {
                    console.error(
                      "lightGallery:- Make sure you have included videojs"
                    );
                  }
              }),
              (l.prototype.gotoNextSlideOnVideoEnd = function (e, t) {
                var i = this,
                  s = this.core
                    .getSlideItem(t)
                    .find(".lg-video-object")
                    .first(),
                  n = this.core.galleryItems[t].__slideVideoInfo || {};
                if (this.settings.gotoNextSlideOnVideoEnd)
                  if (n.html5)
                    s.on("ended", function () {
                      i.core.goToNextSlide();
                    });
                  else if (n.vimeo)
                    try {
                      new Vimeo.Player(s.get()).on("ended", function () {
                        i.core.goToNextSlide();
                      });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                      );
                    }
                  else if (n.wistia)
                    try {
                      (window._wq = window._wq || []),
                        window._wq.push({
                          id: s.attr("id"),
                          onReady: function (e) {
                            e.bind("end", function () {
                              i.core.goToNextSlide();
                            });
                          },
                        });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                      );
                    }
              }),
              (l.prototype.controlVideo = function (e, t) {
                var i = this.core
                    .getSlideItem(e)
                    .find(".lg-video-object")
                    .first(),
                  s = this.core.galleryItems[e].__slideVideoInfo || {};
                if (i.get())
                  if (s.youtube)
                    try {
                      i.get().contentWindow.postMessage(
                        '{"event":"command","func":"' + t + 'Video","args":""}',
                        "*"
                      );
                    } catch (e) {
                      console.error("lightGallery:- " + e);
                    }
                  else if (s.vimeo)
                    try {
                      new Vimeo.Player(i.get())[t]();
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //github.com/vimeo/player.js"
                      );
                    }
                  else if (s.html5)
                    if (this.settings.videojs)
                      try {
                        videojs(i.get())[t]();
                      } catch (e) {
                        console.error(
                          "lightGallery:- Make sure you have included videojs"
                        );
                      }
                    else i.get()[t]();
                  else if (s.wistia)
                    try {
                      (window._wq = window._wq || []),
                        window._wq.push({
                          id: i.attr("id"),
                          onReady: function (e) {
                            e[t]();
                          },
                        });
                    } catch (e) {
                      console.error(
                        "lightGallery:- Make sure you have included //fast.wistia.com/assets/external/E-v1.js"
                      );
                    }
              }),
              (l.prototype.loadVideoOnPosterClick = function (e, t) {
                var i = this;
                if (e.hasClass("lg-video-loaded"))
                  t && this.playVideo(this.core.index);
                else if (e.hasClass("lg-has-video"))
                  this.playVideo(this.core.index);
                else {
                  e.addClass("lg-has-video");
                  var s = void 0,
                    n = this.core.galleryItems[this.core.index].src,
                    o = this.core.galleryItems[this.core.index].video;
                  o && (s = "string" == typeof o ? JSON.parse(o) : o);
                  var r = this.appendVideos(e, {
                    src: n,
                    addClass: "",
                    index: this.core.index,
                    html5Video: s,
                  });
                  this.gotoNextSlideOnVideoEnd(n, this.core.index);
                  var a = e.find(".lg-object").first().get();
                  e.find(".lg-video-cont").first().append(a),
                    e.addClass("lg-video-loading"),
                    r &&
                      r.ready(function () {
                        r.on("loadedmetadata", function () {
                          i.onVideoLoadAfterPosterClick(e, i.core.index);
                        });
                      }),
                    e
                      .find(".lg-video-object")
                      .first()
                      .on("load.lg error.lg loadedmetadata.lg", function () {
                        setTimeout(function () {
                          i.onVideoLoadAfterPosterClick(e, i.core.index);
                        }, 50);
                      });
                }
              }),
              (l.prototype.onVideoLoadAfterPosterClick = function (e, t) {
                e.addClass("lg-video-loaded"), this.playVideo(t);
              }),
              (l.prototype.destroy = function () {
                this.core.LGel.off(".lg.video"), this.core.LGel.off(".video");
              }),
              l
            );
          })();
        })();
      },
      86: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (e =
                Object.assign ||
                function (e) {
                  for (var t, i = 1, s = arguments.length; i < s; i++)
                    for (var n in (t = arguments[i]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }).apply(this, arguments);
            },
            t = {
              scale: 1,
              zoom: !0,
              actualSize: !0,
              showZoomInOutIcons: !1,
              actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" },
              enableZoomAfter: 300,
            },
            i = "lgContainerResize",
            s = "lgBeforeOpen",
            n = "lgAfterOpen",
            o = "lgSlideItemLoad",
            r = "lgAfterSlide",
            a = "lgRotateLeft",
            l = "lgRotateRight",
            d = "lgFlipHorizontal",
            c = "lgFlipVertical";
          return (function () {
            function u(i, s) {
              return (
                (this.core = i),
                (this.$LG = s),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (u.prototype.buildTemplates = function () {
                var e = this.settings.showZoomInOutIcons
                  ? '<button id="' +
                    this.core.getIdName("lg-zoom-in") +
                    '" type="button" aria-label="Zoom in" class="lg-zoom-in lg-icon"></button><button id="' +
                    this.core.getIdName("lg-zoom-out") +
                    '" type="button" aria-label="Zoom out" class="lg-zoom-out lg-icon"></button>'
                  : "";
                this.settings.actualSize &&
                  (e +=
                    '<button id="' +
                    this.core.getIdName("lg-actual-size") +
                    '" type="button" aria-label="View actual size" class="' +
                    this.settings.actualSizeIcons.zoomIn +
                    ' lg-icon"></button>'),
                  this.core.outer.addClass("lg-use-transition-for-zoom"),
                  this.core.$toolbar.first().append(e);
              }),
              (u.prototype.enableZoom = function (e) {
                var t = this,
                  i = this.settings.enableZoomAfter + e.detail.delay;
                this.$LG("body").first().hasClass("lg-from-hash") &&
                e.detail.delay
                  ? (i = 0)
                  : this.$LG("body").first().removeClass("lg-from-hash"),
                  (this.zoomableTimeout = setTimeout(function () {
                    t.isImageSlide() &&
                      (t.core
                        .getSlideItem(e.detail.index)
                        .addClass("lg-zoomable"),
                      e.detail.index === t.core.index && t.setZoomEssentials());
                  }, i + 30));
              }),
              (u.prototype.enableZoomOnSlideItemLoad = function () {
                this.core.LGel.on(o + ".zoom", this.enableZoom.bind(this));
              }),
              (u.prototype.getModifier = function (e, t, i) {
                var s = e;
                e = Math.abs(e);
                var n = this.getCurrentTransform(i);
                if (!n) return 1;
                var o = 1;
                if ("X" === t) {
                  var r = Math.sign(parseFloat(n[0]));
                  0 === e || 180 === e
                    ? (o = 1)
                    : 90 === e &&
                      (o =
                        (-90 === s && 1 === r) || (90 === s && -1 === r)
                          ? -1
                          : 1),
                    (o *= r);
                } else {
                  var a = Math.sign(parseFloat(n[3]));
                  if (0 === e || 180 === e) o = 1;
                  else if (90 === e) {
                    var l = parseFloat(n[1]),
                      d = parseFloat(n[2]);
                    o = Math.sign(l * d * s * a);
                  }
                  o *= a;
                }
                return o;
              }),
              (u.prototype.getImageSize = function (e, t, i) {
                return (
                  90 === Math.abs(t) && (i = "x" === i ? "y" : "x"),
                  e[{ y: "offsetHeight", x: "offsetWidth" }[i]]
                );
              }),
              (u.prototype.getDragCords = function (e, t) {
                return 90 === t
                  ? { x: e.pageY, y: e.pageX }
                  : { x: e.pageX, y: e.pageY };
              }),
              (u.prototype.getSwipeCords = function (e, t) {
                var i = e.targetTouches[0].pageX,
                  s = e.targetTouches[0].pageY;
                return 90 === t ? { x: s, y: i } : { x: i, y: s };
              }),
              (u.prototype.getDragAllowedAxises = function (e, t) {
                t = t || this.scale || 1;
                var i = this.imageYSize * t > this.containerRect.height,
                  s = this.imageXSize * t > this.containerRect.width;
                return 90 === e
                  ? { allowX: i, allowY: s }
                  : { allowX: s, allowY: i };
              }),
              (u.prototype.getCurrentTransform = function (e) {
                if (e) {
                  var t = window.getComputedStyle(e, null),
                    i =
                      t.getPropertyValue("-webkit-transform") ||
                      t.getPropertyValue("-moz-transform") ||
                      t.getPropertyValue("-ms-transform") ||
                      t.getPropertyValue("-o-transform") ||
                      t.getPropertyValue("transform") ||
                      "none";
                  return "none" !== i
                    ? i.split("(")[1].split(")")[0].split(",")
                    : void 0;
                }
              }),
              (u.prototype.getCurrentRotation = function (e) {
                if (!e) return 0;
                var t = this.getCurrentTransform(e);
                return t
                  ? Math.round(
                      Math.atan2(parseFloat(t[1]), parseFloat(t[0])) *
                        (180 / Math.PI)
                    )
                  : 0;
              }),
              (u.prototype.setZoomEssentials = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-rotate")
                    .first()
                    .get();
                (this.rotateValue = this.getCurrentRotation(t)),
                  (this.imageYSize = this.getImageSize(
                    e.get(),
                    this.rotateValue,
                    "y"
                  )),
                  (this.imageXSize = this.getImageSize(
                    e.get(),
                    this.rotateValue,
                    "x"
                  )),
                  (this.containerRect = this.core.outer
                    .get()
                    .getBoundingClientRect()),
                  (this.modifierX = this.getModifier(this.rotateValue, "X", t)),
                  (this.modifierY = this.getModifier(this.rotateValue, "Y", t));
              }),
              (u.prototype.zoomImage = function (e) {
                var t,
                  i,
                  s =
                    (this.containerRect.width - this.imageXSize) / 2 +
                    this.containerRect.left,
                  n = this.core.mediaContainerPosition,
                  o = n.top,
                  r = n.bottom,
                  a = Math.abs(o - r) / 2,
                  l =
                    (this.containerRect.height -
                      this.imageYSize -
                      a * this.modifierX) /
                      2 +
                    this.scrollTop +
                    this.containerRect.top;
                1 === e && (this.positionChanged = !1);
                var d = this.getDragAllowedAxises(
                    Math.abs(this.rotateValue),
                    e
                  ),
                  c = d.allowY,
                  u = d.allowX;
                this.positionChanged &&
                  ((t = this.left / (this.scale - 1)),
                  (i = this.top / (this.scale - 1)),
                  (this.pageX = Math.abs(t) + s),
                  (this.pageY = Math.abs(i) + l),
                  (this.positionChanged = !1));
                var h = this.getPossibleSwipeDragCords(this.rotateValue, e),
                  p = (e - 1) * (s - this.pageX),
                  g = (e - 1) * (l - this.pageY);
                u
                  ? this.isBeyondPossibleLeft(p, h.minX)
                    ? (p = h.minX)
                    : this.isBeyondPossibleRight(p, h.maxX) && (p = h.maxX)
                  : e > 1 &&
                    (p < h.minX ? (p = h.minX) : p > h.maxX && (p = h.maxX)),
                  c
                    ? this.isBeyondPossibleTop(g, h.minY)
                      ? (g = h.minY)
                      : this.isBeyondPossibleBottom(g, h.maxY) && (g = h.maxY)
                    : e > 1 &&
                      (g < h.minY ? (g = h.minY) : g > h.maxY && (g = h.maxY)),
                  this.setZoomStyles({ x: p, y: g, scale: e });
              }),
              (u.prototype.setZoomStyles = function (e) {
                var t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  i = this.core.outer.find(".lg-current .lg-dummy-img").first(),
                  s = t.parent();
                (this.scale = e.scale),
                  t.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  ),
                  i.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  );
                var n = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                s.css("transform", n), (this.left = e.x), (this.top = e.y);
              }),
              (u.prototype.setActualSize = function (e, t) {
                var i = this;
                if (
                  this.isImageSlide() &&
                  !this.core.outer.hasClass("lg-first-slide-loading")
                ) {
                  var s = this.getCurrentImageActualSizeScale();
                  this.core.outer.hasClass("lg-zoomed")
                    ? (this.scale = 1)
                    : (this.scale = this.getScale(s)),
                    this.setPageCords(t),
                    this.beginZoom(this.scale),
                    this.zoomImage(this.scale),
                    setTimeout(function () {
                      i.core.outer
                        .removeClass("lg-grabbing")
                        .addClass("lg-grab");
                    }, 10);
                }
              }),
              (u.prototype.getNaturalWidth = function (e) {
                var t = this.core.getSlideItem(e).find(".lg-image").first(),
                  i = this.core.galleryItems[e].width;
                return i ? parseFloat(i) : t.get().naturalWidth;
              }),
              (u.prototype.getActualSizeScale = function (e, t) {
                return e > t ? e / t || 2 : 1;
              }),
              (u.prototype.getCurrentImageActualSizeScale = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first()
                    .get().offsetWidth,
                  t = this.getNaturalWidth(this.core.index) || e;
                return this.getActualSizeScale(t, e);
              }),
              (u.prototype.getPageCords = function (e) {
                var t = {};
                if (e)
                  (t.x = e.pageX || e.targetTouches[0].pageX),
                    (t.y = e.pageY || e.targetTouches[0].pageY);
                else {
                  var i = this.core.outer.get().getBoundingClientRect();
                  (t.x = i.width / 2 + i.left),
                    (t.y = i.height / 2 + this.scrollTop + i.top);
                }
                return t;
              }),
              (u.prototype.setPageCords = function (e) {
                var t = this.getPageCords(e);
                (this.pageX = t.x), (this.pageY = t.y);
              }),
              (u.prototype.beginZoom = function (e) {
                return (
                  this.core.outer.removeClass(
                    "lg-zoom-drag-transition lg-zoom-dragging"
                  ),
                  e > 1
                    ? (this.core.outer.addClass("lg-zoomed"),
                      this.core
                        .getElementById("lg-actual-size")
                        .removeClass(this.settings.actualSizeIcons.zoomIn)
                        .addClass(this.settings.actualSizeIcons.zoomOut))
                    : this.resetZoom(),
                  e > 1
                );
              }),
              (u.prototype.getScale = function (e) {
                var t = this.getCurrentImageActualSizeScale();
                return e < 1 ? (e = 1) : e > t && (e = t), e;
              }),
              (u.prototype.init = function () {
                var e = this;
                if (this.settings.zoom) {
                  this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                  var t = null;
                  this.core.outer.on("dblclick.lg", function (t) {
                    e.$LG(t.target).hasClass("lg-image") &&
                      e.setActualSize(e.core.index, t);
                  }),
                    this.core.outer.on("touchstart.lg", function (i) {
                      var s = e.$LG(i.target);
                      1 === i.targetTouches.length &&
                        s.hasClass("lg-image") &&
                        (t
                          ? (clearTimeout(t),
                            (t = null),
                            i.preventDefault(),
                            e.setActualSize(e.core.index, i))
                          : (t = setTimeout(function () {
                              t = null;
                            }, 300)));
                    }),
                    this.core.LGel.on(
                      i +
                        ".zoom " +
                        l +
                        ".zoom " +
                        a +
                        ".zoom " +
                        d +
                        ".zoom " +
                        c +
                        ".zoom",
                      function () {
                        e.core.lgOpened &&
                          e.isImageSlide() &&
                          (e.setPageCords(),
                          e.setZoomEssentials(),
                          e.zoomImage(e.scale));
                      }
                    ),
                    this.$LG(window).on(
                      "scroll.lg.zoom.global" + this.core.lgId,
                      function () {
                        e.core.lgOpened &&
                          (e.scrollTop = e.$LG(window).scrollTop());
                      }
                    ),
                    this.core
                      .getElementById("lg-zoom-out")
                      .on("click.lg", function () {
                        e.core.outer.find(".lg-current .lg-image").get() &&
                          ((e.scale -= e.settings.scale),
                          (e.scale = e.getScale(e.scale)),
                          e.beginZoom(e.scale),
                          e.zoomImage(e.scale));
                      }),
                    this.core
                      .getElementById("lg-zoom-in")
                      .on("click.lg", function () {
                        e.zoomIn();
                      }),
                    this.core
                      .getElementById("lg-actual-size")
                      .on("click.lg", function () {
                        e.setActualSize(e.core.index);
                      }),
                    this.core.LGel.on(s + ".zoom", function () {
                      e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                    }),
                    this.core.LGel.on(n + ".zoom", function () {
                      (e.scrollTop = e.$LG(window).scrollTop()),
                        (e.pageX = e.core.outer.width() / 2),
                        (e.pageY = e.core.outer.height() / 2 + e.scrollTop),
                        (e.scale = 1);
                    }),
                    this.core.LGel.on(r + ".zoom", function (t) {
                      var i = t.detail.prevIndex;
                      (e.scale = 1),
                        (e.positionChanged = !1),
                        e.resetZoom(i),
                        e.isImageSlide() && e.setZoomEssentials();
                    }),
                    this.zoomDrag(),
                    this.pinchZoom(),
                    this.zoomSwipe(),
                    (this.zoomableTimeout = !1),
                    (this.positionChanged = !1);
                }
              }),
              (u.prototype.zoomIn = function (e) {
                this.isImageSlide() &&
                  (e ? (this.scale = e) : (this.scale += this.settings.scale),
                  (this.scale = this.getScale(this.scale)),
                  this.beginZoom(this.scale),
                  this.zoomImage(this.scale));
              }),
              (u.prototype.resetZoom = function (e) {
                this.core.outer.removeClass(
                  "lg-zoomed lg-zoom-drag-transition"
                );
                var t = this.core.getElementById("lg-actual-size"),
                  i = this.core.getSlideItem(
                    void 0 !== e ? e : this.core.index
                  );
                t
                  .removeClass(this.settings.actualSizeIcons.zoomOut)
                  .addClass(this.settings.actualSizeIcons.zoomIn),
                  i.find(".lg-img-wrap").first().removeAttr("style"),
                  i.find(".lg-image").first().removeAttr("style"),
                  (this.scale = 1),
                  (this.left = 0),
                  (this.top = 0),
                  this.setPageCords();
              }),
              (u.prototype.getTouchDistance = function (e) {
                return Math.sqrt(
                  (e.targetTouches[0].pageX - e.targetTouches[1].pageX) *
                    (e.targetTouches[0].pageX - e.targetTouches[1].pageX) +
                    (e.targetTouches[0].pageY - e.targetTouches[1].pageY) *
                      (e.targetTouches[0].pageY - e.targetTouches[1].pageY)
                );
              }),
              (u.prototype.pinchZoom = function () {
                var e = this,
                  t = 0,
                  i = !1,
                  s = 1,
                  n = this.core.getSlideItem(this.core.index);
                this.core.$inner.on("touchstart.lg", function (i) {
                  (n = e.core.getSlideItem(e.core.index)),
                    e.isImageSlide() &&
                      (2 !== i.targetTouches.length ||
                        e.core.outer.hasClass("lg-first-slide-loading") ||
                        (!e.$LG(i.target).hasClass("lg-item") &&
                          !n.get().contains(i.target)) ||
                        ((s = e.scale || 1),
                        e.core.outer.removeClass(
                          "lg-zoom-drag-transition lg-zoom-dragging"
                        ),
                        (e.core.touchAction = "pinch"),
                        (t = e.getTouchDistance(i))));
                }),
                  this.core.$inner.on("touchmove.lg", function (o) {
                    if (
                      2 === o.targetTouches.length &&
                      "pinch" === e.core.touchAction &&
                      (e.$LG(o.target).hasClass("lg-item") ||
                        n.get().contains(o.target))
                    ) {
                      o.preventDefault();
                      var r = e.getTouchDistance(o),
                        a = t - r;
                      !i && Math.abs(a) > 5 && (i = !0),
                        i &&
                          ((e.scale = Math.max(1, s + 0.008 * -a)),
                          e.zoomImage(e.scale));
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (s) {
                    "pinch" === e.core.touchAction &&
                      (e.$LG(s.target).hasClass("lg-item") ||
                        n.get().contains(s.target)) &&
                      ((i = !1),
                      (t = 0),
                      e.scale <= 1
                        ? e.resetZoom()
                        : ((e.scale = e.getScale(e.scale)),
                          e.zoomImage(e.scale),
                          e.core.outer.addClass("lg-zoomed")),
                      (e.core.touchAction = void 0));
                  });
              }),
              (u.prototype.touchendZoom = function (e, t, i, s, n, o) {
                var r = t.x - e.x,
                  a = t.y - e.y,
                  l = Math.abs(r) / n + 1,
                  d = Math.abs(a) / n + 1;
                l > 2 && (l += 1), d > 2 && (d += 1), (r *= l), (a *= d);
                var c = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-wrap")
                    .first(),
                  u = {};
                (u.x = this.left + r * this.modifierX),
                  (u.y = this.top + a * this.modifierY);
                var h = this.getPossibleSwipeDragCords(o);
                (Math.abs(r) > 15 || Math.abs(a) > 15) &&
                  (s &&
                    (this.isBeyondPossibleTop(u.y, h.minY)
                      ? (u.y = h.minY)
                      : this.isBeyondPossibleBottom(u.y, h.maxY) &&
                        (u.y = h.maxY)),
                  i &&
                    (this.isBeyondPossibleLeft(u.x, h.minX)
                      ? (u.x = h.minX)
                      : this.isBeyondPossibleRight(u.x, h.maxX) &&
                        (u.x = h.maxX)),
                  s ? (this.top = u.y) : (u.y = this.top),
                  i ? (this.left = u.x) : (u.x = this.left),
                  this.setZoomSwipeStyles(c, u),
                  (this.positionChanged = !0));
              }),
              (u.prototype.getZoomSwipeCords = function (e, t, i, s, n) {
                var o = {};
                if (s) {
                  if (
                    ((o.y = this.top + (t.y - e.y) * this.modifierY),
                    this.isBeyondPossibleTop(o.y, n.minY))
                  ) {
                    var r = n.minY - o.y;
                    o.y = n.minY - r / 6;
                  } else if (this.isBeyondPossibleBottom(o.y, n.maxY)) {
                    var a = o.y - n.maxY;
                    o.y = n.maxY + a / 6;
                  }
                } else o.y = this.top;
                if (i) {
                  if (
                    ((o.x = this.left + (t.x - e.x) * this.modifierX),
                    this.isBeyondPossibleLeft(o.x, n.minX))
                  ) {
                    var l = n.minX - o.x;
                    o.x = n.minX - l / 6;
                  } else if (this.isBeyondPossibleRight(o.x, n.maxX)) {
                    var d = o.x - n.maxX;
                    o.x = n.maxX + d / 6;
                  }
                } else o.x = this.left;
                return o;
              }),
              (u.prototype.isBeyondPossibleLeft = function (e, t) {
                return e >= t;
              }),
              (u.prototype.isBeyondPossibleRight = function (e, t) {
                return e <= t;
              }),
              (u.prototype.isBeyondPossibleTop = function (e, t) {
                return e >= t;
              }),
              (u.prototype.isBeyondPossibleBottom = function (e, t) {
                return e <= t;
              }),
              (u.prototype.isImageSlide = function () {
                var e = this.core.galleryItems[this.core.index];
                return "image" === this.core.getSlideType(e);
              }),
              (u.prototype.getPossibleSwipeDragCords = function (e, t) {
                var i = t || this.scale || 1,
                  s = Math.abs(i),
                  n = this.core.mediaContainerPosition,
                  o = n.top,
                  r = n.bottom,
                  a = Math.abs(o - r) / 2,
                  l =
                    (this.imageYSize - this.containerRect.height) / 2 +
                    a * this.modifierX,
                  d = this.containerRect.height - this.imageYSize * s + l,
                  c = (this.imageXSize - this.containerRect.width) / 2,
                  u = this.containerRect.width - this.imageXSize * s + c,
                  h = { minY: l, maxY: d, minX: c, maxX: u };
                return (
                  90 === Math.abs(e) &&
                    (h = { minY: c, maxY: u, minX: l, maxX: d }),
                  h
                );
              }),
              (u.prototype.setZoomSwipeStyles = function (e, t) {
                e.css(
                  "transform",
                  "translate3d(" + t.x + "px, " + t.y + "px, 0)"
                );
              }),
              (u.prototype.zoomSwipe = function () {
                var e,
                  t,
                  i = this,
                  s = {},
                  n = {},
                  o = !1,
                  r = !1,
                  a = !1,
                  l = new Date(),
                  d = (new Date(), this.core.getSlideItem(this.core.index));
                this.core.$inner.on("touchstart.lg", function (n) {
                  if (
                    i.isImageSlide() &&
                    ((d = i.core.getSlideItem(i.core.index)),
                    (i.$LG(n.target).hasClass("lg-item") ||
                      d.get().contains(n.target)) &&
                      1 === n.targetTouches.length &&
                      i.core.outer.hasClass("lg-zoomed"))
                  ) {
                    n.preventDefault(),
                      (l = new Date()),
                      (i.core.touchAction = "zoomSwipe"),
                      (t = i.core
                        .getSlideItem(i.core.index)
                        .find(".lg-img-wrap")
                        .first());
                    var o = i.getDragAllowedAxises(Math.abs(i.rotateValue));
                    (a = o.allowY),
                      ((r = o.allowX) || a) &&
                        (s = i.getSwipeCords(n, Math.abs(i.rotateValue))),
                      (e = i.getPossibleSwipeDragCords(i.rotateValue)),
                      i.core.outer.addClass(
                        "lg-zoom-dragging lg-zoom-drag-transition"
                      );
                  }
                }),
                  this.core.$inner.on("touchmove.lg", function (l) {
                    if (
                      1 === l.targetTouches.length &&
                      "zoomSwipe" === i.core.touchAction &&
                      (i.$LG(l.target).hasClass("lg-item") ||
                        d.get().contains(l.target))
                    ) {
                      l.preventDefault(),
                        (i.core.touchAction = "zoomSwipe"),
                        (n = i.getSwipeCords(l, Math.abs(i.rotateValue)));
                      var c = i.getZoomSwipeCords(s, n, r, a, e);
                      (Math.abs(n.x - s.x) > 15 || Math.abs(n.y - s.y) > 15) &&
                        ((o = !0), i.setZoomSwipeStyles(t, c));
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (e) {
                    if (
                      "zoomSwipe" === i.core.touchAction &&
                      (i.$LG(e.target).hasClass("lg-item") ||
                        d.get().contains(e.target))
                    ) {
                      if (
                        ((i.core.touchAction = void 0),
                        i.core.outer.removeClass("lg-zoom-dragging"),
                        !o)
                      )
                        return;
                      o = !1;
                      var t = new Date().valueOf() - l.valueOf();
                      i.touchendZoom(s, n, r, a, t, i.rotateValue);
                    }
                  });
              }),
              (u.prototype.zoomDrag = function () {
                var e,
                  t,
                  i,
                  s,
                  n = this,
                  o = {},
                  r = {},
                  a = !1,
                  l = !1,
                  d = !1,
                  c = !1;
                this.core.outer.on("mousedown.lg.zoom", function (t) {
                  if (n.isImageSlide()) {
                    var r = n.core.getSlideItem(n.core.index);
                    if (
                      n.$LG(t.target).hasClass("lg-item") ||
                      r.get().contains(t.target)
                    ) {
                      (e = new Date()),
                        (s = n.core
                          .getSlideItem(n.core.index)
                          .find(".lg-img-wrap")
                          .first());
                      var l = n.getDragAllowedAxises(Math.abs(n.rotateValue));
                      (c = l.allowY),
                        (d = l.allowX),
                        n.core.outer.hasClass("lg-zoomed") &&
                          n.$LG(t.target).hasClass("lg-object") &&
                          (d || c) &&
                          (t.preventDefault(),
                          (o = n.getDragCords(t, Math.abs(n.rotateValue))),
                          (i = n.getPossibleSwipeDragCords(n.rotateValue)),
                          (a = !0),
                          (n.core.outer.get().scrollLeft += 1),
                          (n.core.outer.get().scrollLeft -= 1),
                          n.core.outer
                            .removeClass("lg-grab")
                            .addClass(
                              "lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"
                            ));
                    }
                  }
                }),
                  this.$LG(window).on(
                    "mousemove.lg.zoom.global" + this.core.lgId,
                    function (e) {
                      if (a) {
                        (l = !0),
                          (r = n.getDragCords(e, Math.abs(n.rotateValue)));
                        var t = n.getZoomSwipeCords(o, r, d, c, i);
                        n.setZoomSwipeStyles(s, t);
                      }
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.zoom.global" + this.core.lgId,
                    function (i) {
                      if (a) {
                        if (
                          ((t = new Date()),
                          (a = !1),
                          n.core.outer.removeClass("lg-zoom-dragging"),
                          l && (o.x !== r.x || o.y !== r.y))
                        ) {
                          r = n.getDragCords(i, Math.abs(n.rotateValue));
                          var s = t.valueOf() - e.valueOf();
                          n.touchendZoom(o, r, d, c, s, n.rotateValue);
                        }
                        l = !1;
                      }
                      n.core.outer
                        .removeClass("lg-grabbing")
                        .addClass("lg-grab");
                    }
                  );
              }),
              (u.prototype.closeGallery = function () {
                this.resetZoom();
              }),
              (u.prototype.destroy = function () {
                this.$LG(window).off(".lg.zoom.global" + this.core.lgId),
                  this.core.LGel.off(".lg.zoom"),
                  this.core.LGel.off(".zoom"),
                  clearTimeout(this.zoomableTimeout),
                  (this.zoomableTimeout = !1);
              }),
              u
            );
          })();
        })();
      },
      211: function (e, t) {
        !(function (e) {
          "use strict";
          function t(e) {
            return i(e) && "function" == typeof e.from;
          }
          function i(e) {
            return "object" == typeof e && "function" == typeof e.to;
          }
          function s(e) {
            e.parentElement.removeChild(e);
          }
          function n(e) {
            return null != e;
          }
          function o(e) {
            e.preventDefault();
          }
          function r(e) {
            return e.filter(function (e) {
              return !this[e] && (this[e] = !0);
            }, {});
          }
          function a(e, t) {
            return Math.round(e / t) * t;
          }
          function l(e, t) {
            var i = e.getBoundingClientRect(),
              s = e.ownerDocument,
              n = s.documentElement,
              o = v(s);
            return (
              /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (o.x = 0),
              t ? i.top + o.y - n.clientTop : i.left + o.x - n.clientLeft
            );
          }
          function d(e) {
            return "number" == typeof e && !isNaN(e) && isFinite(e);
          }
          function c(e, t, i) {
            i > 0 &&
              (g(e, t),
              setTimeout(function () {
                m(e, t);
              }, i));
          }
          function u(e) {
            return Math.max(Math.min(e, 100), 0);
          }
          function h(e) {
            return Array.isArray(e) ? e : [e];
          }
          function p(e) {
            var t = (e = String(e)).split(".");
            return t.length > 1 ? t[1].length : 0;
          }
          function g(e, t) {
            e.classList && !/\s/.test(t)
              ? e.classList.add(t)
              : (e.className += " " + t);
          }
          function m(e, t) {
            e.classList && !/\s/.test(t)
              ? e.classList.remove(t)
              : (e.className = e.className.replace(
                  new RegExp(
                    "(^|\\b)" + t.split(" ").join("|") + "(\\b|$)",
                    "gi"
                  ),
                  " "
                ));
          }
          function f(e, t) {
            return e.classList
              ? e.classList.contains(t)
              : new RegExp("\\b" + t + "\\b").test(e.className);
          }
          function v(e) {
            var t = void 0 !== window.pageXOffset,
              i = "CSS1Compat" === (e.compatMode || "");
            return {
              x: t
                ? window.pageXOffset
                : i
                ? e.documentElement.scrollLeft
                : e.body.scrollLeft,
              y: t
                ? window.pageYOffset
                : i
                ? e.documentElement.scrollTop
                : e.body.scrollTop,
            };
          }
          function y() {
            return window.navigator.pointerEnabled
              ? { start: "pointerdown", move: "pointermove", end: "pointerup" }
              : window.navigator.msPointerEnabled
              ? {
                  start: "MSPointerDown",
                  move: "MSPointerMove",
                  end: "MSPointerUp",
                }
              : {
                  start: "mousedown touchstart",
                  move: "mousemove touchmove",
                  end: "mouseup touchend",
                };
          }
          function b() {
            var e = !1;
            try {
              var t = Object.defineProperty({}, "passive", {
                get: function () {
                  e = !0;
                },
              });
              window.addEventListener("test", null, t);
            } catch (e) {}
            return e;
          }
          function w() {
            return (
              window.CSS && CSS.supports && CSS.supports("touch-action", "none")
            );
          }
          function S(e, t) {
            return 100 / (t - e);
          }
          function C(e, t, i) {
            return (100 * t) / (e[i + 1] - e[i]);
          }
          function x(e, t) {
            return C(e, e[0] < 0 ? t + Math.abs(e[0]) : t - e[0], 0);
          }
          function T(e, t) {
            return (t * (e[1] - e[0])) / 100 + e[0];
          }
          function E(e, t) {
            for (var i = 1; e >= t[i]; ) i += 1;
            return i;
          }
          function I(e, t, i) {
            if (i >= e.slice(-1)[0]) return 100;
            var s = E(i, e),
              n = e[s - 1],
              o = e[s],
              r = t[s - 1],
              a = t[s];
            return r + x([n, o], i) / S(r, a);
          }
          function O(e, t, i) {
            if (i >= 100) return e.slice(-1)[0];
            var s = E(i, t),
              n = e[s - 1],
              o = e[s],
              r = t[s - 1];
            return T([n, o], (i - r) * S(r, t[s]));
          }
          function L(e, t, i, s) {
            if (100 === s) return s;
            var n = E(s, e),
              o = e[n - 1],
              r = e[n];
            return i
              ? s - o > (r - o) / 2
                ? r
                : o
              : t[n - 1]
              ? e[n - 1] + a(s - e[n - 1], t[n - 1])
              : s;
          }
          var P, M;
          (e.PipsMode = void 0),
            ((M = e.PipsMode || (e.PipsMode = {})).Range = "range"),
            (M.Steps = "steps"),
            (M.Positions = "positions"),
            (M.Count = "count"),
            (M.Values = "values"),
            (e.PipsType = void 0),
            ((P = e.PipsType || (e.PipsType = {}))[(P.None = -1)] = "None"),
            (P[(P.NoValue = 0)] = "NoValue"),
            (P[(P.LargeValue = 1)] = "LargeValue"),
            (P[(P.SmallValue = 2)] = "SmallValue");
          var k = (function () {
              function e(e, t, i) {
                var s;
                (this.xPct = []),
                  (this.xVal = []),
                  (this.xSteps = []),
                  (this.xNumSteps = []),
                  (this.xHighestCompleteStep = []),
                  (this.xSteps = [i || !1]),
                  (this.xNumSteps = [!1]),
                  (this.snap = t);
                var n = [];
                for (
                  Object.keys(e).forEach(function (t) {
                    n.push([h(e[t]), t]);
                  }),
                    n.sort(function (e, t) {
                      return e[0][0] - t[0][0];
                    }),
                    s = 0;
                  s < n.length;
                  s++
                )
                  this.handleEntryPoint(n[s][1], n[s][0]);
                for (
                  this.xNumSteps = this.xSteps.slice(0), s = 0;
                  s < this.xNumSteps.length;
                  s++
                )
                  this.handleStepPoint(s, this.xNumSteps[s]);
              }
              return (
                (e.prototype.getDistance = function (e) {
                  for (var t = [], i = 0; i < this.xNumSteps.length - 1; i++)
                    t[i] = C(this.xVal, e, i);
                  return t;
                }),
                (e.prototype.getAbsoluteDistance = function (e, t, i) {
                  var s,
                    n = 0;
                  if (e < this.xPct[this.xPct.length - 1])
                    for (; e > this.xPct[n + 1]; ) n++;
                  else
                    e === this.xPct[this.xPct.length - 1] &&
                      (n = this.xPct.length - 2);
                  i || e !== this.xPct[n + 1] || n++, null === t && (t = []);
                  var o = 1,
                    r = t[n],
                    a = 0,
                    l = 0,
                    d = 0,
                    c = 0;
                  for (
                    s = i
                      ? (e - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n])
                      : (this.xPct[n + 1] - e) /
                        (this.xPct[n + 1] - this.xPct[n]);
                    r > 0;

                  )
                    (a = this.xPct[n + 1 + c] - this.xPct[n + c]),
                      t[n + c] * o + 100 - 100 * s > 100
                        ? ((l = a * s), (o = (r - 100 * s) / t[n + c]), (s = 1))
                        : ((l = ((t[n + c] * a) / 100) * o), (o = 0)),
                      i
                        ? ((d -= l), this.xPct.length + c >= 1 && c--)
                        : ((d += l), this.xPct.length - c >= 1 && c++),
                      (r = t[n + c] * o);
                  return e + d;
                }),
                (e.prototype.toStepping = function (e) {
                  return (e = I(this.xVal, this.xPct, e));
                }),
                (e.prototype.fromStepping = function (e) {
                  return O(this.xVal, this.xPct, e);
                }),
                (e.prototype.getStep = function (e) {
                  return (e = L(this.xPct, this.xSteps, this.snap, e));
                }),
                (e.prototype.getDefaultStep = function (e, t, i) {
                  var s = E(e, this.xPct);
                  return (
                    (100 === e || (t && e === this.xPct[s - 1])) &&
                      (s = Math.max(s - 1, 1)),
                    (this.xVal[s] - this.xVal[s - 1]) / i
                  );
                }),
                (e.prototype.getNearbySteps = function (e) {
                  var t = E(e, this.xPct);
                  return {
                    stepBefore: {
                      startValue: this.xVal[t - 2],
                      step: this.xNumSteps[t - 2],
                      highestStep: this.xHighestCompleteStep[t - 2],
                    },
                    thisStep: {
                      startValue: this.xVal[t - 1],
                      step: this.xNumSteps[t - 1],
                      highestStep: this.xHighestCompleteStep[t - 1],
                    },
                    stepAfter: {
                      startValue: this.xVal[t],
                      step: this.xNumSteps[t],
                      highestStep: this.xHighestCompleteStep[t],
                    },
                  };
                }),
                (e.prototype.countStepDecimals = function () {
                  var e = this.xNumSteps.map(p);
                  return Math.max.apply(null, e);
                }),
                (e.prototype.hasNoSize = function () {
                  return this.xVal[0] === this.xVal[this.xVal.length - 1];
                }),
                (e.prototype.convert = function (e) {
                  return this.getStep(this.toStepping(e));
                }),
                (e.prototype.handleEntryPoint = function (e, t) {
                  var i;
                  if (
                    !d(
                      (i = "min" === e ? 0 : "max" === e ? 100 : parseFloat(e))
                    ) ||
                    !d(t[0])
                  )
                    throw new Error("noUiSlider: 'range' value isn't numeric.");
                  this.xPct.push(i), this.xVal.push(t[0]);
                  var s = Number(t[1]);
                  i
                    ? this.xSteps.push(!isNaN(s) && s)
                    : isNaN(s) || (this.xSteps[0] = s),
                    this.xHighestCompleteStep.push(0);
                }),
                (e.prototype.handleStepPoint = function (e, t) {
                  if (t)
                    if (this.xVal[e] !== this.xVal[e + 1]) {
                      this.xSteps[e] =
                        C([this.xVal[e], this.xVal[e + 1]], t, 0) /
                        S(this.xPct[e], this.xPct[e + 1]);
                      var i =
                          (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e],
                        s = Math.ceil(Number(i.toFixed(3)) - 1),
                        n = this.xVal[e] + this.xNumSteps[e] * s;
                      this.xHighestCompleteStep[e] = n;
                    } else
                      this.xSteps[e] = this.xHighestCompleteStep[e] =
                        this.xVal[e];
                }),
                e
              );
            })(),
            A = {
              to: function (e) {
                return void 0 === e ? "" : e.toFixed(2);
              },
              from: Number,
            },
            z = {
              target: "target",
              base: "base",
              origin: "origin",
              handle: "handle",
              handleLower: "handle-lower",
              handleUpper: "handle-upper",
              touchArea: "touch-area",
              horizontal: "horizontal",
              vertical: "vertical",
              background: "background",
              connect: "connect",
              connects: "connects",
              ltr: "ltr",
              rtl: "rtl",
              textDirectionLtr: "txt-dir-ltr",
              textDirectionRtl: "txt-dir-rtl",
              draggable: "draggable",
              drag: "state-drag",
              tap: "state-tap",
              active: "active",
              tooltip: "tooltip",
              pips: "pips",
              pipsHorizontal: "pips-horizontal",
              pipsVertical: "pips-vertical",
              marker: "marker",
              markerHorizontal: "marker-horizontal",
              markerVertical: "marker-vertical",
              markerNormal: "marker-normal",
              markerLarge: "marker-large",
              markerSub: "marker-sub",
              value: "value",
              valueHorizontal: "value-horizontal",
              valueVertical: "value-vertical",
              valueNormal: "value-normal",
              valueLarge: "value-large",
              valueSub: "value-sub",
            },
            $ = { tooltips: ".__tooltips", aria: ".__aria" };
          function D(e, t) {
            if (!d(t)) throw new Error("noUiSlider: 'step' is not numeric.");
            e.singleStep = t;
          }
          function _(e, t) {
            if (!d(t))
              throw new Error(
                "noUiSlider: 'keyboardPageMultiplier' is not numeric."
              );
            e.keyboardPageMultiplier = t;
          }
          function V(e, t) {
            if (!d(t))
              throw new Error(
                "noUiSlider: 'keyboardMultiplier' is not numeric."
              );
            e.keyboardMultiplier = t;
          }
          function N(e, t) {
            if (!d(t))
              throw new Error(
                "noUiSlider: 'keyboardDefaultStep' is not numeric."
              );
            e.keyboardDefaultStep = t;
          }
          function G(e, t) {
            if ("object" != typeof t || Array.isArray(t))
              throw new Error("noUiSlider: 'range' is not an object.");
            if (void 0 === t.min || void 0 === t.max)
              throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            e.spectrum = new k(t, e.snap || !1, e.singleStep);
          }
          function B(e, t) {
            if (((t = h(t)), !Array.isArray(t) || !t.length))
              throw new Error("noUiSlider: 'start' option is incorrect.");
            (e.handles = t.length), (e.start = t);
          }
          function H(e, t) {
            if ("boolean" != typeof t)
              throw new Error("noUiSlider: 'snap' option must be a boolean.");
            e.snap = t;
          }
          function F(e, t) {
            if ("boolean" != typeof t)
              throw new Error(
                "noUiSlider: 'animate' option must be a boolean."
              );
            e.animate = t;
          }
          function j(e, t) {
            if ("number" != typeof t)
              throw new Error(
                "noUiSlider: 'animationDuration' option must be a number."
              );
            e.animationDuration = t;
          }
          function X(e, t) {
            var i,
              s = [!1];
            if (
              ("lower" === t ? (t = [!0, !1]) : "upper" === t && (t = [!1, !0]),
              !0 === t || !1 === t)
            ) {
              for (i = 1; i < e.handles; i++) s.push(t);
              s.push(!1);
            } else {
              if (!Array.isArray(t) || !t.length || t.length !== e.handles + 1)
                throw new Error(
                  "noUiSlider: 'connect' option doesn't match handle count."
                );
              s = t;
            }
            e.connect = s;
          }
          function q(e, t) {
            switch (t) {
              case "horizontal":
                e.ort = 0;
                break;
              case "vertical":
                e.ort = 1;
                break;
              default:
                throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
          }
          function Y(e, t) {
            if (!d(t))
              throw new Error("noUiSlider: 'margin' option must be numeric.");
            0 !== t && (e.margin = e.spectrum.getDistance(t));
          }
          function R(e, t) {
            if (!d(t))
              throw new Error("noUiSlider: 'limit' option must be numeric.");
            if (
              ((e.limit = e.spectrum.getDistance(t)), !e.limit || e.handles < 2)
            )
              throw new Error(
                "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles."
              );
          }
          function W(e, t) {
            var i;
            if (!d(t) && !Array.isArray(t))
              throw new Error(
                "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
              );
            if (Array.isArray(t) && 2 !== t.length && !d(t[0]) && !d(t[1]))
              throw new Error(
                "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
              );
            if (0 !== t) {
              for (
                Array.isArray(t) || (t = [t, t]),
                  e.padding = [
                    e.spectrum.getDistance(t[0]),
                    e.spectrum.getDistance(t[1]),
                  ],
                  i = 0;
                i < e.spectrum.xNumSteps.length - 1;
                i++
              )
                if (e.padding[0][i] < 0 || e.padding[1][i] < 0)
                  throw new Error(
                    "noUiSlider: 'padding' option must be a positive number(s)."
                  );
              var s = t[0] + t[1],
                n = e.spectrum.xVal[0];
              if (s / (e.spectrum.xVal[e.spectrum.xVal.length - 1] - n) > 1)
                throw new Error(
                  "noUiSlider: 'padding' option must not exceed 100% of the range."
                );
            }
          }
          function U(e, t) {
            switch (t) {
              case "ltr":
                e.dir = 0;
                break;
              case "rtl":
                e.dir = 1;
                break;
              default:
                throw new Error(
                  "noUiSlider: 'direction' option was not recognized."
                );
            }
          }
          function Z(e, t) {
            if ("string" != typeof t)
              throw new Error(
                "noUiSlider: 'behaviour' must be a string containing options."
              );
            var i = t.indexOf("tap") >= 0,
              s = t.indexOf("drag") >= 0,
              n = t.indexOf("fixed") >= 0,
              o = t.indexOf("snap") >= 0,
              r = t.indexOf("hover") >= 0,
              a = t.indexOf("unconstrained") >= 0,
              l = t.indexOf("drag-all") >= 0;
            if (n) {
              if (2 !== e.handles)
                throw new Error(
                  "noUiSlider: 'fixed' behaviour must be used with 2 handles"
                );
              Y(e, e.start[1] - e.start[0]);
            }
            if (a && (e.margin || e.limit))
              throw new Error(
                "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"
              );
            e.events = {
              tap: i || o,
              drag: s,
              dragAll: l,
              fixed: n,
              snap: o,
              hover: r,
              unconstrained: a,
            };
          }
          function K(e, t) {
            if (!1 !== t)
              if (!0 === t || i(t)) {
                e.tooltips = [];
                for (var s = 0; s < e.handles; s++) e.tooltips.push(t);
              } else {
                if ((t = h(t)).length !== e.handles)
                  throw new Error(
                    "noUiSlider: must pass a formatter for all handles."
                  );
                t.forEach(function (e) {
                  if ("boolean" != typeof e && !i(e))
                    throw new Error(
                      "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
                    );
                }),
                  (e.tooltips = t);
              }
          }
          function Q(e, t) {
            if (t.length !== e.handles)
              throw new Error(
                "noUiSlider: must pass a attributes for all handles."
              );
            e.handleAttributes = t;
          }
          function J(e, t) {
            if (!i(t))
              throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
            e.ariaFormat = t;
          }
          function ee(e, i) {
            if (!t(i))
              throw new Error(
                "noUiSlider: 'format' requires 'to' and 'from' methods."
              );
            e.format = i;
          }
          function te(e, t) {
            if ("boolean" != typeof t)
              throw new Error(
                "noUiSlider: 'keyboardSupport' option must be a boolean."
              );
            e.keyboardSupport = t;
          }
          function ie(e, t) {
            e.documentElement = t;
          }
          function se(e, t) {
            if ("string" != typeof t && !1 !== t)
              throw new Error(
                "noUiSlider: 'cssPrefix' must be a string or `false`."
              );
            e.cssPrefix = t;
          }
          function ne(e, t) {
            if ("object" != typeof t)
              throw new Error("noUiSlider: 'cssClasses' must be an object.");
            "string" == typeof e.cssPrefix
              ? ((e.cssClasses = {}),
                Object.keys(t).forEach(function (i) {
                  e.cssClasses[i] = e.cssPrefix + t[i];
                }))
              : (e.cssClasses = t);
          }
          function oe(e) {
            var t = {
                margin: null,
                limit: null,
                padding: null,
                animate: !0,
                animationDuration: 300,
                ariaFormat: A,
                format: A,
              },
              i = {
                step: { r: !1, t: D },
                keyboardPageMultiplier: { r: !1, t: _ },
                keyboardMultiplier: { r: !1, t: V },
                keyboardDefaultStep: { r: !1, t: N },
                start: { r: !0, t: B },
                connect: { r: !0, t: X },
                direction: { r: !0, t: U },
                snap: { r: !1, t: H },
                animate: { r: !1, t: F },
                animationDuration: { r: !1, t: j },
                range: { r: !0, t: G },
                orientation: { r: !1, t: q },
                margin: { r: !1, t: Y },
                limit: { r: !1, t: R },
                padding: { r: !1, t: W },
                behaviour: { r: !0, t: Z },
                ariaFormat: { r: !1, t: J },
                format: { r: !1, t: ee },
                tooltips: { r: !1, t: K },
                keyboardSupport: { r: !0, t: te },
                documentElement: { r: !1, t: ie },
                cssPrefix: { r: !0, t: se },
                cssClasses: { r: !0, t: ne },
                handleAttributes: { r: !1, t: Q },
              },
              s = {
                connect: !1,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: !0,
                cssPrefix: "noUi-",
                cssClasses: z,
                keyboardPageMultiplier: 5,
                keyboardMultiplier: 1,
                keyboardDefaultStep: 10,
              };
            e.format && !e.ariaFormat && (e.ariaFormat = e.format),
              Object.keys(i).forEach(function (o) {
                if (n(e[o]) || void 0 !== s[o])
                  i[o].t(t, n(e[o]) ? e[o] : s[o]);
                else if (i[o].r)
                  throw new Error("noUiSlider: '" + o + "' is required.");
              }),
              (t.pips = e.pips);
            var o = document.createElement("div"),
              r = void 0 !== o.style.msTransform,
              a = void 0 !== o.style.transform;
            t.transformRule = a
              ? "transform"
              : r
              ? "msTransform"
              : "webkitTransform";
            var l = [
              ["left", "top"],
              ["right", "bottom"],
            ];
            return (t.style = l[t.dir][t.ort]), t;
          }
          function re(t, i, a) {
            var d,
              p,
              S,
              C,
              x,
              T = y(),
              E = w() && b(),
              I = t,
              O = i.spectrum,
              L = [],
              P = [],
              M = [],
              k = 0,
              A = {},
              z = t.ownerDocument,
              D = i.documentElement || z.documentElement,
              _ = z.body,
              V = "rtl" === z.dir || 1 === i.ort ? 0 : 100;
            function N(e, t) {
              var i = z.createElement("div");
              return t && g(i, t), e.appendChild(i), i;
            }
            function G(e, t) {
              var s = N(e, i.cssClasses.origin),
                n = N(s, i.cssClasses.handle);
              if (
                (N(n, i.cssClasses.touchArea),
                n.setAttribute("data-handle", String(t)),
                i.keyboardSupport &&
                  (n.setAttribute("tabindex", "0"),
                  n.addEventListener("keydown", function (e) {
                    return pe(e, t);
                  })),
                void 0 !== i.handleAttributes)
              ) {
                var o = i.handleAttributes[t];
                Object.keys(o).forEach(function (e) {
                  n.setAttribute(e, o[e]);
                });
              }
              return (
                n.setAttribute("role", "slider"),
                n.setAttribute(
                  "aria-orientation",
                  i.ort ? "vertical" : "horizontal"
                ),
                0 === t
                  ? g(n, i.cssClasses.handleLower)
                  : t === i.handles - 1 && g(n, i.cssClasses.handleUpper),
                s
              );
            }
            function B(e, t) {
              return !!t && N(e, i.cssClasses.connect);
            }
            function H(e, t) {
              var s = N(t, i.cssClasses.connects);
              (p = []), (S = []).push(B(s, e[0]));
              for (var n = 0; n < i.handles; n++)
                p.push(G(t, n)), (M[n] = n), S.push(B(s, e[n + 1]));
            }
            function F(e) {
              return (
                g(e, i.cssClasses.target),
                0 === i.dir ? g(e, i.cssClasses.ltr) : g(e, i.cssClasses.rtl),
                0 === i.ort
                  ? g(e, i.cssClasses.horizontal)
                  : g(e, i.cssClasses.vertical),
                g(
                  e,
                  "rtl" === getComputedStyle(e).direction
                    ? i.cssClasses.textDirectionRtl
                    : i.cssClasses.textDirectionLtr
                ),
                N(e, i.cssClasses.base)
              );
            }
            function j(e, t) {
              return (
                !(!i.tooltips || !i.tooltips[t]) &&
                N(e.firstChild, i.cssClasses.tooltip)
              );
            }
            function X() {
              return I.hasAttribute("disabled");
            }
            function q(e) {
              return p[e].hasAttribute("disabled");
            }
            function Y() {
              x &&
                (ve("update" + $.tooltips),
                x.forEach(function (e) {
                  e && s(e);
                }),
                (x = null));
            }
            function R() {
              Y(),
                (x = p.map(j)),
                me("update" + $.tooltips, function (e, t, s) {
                  if (x && i.tooltips && !1 !== x[t]) {
                    var n = e[t];
                    !0 !== i.tooltips[t] && (n = i.tooltips[t].to(s[t])),
                      (x[t].innerHTML = n);
                  }
                });
            }
            function W() {
              ve("update" + $.aria),
                me("update" + $.aria, function (e, t, s, n, o) {
                  M.forEach(function (e) {
                    var t = p[e],
                      n = be(P, e, 0, !0, !0, !0),
                      r = be(P, e, 100, !0, !0, !0),
                      a = o[e],
                      l = String(i.ariaFormat.to(s[e]));
                    (n = O.fromStepping(n).toFixed(1)),
                      (r = O.fromStepping(r).toFixed(1)),
                      (a = O.fromStepping(a).toFixed(1)),
                      t.children[0].setAttribute("aria-valuemin", n),
                      t.children[0].setAttribute("aria-valuemax", r),
                      t.children[0].setAttribute("aria-valuenow", a),
                      t.children[0].setAttribute("aria-valuetext", l);
                  });
                });
            }
            function U(t) {
              if (t.mode === e.PipsMode.Range || t.mode === e.PipsMode.Steps)
                return O.xVal;
              if (t.mode === e.PipsMode.Count) {
                if (t.values < 2)
                  throw new Error(
                    "noUiSlider: 'values' (>= 2) required for mode 'count'."
                  );
                for (var i = t.values - 1, s = 100 / i, n = []; i--; )
                  n[i] = i * s;
                return n.push(100), Z(n, t.stepped);
              }
              return t.mode === e.PipsMode.Positions
                ? Z(t.values, t.stepped)
                : t.mode === e.PipsMode.Values
                ? t.stepped
                  ? t.values.map(function (e) {
                      return O.fromStepping(O.getStep(O.toStepping(e)));
                    })
                  : t.values
                : [];
            }
            function Z(e, t) {
              return e.map(function (e) {
                return O.fromStepping(t ? O.getStep(e) : e);
              });
            }
            function K(t) {
              function i(e, t) {
                return Number((e + t).toFixed(7));
              }
              var s = U(t),
                n = {},
                o = O.xVal[0],
                a = O.xVal[O.xVal.length - 1],
                l = !1,
                d = !1,
                c = 0;
              return (
                (s = r(
                  s.slice().sort(function (e, t) {
                    return e - t;
                  })
                ))[0] !== o && (s.unshift(o), (l = !0)),
                s[s.length - 1] !== a && (s.push(a), (d = !0)),
                s.forEach(function (o, r) {
                  var a,
                    u,
                    h,
                    p,
                    g,
                    m,
                    f,
                    v,
                    y,
                    b,
                    w = o,
                    S = s[r + 1],
                    C = t.mode === e.PipsMode.Steps;
                  for (
                    C && (a = O.xNumSteps[r]),
                      a || (a = S - w),
                      void 0 === S && (S = w),
                      a = Math.max(a, 1e-7),
                      u = w;
                    u <= S;
                    u = i(u, a)
                  ) {
                    for (
                      v = (g = (p = O.toStepping(u)) - c) / (t.density || 1),
                        b = g / (y = Math.round(v)),
                        h = 1;
                      h <= y;
                      h += 1
                    )
                      n[(m = c + h * b).toFixed(5)] = [O.fromStepping(m), 0];
                    (f =
                      s.indexOf(u) > -1
                        ? e.PipsType.LargeValue
                        : C
                        ? e.PipsType.SmallValue
                        : e.PipsType.NoValue),
                      !r && l && u !== S && (f = 0),
                      (u === S && d) || (n[p.toFixed(5)] = [u, f]),
                      (c = p);
                  }
                }),
                n
              );
            }
            function Q(t, s, n) {
              var o,
                r,
                a = z.createElement("div"),
                l =
                  (((o = {})[e.PipsType.None] = ""),
                  (o[e.PipsType.NoValue] = i.cssClasses.valueNormal),
                  (o[e.PipsType.LargeValue] = i.cssClasses.valueLarge),
                  (o[e.PipsType.SmallValue] = i.cssClasses.valueSub),
                  o),
                d =
                  (((r = {})[e.PipsType.None] = ""),
                  (r[e.PipsType.NoValue] = i.cssClasses.markerNormal),
                  (r[e.PipsType.LargeValue] = i.cssClasses.markerLarge),
                  (r[e.PipsType.SmallValue] = i.cssClasses.markerSub),
                  r),
                c = [i.cssClasses.valueHorizontal, i.cssClasses.valueVertical],
                u = [
                  i.cssClasses.markerHorizontal,
                  i.cssClasses.markerVertical,
                ];
              function h(e, t) {
                var s = t === i.cssClasses.value,
                  n = s ? l : d;
                return t + " " + (s ? c : u)[i.ort] + " " + n[e];
              }
              function p(t, o, r) {
                if ((r = s ? s(o, r) : r) !== e.PipsType.None) {
                  var l = N(a, !1);
                  (l.className = h(r, i.cssClasses.marker)),
                    (l.style[i.style] = t + "%"),
                    r > e.PipsType.NoValue &&
                      (((l = N(a, !1)).className = h(r, i.cssClasses.value)),
                      l.setAttribute("data-value", String(o)),
                      (l.style[i.style] = t + "%"),
                      (l.innerHTML = String(n.to(o))));
                }
              }
              return (
                g(a, i.cssClasses.pips),
                g(
                  a,
                  0 === i.ort
                    ? i.cssClasses.pipsHorizontal
                    : i.cssClasses.pipsVertical
                ),
                Object.keys(t).forEach(function (e) {
                  p(e, t[e][0], t[e][1]);
                }),
                a
              );
            }
            function J() {
              C && (s(C), (C = null));
            }
            function ee(e) {
              J();
              var t = K(e),
                i = e.filter,
                s = e.format || {
                  to: function (e) {
                    return String(Math.round(e));
                  },
                };
              return (C = I.appendChild(Q(t, i, s)));
            }
            function te() {
              var e = d.getBoundingClientRect(),
                t = "offset" + ["Width", "Height"][i.ort];
              return 0 === i.ort ? e.width || d[t] : e.height || d[t];
            }
            function ie(e, t, s, n) {
              var o = function (o) {
                  var r = se(o, n.pageOffset, n.target || t);
                  return (
                    !!r &&
                    !(X() && !n.doNotReject) &&
                    !(f(I, i.cssClasses.tap) && !n.doNotReject) &&
                    !(e === T.start && void 0 !== r.buttons && r.buttons > 1) &&
                    (!n.hover || !r.buttons) &&
                    (E || r.preventDefault(),
                    (r.calcPoint = r.points[i.ort]),
                    void s(r, n))
                  );
                },
                r = [];
              return (
                e.split(" ").forEach(function (e) {
                  t.addEventListener(e, o, !!E && { passive: !0 }),
                    r.push([e, o]);
                }),
                r
              );
            }
            function se(e, t, i) {
              var s = 0 === e.type.indexOf("touch"),
                n = 0 === e.type.indexOf("mouse"),
                o = 0 === e.type.indexOf("pointer"),
                r = 0,
                a = 0;
              if (
                (0 === e.type.indexOf("MSPointer") && (o = !0),
                "mousedown" === e.type && !e.buttons && !e.touches)
              )
                return !1;
              if (s) {
                var l = function (t) {
                  var s = t.target;
                  return (
                    s === i ||
                    i.contains(s) ||
                    (e.composed && e.composedPath().shift() === i)
                  );
                };
                if ("touchstart" === e.type) {
                  var d = Array.prototype.filter.call(e.touches, l);
                  if (d.length > 1) return !1;
                  (r = d[0].pageX), (a = d[0].pageY);
                } else {
                  var c = Array.prototype.find.call(e.changedTouches, l);
                  if (!c) return !1;
                  (r = c.pageX), (a = c.pageY);
                }
              }
              return (
                (t = t || v(z)),
                (n || o) && ((r = e.clientX + t.x), (a = e.clientY + t.y)),
                (e.pageOffset = t),
                (e.points = [r, a]),
                (e.cursor = n || o),
                e
              );
            }
            function ne(e) {
              var t = (100 * (e - l(d, i.ort))) / te();
              return (t = u(t)), i.dir ? 100 - t : t;
            }
            function re(e) {
              var t = 100,
                i = !1;
              return (
                p.forEach(function (s, n) {
                  if (!q(n)) {
                    var o = P[n],
                      r = Math.abs(o - e);
                    (r < t || (r <= t && e > o) || (100 === r && 100 === t)) &&
                      ((i = n), (t = r));
                  }
                }),
                i
              );
            }
            function ae(e, t) {
              "mouseout" === e.type &&
                "HTML" === e.target.nodeName &&
                null === e.relatedTarget &&
                de(e, t);
            }
            function le(e, t) {
              if (
                -1 === navigator.appVersion.indexOf("MSIE 9") &&
                0 === e.buttons &&
                0 !== t.buttonsProperty
              )
                return de(e, t);
              var s = (i.dir ? -1 : 1) * (e.calcPoint - t.startCalcPoint);
              Se(
                s > 0,
                (100 * s) / t.baseSize,
                t.locations,
                t.handleNumbers,
                t.connect
              );
            }
            function de(e, t) {
              t.handle && (m(t.handle, i.cssClasses.active), (k -= 1)),
                t.listeners.forEach(function (e) {
                  D.removeEventListener(e[0], e[1]);
                }),
                0 === k &&
                  (m(I, i.cssClasses.drag),
                  Te(),
                  e.cursor &&
                    ((_.style.cursor = ""),
                    _.removeEventListener("selectstart", o))),
                t.handleNumbers.forEach(function (e) {
                  ye("change", e), ye("set", e), ye("end", e);
                });
            }
            function ce(e, t) {
              if (!t.handleNumbers.some(q)) {
                var s;
                1 === t.handleNumbers.length &&
                  ((s = p[t.handleNumbers[0]].children[0]),
                  (k += 1),
                  g(s, i.cssClasses.active)),
                  e.stopPropagation();
                var n = [],
                  r = ie(T.move, D, le, {
                    target: e.target,
                    handle: s,
                    connect: t.connect,
                    listeners: n,
                    startCalcPoint: e.calcPoint,
                    baseSize: te(),
                    pageOffset: e.pageOffset,
                    handleNumbers: t.handleNumbers,
                    buttonsProperty: e.buttons,
                    locations: P.slice(),
                  }),
                  a = ie(T.end, D, de, {
                    target: e.target,
                    handle: s,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: t.handleNumbers,
                  }),
                  l = ie("mouseout", D, ae, {
                    target: e.target,
                    handle: s,
                    listeners: n,
                    doNotReject: !0,
                    handleNumbers: t.handleNumbers,
                  });
                n.push.apply(n, r.concat(a, l)),
                  e.cursor &&
                    ((_.style.cursor = getComputedStyle(e.target).cursor),
                    p.length > 1 && g(I, i.cssClasses.drag),
                    _.addEventListener("selectstart", o, !1)),
                  t.handleNumbers.forEach(function (e) {
                    ye("start", e);
                  });
              }
            }
            function ue(e) {
              e.stopPropagation();
              var t = ne(e.calcPoint),
                s = re(t);
              !1 !== s &&
                (i.events.snap || c(I, i.cssClasses.tap, i.animationDuration),
                Ee(s, t, !0, !0),
                Te(),
                ye("slide", s, !0),
                ye("update", s, !0),
                i.events.snap
                  ? ce(e, { handleNumbers: [s] })
                  : (ye("change", s, !0), ye("set", s, !0)));
            }
            function he(e) {
              var t = ne(e.calcPoint),
                i = O.getStep(t),
                s = O.fromStepping(i);
              Object.keys(A).forEach(function (e) {
                "hover" === e.split(".")[0] &&
                  A[e].forEach(function (e) {
                    e.call(Ve, s);
                  });
              });
            }
            function pe(e, t) {
              if (X() || q(t)) return !1;
              var s = ["Left", "Right"],
                n = ["Down", "Up"],
                o = ["PageDown", "PageUp"],
                r = ["Home", "End"];
              i.dir && !i.ort
                ? s.reverse()
                : i.ort && !i.dir && (n.reverse(), o.reverse());
              var a,
                l = e.key.replace("Arrow", ""),
                d = l === o[0],
                c = l === o[1],
                u = l === n[0] || l === s[0] || d,
                h = l === n[1] || l === s[1] || c,
                p = l === r[0],
                g = l === r[1];
              if (!(u || h || p || g)) return !0;
              if ((e.preventDefault(), h || u)) {
                var m = u ? 0 : 1,
                  f = ze(t)[m];
                if (null === f) return !1;
                !1 === f &&
                  (f = O.getDefaultStep(P[t], u, i.keyboardDefaultStep)),
                  (f *=
                    c || d ? i.keyboardPageMultiplier : i.keyboardMultiplier),
                  (f = Math.max(f, 1e-7)),
                  (f *= u ? -1 : 1),
                  (a = L[t] + f);
              } else
                a = g
                  ? i.spectrum.xVal[i.spectrum.xVal.length - 1]
                  : i.spectrum.xVal[0];
              return (
                Ee(t, O.toStepping(a), !0, !0),
                ye("slide", t),
                ye("update", t),
                ye("change", t),
                ye("set", t),
                !1
              );
            }
            function ge(e) {
              e.fixed ||
                p.forEach(function (e, t) {
                  ie(T.start, e.children[0], ce, { handleNumbers: [t] });
                }),
                e.tap && ie(T.start, d, ue, {}),
                e.hover && ie(T.move, d, he, { hover: !0 }),
                e.drag &&
                  S.forEach(function (t, s) {
                    if (!1 !== t && 0 !== s && s !== S.length - 1) {
                      var n = p[s - 1],
                        o = p[s],
                        r = [t],
                        a = [n, o],
                        l = [s - 1, s];
                      g(t, i.cssClasses.draggable),
                        e.fixed &&
                          (r.push(n.children[0]), r.push(o.children[0])),
                        e.dragAll && ((a = p), (l = M)),
                        r.forEach(function (e) {
                          ie(T.start, e, ce, {
                            handles: a,
                            handleNumbers: l,
                            connect: t,
                          });
                        });
                    }
                  });
            }
            function me(e, t) {
              (A[e] = A[e] || []),
                A[e].push(t),
                "update" === e.split(".")[0] &&
                  p.forEach(function (e, t) {
                    ye("update", t);
                  });
            }
            function fe(e) {
              return e === $.aria || e === $.tooltips;
            }
            function ve(e) {
              var t = e && e.split(".")[0],
                i = t ? e.substring(t.length) : e;
              Object.keys(A).forEach(function (e) {
                var s = e.split(".")[0],
                  n = e.substring(s.length);
                (t && t !== s) ||
                  (i && i !== n) ||
                  (fe(n) && i !== n) ||
                  delete A[e];
              });
            }
            function ye(e, t, s) {
              Object.keys(A).forEach(function (n) {
                var o = n.split(".")[0];
                e === o &&
                  A[n].forEach(function (e) {
                    e.call(
                      Ve,
                      L.map(i.format.to),
                      t,
                      L.slice(),
                      s || !1,
                      P.slice(),
                      Ve
                    );
                  });
              });
            }
            function be(e, t, s, n, o, r) {
              var a;
              return (
                p.length > 1 &&
                  !i.events.unconstrained &&
                  (n &&
                    t > 0 &&
                    ((a = O.getAbsoluteDistance(e[t - 1], i.margin, !1)),
                    (s = Math.max(s, a))),
                  o &&
                    t < p.length - 1 &&
                    ((a = O.getAbsoluteDistance(e[t + 1], i.margin, !0)),
                    (s = Math.min(s, a)))),
                p.length > 1 &&
                  i.limit &&
                  (n &&
                    t > 0 &&
                    ((a = O.getAbsoluteDistance(e[t - 1], i.limit, !1)),
                    (s = Math.min(s, a))),
                  o &&
                    t < p.length - 1 &&
                    ((a = O.getAbsoluteDistance(e[t + 1], i.limit, !0)),
                    (s = Math.max(s, a)))),
                i.padding &&
                  (0 === t &&
                    ((a = O.getAbsoluteDistance(0, i.padding[0], !1)),
                    (s = Math.max(s, a))),
                  t === p.length - 1 &&
                    ((a = O.getAbsoluteDistance(100, i.padding[1], !0)),
                    (s = Math.min(s, a)))),
                !((s = u((s = O.getStep(s)))) === e[t] && !r) && s
              );
            }
            function we(e, t) {
              var s = i.ort;
              return (s ? t : e) + ", " + (s ? e : t);
            }
            function Se(e, t, i, s, n) {
              var o = i.slice(),
                r = s[0],
                a = [!e, e],
                l = [e, !e];
              (s = s.slice()),
                e && s.reverse(),
                s.length > 1
                  ? s.forEach(function (e, i) {
                      var s = be(o, e, o[e] + t, a[i], l[i], !1);
                      !1 === s ? (t = 0) : ((t = s - o[e]), (o[e] = s));
                    })
                  : (a = l = [!0]);
              var d = !1;
              s.forEach(function (e, s) {
                d = Ee(e, i[e] + t, a[s], l[s]) || d;
              }),
                d &&
                  (s.forEach(function (e) {
                    ye("update", e), ye("slide", e);
                  }),
                  null != n && ye("drag", r));
            }
            function Ce(e, t) {
              return i.dir ? 100 - e - t : e;
            }
            function xe(e, t) {
              (P[e] = t), (L[e] = O.fromStepping(t));
              var s = "translate(" + we(Ce(t, 0) - V + "%", "0") + ")";
              (p[e].style[i.transformRule] = s), Ie(e), Ie(e + 1);
            }
            function Te() {
              M.forEach(function (e) {
                var t = P[e] > 50 ? -1 : 1,
                  i = 3 + (p.length + t * e);
                p[e].style.zIndex = String(i);
              });
            }
            function Ee(e, t, i, s, n) {
              return (
                n || (t = be(P, e, t, i, s, !1)), !1 !== t && (xe(e, t), !0)
              );
            }
            function Ie(e) {
              if (S[e]) {
                var t = 0,
                  s = 100;
                0 !== e && (t = P[e - 1]), e !== S.length - 1 && (s = P[e]);
                var n = s - t,
                  o = "translate(" + we(Ce(t, n) + "%", "0") + ")",
                  r = "scale(" + we(n / 100, "1") + ")";
                S[e].style[i.transformRule] = o + " " + r;
              }
            }
            function Oe(e, t) {
              return null === e || !1 === e || void 0 === e
                ? P[t]
                : ("number" == typeof e && (e = String(e)),
                  !1 !== (e = i.format.from(e)) && (e = O.toStepping(e)),
                  !1 === e || isNaN(e) ? P[t] : e);
            }
            function Le(e, t, s) {
              var n = h(e),
                o = void 0 === P[0];
              (t = void 0 === t || t),
                i.animate && !o && c(I, i.cssClasses.tap, i.animationDuration),
                M.forEach(function (e) {
                  Ee(e, Oe(n[e], e), !0, !1, s);
                });
              var r = 1 === M.length ? 0 : 1;
              if (o && O.hasNoSize() && ((s = !0), (P[0] = 0), M.length > 1)) {
                var a = 100 / (M.length - 1);
                M.forEach(function (e) {
                  P[e] = e * a;
                });
              }
              for (; r < M.length; ++r)
                M.forEach(function (e) {
                  Ee(e, P[e], !0, !0, s);
                });
              Te(),
                M.forEach(function (e) {
                  ye("update", e), null !== n[e] && t && ye("set", e);
                });
            }
            function Pe(e) {
              Le(i.start, e);
            }
            function Me(e, t, i, s) {
              if (!((e = Number(e)) >= 0 && e < M.length))
                throw new Error("noUiSlider: invalid handle number, got: " + e);
              Ee(e, Oe(t, e), !0, !0, s), ye("update", e), i && ye("set", e);
            }
            function ke(e) {
              if ((void 0 === e && (e = !1), e))
                return 1 === L.length ? L[0] : L.slice(0);
              var t = L.map(i.format.to);
              return 1 === t.length ? t[0] : t;
            }
            function Ae() {
              for (
                ve($.aria),
                  ve($.tooltips),
                  Object.keys(i.cssClasses).forEach(function (e) {
                    m(I, i.cssClasses[e]);
                  });
                I.firstChild;

              )
                I.removeChild(I.firstChild);
              delete I.noUiSlider;
            }
            function ze(e) {
              var t = P[e],
                s = O.getNearbySteps(t),
                n = L[e],
                o = s.thisStep.step,
                r = null;
              if (i.snap)
                return [
                  n - s.stepBefore.startValue || null,
                  s.stepAfter.startValue - n || null,
                ];
              !1 !== o &&
                n + o > s.stepAfter.startValue &&
                (o = s.stepAfter.startValue - n),
                (r =
                  n > s.thisStep.startValue
                    ? s.thisStep.step
                    : !1 !== s.stepBefore.step && n - s.stepBefore.highestStep),
                100 === t ? (o = null) : 0 === t && (r = null);
              var a = O.countStepDecimals();
              return (
                null !== o && !1 !== o && (o = Number(o.toFixed(a))),
                null !== r && !1 !== r && (r = Number(r.toFixed(a))),
                [r, o]
              );
            }
            function $e() {
              return M.map(ze);
            }
            function De(e, t) {
              var s = ke(),
                o = [
                  "margin",
                  "limit",
                  "padding",
                  "range",
                  "animate",
                  "snap",
                  "step",
                  "format",
                  "pips",
                  "tooltips",
                ];
              o.forEach(function (t) {
                void 0 !== e[t] && (a[t] = e[t]);
              });
              var r = oe(a);
              o.forEach(function (t) {
                void 0 !== e[t] && (i[t] = r[t]);
              }),
                (O = r.spectrum),
                (i.margin = r.margin),
                (i.limit = r.limit),
                (i.padding = r.padding),
                i.pips ? ee(i.pips) : J(),
                i.tooltips ? R() : Y(),
                (P = []),
                Le(n(e.start) ? e.start : s, t);
            }
            function _e() {
              (d = F(I)),
                H(i.connect, d),
                ge(i.events),
                Le(i.start),
                i.pips && ee(i.pips),
                i.tooltips && R(),
                W();
            }
            _e();
            var Ve = {
              destroy: Ae,
              steps: $e,
              on: me,
              off: ve,
              get: ke,
              set: Le,
              setHandle: Me,
              reset: Pe,
              __moveHandles: function (e, t, i) {
                Se(e, t, P, i);
              },
              options: a,
              updateOptions: De,
              target: I,
              removePips: J,
              removeTooltips: Y,
              getPositions: function () {
                return P.slice();
              },
              getTooltips: function () {
                return x;
              },
              getOrigins: function () {
                return p;
              },
              pips: ee,
            };
            return Ve;
          }
          function ae(e, t) {
            if (!e || !e.nodeName)
              throw new Error(
                "noUiSlider: create requires a single element, got: " + e
              );
            if (e.noUiSlider)
              throw new Error("noUiSlider: Slider was already initialized.");
            var i = re(e, oe(t), t);
            return (e.noUiSlider = i), i;
          }
          var le = { __spectrum: k, cssClasses: z, create: ae };
          (e.create = ae),
            (e.cssClasses = z),
            (e.default = le),
            Object.defineProperty(e, "__esModule", { value: !0 });
        })(t);
      },
      2: function (e, t, i) {
        var s, n;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (e) {
            var t,
              i = (this.document || this.ownerDocument).querySelectorAll(e),
              s = this;
            do {
              for (t = i.length; 0 <= --t && i.item(t) !== s; );
            } while (t < 0 && (s = s.parentElement));
            return s;
          }),
          (function () {
            function e(e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
            }
            "function" != typeof window.CustomEvent &&
              ((e.prototype = window.Event.prototype),
              (window.CustomEvent = e));
          })(),
          (function () {
            for (
              var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0;
              i < t.length && !window.requestAnimationFrame;
              ++i
            )
              (window.requestAnimationFrame =
                window[t[i] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[t[i] + "CancelAnimationFrame"] ||
                  window[t[i] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (t, i) {
                var s = new Date().getTime(),
                  n = Math.max(0, 16 - (s - e)),
                  o = window.setTimeout(function () {
                    t(s + n);
                  }, n);
                return (e = s + n), o;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (e) {
                  clearTimeout(e);
                });
          })(),
          (n =
            void 0 !== i.g
              ? i.g
              : "undefined" != typeof window
              ? window
              : this),
          (s = function () {
            return (function (e) {
              "use strict";
              var t = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                i = function () {
                  var e = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (t) {
                      for (var i in t) {
                        if (!t.hasOwnProperty(i)) return;
                        e[i] = t[i];
                      }
                    }),
                    e
                  );
                },
                s = function (e) {
                  "#" === e.charAt(0) && (e = e.substr(1));
                  for (
                    var t,
                      i = String(e),
                      s = i.length,
                      n = -1,
                      o = "",
                      r = i.charCodeAt(0);
                    ++n < s;

                  ) {
                    if (0 === (t = i.charCodeAt(n)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    o +=
                      (1 <= t && t <= 31) ||
                      127 == t ||
                      (0 === n && 48 <= t && t <= 57) ||
                      (1 === n && 48 <= t && t <= 57 && 45 === r)
                        ? "\\" + t.toString(16) + " "
                        : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? i.charAt(n)
                        : "\\" + i.charAt(n);
                  }
                  return "#" + o;
                },
                n = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                o = function (t) {
                  return t
                    ? ((i = t),
                      parseInt(e.getComputedStyle(i).height, 10) + t.offsetTop)
                    : 0;
                  var i;
                },
                r = function (t, i, s) {
                  0 === t && document.body.focus(),
                    s ||
                      (t.focus(),
                      document.activeElement !== t &&
                        (t.setAttribute("tabindex", "-1"),
                        t.focus(),
                        (t.style.outline = "none")),
                      e.scrollTo(0, i));
                },
                a = function (t, i, s, n) {
                  if (i.emitEvents && "function" == typeof e.CustomEvent) {
                    var o = new CustomEvent(t, {
                      bubbles: !0,
                      detail: { anchor: s, toggle: n },
                    });
                    document.dispatchEvent(o);
                  }
                };
              return function (l, d) {
                var c,
                  u,
                  h,
                  p,
                  g = {
                    cancelScroll: function (e) {
                      cancelAnimationFrame(p),
                        (p = null),
                        e || a("scrollCancel", c);
                    },
                    animateScroll: function (s, l, d) {
                      g.cancelScroll();
                      var u = i(c || t, d || {}),
                        m =
                          "[object Number]" ===
                          Object.prototype.toString.call(s),
                        f = m || !s.tagName ? null : s;
                      if (m || f) {
                        var v = e.pageYOffset;
                        u.header &&
                          !h &&
                          (h = document.querySelector(u.header));
                        var y,
                          b,
                          w,
                          S,
                          C,
                          x,
                          T,
                          E,
                          I = o(h),
                          O = m
                            ? s
                            : (function (t, i, s, o) {
                                var r = 0;
                                if (t.offsetParent)
                                  for (
                                    ;
                                    (r += t.offsetTop), (t = t.offsetParent);

                                  );
                                return (
                                  (r = Math.max(r - i - s, 0)),
                                  o && (r = Math.min(r, n() - e.innerHeight)),
                                  r
                                );
                              })(
                                f,
                                I,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(s, l)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          L = O - v,
                          P = n(),
                          M = 0,
                          k =
                            ((y = L),
                            (w = (b = u).speedAsDuration
                              ? b.speed
                              : Math.abs((y / 1e3) * b.speed)),
                            b.durationMax && w > b.durationMax
                              ? b.durationMax
                              : b.durationMin && w < b.durationMin
                              ? b.durationMin
                              : parseInt(w, 10)),
                          A = function (t) {
                            var i, n, o;
                            S || (S = t),
                              (M += t - S),
                              (x =
                                v +
                                L *
                                  ((n = C =
                                    1 < (C = 0 === k ? 0 : M / k) ? 1 : C),
                                  "easeInQuad" === (i = u).easing &&
                                    (o = n * n),
                                  "easeOutQuad" === i.easing &&
                                    (o = n * (2 - n)),
                                  "easeInOutQuad" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 2 * n * n
                                        : (4 - 2 * n) * n - 1),
                                  "easeInCubic" === i.easing && (o = n * n * n),
                                  "easeOutCubic" === i.easing &&
                                    (o = --n * n * n + 1),
                                  "easeInOutCubic" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 4 * n * n * n
                                        : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                          1),
                                  "easeInQuart" === i.easing &&
                                    (o = n * n * n * n),
                                  "easeOutQuart" === i.easing &&
                                    (o = 1 - --n * n * n * n),
                                  "easeInOutQuart" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 8 * n * n * n * n
                                        : 1 - 8 * --n * n * n * n),
                                  "easeInQuint" === i.easing &&
                                    (o = n * n * n * n * n),
                                  "easeOutQuint" === i.easing &&
                                    (o = 1 + --n * n * n * n * n),
                                  "easeInOutQuint" === i.easing &&
                                    (o =
                                      n < 0.5
                                        ? 16 * n * n * n * n * n
                                        : 1 + 16 * --n * n * n * n * n),
                                  i.customEasing && (o = i.customEasing(n)),
                                  o || n)),
                              e.scrollTo(0, Math.floor(x)),
                              (function (t, i) {
                                var n = e.pageYOffset;
                                if (
                                  t == i ||
                                  n == i ||
                                  (v < i && e.innerHeight + n) >= P
                                )
                                  return (
                                    g.cancelScroll(!0),
                                    r(s, i, m),
                                    a("scrollStop", u, s, l),
                                    !(p = S = null)
                                  );
                              })(x, O) ||
                                ((p = e.requestAnimationFrame(A)), (S = t));
                          };
                        0 === e.pageYOffset && e.scrollTo(0, 0),
                          (T = s),
                          (E = u),
                          m ||
                            (history.pushState &&
                              E.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(E),
                                  anchor: T.id,
                                },
                                document.title,
                                T === document.documentElement
                                  ? "#top"
                                  : "#" + T.id
                              )),
                          "matchMedia" in e &&
                          e.matchMedia("(prefers-reduced-motion)").matches
                            ? r(s, Math.floor(O), !1)
                            : (a("scrollStart", u, s, l),
                              g.cancelScroll(!0),
                              e.requestAnimationFrame(A));
                      }
                    },
                  },
                  m = function (t) {
                    if (
                      !t.defaultPrevented &&
                      !(
                        0 !== t.button ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey
                      ) &&
                      "closest" in t.target &&
                      (u = t.target.closest(l)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !t.target.closest(c.ignore) &&
                      u.hostname === e.location.hostname &&
                      u.pathname === e.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var i, n;
                      try {
                        i = s(decodeURIComponent(u.hash));
                      } catch (t) {
                        i = s(u.hash);
                      }
                      if ("#" === i) {
                        if (!c.topOnEmptyHash) return;
                        n = document.documentElement;
                      } else n = document.querySelector(i);
                      (n = n || "#top" !== i ? n : document.documentElement) &&
                        (t.preventDefault(),
                        (function (t) {
                          if (
                            history.replaceState &&
                            t.updateURL &&
                            !history.state
                          ) {
                            var i = e.location.hash;
                            (i = i || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(t),
                                  anchor: i || e.pageYOffset,
                                },
                                document.title,
                                i || e.location.href
                              );
                          }
                        })(c),
                        g.animateScroll(n, u));
                    }
                  },
                  f = function (e) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(c)
                    ) {
                      var t = history.state.anchor;
                      ("string" == typeof t &&
                        t &&
                        !(t = document.querySelector(
                          s(history.state.anchor)
                        ))) ||
                        g.animateScroll(t, null, { updateURL: !1 });
                    }
                  };
                return (
                  (g.destroy = function () {
                    c &&
                      (document.removeEventListener("click", m, !1),
                      e.removeEventListener("popstate", f, !1),
                      g.cancelScroll(),
                      (p = h = u = c = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in e &&
                        "requestAnimationFrame" in e &&
                        "closest" in e.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    g.destroy(),
                      (c = i(t, d || {})),
                      (h = c.header ? document.querySelector(c.header) : null),
                      document.addEventListener("click", m, !1),
                      c.updateURL &&
                        c.popstate &&
                        e.addEventListener("popstate", f, !1);
                  })(),
                  g
                );
              };
            })(n);
          }.apply(t, [])),
          void 0 === s || (e.exports = s);
      },
    },
    t = {};
  function i(s) {
    var n = t[s];
    if (void 0 !== n) return n.exports;
    var o = (t[s] = { exports: {} });
    return e[s].call(o.exports, o, o.exports, i), o.exports;
  }
  (i.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      class e {
        constructor(e) {
          let t = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...t,
              ...e,
              classes: { ...t.classes, ...e?.classes },
              hashSettings: { ...t.hashSettings, ...e?.hashSettings },
              on: { ...t.on, ...e?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (e) {
              const t = e.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (t)
                return (
                  e.preventDefault(),
                  (this._dataValue = t.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? t.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = t),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${t.classList}`
                      )
                );
              return e.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (e) {
                if (
                  this.options.closeEsc &&
                  27 == e.which &&
                  "Escape" === e.code &&
                  this.isOpen
                )
                  return e.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == e.which &&
                  this.isOpen &&
                  this._focusCatch(e);
              }.bind(this)
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (e) {
                  const t = e.detail.form.dataset.popupMessage;
                  t && this.open(t);
                }.bind(this)
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(e) {
          if (
            (e &&
              "string" == typeof e &&
              "" !== e.trim() &&
              ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                t = document.createElement("iframe");
              t.setAttribute("allowfullscreen", "");
              const i = this.options.setAutoplayYoutube ? "autoplay;" : "";
              t.setAttribute("allow", `${i}; encrypted-media`),
                t.setAttribute("src", e),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(t);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : r(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("Открыл попап");
          } else
            this.popupLogging(
              "Ой ой, такого попапа нет. Проверьте корректность ввода. "
            );
        }
        close(e) {
          e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            (this.previousOpen.selector = e),
            this.isOpen &&
              o &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                r(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let e = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${e}"]`
          ) &&
            e &&
            this.open(e);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
          const t = this.targetOpen.element.querySelectorAll(this._focusEl),
            i = Array.prototype.slice.call(t),
            s = i.indexOf(document.activeElement);
          e.shiftKey &&
            0 === s &&
            (i[i.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              s !== i.length - 1 ||
              (i[0].focus(), e.preventDefault());
        }
        _focusTrap() {
          const e = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : e[0].focus();
        }
        popupLogging(e) {
          this.options.logging && d(`[Попапос]: ${e}`);
        }
      }
      let t = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
          );
        },
      };
      let s = (e, t = 500, i = 0) => {
          e.classList.contains("_slide") ||
            (e.classList.add("_slide"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = `${e.offsetHeight}px`),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = i ? `${i}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
              (e.hidden = !i),
                !i && e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                !i && e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t));
        },
        n = (e, t = 500, i = 0) => {
          if (!e.classList.contains("_slide")) {
            e.classList.add("_slide"),
              (e.hidden = !e.hidden && null),
              i && e.style.removeProperty("height");
            let s = e.offsetHeight;
            (e.style.overflow = "hidden"),
              (e.style.height = i ? `${i}px` : "0px"),
              (e.style.paddingTop = 0),
              (e.style.paddingBottom = 0),
              (e.style.marginTop = 0),
              (e.style.marginBottom = 0),
              e.offsetHeight,
              (e.style.transitionProperty = "height, margin, padding"),
              (e.style.transitionDuration = t + "ms"),
              (e.style.height = s + "px"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property"),
                  e.classList.remove("_slide");
              }, t);
          }
        },
        o = !0,
        r = (e = 500) => {
          document.documentElement.classList.contains("lock") ? a(e) : l(e);
        },
        a = (e = 500) => {
          let t = document.querySelector("body");
          if (o) {
            let i = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let e = 0; e < i.length; e++) {
                i[e].style.paddingRight = "0px";
              }
              (t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, e),
              (o = !1),
              setTimeout(function () {
                o = !0;
              }, e);
          }
        },
        l = (e = 500) => {
          let t = document.querySelector("body");
          if (o) {
            let i = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < i.length; e++) {
              i[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (o = !1),
              setTimeout(function () {
                o = !0;
              }, e);
          }
        };
      function d(e) {
        setTimeout(() => {
          window.FLS && console.log(e);
        }, 0);
      }
      function c(e, t) {
        const i = Array.from(e).filter(function (e, i, s) {
          if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (i.length) {
          const e = [];
          i.forEach((i) => {
            const s = {},
              n = i.dataset[t].split(",");
            (s.value = n[0]),
              (s.type = n[1] ? n[1].trim() : "max"),
              (s.item = i),
              e.push(s);
          });
          let s = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          s = (function (e) {
            return e.filter(function (e, t, i) {
              return i.indexOf(e) === t;
            });
          })(s);
          const n = [];
          if (s.length)
            return (
              s.forEach((t) => {
                const i = t.split(","),
                  s = i[1],
                  o = i[2],
                  r = window.matchMedia(i[0]),
                  a = e.filter(function (e) {
                    if (e.value === s && e.type === o) return !0;
                  });
                n.push({ itemsArray: a, matchMedia: r });
              }),
              n
            );
        }
      }
      var u = i(2);
      let h = (e, t = !1, i = 500, s = 0) => {
        const n = document.querySelector(e);
        if (n) {
          let o = "",
            r = 0;
          t &&
            ((o = "header.header"),
            (r = document.querySelector(o).offsetHeight));
          let l = {
            speedAsDuration: !0,
            speed: i,
            header: o,
            offset: s,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (a(), document.documentElement.classList.remove("menu-open")),
            void 0 !== u)
          )
            new u().animateScroll(n, "", l);
          else {
            let e = n.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: r ? e - r : e, behavior: "smooth" });
          }
          d(`[gotoBlock]: Юхуу...едем к ${e}`);
        } else d(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
      };
      class p {
        constructor(e, t = null) {
          if (
            ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
            (this.masks = { phone: { ua: "+38(999)999-99-99" } }),
            this.config.init)
          ) {
            const e = t
              ? document.querySelectorAll(t)
              : document.querySelectorAll("[data-mask]");
            e.length
              ? (this.initMasks(e),
                this.setLogging(`Проснулся, построил масок: (${e.length})`),
                document.querySelector("._mask-init") && this.setActions())
              : this.setLogging("Нет ни одной маски. Сплю...zzZZZzZZz...");
          }
        }
        setActions() {
          document.addEventListener("input", this.maskActions.bind(this)),
            document.addEventListener("focusin", this.maskActions.bind(this)),
            document.addEventListener("focusout", this.maskActions.bind(this)),
            document.addEventListener("keydown", this.maskActions.bind(this));
        }
        initMasks(e) {
          e.forEach((e) => {
            this.initMask(e);
          });
        }
        initMask(e) {
          const t = this.getMask(e);
          t && this.setMask(e, t);
        }
        getMask(e) {
          const t = e.dataset.mask ? e.dataset.mask.split(",") : "",
            i = t[0] ? t[0] : null;
          if (!i) return void this.setLogging(`Маска для ${e} не заполнена!`);
          let s = t[1] ? t[1] : null;
          return (
            "phone" === i &&
              (!s && (s = "ua"), this.masks[i][s] && (s = this.masks[i][s])),
            s
          );
        }
        setMask(e, t) {
          (t = t.replace(/9/g, "_")), e.classList.add("_mask-init");
        }
        maskActions(e) {
          const t = e.target;
          if (t.closest("._mask-init")) {
            const l = t;
            let d = l.value;
            const c = this.getMask(l);
            console.log(l.selectionStart);
            var i = c,
              s = 0,
              n = i.replace(/\D/g, ""),
              o = d.replace(/\D/g, ""),
              r = i.replace(/[_\d]/g, function (e) {
                return s < o.length ? o.charAt(s++) || n.charAt(s) : e;
              });
            console.log(i),
              console.log(n),
              console.log(o),
              console.log(r),
              -1 != (s = r.indexOf("_")) &&
                (s < 5 && (s = 3), (r = r.slice(0, s)));
            var a = i
              .substr(0, d.length)
              .replace(/_+/g, function (e) {
                return "\\d{1," + e.length + "}";
              })
              .replace(/[+()]/g, "\\$&");
            (a = new RegExp("^" + a + "$")),
              (l.value = r),
              l.selectionStart > c.length && e.preventDefault();
          }
        }
        setLogging(e) {
          this.config.logging && console.log(`[Elton Mask]: ${e}`);
        }
      }
      const g = { inputMaskModule: null, selectModule: null };
      let m = {
        getErrors(e) {
          let t = 0,
            i = e.querySelectorAll("*[data-required]");
          return (
            i.length &&
              i.forEach((e) => {
                (null === e.offsetParent && "SELECT" !== e.tagName) ||
                  e.disabled ||
                  (t += this.validateInput(e));
              }),
            t
          );
        },
        validateInput(e) {
          let t = 0;
          return (
            "email" === e.dataset.required
              ? ((e.value = e.value.replace(" ", "")),
                this.emailTest(e)
                  ? (this.addError(e), t++)
                  : this.removeError(e))
              : ("checkbox" !== e.type || e.checked) && e.value
              ? this.removeError(e)
              : (this.addError(e), t++),
            t
          );
        },
        addError(e) {
          e.classList.add("_form-error"),
            e.parentElement.classList.add("_form-error");
          let t = e.parentElement.querySelector(".form__error");
          t && e.parentElement.removeChild(t),
            e.dataset.error &&
              e.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${e.dataset.error}</div>`
              );
        },
        removeError(e) {
          e.classList.remove("_form-error"),
            e.parentElement.classList.remove("_form-error"),
            e.parentElement.querySelector(".form__error") &&
              e.parentElement.removeChild(
                e.parentElement.querySelector(".form__error")
              );
        },
        formClean(e) {
          e.reset(),
            setTimeout(() => {
              let t = e.querySelectorAll("input,textarea");
              for (let e = 0; e < t.length; e++) {
                const i = t[e];
                i.parentElement.classList.remove("_form-focus"),
                  i.classList.remove("_form-focus"),
                  m.removeError(i),
                  (i.value = i.dataset.placeholder);
              }
              let i = e.querySelectorAll(".checkbox__input");
              if (i.length > 0)
                for (let e = 0; e < i.length; e++) {
                  i[e].checked = !1;
                }
              if (g.selectModule) {
                let t = e.querySelectorAll(".select");
                if (t.length)
                  for (let e = 0; e < t.length; e++) {
                    const i = t[e].querySelector("select");
                    g.selectModule.selectBuild(i);
                  }
              }
            }, 0);
        },
        emailTest: (e) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
      };
      var f = i(211);
      function v(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          "constructor" in e &&
          e.constructor === Object
        );
      }
      function y(e = {}, t = {}) {
        Object.keys(t).forEach((i) => {
          void 0 === e[i]
            ? (e[i] = t[i])
            : v(t[i]) &&
              v(e[i]) &&
              Object.keys(t[i]).length > 0 &&
              y(e[i], t[i]);
        });
      }
      !(function () {
        const e = document.querySelector("#range");
        if (e) {
          e.getAttribute("data-from"), e.getAttribute("data-to");
          f.create(e, {
            start: 0,
            connect: [!0, !1],
            range: { min: [0], max: [2e5] },
          });
        }
      })();
      const b = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function w() {
        const e = "undefined" != typeof document ? document : {};
        return y(e, b), e;
      }
      const S = {
        document: b,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (e) =>
          "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
          "undefined" != typeof setTimeout && clearTimeout(e);
        },
      };
      function C() {
        const e = "undefined" != typeof window ? window : {};
        return y(e, S), e;
      }
      class x extends Array {
        constructor(e) {
          "number" == typeof e
            ? super(e)
            : (super(...(e || [])),
              (function (e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                  get: () => t,
                  set(e) {
                    t.__proto__ = e;
                  },
                });
              })(this));
        }
      }
      function T(e = []) {
        const t = [];
        return (
          e.forEach((e) => {
            Array.isArray(e) ? t.push(...T(e)) : t.push(e);
          }),
          t
        );
      }
      function E(e, t) {
        return Array.prototype.filter.call(e, t);
      }
      function I(e, t) {
        const i = C(),
          s = w();
        let n = [];
        if (!t && e instanceof x) return e;
        if (!e) return new x(n);
        if ("string" == typeof e) {
          const i = e.trim();
          if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
            let e = "div";
            0 === i.indexOf("<li") && (e = "ul"),
              0 === i.indexOf("<tr") && (e = "tbody"),
              (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
              0 === i.indexOf("<tbody") && (e = "table"),
              0 === i.indexOf("<option") && (e = "select");
            const t = s.createElement(e);
            t.innerHTML = i;
            for (let e = 0; e < t.childNodes.length; e += 1)
              n.push(t.childNodes[e]);
          } else
            n = (function (e, t) {
              if ("string" != typeof e) return [e];
              const i = [],
                s = t.querySelectorAll(e);
              for (let e = 0; e < s.length; e += 1) i.push(s[e]);
              return i;
            })(e.trim(), t || s);
        } else if (e.nodeType || e === i || e === s) n.push(e);
        else if (Array.isArray(e)) {
          if (e instanceof x) return e;
          n = e;
        }
        return new x(
          (function (e) {
            const t = [];
            for (let i = 0; i < e.length; i += 1)
              -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t;
          })(n)
        );
      }
      I.fn = x.prototype;
      const O = "resize scroll".split(" ");
      function L(e) {
        return function (...t) {
          if (void 0 === t[0]) {
            for (let t = 0; t < this.length; t += 1)
              O.indexOf(e) < 0 &&
                (e in this[t] ? this[t][e]() : I(this[t]).trigger(e));
            return this;
          }
          return this.on(e, ...t);
        };
      }
      L("click"),
        L("blur"),
        L("focus"),
        L("focusin"),
        L("focusout"),
        L("keyup"),
        L("keydown"),
        L("keypress"),
        L("submit"),
        L("change"),
        L("mousedown"),
        L("mousemove"),
        L("mouseup"),
        L("mouseenter"),
        L("mouseleave"),
        L("mouseout"),
        L("mouseover"),
        L("touchstart"),
        L("touchend"),
        L("touchmove"),
        L("resize"),
        L("scroll");
      const P = {
        addClass: function (...e) {
          const t = T(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.add(...t);
            }),
            this
          );
        },
        removeClass: function (...e) {
          const t = T(e.map((e) => e.split(" ")));
          return (
            this.forEach((e) => {
              e.classList.remove(...t);
            }),
            this
          );
        },
        hasClass: function (...e) {
          const t = T(e.map((e) => e.split(" ")));
          return (
            E(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...e) {
          const t = T(e.map((e) => e.split(" ")));
          this.forEach((e) => {
            t.forEach((t) => {
              e.classList.toggle(t);
            });
          });
        },
        attr: function (e, t) {
          if (1 === arguments.length && "string" == typeof e)
            return this[0] ? this[0].getAttribute(e) : void 0;
          for (let i = 0; i < this.length; i += 1)
            if (2 === arguments.length) this[i].setAttribute(e, t);
            else
              for (const t in e)
                (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
          return this;
        },
        removeAttr: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
          return this;
        },
        transform: function (e) {
          for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
          return this;
        },
        transition: function (e) {
          for (let t = 0; t < this.length; t += 1)
            this[t].style.transitionDuration =
              "string" != typeof e ? `${e}ms` : e;
          return this;
        },
        on: function (...e) {
          let [t, i, s, n] = e;
          function o(e) {
            const t = e.target;
            if (!t) return;
            const n = e.target.dom7EventData || [];
            if ((n.indexOf(e) < 0 && n.unshift(e), I(t).is(i))) s.apply(t, n);
            else {
              const e = I(t).parents();
              for (let t = 0; t < e.length; t += 1)
                I(e[t]).is(i) && s.apply(e[t], n);
            }
          }
          function r(e) {
            const t = (e && e.target && e.target.dom7EventData) || [];
            t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
          }
          "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
            n || (n = !1);
          const a = t.split(" ");
          let l;
          for (let e = 0; e < this.length; e += 1) {
            const t = this[e];
            if (i)
              for (l = 0; l < a.length; l += 1) {
                const e = a[l];
                t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                  t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                  t.dom7LiveListeners[e].push({
                    listener: s,
                    proxyListener: o,
                  }),
                  t.addEventListener(e, o, n);
              }
            else
              for (l = 0; l < a.length; l += 1) {
                const e = a[l];
                t.dom7Listeners || (t.dom7Listeners = {}),
                  t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                  t.dom7Listeners[e].push({ listener: s, proxyListener: r }),
                  t.addEventListener(e, r, n);
              }
          }
          return this;
        },
        off: function (...e) {
          let [t, i, s, n] = e;
          "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
            n || (n = !1);
          const o = t.split(" ");
          for (let e = 0; e < o.length; e += 1) {
            const t = o[e];
            for (let e = 0; e < this.length; e += 1) {
              const o = this[e];
              let r;
              if (
                (!i && o.dom7Listeners
                  ? (r = o.dom7Listeners[t])
                  : i && o.dom7LiveListeners && (r = o.dom7LiveListeners[t]),
                r && r.length)
              )
                for (let e = r.length - 1; e >= 0; e -= 1) {
                  const i = r[e];
                  (s && i.listener === s) ||
                  (s &&
                    i.listener &&
                    i.listener.dom7proxy &&
                    i.listener.dom7proxy === s)
                    ? (o.removeEventListener(t, i.proxyListener, n),
                      r.splice(e, 1))
                    : s ||
                      (o.removeEventListener(t, i.proxyListener, n),
                      r.splice(e, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...e) {
          const t = C(),
            i = e[0].split(" "),
            s = e[1];
          for (let n = 0; n < i.length; n += 1) {
            const o = i[n];
            for (let i = 0; i < this.length; i += 1) {
              const n = this[i];
              if (t.CustomEvent) {
                const i = new t.CustomEvent(o, {
                  detail: s,
                  bubbles: !0,
                  cancelable: !0,
                });
                (n.dom7EventData = e.filter((e, t) => t > 0)),
                  n.dispatchEvent(i),
                  (n.dom7EventData = []),
                  delete n.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (e) {
          const t = this;
          return (
            e &&
              t.on("transitionend", function i(s) {
                s.target === this &&
                  (e.call(this, s), t.off("transitionend", i));
              }),
            this
          );
        },
        outerWidth: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(e.getPropertyValue("margin-right")) +
                parseFloat(e.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (e) {
          if (this.length > 0) {
            if (e) {
              const e = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(e.getPropertyValue("margin-top")) +
                parseFloat(e.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const e = C();
          return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const e = C(),
              t = w(),
              i = this[0],
              s = i.getBoundingClientRect(),
              n = t.body,
              o = i.clientTop || n.clientTop || 0,
              r = i.clientLeft || n.clientLeft || 0,
              a = i === e ? e.scrollY : i.scrollTop,
              l = i === e ? e.scrollX : i.scrollLeft;
            return { top: s.top + a - o, left: s.left + l - r };
          }
          return null;
        },
        css: function (e, t) {
          const i = C();
          let s;
          if (1 === arguments.length) {
            if ("string" != typeof e) {
              for (s = 0; s < this.length; s += 1)
                for (const t in e) this[s].style[t] = e[t];
              return this;
            }
            if (this[0])
              return i.getComputedStyle(this[0], null).getPropertyValue(e);
          }
          if (2 === arguments.length && "string" == typeof e) {
            for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
            return this;
          }
          return this;
        },
        each: function (e) {
          return e
            ? (this.forEach((t, i) => {
                e.apply(t, [t, i]);
              }),
              this)
            : this;
        },
        html: function (e) {
          if (void 0 === e) return this[0] ? this[0].innerHTML : null;
          for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
          return this;
        },
        text: function (e) {
          if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
          for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
          return this;
        },
        is: function (e) {
          const t = C(),
            i = w(),
            s = this[0];
          let n, o;
          if (!s || void 0 === e) return !1;
          if ("string" == typeof e) {
            if (s.matches) return s.matches(e);
            if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
            if (s.msMatchesSelector) return s.msMatchesSelector(e);
            for (n = I(e), o = 0; o < n.length; o += 1)
              if (n[o] === s) return !0;
            return !1;
          }
          if (e === i) return s === i;
          if (e === t) return s === t;
          if (e.nodeType || e instanceof x) {
            for (n = e.nodeType ? [e] : e, o = 0; o < n.length; o += 1)
              if (n[o] === s) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let e,
            t = this[0];
          if (t) {
            for (e = 0; null !== (t = t.previousSibling); )
              1 === t.nodeType && (e += 1);
            return e;
          }
        },
        eq: function (e) {
          if (void 0 === e) return this;
          const t = this.length;
          if (e > t - 1) return I([]);
          if (e < 0) {
            const i = t + e;
            return I(i < 0 ? [] : [this[i]]);
          }
          return I([this[e]]);
        },
        append: function (...e) {
          let t;
          const i = w();
          for (let s = 0; s < e.length; s += 1) {
            t = e[s];
            for (let e = 0; e < this.length; e += 1)
              if ("string" == typeof t) {
                const s = i.createElement("div");
                for (s.innerHTML = t; s.firstChild; )
                  this[e].appendChild(s.firstChild);
              } else if (t instanceof x)
                for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
              else this[e].appendChild(t);
          }
          return this;
        },
        prepend: function (e) {
          const t = w();
          let i, s;
          for (i = 0; i < this.length; i += 1)
            if ("string" == typeof e) {
              const n = t.createElement("div");
              for (n.innerHTML = e, s = n.childNodes.length - 1; s >= 0; s -= 1)
                this[i].insertBefore(n.childNodes[s], this[i].childNodes[0]);
            } else if (e instanceof x)
              for (s = 0; s < e.length; s += 1)
                this[i].insertBefore(e[s], this[i].childNodes[0]);
            else this[i].insertBefore(e, this[i].childNodes[0]);
          return this;
        },
        next: function (e) {
          return this.length > 0
            ? e
              ? this[0].nextElementSibling &&
                I(this[0].nextElementSibling).is(e)
                ? I([this[0].nextElementSibling])
                : I([])
              : this[0].nextElementSibling
              ? I([this[0].nextElementSibling])
              : I([])
            : I([]);
        },
        nextAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return I([]);
          for (; i.nextElementSibling; ) {
            const s = i.nextElementSibling;
            e ? I(s).is(e) && t.push(s) : t.push(s), (i = s);
          }
          return I(t);
        },
        prev: function (e) {
          if (this.length > 0) {
            const t = this[0];
            return e
              ? t.previousElementSibling && I(t.previousElementSibling).is(e)
                ? I([t.previousElementSibling])
                : I([])
              : t.previousElementSibling
              ? I([t.previousElementSibling])
              : I([]);
          }
          return I([]);
        },
        prevAll: function (e) {
          const t = [];
          let i = this[0];
          if (!i) return I([]);
          for (; i.previousElementSibling; ) {
            const s = i.previousElementSibling;
            e ? I(s).is(e) && t.push(s) : t.push(s), (i = s);
          }
          return I(t);
        },
        parent: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1)
            null !== this[i].parentNode &&
              (e
                ? I(this[i].parentNode).is(e) && t.push(this[i].parentNode)
                : t.push(this[i].parentNode));
          return I(t);
        },
        parents: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            let s = this[i].parentNode;
            for (; s; )
              e ? I(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
          }
          return I(t);
        },
        closest: function (e) {
          let t = this;
          return void 0 === e
            ? I([])
            : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const s = this[i].querySelectorAll(e);
            for (let e = 0; e < s.length; e += 1) t.push(s[e]);
          }
          return I(t);
        },
        children: function (e) {
          const t = [];
          for (let i = 0; i < this.length; i += 1) {
            const s = this[i].children;
            for (let i = 0; i < s.length; i += 1)
              (e && !I(s[i]).is(e)) || t.push(s[i]);
          }
          return I(t);
        },
        filter: function (e) {
          return I(E(this, e));
        },
        remove: function () {
          for (let e = 0; e < this.length; e += 1)
            this[e].parentNode && this[e].parentNode.removeChild(this[e]);
          return this;
        },
      };
      Object.keys(P).forEach((e) => {
        Object.defineProperty(I.fn, e, { value: P[e], writable: !0 });
      });
      const M = I;
      function k(e, t = 0) {
        return setTimeout(e, t);
      }
      function A() {
        return Date.now();
      }
      function z(e, t = "x") {
        const i = C();
        let s, n, o;
        const r = (function (e) {
          const t = C();
          let i;
          return (
            t.getComputedStyle && (i = t.getComputedStyle(e, null)),
            !i && e.currentStyle && (i = e.currentStyle),
            i || (i = e.style),
            i
          );
        })(e);
        return (
          i.WebKitCSSMatrix
            ? ((n = r.transform || r.webkitTransform),
              n.split(",").length > 6 &&
                (n = n
                  .split(", ")
                  .map((e) => e.replace(",", "."))
                  .join(", ")),
              (o = new i.WebKitCSSMatrix("none" === n ? "" : n)))
            : ((o =
                r.MozTransform ||
                r.OTransform ||
                r.MsTransform ||
                r.msTransform ||
                r.transform ||
                r
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (s = o.toString().split(","))),
          "x" === t &&
            (n = i.WebKitCSSMatrix
              ? o.m41
              : 16 === s.length
              ? parseFloat(s[12])
              : parseFloat(s[4])),
          "y" === t &&
            (n = i.WebKitCSSMatrix
              ? o.m42
              : 16 === s.length
              ? parseFloat(s[13])
              : parseFloat(s[5])),
          n || 0
        );
      }
      function $(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function D(...e) {
        const t = Object(e[0]),
          i = ["__proto__", "constructor", "prototype"];
        for (let n = 1; n < e.length; n += 1) {
          const o = e[n];
          if (
            null != o &&
            ((s = o),
            !("undefined" != typeof window && void 0 !== window.HTMLElement
              ? s instanceof HTMLElement
              : s && (1 === s.nodeType || 11 === s.nodeType)))
          ) {
            const e = Object.keys(Object(o)).filter((e) => i.indexOf(e) < 0);
            for (let i = 0, s = e.length; i < s; i += 1) {
              const s = e[i],
                n = Object.getOwnPropertyDescriptor(o, s);
              void 0 !== n &&
                n.enumerable &&
                ($(t[s]) && $(o[s])
                  ? o[s].__swiper__
                    ? (t[s] = o[s])
                    : D(t[s], o[s])
                  : !$(t[s]) && $(o[s])
                  ? ((t[s] = {}),
                    o[s].__swiper__ ? (t[s] = o[s]) : D(t[s], o[s]))
                  : (t[s] = o[s]));
            }
          }
        }
        var s;
        return t;
      }
      function _(e, t, i) {
        e.style.setProperty(t, i);
      }
      function V({ swiper: e, targetPosition: t, side: i }) {
        const s = C(),
          n = -e.translate;
        let o,
          r = null;
        const a = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = "none"),
          s.cancelAnimationFrame(e.cssModeFrameID);
        const l = t > n ? "next" : "prev",
          d = (e, t) => ("next" === l && e >= t) || ("prev" === l && e <= t),
          c = () => {
            (o = new Date().getTime()), null === r && (r = o);
            const l = Math.max(Math.min((o - r) / a, 1), 0),
              u = 0.5 - Math.cos(l * Math.PI) / 2;
            let h = n + u * (t - n);
            if ((d(h, t) && (h = t), e.wrapperEl.scrollTo({ [i]: h }), d(h, t)))
              return (
                (e.wrapperEl.style.overflow = "hidden"),
                (e.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (e.wrapperEl.style.overflow = ""),
                    e.wrapperEl.scrollTo({ [i]: h });
                }),
                void s.cancelAnimationFrame(e.cssModeFrameID)
              );
            e.cssModeFrameID = s.requestAnimationFrame(c);
          };
        c();
      }
      let N, G, B;
      function H() {
        return (
          N ||
            (N = (function () {
              const e = C(),
                t = w();
              return {
                smoothScroll:
                  t.documentElement &&
                  "scrollBehavior" in t.documentElement.style,
                touch: !!(
                  "ontouchstart" in e ||
                  (e.DocumentTouch && t instanceof e.DocumentTouch)
                ),
                passiveListener: (function () {
                  let t = !1;
                  try {
                    const i = Object.defineProperty({}, "passive", {
                      get() {
                        t = !0;
                      },
                    });
                    e.addEventListener("testPassiveListener", null, i);
                  } catch (e) {}
                  return t;
                })(),
                gestures: "ongesturestart" in e,
              };
            })()),
          N
        );
      }
      function F(e = {}) {
        return (
          G ||
            (G = (function ({ userAgent: e } = {}) {
              const t = H(),
                i = C(),
                s = i.navigator.platform,
                n = e || i.navigator.userAgent,
                o = { ios: !1, android: !1 },
                r = i.screen.width,
                a = i.screen.height,
                l = n.match(/(Android);?[\s\/]+([\d.]+)?/);
              let d = n.match(/(iPad).*OS\s([\d_]+)/);
              const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                u = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                h = "Win32" === s;
              let p = "MacIntel" === s;
              return (
                !d &&
                  p &&
                  t.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${r}x${a}`) >= 0 &&
                  ((d = n.match(/(Version)\/([\d.]+)/)),
                  d || (d = [0, 1, "13_0_0"]),
                  (p = !1)),
                l && !h && ((o.os = "android"), (o.android = !0)),
                (d || u || c) && ((o.os = "ios"), (o.ios = !0)),
                o
              );
            })(e)),
          G
        );
      }
      function j() {
        return (
          B ||
            (B = (function () {
              const e = C();
              return {
                isSafari: (function () {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  e.navigator.userAgent
                ),
              };
            })()),
          B
        );
      }
      const X = {
        on(e, t, i) {
          const s = this;
          if ("function" != typeof t) return s;
          const n = i ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              s.eventsListeners[e] || (s.eventsListeners[e] = []),
                s.eventsListeners[e][n](t);
            }),
            s
          );
        },
        once(e, t, i) {
          const s = this;
          if ("function" != typeof t) return s;
          function n(...i) {
            s.off(e, n),
              n.__emitterProxy && delete n.__emitterProxy,
              t.apply(s, i);
          }
          return (n.__emitterProxy = t), s.on(e, n, i);
        },
        onAny(e, t) {
          const i = this;
          if ("function" != typeof e) return i;
          const s = t ? "unshift" : "push";
          return (
            i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
          );
        },
        offAny(e) {
          const t = this;
          if (!t.eventsAnyListeners) return t;
          const i = t.eventsAnyListeners.indexOf(e);
          return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
        },
        off(e, t) {
          const i = this;
          return i.eventsListeners
            ? (e.split(" ").forEach((e) => {
                void 0 === t
                  ? (i.eventsListeners[e] = [])
                  : i.eventsListeners[e] &&
                    i.eventsListeners[e].forEach((s, n) => {
                      (s === t ||
                        (s.__emitterProxy && s.__emitterProxy === t)) &&
                        i.eventsListeners[e].splice(n, 1);
                    });
              }),
              i)
            : i;
        },
        emit(...e) {
          const t = this;
          if (!t.eventsListeners) return t;
          let i, s, n;
          "string" == typeof e[0] || Array.isArray(e[0])
            ? ((i = e[0]), (s = e.slice(1, e.length)), (n = t))
            : ((i = e[0].events), (s = e[0].data), (n = e[0].context || t)),
            s.unshift(n);
          return (
            (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
              t.eventsAnyListeners &&
                t.eventsAnyListeners.length &&
                t.eventsAnyListeners.forEach((t) => {
                  t.apply(n, [e, ...s]);
                }),
                t.eventsListeners &&
                  t.eventsListeners[e] &&
                  t.eventsListeners[e].forEach((e) => {
                    e.apply(n, s);
                  });
            }),
            t
          );
        },
      };
      const q = {
        updateSize: function () {
          const e = this;
          let t, i;
          const s = e.$el;
          (t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : s[0].clientWidth),
            (i =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : s[0].clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === i && e.isVertical()) ||
              ((t =
                t -
                parseInt(s.css("padding-left") || 0, 10) -
                parseInt(s.css("padding-right") || 0, 10)),
              (i =
                i -
                parseInt(s.css("padding-top") || 0, 10) -
                parseInt(s.css("padding-bottom") || 0, 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(i) && (i = 0),
              Object.assign(e, {
                width: t,
                height: i,
                size: e.isHorizontal() ? t : i,
              }));
        },
        updateSlides: function () {
          const e = this;
          function t(t) {
            return e.isHorizontal()
              ? t
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[t];
          }
          function i(e, i) {
            return parseFloat(e.getPropertyValue(t(i)) || 0);
          }
          const s = e.params,
            { $wrapperEl: n, size: o, rtlTranslate: r, wrongRTL: a } = e,
            l = e.virtual && s.virtual.enabled,
            d = l ? e.virtual.slides.length : e.slides.length,
            c = n.children(`.${e.params.slideClass}`),
            u = l ? e.virtual.slides.length : c.length;
          let h = [];
          const p = [],
            g = [];
          let m = s.slidesOffsetBefore;
          "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
          let f = s.slidesOffsetAfter;
          "function" == typeof f && (f = s.slidesOffsetAfter.call(e));
          const v = e.snapGrid.length,
            y = e.slidesGrid.length;
          let b = s.spaceBetween,
            w = -m,
            S = 0,
            C = 0;
          if (void 0 === o) return;
          "string" == typeof b &&
            b.indexOf("%") >= 0 &&
            (b = (parseFloat(b.replace("%", "")) / 100) * o),
            (e.virtualSize = -b),
            r
              ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            s.centeredSlides &&
              s.cssMode &&
              (_(e.wrapperEl, "--swiper-centered-offset-before", ""),
              _(e.wrapperEl, "--swiper-centered-offset-after", ""));
          const x = s.grid && s.grid.rows > 1 && e.grid;
          let T;
          x && e.grid.initSlides(u);
          const E =
            "auto" === s.slidesPerView &&
            s.breakpoints &&
            Object.keys(s.breakpoints).filter(
              (e) => void 0 !== s.breakpoints[e].slidesPerView
            ).length > 0;
          for (let n = 0; n < u; n += 1) {
            T = 0;
            const r = c.eq(n);
            if (
              (x && e.grid.updateSlide(n, r, u, t), "none" !== r.css("display"))
            ) {
              if ("auto" === s.slidesPerView) {
                E && (c[n].style[t("width")] = "");
                const o = getComputedStyle(r[0]),
                  a = r[0].style.transform,
                  l = r[0].style.webkitTransform;
                if (
                  (a && (r[0].style.transform = "none"),
                  l && (r[0].style.webkitTransform = "none"),
                  s.roundLengths)
                )
                  T = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
                else {
                  const e = i(o, "width"),
                    t = i(o, "padding-left"),
                    s = i(o, "padding-right"),
                    n = i(o, "margin-left"),
                    a = i(o, "margin-right"),
                    l = o.getPropertyValue("box-sizing");
                  if (l && "border-box" === l) T = e + n + a;
                  else {
                    const { clientWidth: i, offsetWidth: o } = r[0];
                    T = e + t + s + n + a + (o - i);
                  }
                }
                a && (r[0].style.transform = a),
                  l && (r[0].style.webkitTransform = l),
                  s.roundLengths && (T = Math.floor(T));
              } else
                (T = (o - (s.slidesPerView - 1) * b) / s.slidesPerView),
                  s.roundLengths && (T = Math.floor(T)),
                  c[n] && (c[n].style[t("width")] = `${T}px`);
              c[n] && (c[n].swiperSlideSize = T),
                g.push(T),
                s.centeredSlides
                  ? ((w = w + T / 2 + S / 2 + b),
                    0 === S && 0 !== n && (w = w - o / 2 - b),
                    0 === n && (w = w - o / 2 - b),
                    Math.abs(w) < 0.001 && (w = 0),
                    s.roundLengths && (w = Math.floor(w)),
                    C % s.slidesPerGroup == 0 && h.push(w),
                    p.push(w))
                  : (s.roundLengths && (w = Math.floor(w)),
                    (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                      e.params.slidesPerGroup ==
                      0 && h.push(w),
                    p.push(w),
                    (w = w + T + b)),
                (e.virtualSize += T + b),
                (S = T),
                (C += 1);
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, o) + f),
            r &&
              a &&
              ("slide" === s.effect || "coverflow" === s.effect) &&
              n.css({ width: `${e.virtualSize + s.spaceBetween}px` }),
            s.setWrapperSize &&
              n.css({ [t("width")]: `${e.virtualSize + s.spaceBetween}px` }),
            x && e.grid.updateWrapperSize(T, h, t),
            !s.centeredSlides)
          ) {
            const t = [];
            for (let i = 0; i < h.length; i += 1) {
              let n = h[i];
              s.roundLengths && (n = Math.floor(n)),
                h[i] <= e.virtualSize - o && t.push(n);
            }
            (h = t),
              Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
                h.push(e.virtualSize - o);
          }
          if ((0 === h.length && (h = [0]), 0 !== s.spaceBetween)) {
            const i = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
            c.filter((e, t) => !s.cssMode || t !== c.length - 1).css({
              [i]: `${b}px`,
            });
          }
          if (s.centeredSlides && s.centeredSlidesBounds) {
            let e = 0;
            g.forEach((t) => {
              e += t + (s.spaceBetween ? s.spaceBetween : 0);
            }),
              (e -= s.spaceBetween);
            const t = e - o;
            h = h.map((e) => (e < 0 ? -m : e > t ? t + f : e));
          }
          if (s.centerInsufficientSlides) {
            let e = 0;
            if (
              (g.forEach((t) => {
                e += t + (s.spaceBetween ? s.spaceBetween : 0);
              }),
              (e -= s.spaceBetween),
              e < o)
            ) {
              const t = (o - e) / 2;
              h.forEach((e, i) => {
                h[i] = e - t;
              }),
                p.forEach((e, i) => {
                  p[i] = e + t;
                });
            }
          }
          if (
            (Object.assign(e, {
              slides: c,
              snapGrid: h,
              slidesGrid: p,
              slidesSizesGrid: g,
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
          ) {
            _(e.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"),
              _(
                e.wrapperEl,
                "--swiper-centered-offset-after",
                e.size / 2 - g[g.length - 1] / 2 + "px"
              );
            const t = -e.snapGrid[0],
              i = -e.slidesGrid[0];
            (e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + i));
          }
          u !== d && e.emit("slidesLengthChange"),
            h.length !== v &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            p.length !== y && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset();
        },
        updateAutoHeight: function (e) {
          const t = this,
            i = [],
            s = t.virtual && t.params.virtual.enabled;
          let n,
            o = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const r = (e) =>
            s
              ? t.slides.filter(
                  (t) =>
                    parseInt(t.getAttribute("data-swiper-slide-index"), 10) ===
                    e
                )[0]
              : t.slides.eq(e)[0];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              t.visibleSlides.each((e) => {
                i.push(e);
              });
            else
              for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                const e = t.activeIndex + n;
                if (e > t.slides.length && !s) break;
                i.push(r(e));
              }
          else i.push(r(t.activeIndex));
          for (n = 0; n < i.length; n += 1)
            if (void 0 !== i[n]) {
              const e = i[n].offsetHeight;
              o = e > o ? e : o;
            }
          (o || 0 === o) && t.$wrapperEl.css("height", `${o}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides;
          for (let i = 0; i < t.length; i += 1)
            t[i].swiperSlideOffset = e.isHorizontal()
              ? t[i].offsetLeft
              : t[i].offsetTop;
        },
        updateSlidesProgress: function (e = (this && this.translate) || 0) {
          const t = this,
            i = t.params,
            { slides: s, rtlTranslate: n, snapGrid: o } = t;
          if (0 === s.length) return;
          void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
          let r = -e;
          n && (r = e),
            s.removeClass(i.slideVisibleClass),
            (t.visibleSlidesIndexes = []),
            (t.visibleSlides = []);
          for (let e = 0; e < s.length; e += 1) {
            const a = s[e];
            let l = a.swiperSlideOffset;
            i.cssMode && i.centeredSlides && (l -= s[0].swiperSlideOffset);
            const d =
                (r + (i.centeredSlides ? t.minTranslate() : 0) - l) /
                (a.swiperSlideSize + i.spaceBetween),
              c =
                (r - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - l) /
                (a.swiperSlideSize + i.spaceBetween),
              u = -(r - l),
              h = u + t.slidesSizesGrid[e];
            ((u >= 0 && u < t.size - 1) ||
              (h > 1 && h <= t.size) ||
              (u <= 0 && h >= t.size)) &&
              (t.visibleSlides.push(a),
              t.visibleSlidesIndexes.push(e),
              s.eq(e).addClass(i.slideVisibleClass)),
              (a.progress = n ? -d : d),
              (a.originalProgress = n ? -c : c);
          }
          t.visibleSlides = M(t.visibleSlides);
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const i = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * i) || 0;
          }
          const i = t.params,
            s = t.maxTranslate() - t.minTranslate();
          let { progress: n, isBeginning: o, isEnd: r } = t;
          const a = o,
            l = r;
          0 === s
            ? ((n = 0), (o = !0), (r = !0))
            : ((n = (e - t.minTranslate()) / s), (o = n <= 0), (r = n >= 1)),
            Object.assign(t, { progress: n, isBeginning: o, isEnd: r }),
            (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
              t.updateSlidesProgress(e),
            o && !a && t.emit("reachBeginning toEdge"),
            r && !l && t.emit("reachEnd toEdge"),
            ((a && !o) || (l && !r)) && t.emit("fromEdge"),
            t.emit("progress", n);
        },
        updateSlidesClasses: function () {
          const e = this,
            {
              slides: t,
              params: i,
              $wrapperEl: s,
              activeIndex: n,
              realIndex: o,
            } = e,
            r = e.virtual && i.virtual.enabled;
          let a;
          t.removeClass(
            `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
          ),
            (a = r
              ? e.$wrapperEl.find(
                  `.${i.slideClass}[data-swiper-slide-index="${n}"]`
                )
              : t.eq(n)),
            a.addClass(i.slideActiveClass),
            i.loop &&
              (a.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${o}"]`
                    )
                    .addClass(i.slideDuplicateActiveClass)
                : s
                    .children(
                      `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${o}"]`
                    )
                    .addClass(i.slideDuplicateActiveClass));
          let l = a
            .nextAll(`.${i.slideClass}`)
            .eq(0)
            .addClass(i.slideNextClass);
          i.loop &&
            0 === l.length &&
            ((l = t.eq(0)), l.addClass(i.slideNextClass));
          let d = a
            .prevAll(`.${i.slideClass}`)
            .eq(0)
            .addClass(i.slidePrevClass);
          i.loop &&
            0 === d.length &&
            ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
            i.loop &&
              (l.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      `.${i.slideClass}:not(.${
                        i.slideDuplicateClass
                      })[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicateNextClass)
                : s
                    .children(
                      `.${i.slideClass}.${
                        i.slideDuplicateClass
                      }[data-swiper-slide-index="${l.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicateNextClass),
              d.hasClass(i.slideDuplicateClass)
                ? s
                    .children(
                      `.${i.slideClass}:not(.${
                        i.slideDuplicateClass
                      })[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicatePrevClass)
                : s
                    .children(
                      `.${i.slideClass}.${
                        i.slideDuplicateClass
                      }[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(i.slideDuplicatePrevClass)),
            e.emitSlidesClasses();
        },
        updateActiveIndex: function (e) {
          const t = this,
            i = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: s,
              snapGrid: n,
              params: o,
              activeIndex: r,
              realIndex: a,
              snapIndex: l,
            } = t;
          let d,
            c = e;
          if (void 0 === c) {
            for (let e = 0; e < s.length; e += 1)
              void 0 !== s[e + 1]
                ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2
                  ? (c = e)
                  : i >= s[e] && i < s[e + 1] && (c = e + 1)
                : i >= s[e] && (c = e);
            o.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
          }
          if (n.indexOf(i) >= 0) d = n.indexOf(i);
          else {
            const e = Math.min(o.slidesPerGroupSkip, c);
            d = e + Math.floor((c - e) / o.slidesPerGroup);
          }
          if ((d >= n.length && (d = n.length - 1), c === r))
            return void (
              d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
            );
          const u = parseInt(
            t.slides.eq(c).attr("data-swiper-slide-index") || c,
            10
          );
          Object.assign(t, {
            snapIndex: d,
            realIndex: u,
            previousIndex: r,
            activeIndex: c,
          }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            a !== u && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              t.emit("slideChange");
        },
        updateClickedSlide: function (e) {
          const t = this,
            i = t.params,
            s = M(e).closest(`.${i.slideClass}`)[0];
          let n,
            o = !1;
          if (s)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === s) {
                (o = !0), (n = e);
                break;
              }
          if (!s || !o)
            return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
          (t.clickedSlide = s),
            t.virtual && t.params.virtual.enabled
              ? (t.clickedIndex = parseInt(
                  M(s).attr("data-swiper-slide-index"),
                  10
                ))
              : (t.clickedIndex = n),
            i.slideToClickedSlide &&
              void 0 !== t.clickedIndex &&
              t.clickedIndex !== t.activeIndex &&
              t.slideToClickedSlide();
        },
      };
      const Y = {
        getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
          const {
            params: t,
            rtlTranslate: i,
            translate: s,
            $wrapperEl: n,
          } = this;
          if (t.virtualTranslate) return i ? -s : s;
          if (t.cssMode) return s;
          let o = z(n[0], e);
          return i && (o = -o), o || 0;
        },
        setTranslate: function (e, t) {
          const i = this,
            {
              rtlTranslate: s,
              params: n,
              $wrapperEl: o,
              wrapperEl: r,
              progress: a,
            } = i;
          let l,
            d = 0,
            c = 0;
          i.isHorizontal() ? (d = s ? -e : e) : (c = e),
            n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
            n.cssMode
              ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  i.isHorizontal() ? -d : -c)
              : n.virtualTranslate ||
                o.transform(`translate3d(${d}px, ${c}px, 0px)`),
            (i.previousTranslate = i.translate),
            (i.translate = i.isHorizontal() ? d : c);
          const u = i.maxTranslate() - i.minTranslate();
          (l = 0 === u ? 0 : (e - i.minTranslate()) / u),
            l !== a && i.updateProgress(e),
            i.emit("setTranslate", i.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (
          e = 0,
          t = this.params.speed,
          i = !0,
          s = !0,
          n
        ) {
          const o = this,
            { params: r, wrapperEl: a } = o;
          if (o.animating && r.preventInteractionOnTransition) return !1;
          const l = o.minTranslate(),
            d = o.maxTranslate();
          let c;
          if (
            ((c = s && e > l ? l : s && e < d ? d : e),
            o.updateProgress(c),
            r.cssMode)
          ) {
            const e = o.isHorizontal();
            if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!o.support.smoothScroll)
                return (
                  V({
                    swiper: o,
                    targetPosition: -c,
                    side: e ? "left" : "top",
                  }),
                  !0
                );
              a.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === t
              ? (o.setTransition(0),
                o.setTranslate(c),
                i &&
                  (o.emit("beforeTransitionStart", t, n),
                  o.emit("transitionEnd")))
              : (o.setTransition(t),
                o.setTranslate(c),
                i &&
                  (o.emit("beforeTransitionStart", t, n),
                  o.emit("transitionStart")),
                o.animating ||
                  ((o.animating = !0),
                  o.onTranslateToWrapperTransitionEnd ||
                    (o.onTranslateToWrapperTransitionEnd = function (e) {
                      o &&
                        !o.destroyed &&
                        e.target === this &&
                        (o.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          o.onTranslateToWrapperTransitionEnd
                        ),
                        o.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          o.onTranslateToWrapperTransitionEnd
                        ),
                        (o.onTranslateToWrapperTransitionEnd = null),
                        delete o.onTranslateToWrapperTransitionEnd,
                        i && o.emit("transitionEnd"));
                    }),
                  o.$wrapperEl[0].addEventListener(
                    "transitionend",
                    o.onTranslateToWrapperTransitionEnd
                  ),
                  o.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    o.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function R({ swiper: e, runCallbacks: t, direction: i, step: s }) {
        const { activeIndex: n, previousIndex: o } = e;
        let r = i;
        if (
          (r || (r = n > o ? "next" : n < o ? "prev" : "reset"),
          e.emit(`transition${s}`),
          t && n !== o)
        ) {
          if ("reset" === r) return void e.emit(`slideResetTransition${s}`);
          e.emit(`slideChangeTransition${s}`),
            "next" === r
              ? e.emit(`slideNextTransition${s}`)
              : e.emit(`slidePrevTransition${s}`);
        }
      }
      const W = {
        slideTo: function (e = 0, t = this.params.speed, i = !0, s, n) {
          if ("number" != typeof e && "string" != typeof e)
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
            );
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
              );
            e = t;
          }
          const o = this;
          let r = e;
          r < 0 && (r = 0);
          const {
            params: a,
            snapGrid: l,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: u,
            rtlTranslate: h,
            wrapperEl: p,
            enabled: g,
          } = o;
          if (
            (o.animating && a.preventInteractionOnTransition) ||
            (!g && !s && !n)
          )
            return !1;
          const m = Math.min(o.params.slidesPerGroupSkip, r);
          let f = m + Math.floor((r - m) / o.params.slidesPerGroup);
          f >= l.length && (f = l.length - 1),
            (u || a.initialSlide || 0) === (c || 0) &&
              i &&
              o.emit("beforeSlideChangeStart");
          const v = -l[f];
          if ((o.updateProgress(v), a.normalizeSlideIndex))
            for (let e = 0; e < d.length; e += 1) {
              const t = -Math.floor(100 * v),
                i = Math.floor(100 * d[e]),
                s = Math.floor(100 * d[e + 1]);
              void 0 !== d[e + 1]
                ? t >= i && t < s - (s - i) / 2
                  ? (r = e)
                  : t >= i && t < s && (r = e + 1)
                : t >= i && (r = e);
            }
          if (o.initialized && r !== u) {
            if (!o.allowSlideNext && v < o.translate && v < o.minTranslate())
              return !1;
            if (
              !o.allowSlidePrev &&
              v > o.translate &&
              v > o.maxTranslate() &&
              (u || 0) !== r
            )
              return !1;
          }
          let y;
          if (
            ((y = r > u ? "next" : r < u ? "prev" : "reset"),
            (h && -v === o.translate) || (!h && v === o.translate))
          )
            return (
              o.updateActiveIndex(r),
              a.autoHeight && o.updateAutoHeight(),
              o.updateSlidesClasses(),
              "slide" !== a.effect && o.setTranslate(v),
              "reset" !== y && (o.transitionStart(i, y), o.transitionEnd(i, y)),
              !1
            );
          if (a.cssMode) {
            const e = o.isHorizontal(),
              i = h ? v : -v;
            if (0 === t) {
              const t = o.virtual && o.params.virtual.enabled;
              t &&
                ((o.wrapperEl.style.scrollSnapType = "none"),
                (o._immediateVirtual = !0)),
                (p[e ? "scrollLeft" : "scrollTop"] = i),
                t &&
                  requestAnimationFrame(() => {
                    (o.wrapperEl.style.scrollSnapType = ""),
                      (o._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!o.support.smoothScroll)
                return (
                  V({ swiper: o, targetPosition: i, side: e ? "left" : "top" }),
                  !0
                );
              p.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
            }
            return !0;
          }
          return (
            o.setTransition(t),
            o.setTranslate(v),
            o.updateActiveIndex(r),
            o.updateSlidesClasses(),
            o.emit("beforeTransitionStart", t, s),
            o.transitionStart(i, y),
            0 === t
              ? o.transitionEnd(i, y)
              : o.animating ||
                ((o.animating = !0),
                o.onSlideToWrapperTransitionEnd ||
                  (o.onSlideToWrapperTransitionEnd = function (e) {
                    o &&
                      !o.destroyed &&
                      e.target === this &&
                      (o.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        o.onSlideToWrapperTransitionEnd
                      ),
                      o.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        o.onSlideToWrapperTransitionEnd
                      ),
                      (o.onSlideToWrapperTransitionEnd = null),
                      delete o.onSlideToWrapperTransitionEnd,
                      o.transitionEnd(i, y));
                  }),
                o.$wrapperEl[0].addEventListener(
                  "transitionend",
                  o.onSlideToWrapperTransitionEnd
                ),
                o.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  o.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (e = 0, t = this.params.speed, i = !0, s) {
          const n = this;
          let o = e;
          return n.params.loop && (o += n.loopedSlides), n.slideTo(o, t, i, s);
        },
        slideNext: function (e = this.params.speed, t = !0, i) {
          const s = this,
            { animating: n, enabled: o, params: r } = s;
          if (!o) return s;
          let a = r.slidesPerGroup;
          "auto" === r.slidesPerView &&
            1 === r.slidesPerGroup &&
            r.slidesPerGroupAuto &&
            (a = Math.max(s.slidesPerViewDynamic("current", !0), 1));
          const l = s.activeIndex < r.slidesPerGroupSkip ? 1 : a;
          if (r.loop) {
            if (n && r.loopPreventsSlide) return !1;
            s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
          }
          return r.rewind && s.isEnd
            ? s.slideTo(0, e, t, i)
            : s.slideTo(s.activeIndex + l, e, t, i);
        },
        slidePrev: function (e = this.params.speed, t = !0, i) {
          const s = this,
            {
              params: n,
              animating: o,
              snapGrid: r,
              slidesGrid: a,
              rtlTranslate: l,
              enabled: d,
            } = s;
          if (!d) return s;
          if (n.loop) {
            if (o && n.loopPreventsSlide) return !1;
            s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
          }
          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const u = c(l ? s.translate : -s.translate),
            h = r.map((e) => c(e));
          let p = r[h.indexOf(u) - 1];
          if (void 0 === p && n.cssMode) {
            let e;
            r.forEach((t, i) => {
              u >= t && (e = i);
            }),
              void 0 !== e && (p = r[e > 0 ? e - 1 : e]);
          }
          let g = 0;
          return (
            void 0 !== p &&
              ((g = a.indexOf(p)),
              g < 0 && (g = s.activeIndex - 1),
              "auto" === n.slidesPerView &&
                1 === n.slidesPerGroup &&
                n.slidesPerGroupAuto &&
                ((g = g - s.slidesPerViewDynamic("previous", !0) + 1),
                (g = Math.max(g, 0)))),
            n.rewind && s.isBeginning
              ? s.slideTo(s.slides.length - 1, e, t, i)
              : s.slideTo(g, e, t, i)
          );
        },
        slideReset: function (e = this.params.speed, t = !0, i) {
          return this.slideTo(this.activeIndex, e, t, i);
        },
        slideToClosest: function (e = this.params.speed, t = !0, i, s = 0.5) {
          const n = this;
          let o = n.activeIndex;
          const r = Math.min(n.params.slidesPerGroupSkip, o),
            a = r + Math.floor((o - r) / n.params.slidesPerGroup),
            l = n.rtlTranslate ? n.translate : -n.translate;
          if (l >= n.snapGrid[a]) {
            const e = n.snapGrid[a];
            l - e > (n.snapGrid[a + 1] - e) * s &&
              (o += n.params.slidesPerGroup);
          } else {
            const e = n.snapGrid[a - 1];
            l - e <= (n.snapGrid[a] - e) * s && (o -= n.params.slidesPerGroup);
          }
          return (
            (o = Math.max(o, 0)),
            (o = Math.min(o, n.slidesGrid.length - 1)),
            n.slideTo(o, e, t, i)
          );
        },
        slideToClickedSlide: function () {
          const e = this,
            { params: t, $wrapperEl: i } = e,
            s =
              "auto" === t.slidesPerView
                ? e.slidesPerViewDynamic()
                : t.slidesPerView;
          let n,
            o = e.clickedIndex;
          if (t.loop) {
            if (e.animating) return;
            (n = parseInt(
              M(e.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              t.centeredSlides
                ? o < e.loopedSlides - s / 2 ||
                  o > e.slides.length - e.loopedSlides + s / 2
                  ? (e.loopFix(),
                    (o = i
                      .children(
                        `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    k(() => {
                      e.slideTo(o);
                    }))
                  : e.slideTo(o)
                : o > e.slides.length - s
                ? (e.loopFix(),
                  (o = i
                    .children(
                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  k(() => {
                    e.slideTo(o);
                  }))
                : e.slideTo(o);
          } else e.slideTo(o);
        },
      };
      const U = {
        loopCreate: function () {
          const e = this,
            t = w(),
            { params: i, $wrapperEl: s } = e,
            n = s.children().length > 0 ? M(s.children()[0].parentNode) : s;
          n.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
          let o = n.children(`.${i.slideClass}`);
          if (i.loopFillGroupWithBlank) {
            const e = i.slidesPerGroup - (o.length % i.slidesPerGroup);
            if (e !== i.slidesPerGroup) {
              for (let s = 0; s < e; s += 1) {
                const e = M(t.createElement("div")).addClass(
                  `${i.slideClass} ${i.slideBlankClass}`
                );
                n.append(e);
              }
              o = n.children(`.${i.slideClass}`);
            }
          }
          "auto" !== i.slidesPerView ||
            i.loopedSlides ||
            (i.loopedSlides = o.length),
            (e.loopedSlides = Math.ceil(
              parseFloat(i.loopedSlides || i.slidesPerView, 10)
            )),
            (e.loopedSlides += i.loopAdditionalSlides),
            e.loopedSlides > o.length && (e.loopedSlides = o.length);
          const r = [],
            a = [];
          o.each((t, i) => {
            const s = M(t);
            i < e.loopedSlides && a.push(t),
              i < o.length && i >= o.length - e.loopedSlides && r.push(t),
              s.attr("data-swiper-slide-index", i);
          });
          for (let e = 0; e < a.length; e += 1)
            n.append(M(a[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
          for (let e = r.length - 1; e >= 0; e -= 1)
            n.prepend(M(r[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
          const e = this;
          e.emit("beforeLoopFix");
          const {
            activeIndex: t,
            slides: i,
            loopedSlides: s,
            allowSlidePrev: n,
            allowSlideNext: o,
            snapGrid: r,
            rtlTranslate: a,
          } = e;
          let l;
          (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
          const d = -r[t] - e.getTranslate();
          if (t < s) {
            (l = i.length - 3 * s + t), (l += s);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((a ? -e.translate : e.translate) - d);
          } else if (t >= i.length - s) {
            (l = -i.length + t + s), (l += s);
            e.slideTo(l, 0, !1, !0) &&
              0 !== d &&
              e.setTranslate((a ? -e.translate : e.translate) - d);
          }
          (e.allowSlidePrev = n), (e.allowSlideNext = o), e.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: e, params: t, slides: i } = this;
          e
            .children(
              `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
            )
            .remove(),
            i.removeAttr("data-swiper-slide-index");
        },
      };
      function Z(e) {
        const t = this,
          i = w(),
          s = C(),
          n = t.touchEventsData,
          { params: o, touches: r, enabled: a } = t;
        if (!a) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let l = e;
        l.originalEvent && (l = l.originalEvent);
        let d = M(l.target);
        if ("wrapper" === o.touchEventsTarget && !d.closest(t.wrapperEl).length)
          return;
        if (
          ((n.isTouchEvent = "touchstart" === l.type),
          !n.isTouchEvent && "which" in l && 3 === l.which)
        )
          return;
        if (!n.isTouchEvent && "button" in l && l.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        !!o.noSwipingClass &&
          "" !== o.noSwipingClass &&
          l.target &&
          l.target.shadowRoot &&
          e.path &&
          e.path[0] &&
          (d = M(e.path[0]));
        const c = o.noSwipingSelector
            ? o.noSwipingSelector
            : `.${o.noSwipingClass}`,
          u = !(!l.target || !l.target.shadowRoot);
        if (
          o.noSwiping &&
          (u
            ? (function (e, t = this) {
                return (function t(i) {
                  return i && i !== w() && i !== C()
                    ? (i.assignedSlot && (i = i.assignedSlot),
                      i.closest(e) || t(i.getRootNode().host))
                    : null;
                })(t);
              })(c, l.target)
            : d.closest(c)[0])
        )
          return void (t.allowClick = !0);
        if (o.swipeHandler && !d.closest(o.swipeHandler)[0]) return;
        (r.currentX =
          "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
          (r.currentY =
            "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
        const h = r.currentX,
          p = r.currentY,
          g = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
          m = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
        if (g && (h <= m || h >= s.innerWidth - m)) {
          if ("prevent" !== g) return;
          e.preventDefault();
        }
        if (
          (Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (r.startX = h),
          (r.startY = p),
          (n.touchStartTime = A()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          o.threshold > 0 && (n.allowThresholdMove = !1),
          "touchstart" !== l.type)
        ) {
          let e = !0;
          d.is(n.focusableElements) && (e = !1),
            i.activeElement &&
              M(i.activeElement).is(n.focusableElements) &&
              i.activeElement !== d[0] &&
              i.activeElement.blur();
          const s = e && t.allowTouchMove && o.touchStartPreventDefault;
          (!o.touchStartForcePreventDefault && !s) ||
            d[0].isContentEditable ||
            l.preventDefault();
        }
        t.emit("touchStart", l);
      }
      function K(e) {
        const t = w(),
          i = this,
          s = i.touchEventsData,
          { params: n, touches: o, rtlTranslate: r, enabled: a } = i;
        if (!a) return;
        let l = e;
        if ((l.originalEvent && (l = l.originalEvent), !s.isTouched))
          return void (
            s.startMoving &&
            s.isScrolling &&
            i.emit("touchMoveOpposite", l)
          );
        if (s.isTouchEvent && "touchmove" !== l.type) return;
        const d =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          c = "touchmove" === l.type ? d.pageX : l.pageX,
          u = "touchmove" === l.type ? d.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (o.startX = c), void (o.startY = u);
        if (!i.allowTouchMove)
          return (
            (i.allowClick = !1),
            void (
              s.isTouched &&
              (Object.assign(o, {
                startX: c,
                startY: u,
                currentX: c,
                currentY: u,
              }),
              (s.touchStartTime = A()))
            )
          );
        if (s.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
          if (i.isVertical()) {
            if (
              (u < o.startY && i.translate <= i.maxTranslate()) ||
              (u > o.startY && i.translate >= i.minTranslate())
            )
              return (s.isTouched = !1), void (s.isMoved = !1);
          } else if (
            (c < o.startX && i.translate <= i.maxTranslate()) ||
            (c > o.startX && i.translate >= i.minTranslate())
          )
            return;
        if (
          s.isTouchEvent &&
          t.activeElement &&
          l.target === t.activeElement &&
          M(l.target).is(s.focusableElements)
        )
          return (s.isMoved = !0), void (i.allowClick = !1);
        if (
          (s.allowTouchCallbacks && i.emit("touchMove", l),
          l.targetTouches && l.targetTouches.length > 1)
        )
          return;
        (o.currentX = c), (o.currentY = u);
        const h = o.currentX - o.startX,
          p = o.currentY - o.startY;
        if (
          i.params.threshold &&
          Math.sqrt(h ** 2 + p ** 2) < i.params.threshold
        )
          return;
        if (void 0 === s.isScrolling) {
          let e;
          (i.isHorizontal() && o.currentY === o.startY) ||
          (i.isVertical() && o.currentX === o.startX)
            ? (s.isScrolling = !1)
            : h * h + p * p >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
              (s.isScrolling = i.isHorizontal()
                ? e > n.touchAngle
                : 90 - e > n.touchAngle));
        }
        if (
          (s.isScrolling && i.emit("touchMoveOpposite", l),
          void 0 === s.startMoving &&
            ((o.currentX === o.startX && o.currentY === o.startY) ||
              (s.startMoving = !0)),
          s.isScrolling)
        )
          return void (s.isTouched = !1);
        if (!s.startMoving) return;
        (i.allowClick = !1),
          !n.cssMode && l.cancelable && l.preventDefault(),
          n.touchMoveStopPropagation && !n.nested && l.stopPropagation(),
          s.isMoved ||
            (n.loop && !n.cssMode && i.loopFix(),
            (s.startTranslate = i.getTranslate()),
            i.setTransition(0),
            i.animating &&
              i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (s.allowMomentumBounce = !1),
            !n.grabCursor ||
              (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
              i.setGrabCursor(!0),
            i.emit("sliderFirstMove", l)),
          i.emit("sliderMove", l),
          (s.isMoved = !0);
        let g = i.isHorizontal() ? h : p;
        (o.diff = g),
          (g *= n.touchRatio),
          r && (g = -g),
          (i.swipeDirection = g > 0 ? "prev" : "next"),
          (s.currentTranslate = g + s.startTranslate);
        let m = !0,
          f = n.resistanceRatio;
        if (
          (n.touchReleaseOnEdges && (f = 0),
          g > 0 && s.currentTranslate > i.minTranslate()
            ? ((m = !1),
              n.resistance &&
                (s.currentTranslate =
                  i.minTranslate() -
                  1 +
                  (-i.minTranslate() + s.startTranslate + g) ** f))
            : g < 0 &&
              s.currentTranslate < i.maxTranslate() &&
              ((m = !1),
              n.resistance &&
                (s.currentTranslate =
                  i.maxTranslate() +
                  1 -
                  (i.maxTranslate() - s.startTranslate - g) ** f)),
          m && (l.preventedByNestedSwiper = !0),
          !i.allowSlideNext &&
            "next" === i.swipeDirection &&
            s.currentTranslate < s.startTranslate &&
            (s.currentTranslate = s.startTranslate),
          !i.allowSlidePrev &&
            "prev" === i.swipeDirection &&
            s.currentTranslate > s.startTranslate &&
            (s.currentTranslate = s.startTranslate),
          i.allowSlidePrev ||
            i.allowSlideNext ||
            (s.currentTranslate = s.startTranslate),
          n.threshold > 0)
        ) {
          if (!(Math.abs(g) > n.threshold || s.allowThresholdMove))
            return void (s.currentTranslate = s.startTranslate);
          if (!s.allowThresholdMove)
            return (
              (s.allowThresholdMove = !0),
              (o.startX = o.currentX),
              (o.startY = o.currentY),
              (s.currentTranslate = s.startTranslate),
              void (o.diff = i.isHorizontal()
                ? o.currentX - o.startX
                : o.currentY - o.startY)
            );
        }
        n.followFinger &&
          !n.cssMode &&
          (((n.freeMode && n.freeMode.enabled && i.freeMode) ||
            n.watchSlidesProgress) &&
            (i.updateActiveIndex(), i.updateSlidesClasses()),
          i.params.freeMode &&
            n.freeMode.enabled &&
            i.freeMode &&
            i.freeMode.onTouchMove(),
          i.updateProgress(s.currentTranslate),
          i.setTranslate(s.currentTranslate));
      }
      function Q(e) {
        const t = this,
          i = t.touchEventsData,
          {
            params: s,
            touches: n,
            rtlTranslate: o,
            slidesGrid: r,
            enabled: a,
          } = t;
        if (!a) return;
        let l = e;
        if (
          (l.originalEvent && (l = l.originalEvent),
          i.allowTouchCallbacks && t.emit("touchEnd", l),
          (i.allowTouchCallbacks = !1),
          !i.isTouched)
        )
          return (
            i.isMoved && s.grabCursor && t.setGrabCursor(!1),
            (i.isMoved = !1),
            void (i.startMoving = !1)
          );
        s.grabCursor &&
          i.isMoved &&
          i.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const d = A(),
          c = d - i.touchStartTime;
        if (t.allowClick) {
          const e = l.path || (l.composedPath && l.composedPath());
          t.updateClickedSlide((e && e[0]) || l.target),
            t.emit("tap click", l),
            c < 300 &&
              d - i.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", l);
        }
        if (
          ((i.lastClickTime = A()),
          k(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !i.isTouched ||
            !i.isMoved ||
            !t.swipeDirection ||
            0 === n.diff ||
            i.currentTranslate === i.startTranslate)
        )
          return (
            (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1)
          );
        let u;
        if (
          ((i.isTouched = !1),
          (i.isMoved = !1),
          (i.startMoving = !1),
          (u = s.followFinger
            ? o
              ? t.translate
              : -t.translate
            : -i.currentTranslate),
          s.cssMode)
        )
          return;
        if (t.params.freeMode && s.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: u });
        let h = 0,
          p = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < r.length;
          e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
        ) {
          const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
          void 0 !== r[e + t]
            ? u >= r[e] && u < r[e + t] && ((h = e), (p = r[e + t] - r[e]))
            : u >= r[e] && ((h = e), (p = r[r.length - 1] - r[r.length - 2]));
        }
        const g = (u - r[h]) / p,
          m = h < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        if (c > s.longSwipesMs) {
          if (!s.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (g >= s.longSwipesRatio ? t.slideTo(h + m) : t.slideTo(h)),
            "prev" === t.swipeDirection &&
              (g > 1 - s.longSwipesRatio ? t.slideTo(h + m) : t.slideTo(h));
        } else {
          if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl)
            ? l.target === t.navigation.nextEl
              ? t.slideTo(h + m)
              : t.slideTo(h)
            : ("next" === t.swipeDirection && t.slideTo(h + m),
              "prev" === t.swipeDirection && t.slideTo(h));
        }
      }
      function J() {
        const e = this,
          { params: t, el: i } = e;
        if (i && 0 === i.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: s, allowSlidePrev: n, snapGrid: o } = e;
        (e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses(),
          ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.isBeginning &&
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0),
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.run(),
          (e.allowSlidePrev = n),
          (e.allowSlideNext = s),
          e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
      }
      function ee(e) {
        const t = this;
        t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation())));
      }
      function te() {
        const e = this,
          { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
        if (!s) return;
        let n;
        (e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          -0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses();
        const o = e.maxTranslate() - e.minTranslate();
        (n = 0 === o ? 0 : (e.translate - e.minTranslate()) / o),
          n !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1);
      }
      let ie = !1;
      function se() {}
      const ne = (e, t) => {
        const i = w(),
          {
            params: s,
            touchEvents: n,
            el: o,
            wrapperEl: r,
            device: a,
            support: l,
          } = e,
          d = !!s.nested,
          c = "on" === t ? "addEventListener" : "removeEventListener",
          u = t;
        if (l.touch) {
          const t = !(
            "touchstart" !== n.start ||
            !l.passiveListener ||
            !s.passiveListeners
          ) && { passive: !0, capture: !1 };
          o[c](n.start, e.onTouchStart, t),
            o[c](
              n.move,
              e.onTouchMove,
              l.passiveListener ? { passive: !1, capture: d } : d
            ),
            o[c](n.end, e.onTouchEnd, t),
            n.cancel && o[c](n.cancel, e.onTouchEnd, t);
        } else
          o[c](n.start, e.onTouchStart, !1),
            i[c](n.move, e.onTouchMove, d),
            i[c](n.end, e.onTouchEnd, !1);
        (s.preventClicks || s.preventClicksPropagation) &&
          o[c]("click", e.onClick, !0),
          s.cssMode && r[c]("scroll", e.onScroll),
          s.updateOnWindowResize
            ? e[u](
                a.ios || a.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                J,
                !0
              )
            : e[u]("observerUpdate", J, !0);
      };
      const oe = {
          attachEvents: function () {
            const e = this,
              t = w(),
              { params: i, support: s } = e;
            (e.onTouchStart = Z.bind(e)),
              (e.onTouchMove = K.bind(e)),
              (e.onTouchEnd = Q.bind(e)),
              i.cssMode && (e.onScroll = te.bind(e)),
              (e.onClick = ee.bind(e)),
              s.touch &&
                !ie &&
                (t.addEventListener("touchstart", se), (ie = !0)),
              ne(e, "on");
          },
          detachEvents: function () {
            ne(this, "off");
          },
        },
        re = (e, t) => e.grid && t.grid && t.grid.rows > 1;
      const ae = {
        setBreakpoint: function () {
          const e = this,
            {
              activeIndex: t,
              initialized: i,
              loopedSlides: s = 0,
              params: n,
              $el: o,
            } = e,
            r = n.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const a = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!a || e.currentBreakpoint === a) return;
          const l = (a in r ? r[a] : void 0) || e.originalParams,
            d = re(e, n),
            c = re(e, l),
            u = n.enabled;
          d && !c
            ? (o.removeClass(
                `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
              ),
              e.emitContainerClasses())
            : !d &&
              c &&
              (o.addClass(`${n.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === n.grid.fill)) &&
                o.addClass(`${n.containerModifierClass}grid-column`),
              e.emitContainerClasses());
          const h = l.direction && l.direction !== n.direction,
            p = n.loop && (l.slidesPerView !== n.slidesPerView || h);
          h && i && e.changeDirection(), D(e.params, l);
          const g = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            u && !g ? e.disable() : !u && g && e.enable(),
            (e.currentBreakpoint = a),
            e.emit("_beforeBreakpoint", l),
            p &&
              i &&
              (e.loopDestroy(),
              e.loopCreate(),
              e.updateSlides(),
              e.slideTo(t - s + e.loopedSlides, 0, !1)),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t = "window", i) {
          if (!e || ("container" === t && !i)) return;
          let s = !1;
          const n = C(),
            o = "window" === t ? n.innerHeight : i.clientHeight,
            r = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: o * t, point: e };
              }
              return { value: e, point: e };
            });
          r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < r.length; e += 1) {
            const { point: o, value: a } = r[e];
            "window" === t
              ? n.matchMedia(`(min-width: ${a}px)`).matches && (s = o)
              : a <= i.clientWidth && (s = o);
          }
          return s || "max";
        },
      };
      const le = {
        addClasses: function () {
          const e = this,
            {
              classNames: t,
              params: i,
              rtl: s,
              $el: n,
              device: o,
              support: r,
            } = e,
            a = (function (e, t) {
              const i = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((s) => {
                        e[s] && i.push(t + s);
                      })
                    : "string" == typeof e && i.push(t + e);
                }),
                i
              );
            })(
              [
                "initialized",
                i.direction,
                { "pointer-events": !r.touch },
                { "free-mode": e.params.freeMode && i.freeMode.enabled },
                { autoheight: i.autoHeight },
                { rtl: s },
                { grid: i.grid && i.grid.rows > 1 },
                {
                  "grid-column":
                    i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
                },
                { android: o.android },
                { ios: o.ios },
                { "css-mode": i.cssMode },
                { centered: i.cssMode && i.centeredSlides },
              ],
              i.containerModifierClass
            );
          t.push(...a), n.addClass([...t].join(" ")), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: e, classNames: t } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses();
        },
      };
      const de = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function ce(e, t) {
        return function (i = {}) {
          const s = Object.keys(i)[0],
            n = i[s];
          "object" == typeof n && null !== n
            ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
                !0 === e[s] &&
                (e[s] = { auto: !0 }),
              s in e && "enabled" in n
                ? (!0 === e[s] && (e[s] = { enabled: !0 }),
                  "object" != typeof e[s] ||
                    "enabled" in e[s] ||
                    (e[s].enabled = !0),
                  e[s] || (e[s] = { enabled: !1 }),
                  D(t, i))
                : D(t, i))
            : D(t, i);
        };
      }
      const ue = {
          eventsEmitter: X,
          update: q,
          translate: Y,
          transition: {
            setTransition: function (e, t) {
              const i = this;
              i.params.cssMode || i.$wrapperEl.transition(e),
                i.emit("setTransition", e, t);
            },
            transitionStart: function (e = !0, t) {
              const i = this,
                { params: s } = i;
              s.cssMode ||
                (s.autoHeight && i.updateAutoHeight(),
                R({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
            },
            transitionEnd: function (e = !0, t) {
              const i = this,
                { params: s } = i;
              (i.animating = !1),
                s.cssMode ||
                  (i.setTransition(0),
                  R({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
            },
          },
          slide: W,
          loop: U,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                t.support.touch ||
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const i =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (i.style.cursor = "move"),
                (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
                (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
                (i.style.cursor = e ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const e = this;
              e.support.touch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: oe,
          breakpoints: ae,
          checkOverflow: {
            checkOverflow: function () {
              const e = this,
                { isLocked: t, params: i } = e,
                { slidesOffsetBefore: s } = i;
              if (s) {
                const t = e.slides.length - 1,
                  i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
                e.isLocked = e.size > i;
              } else e.isLocked = 1 === e.snapGrid.length;
              !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
            },
          },
          classes: le,
          images: {
            loadImage: function (e, t, i, s, n, o) {
              const r = C();
              let a;
              function l() {
                o && o();
              }
              M(e).parent("picture")[0] || (e.complete && n)
                ? l()
                : t
                ? ((a = new r.Image()),
                  (a.onload = l),
                  (a.onerror = l),
                  s && (a.sizes = s),
                  i && (a.srcset = i),
                  t && (a.src = t))
                : l();
            },
            preloadImages: function () {
              const e = this;
              function t() {
                null != e &&
                  e &&
                  !e.destroyed &&
                  (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                  e.imagesLoaded === e.imagesToLoad.length &&
                    (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")));
              }
              e.imagesToLoad = e.$el.find("img");
              for (let i = 0; i < e.imagesToLoad.length; i += 1) {
                const s = e.imagesToLoad[i];
                e.loadImage(
                  s,
                  s.currentSrc || s.getAttribute("src"),
                  s.srcset || s.getAttribute("srcset"),
                  s.sizes || s.getAttribute("sizes"),
                  !0,
                  t
                );
              }
            },
          },
        },
        he = {};
      class pe {
        constructor(...e) {
          let t, i;
          if (
            (1 === e.length &&
            e[0].constructor &&
            "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
              ? (i = e[0])
              : ([t, i] = e),
            i || (i = {}),
            (i = D({}, i)),
            t && !i.el && (i.el = t),
            i.el && M(i.el).length > 1)
          ) {
            const e = [];
            return (
              M(i.el).each((t) => {
                const s = D({}, i, { el: t });
                e.push(new pe(s));
              }),
              e
            );
          }
          const s = this;
          (s.__swiper__ = !0),
            (s.support = H()),
            (s.device = F({ userAgent: i.userAgent })),
            (s.browser = j()),
            (s.eventsListeners = {}),
            (s.eventsAnyListeners = []),
            (s.modules = [...s.__modules__]),
            i.modules &&
              Array.isArray(i.modules) &&
              s.modules.push(...i.modules);
          const n = {};
          s.modules.forEach((e) => {
            e({
              swiper: s,
              extendParams: ce(i, n),
              on: s.on.bind(s),
              once: s.once.bind(s),
              off: s.off.bind(s),
              emit: s.emit.bind(s),
            });
          });
          const o = D({}, de, n);
          return (
            (s.params = D({}, o, he, i)),
            (s.originalParams = D({}, s.params)),
            (s.passedParams = D({}, i)),
            s.params &&
              s.params.on &&
              Object.keys(s.params.on).forEach((e) => {
                s.on(e, s.params.on[e]);
              }),
            s.params && s.params.onAny && s.onAny(s.params.onAny),
            (s.$ = M),
            Object.assign(s, {
              enabled: s.params.enabled,
              el: t,
              classNames: [],
              slides: M(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === s.params.direction,
              isVertical: () => "vertical" === s.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: s.params.allowSlideNext,
              allowSlidePrev: s.params.allowSlidePrev,
              touchEvents: (function () {
                const e = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  t = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (s.touchEventsTouch = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                    cancel: e[3],
                  }),
                  (s.touchEventsDesktop = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                  }),
                  s.support.touch || !s.params.simulateTouch
                    ? s.touchEventsTouch
                    : s.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: s.params.focusableElements,
                lastClickTime: A(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: s.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            s.emit("_swiper"),
            s.params.init && s.init(),
            s
          );
        }
        enable() {
          const e = this;
          e.enabled ||
            ((e.enabled = !0),
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"));
        }
        disable() {
          const e = this;
          e.enabled &&
            ((e.enabled = !1),
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"));
        }
        setProgress(e, t) {
          const i = this;
          e = Math.min(Math.max(e, 0), 1);
          const s = i.minTranslate(),
            n = (i.maxTranslate() - s) * e + s;
          i.translateTo(n, void 0 === t ? 0 : t),
            i.updateActiveIndex(),
            i.updateSlidesClasses();
        }
        emitContainerClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = e.el.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper") ||
                0 === t.indexOf(e.params.containerModifierClass)
            );
          e.emit("_containerClasses", t.join(" "));
        }
        getSlideClasses(e) {
          const t = this;
          return e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const e = this;
          if (!e.params._emitClasses || !e.el) return;
          const t = [];
          e.slides.each((i) => {
            const s = e.getSlideClasses(i);
            t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
          }),
            e.emit("_slideClasses", t);
        }
        slidesPerViewDynamic(e = "current", t = !1) {
          const {
            params: i,
            slides: s,
            slidesGrid: n,
            slidesSizesGrid: o,
            size: r,
            activeIndex: a,
          } = this;
          let l = 1;
          if (i.centeredSlides) {
            let e,
              t = s[a].swiperSlideSize;
            for (let i = a + 1; i < s.length; i += 1)
              s[i] &&
                !e &&
                ((t += s[i].swiperSlideSize), (l += 1), t > r && (e = !0));
            for (let i = a - 1; i >= 0; i -= 1)
              s[i] &&
                !e &&
                ((t += s[i].swiperSlideSize), (l += 1), t > r && (e = !0));
          } else if ("current" === e)
            for (let e = a + 1; e < s.length; e += 1) {
              (t ? n[e] + o[e] - n[a] < r : n[e] - n[a] < r) && (l += 1);
            }
          else
            for (let e = a - 1; e >= 0; e -= 1) {
              n[a] - n[e] < r && (l += 1);
            }
          return l;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: i } = e;
          function s() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
          }
          let n;
          i.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled
              ? (s(), e.params.autoHeight && e.updateAutoHeight())
              : ((n =
                  ("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)),
                n || s()),
            i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update");
        }
        changeDirection(e, t = !0) {
          const i = this,
            s = i.params.direction;
          return (
            e || (e = "horizontal" === s ? "vertical" : "horizontal"),
            e === s ||
              ("horizontal" !== e && "vertical" !== e) ||
              (i.$el
                .removeClass(`${i.params.containerModifierClass}${s}`)
                .addClass(`${i.params.containerModifierClass}${e}`),
              i.emitContainerClasses(),
              (i.params.direction = e),
              i.slides.each((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              i.emit("changeDirection"),
              t && i.update()),
            i
          );
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          const i = M(e || t.params.el);
          if (!(e = i[0])) return !1;
          e.swiper = t;
          const s = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let n = (() => {
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
              const t = M(e.shadowRoot.querySelector(s()));
              return (t.children = (e) => i.children(e)), t;
            }
            return i.children(s());
          })();
          if (0 === n.length && t.params.createElements) {
            const e = w().createElement("div");
            (n = M(e)),
              (e.className = t.params.wrapperClass),
              i.append(e),
              i.children(`.${t.params.slideClass}`).each((e) => {
                n.append(e);
              });
          }
          return (
            Object.assign(t, {
              $el: i,
              el: e,
              $wrapperEl: n,
              wrapperEl: n[0],
              mounted: !0,
              rtl:
                "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
              wrongRTL: "-webkit-box" === n.css("display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          if (t.initialized) return t;
          return (
            !1 === t.mount(e) ||
              (t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.params.loop && t.loopCreate(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.preloadImages && t.preloadImages(),
              t.params.loop
                ? t.slideTo(
                    t.params.initialSlide + t.loopedSlides,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.attachEvents(),
              (t.initialized = !0),
              t.emit("init"),
              t.emit("afterInit")),
            t
          );
        }
        destroy(e = !0, t = !0) {
          const i = this,
            { params: s, $el: n, $wrapperEl: o, slides: r } = i;
          return (
            void 0 === i.params ||
              i.destroyed ||
              (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              s.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                n.removeAttr("style"),
                o.removeAttr("style"),
                r &&
                  r.length &&
                  r
                    .removeClass(
                      [
                        s.slideVisibleClass,
                        s.slideActiveClass,
                        s.slideNextClass,
                        s.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach((e) => {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                (function (e) {
                  const t = e;
                  Object.keys(t).forEach((e) => {
                    try {
                      t[e] = null;
                    } catch (e) {}
                    try {
                      delete t[e];
                    } catch (e) {}
                  });
                })(i)),
              (i.destroyed = !0)),
            null
          );
        }
        static extendDefaults(e) {
          D(he, e);
        }
        static get extendedDefaults() {
          return he;
        }
        static get defaults() {
          return de;
        }
        static installModule(e) {
          pe.prototype.__modules__ || (pe.prototype.__modules__ = []);
          const t = pe.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => pe.installModule(e)), pe)
            : (pe.installModule(e), pe);
        }
      }
      Object.keys(ue).forEach((e) => {
        Object.keys(ue[e]).forEach((t) => {
          pe.prototype[t] = ue[e][t];
        });
      }),
        pe.use([
          function ({ swiper: e, on: t, emit: i }) {
            const s = C();
            let n = null;
            const o = () => {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (i("beforeResize"), i("resize"));
              },
              r = () => {
                e && !e.destroyed && e.initialized && i("orientationchange");
              };
            t("init", () => {
              e.params.resizeObserver && void 0 !== s.ResizeObserver
                ? e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((n = new ResizeObserver((t) => {
                    const { width: i, height: s } = e;
                    let n = i,
                      r = s;
                    t.forEach(
                      ({ contentBoxSize: t, contentRect: i, target: s }) => {
                        (s && s !== e.el) ||
                          ((n = i ? i.width : (t[0] || t).inlineSize),
                          (r = i ? i.height : (t[0] || t).blockSize));
                      }
                    ),
                      (n === i && r === s) || o();
                  })),
                  n.observe(e.el))
                : (s.addEventListener("resize", o),
                  s.addEventListener("orientationchange", r));
            }),
              t("destroy", () => {
                n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
                  s.removeEventListener("resize", o),
                  s.removeEventListener("orientationchange", r);
              });
          },
          function ({ swiper: e, extendParams: t, on: i, emit: s }) {
            const n = [],
              o = C(),
              r = (e, t = {}) => {
                const i = new (o.MutationObserver || o.WebkitMutationObserver)(
                  (e) => {
                    if (1 === e.length) return void s("observerUpdate", e[0]);
                    const t = function () {
                      s("observerUpdate", e[0]);
                    };
                    o.requestAnimationFrame
                      ? o.requestAnimationFrame(t)
                      : o.setTimeout(t, 0);
                  }
                );
                i.observe(e, {
                  attributes: void 0 === t.attributes || t.attributes,
                  childList: void 0 === t.childList || t.childList,
                  characterData: void 0 === t.characterData || t.characterData,
                }),
                  n.push(i);
              };
            t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              i("init", () => {
                if (e.params.observer) {
                  if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let e = 0; e < t.length; e += 1) r(t[e]);
                  }
                  r(e.$el[0], { childList: e.params.observeSlideChildren }),
                    r(e.$wrapperEl[0], { attributes: !1 });
                }
              }),
              i("destroy", () => {
                n.forEach((e) => {
                  e.disconnect();
                }),
                  n.splice(0, n.length);
              });
          },
        ]);
      const ge = pe;
      function me(e, t, i, s) {
        const n = w();
        return (
          e.params.createElements &&
            Object.keys(s).forEach((o) => {
              if (!i[o] && !0 === i.auto) {
                let r = e.$el.children(`.${s[o]}`)[0];
                r ||
                  ((r = n.createElement("div")),
                  (r.className = s[o]),
                  e.$el.append(r)),
                  (i[o] = r),
                  (t[o] = r);
              }
            }),
          i
        );
      }
      function fe({ swiper: e, extendParams: t, on: i, emit: s }) {
        function n(t) {
          let i;
          return (
            t &&
              ((i = M(t)),
              e.params.uniqueNavElements &&
                "string" == typeof t &&
                i.length > 1 &&
                1 === e.$el.find(t).length &&
                (i = e.$el.find(t))),
            i
          );
        }
        function o(t, i) {
          const s = e.params.navigation;
          t &&
            t.length > 0 &&
            (t[i ? "addClass" : "removeClass"](s.disabledClass),
            t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
            e.params.watchOverflow &&
              e.enabled &&
              t[e.isLocked ? "addClass" : "removeClass"](s.lockClass));
        }
        function r() {
          if (e.params.loop) return;
          const { $nextEl: t, $prevEl: i } = e.navigation;
          o(i, e.isBeginning && !e.params.rewind),
            o(t, e.isEnd && !e.params.rewind);
        }
        function a(t) {
          t.preventDefault(),
            (!e.isBeginning || e.params.loop || e.params.rewind) &&
              e.slidePrev();
        }
        function l(t) {
          t.preventDefault(),
            (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
        }
        function d() {
          const t = e.params.navigation;
          if (
            ((e.params.navigation = me(
              e,
              e.originalParams.navigation,
              e.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !t.nextEl && !t.prevEl)
          )
            return;
          const i = n(t.nextEl),
            s = n(t.prevEl);
          i && i.length > 0 && i.on("click", l),
            s && s.length > 0 && s.on("click", a),
            Object.assign(e.navigation, {
              $nextEl: i,
              nextEl: i && i[0],
              $prevEl: s,
              prevEl: s && s[0],
            }),
            e.enabled ||
              (i && i.addClass(t.lockClass), s && s.addClass(t.lockClass));
        }
        function c() {
          const { $nextEl: t, $prevEl: i } = e.navigation;
          t &&
            t.length &&
            (t.off("click", l),
            t.removeClass(e.params.navigation.disabledClass)),
            i &&
              i.length &&
              (i.off("click", a),
              i.removeClass(e.params.navigation.disabledClass));
        }
        t({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        }),
          (e.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          i("init", () => {
            d(), r();
          }),
          i("toEdge fromEdge lock unlock", () => {
            r();
          }),
          i("destroy", () => {
            c();
          }),
          i("enable disable", () => {
            const { $nextEl: t, $prevEl: i } = e.navigation;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              ),
              i &&
                i[e.enabled ? "removeClass" : "addClass"](
                  e.params.navigation.lockClass
                );
          }),
          i("click", (t, i) => {
            const { $nextEl: n, $prevEl: o } = e.navigation,
              r = i.target;
            if (e.params.navigation.hideOnClick && !M(r).is(o) && !M(r).is(n)) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === r || e.pagination.el.contains(r))
              )
                return;
              let t;
              n
                ? (t = n.hasClass(e.params.navigation.hiddenClass))
                : o && (t = o.hasClass(e.params.navigation.hiddenClass)),
                s(!0 === t ? "navigationShow" : "navigationHide"),
                n && n.toggleClass(e.params.navigation.hiddenClass),
                o && o.toggleClass(e.params.navigation.hiddenClass);
            }
          }),
          Object.assign(e.navigation, { update: r, init: d, destroy: c });
      }
      function ve(e = "") {
        return `.${e
          .trim()
          .replace(/([\.:!\/])/g, "\\$1")
          .replace(/ /g, ".")}`;
      }
      function ye({ swiper: e, extendParams: t, on: i, emit: s }) {
        const n = "swiper-pagination";
        let o;
        t({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e) => e,
            formatFractionTotal: (e) => e,
            bulletClass: `${n}-bullet`,
            bulletActiveClass: `${n}-bullet-active`,
            modifierClass: `${n}-`,
            currentClass: `${n}-current`,
            totalClass: `${n}-total`,
            hiddenClass: `${n}-hidden`,
            progressbarFillClass: `${n}-progressbar-fill`,
            progressbarOppositeClass: `${n}-progressbar-opposite`,
            clickableClass: `${n}-clickable`,
            lockClass: `${n}-lock`,
            horizontalClass: `${n}-horizontal`,
            verticalClass: `${n}-vertical`,
          },
        }),
          (e.pagination = { el: null, $el: null, bullets: [] });
        let r = 0;
        function a() {
          return (
            !e.params.pagination.el ||
            !e.pagination.el ||
            !e.pagination.$el ||
            0 === e.pagination.$el.length
          );
        }
        function l(t, i) {
          const { bulletActiveClass: s } = e.params.pagination;
          t[i]().addClass(`${s}-${i}`)[i]().addClass(`${s}-${i}-${i}`);
        }
        function d() {
          const t = e.rtl,
            i = e.params.pagination;
          if (a()) return;
          const n =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            d = e.pagination.$el;
          let c;
          const u = e.params.loop
            ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((c = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )),
                c > n - 1 - 2 * e.loopedSlides && (c -= n - 2 * e.loopedSlides),
                c > u - 1 && (c -= u),
                c < 0 && "bullets" !== e.params.paginationType && (c = u + c))
              : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === i.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            const s = e.pagination.bullets;
            let n, a, u;
            if (
              (i.dynamicBullets &&
                ((o = s
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                d.css(
                  e.isHorizontal() ? "width" : "height",
                  o * (i.dynamicMainBullets + 4) + "px"
                ),
                i.dynamicMainBullets > 1 &&
                  void 0 !== e.previousIndex &&
                  ((r += c - (e.previousIndex - e.loopedSlides || 0)),
                  r > i.dynamicMainBullets - 1
                    ? (r = i.dynamicMainBullets - 1)
                    : r < 0 && (r = 0)),
                (n = Math.max(c - r, 0)),
                (a = n + (Math.min(s.length, i.dynamicMainBullets) - 1)),
                (u = (a + n) / 2)),
              s.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((e) => `${i.bulletActiveClass}${e}`)
                  .join(" ")
              ),
              d.length > 1)
            )
              s.each((e) => {
                const t = M(e),
                  s = t.index();
                s === c && t.addClass(i.bulletActiveClass),
                  i.dynamicBullets &&
                    (s >= n &&
                      s <= a &&
                      t.addClass(`${i.bulletActiveClass}-main`),
                    s === n && l(t, "prev"),
                    s === a && l(t, "next"));
              });
            else {
              const t = s.eq(c),
                o = t.index();
              if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
                const t = s.eq(n),
                  r = s.eq(a);
                for (let e = n; e <= a; e += 1)
                  s.eq(e).addClass(`${i.bulletActiveClass}-main`);
                if (e.params.loop)
                  if (o >= s.length) {
                    for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                      s.eq(s.length - e).addClass(
                        `${i.bulletActiveClass}-main`
                      );
                    s.eq(s.length - i.dynamicMainBullets - 1).addClass(
                      `${i.bulletActiveClass}-prev`
                    );
                  } else l(t, "prev"), l(r, "next");
                else l(t, "prev"), l(r, "next");
              }
            }
            if (i.dynamicBullets) {
              const n = Math.min(s.length, i.dynamicMainBullets + 4),
                r = (o * n - o) / 2 - u * o,
                a = t ? "right" : "left";
              s.css(e.isHorizontal() ? a : "top", `${r}px`);
            }
          }
          if (
            ("fraction" === i.type &&
              (d.find(ve(i.currentClass)).text(i.formatFractionCurrent(c + 1)),
              d.find(ve(i.totalClass)).text(i.formatFractionTotal(u))),
            "progressbar" === i.type)
          ) {
            let t;
            t = i.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            const s = (c + 1) / u;
            let n = 1,
              o = 1;
            "horizontal" === t ? (n = s) : (o = s),
              d
                .find(ve(i.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`)
                .transition(e.params.speed);
          }
          "custom" === i.type && i.renderCustom
            ? (d.html(i.renderCustom(e, c + 1, u)), s("paginationRender", d[0]))
            : s("paginationUpdate", d[0]),
            e.params.watchOverflow &&
              e.enabled &&
              d[e.isLocked ? "addClass" : "removeClass"](i.lockClass);
        }
        function c() {
          const t = e.params.pagination;
          if (a()) return;
          const i =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            n = e.pagination.$el;
          let o = "";
          if ("bullets" === t.type) {
            let s = e.params.loop
              ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
            e.params.freeMode &&
              e.params.freeMode.enabled &&
              !e.params.loop &&
              s > i &&
              (s = i);
            for (let i = 0; i < s; i += 1)
              t.renderBullet
                ? (o += t.renderBullet.call(e, i, t.bulletClass))
                : (o += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
            n.html(o), (e.pagination.bullets = n.find(ve(t.bulletClass)));
          }
          "fraction" === t.type &&
            ((o = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            n.html(o)),
            "progressbar" === t.type &&
              ((o = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : `<span class="${t.progressbarFillClass}"></span>`),
              n.html(o)),
            "custom" !== t.type && s("paginationRender", e.pagination.$el[0]);
        }
        function u() {
          e.params.pagination = me(
            e,
            e.originalParams.pagination,
            e.params.pagination,
            { el: "swiper-pagination" }
          );
          const t = e.params.pagination;
          if (!t.el) return;
          let i = M(t.el);
          0 !== i.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              i.length > 1 &&
              ((i = e.$el.find(t.el)),
              i.length > 1 &&
                (i = i.filter((t) => M(t).parents(".swiper")[0] === e.el))),
            "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
            i.addClass(t.modifierClass + t.type),
            i.addClass(t.modifierClass + e.params.direction),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
              (r = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type &&
              t.progressbarOpposite &&
              i.addClass(t.progressbarOppositeClass),
            t.clickable &&
              i.on("click", ve(t.bulletClass), function (t) {
                t.preventDefault();
                let i = M(this).index() * e.params.slidesPerGroup;
                e.params.loop && (i += e.loopedSlides), e.slideTo(i);
              }),
            Object.assign(e.pagination, { $el: i, el: i[0] }),
            e.enabled || i.addClass(t.lockClass));
        }
        function h() {
          const t = e.params.pagination;
          if (a()) return;
          const i = e.pagination.$el;
          i.removeClass(t.hiddenClass),
            i.removeClass(t.modifierClass + t.type),
            i.removeClass(t.modifierClass + e.params.direction),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && i.off("click", ve(t.bulletClass));
        }
        i("init", () => {
          u(), c(), d();
        }),
          i("activeIndexChange", () => {
            (e.params.loop || void 0 === e.snapIndex) && d();
          }),
          i("snapIndexChange", () => {
            e.params.loop || d();
          }),
          i("slidesLengthChange", () => {
            e.params.loop && (c(), d());
          }),
          i("snapGridLengthChange", () => {
            e.params.loop || (c(), d());
          }),
          i("destroy", () => {
            h();
          }),
          i("enable disable", () => {
            const { $el: t } = e.pagination;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.pagination.lockClass
              );
          }),
          i("lock unlock", () => {
            d();
          }),
          i("click", (t, i) => {
            const n = i.target,
              { $el: o } = e.pagination;
            if (
              e.params.pagination.el &&
              e.params.pagination.hideOnClick &&
              o.length > 0 &&
              !M(n).hasClass(e.params.pagination.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                  (e.navigation.prevEl && n === e.navigation.prevEl))
              )
                return;
              const t = o.hasClass(e.params.pagination.hiddenClass);
              s(!0 === t ? "paginationShow" : "paginationHide"),
                o.toggleClass(e.params.pagination.hiddenClass);
            }
          }),
          Object.assign(e.pagination, {
            render: c,
            update: d,
            init: u,
            destroy: h,
          });
      }
      function be({ swiper: e, extendParams: t, on: i, emit: s }) {
        let n;
        function o() {
          const t = e.slides.eq(e.activeIndex);
          let i = e.params.autoplay.delay;
          t.attr("data-swiper-autoplay") &&
            (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(n),
            (n = k(() => {
              let t;
              e.params.autoplay.reverseDirection
                ? e.params.loop
                  ? (e.loopFix(),
                    (t = e.slidePrev(e.params.speed, !0, !0)),
                    s("autoplay"))
                  : e.isBeginning
                  ? e.params.autoplay.stopOnLastSlide
                    ? a()
                    : ((t = e.slideTo(
                        e.slides.length - 1,
                        e.params.speed,
                        !0,
                        !0
                      )),
                      s("autoplay"))
                  : ((t = e.slidePrev(e.params.speed, !0, !0)), s("autoplay"))
                : e.params.loop
                ? (e.loopFix(),
                  (t = e.slideNext(e.params.speed, !0, !0)),
                  s("autoplay"))
                : e.isEnd
                ? e.params.autoplay.stopOnLastSlide
                  ? a()
                  : ((t = e.slideTo(0, e.params.speed, !0, !0)), s("autoplay"))
                : ((t = e.slideNext(e.params.speed, !0, !0)), s("autoplay")),
                ((e.params.cssMode && e.autoplay.running) || !1 === t) && o();
            }, i));
        }
        function r() {
          return (
            void 0 === n &&
            !e.autoplay.running &&
            ((e.autoplay.running = !0), s("autoplayStart"), o(), !0)
          );
        }
        function a() {
          return (
            !!e.autoplay.running &&
            void 0 !== n &&
            (n && (clearTimeout(n), (n = void 0)),
            (e.autoplay.running = !1),
            s("autoplayStop"),
            !0)
          );
        }
        function l(t) {
          e.autoplay.running &&
            (e.autoplay.paused ||
              (n && clearTimeout(n),
              (e.autoplay.paused = !0),
              0 !== t && e.params.autoplay.waitForTransition
                ? ["transitionend", "webkitTransitionEnd"].forEach((t) => {
                    e.$wrapperEl[0].addEventListener(t, c);
                  })
                : ((e.autoplay.paused = !1), o())));
        }
        function d() {
          const t = w();
          "hidden" === t.visibilityState && e.autoplay.running && l(),
            "visible" === t.visibilityState &&
              e.autoplay.paused &&
              (o(), (e.autoplay.paused = !1));
        }
        function c(t) {
          e &&
            !e.destroyed &&
            e.$wrapperEl &&
            t.target === e.$wrapperEl[0] &&
            (["transitionend", "webkitTransitionEnd"].forEach((t) => {
              e.$wrapperEl[0].removeEventListener(t, c);
            }),
            (e.autoplay.paused = !1),
            e.autoplay.running ? o() : a());
        }
        function u() {
          e.params.autoplay.disableOnInteraction ? a() : l(),
            ["transitionend", "webkitTransitionEnd"].forEach((t) => {
              e.$wrapperEl[0].removeEventListener(t, c);
            });
        }
        function h() {
          e.params.autoplay.disableOnInteraction ||
            ((e.autoplay.paused = !1), o());
        }
        (e.autoplay = { running: !1, paused: !1 }),
          t({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !0,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          }),
          i("init", () => {
            if (e.params.autoplay.enabled) {
              r();
              w().addEventListener("visibilitychange", d),
                e.params.autoplay.pauseOnMouseEnter &&
                  (e.$el.on("mouseenter", u), e.$el.on("mouseleave", h));
            }
          }),
          i("beforeTransitionStart", (t, i, s) => {
            e.autoplay.running &&
              (s || !e.params.autoplay.disableOnInteraction
                ? e.autoplay.pause(i)
                : a());
          }),
          i("sliderFirstMove", () => {
            e.autoplay.running &&
              (e.params.autoplay.disableOnInteraction ? a() : l());
          }),
          i("touchEnd", () => {
            e.params.cssMode &&
              e.autoplay.paused &&
              !e.params.autoplay.disableOnInteraction &&
              o();
          }),
          i("destroy", () => {
            e.$el.off("mouseenter", u),
              e.$el.off("mouseleave", h),
              e.autoplay.running && a();
            w().removeEventListener("visibilitychange", d);
          }),
          Object.assign(e.autoplay, { pause: l, run: o, start: r, stop: a });
      }
      function we() {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      }
      window.addEventListener("load", function (e) {
        we(),
          document.querySelector(".swiper") &&
            new ge(".swiper", {
              modules: [fe, ye, be],
              autoplay: { delay: 1 },
              watchOverflow: !0,
              observer: !0,
              observeParents: !0,
              observeSlideChildren: !0,
              slidesPerView: 4,
              spaceBetween: 20,
              autoHeight: !1,
              speed: 1e4,
              loop: !0,
              preloadImages: !0,
              pagination: { el: ".slider-quality__pagging", clickable: !0 },
              navigation: {
                nextEl: ".slider-about__nav .slider-about__item-next",
                prevEl: ".slider-about__nav .slider-about__item-prev",
              },
              breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                992: { slidesPerView: 4, spaceBetween: 15 },
                1268: { slidesPerView: 4, spaceBetween: 20 },
              },
              on: {},
            }),
          (function () {
            we();
            let e = document.querySelectorAll(".swiper_scroll");
            if (e.length > 0)
              for (let t = 0; t < e.length; t++) {
                const i = e[t],
                  s = i.querySelector(".swiper-scrollbar");
                new ge(i, {
                  observer: !0,
                  observeParents: !0,
                  direction: "vertical",
                  slidesPerView: "auto",
                  parallax: !0,
                  freeMode: { enabled: !0 },
                  scrollbar: { el: s, draggable: !0, snapOnRelease: !1 },
                  mousewheel: { releaseOnEdges: !0 },
                }).scrollbar.updateSize();
              }
          })();
      });
      let Se = !1;
      setTimeout(() => {
        if (Se) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0);
      const Ce = {};
      var xe = function () {
        return (
          (xe =
            Object.assign ||
            function (e) {
              for (var t, i = 1, s = arguments.length; i < s; i++)
                for (var n in (t = arguments[i]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }),
          xe.apply(this, arguments)
        );
      };
      var Te = (function () {
        function e(e) {
          return (
            (this.cssVenderPrefixes = [
              "TransitionDuration",
              "TransitionTimingFunction",
              "Transform",
              "Transition",
            ]),
            (this.selector = this._getSelector(e)),
            (this.firstElement = this._getFirstEl()),
            this
          );
        }
        return (
          (e.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (e) {
                var t = (16 * Math.random()) | 0;
                return ("x" == e ? t : (3 & t) | 8).toString(16);
              }
            );
          }),
          (e.prototype._getSelector = function (e, t) {
            return (
              void 0 === t && (t = document),
              "string" != typeof e
                ? e
                : ((t = t || document),
                  "#" === e.substring(0, 1)
                    ? t.querySelector(e)
                    : t.querySelectorAll(e))
            );
          }),
          (e.prototype._each = function (e) {
            return this.selector
              ? (void 0 !== this.selector.length
                  ? [].forEach.call(this.selector, e)
                  : e(this.selector, 0),
                this)
              : this;
          }),
          (e.prototype._setCssVendorPrefix = function (e, t, i) {
            var s = t.replace(/-([a-z])/gi, function (e, t) {
              return t.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(s)
              ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
                (e.style["webkit" + s] = i),
                (e.style["moz" + s] = i),
                (e.style["ms" + s] = i),
                (e.style["o" + s] = i))
              : (e.style[s] = i);
          }),
          (e.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length
              ? this.selector[0]
              : this.selector;
          }),
          (e.prototype.isEventMatched = function (e, t) {
            var i = t.split(".");
            return e
              .split(".")
              .filter(function (e) {
                return e;
              })
              .every(function (e) {
                return -1 !== i.indexOf(e);
              });
          }),
          (e.prototype.attr = function (e, t) {
            return void 0 === t
              ? this.firstElement
                ? this.firstElement.getAttribute(e)
                : ""
              : (this._each(function (i) {
                  i.setAttribute(e, t);
                }),
                this);
          }),
          (e.prototype.find = function (e) {
            return Ee(this._getSelector(e, this.selector));
          }),
          (e.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? Ee(this.selector[0])
              : Ee(this.selector);
          }),
          (e.prototype.eq = function (e) {
            return Ee(this.selector[e]);
          }),
          (e.prototype.parent = function () {
            return Ee(this.selector.parentElement);
          }),
          (e.prototype.get = function () {
            return this._getFirstEl();
          }),
          (e.prototype.removeAttr = function (e) {
            var t = e.split(" ");
            return (
              this._each(function (e) {
                t.forEach(function (t) {
                  return e.removeAttribute(t);
                });
              }),
              this
            );
          }),
          (e.prototype.wrap = function (e) {
            if (!this.firstElement) return this;
            var t = document.createElement("div");
            return (
              (t.className = e),
              this.firstElement.parentNode.insertBefore(t, this.firstElement),
              this.firstElement.parentNode.removeChild(this.firstElement),
              t.appendChild(this.firstElement),
              this
            );
          }),
          (e.prototype.addClass = function (e) {
            return (
              void 0 === e && (e = ""),
              this._each(function (t) {
                e.split(" ").forEach(function (e) {
                  e && t.classList.add(e);
                });
              }),
              this
            );
          }),
          (e.prototype.removeClass = function (e) {
            return (
              this._each(function (t) {
                e.split(" ").forEach(function (e) {
                  e && t.classList.remove(e);
                });
              }),
              this
            );
          }),
          (e.prototype.hasClass = function (e) {
            return (
              !!this.firstElement && this.firstElement.classList.contains(e)
            );
          }),
          (e.prototype.hasAttribute = function (e) {
            return !!this.firstElement && this.firstElement.hasAttribute(e);
          }),
          (e.prototype.toggleClass = function (e) {
            return this.firstElement
              ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e),
                this)
              : this;
          }),
          (e.prototype.css = function (e, t) {
            var i = this;
            return (
              this._each(function (s) {
                i._setCssVendorPrefix(s, e, t);
              }),
              this
            );
          }),
          (e.prototype.on = function (t, i) {
            var s = this;
            return this.selector
              ? (t.split(" ").forEach(function (t) {
                  Array.isArray(e.eventListeners[t]) ||
                    (e.eventListeners[t] = []),
                    e.eventListeners[t].push(i),
                    s.selector.addEventListener(t.split(".")[0], i);
                }),
                this)
              : this;
          }),
          (e.prototype.once = function (e, t) {
            var i = this;
            return (
              this.on(e, function () {
                i.off(e), t(e);
              }),
              this
            );
          }),
          (e.prototype.off = function (t) {
            var i = this;
            return this.selector
              ? (Object.keys(e.eventListeners).forEach(function (s) {
                  i.isEventMatched(t, s) &&
                    (e.eventListeners[s].forEach(function (e) {
                      i.selector.removeEventListener(s.split(".")[0], e);
                    }),
                    (e.eventListeners[s] = []));
                }),
                this)
              : this;
          }),
          (e.prototype.trigger = function (e, t) {
            if (!this.firstElement) return this;
            var i = new CustomEvent(e.split(".")[0], { detail: t || null });
            return this.firstElement.dispatchEvent(i), this;
          }),
          (e.prototype.load = function (e) {
            var t = this;
            return (
              fetch(e).then(function (e) {
                t.selector.innerHTML = e;
              }),
              this
            );
          }),
          (e.prototype.html = function (e) {
            return void 0 === e
              ? this.firstElement
                ? this.firstElement.innerHTML
                : ""
              : (this._each(function (t) {
                  t.innerHTML = e;
                }),
                this);
          }),
          (e.prototype.append = function (e) {
            return (
              this._each(function (t) {
                "string" == typeof e
                  ? t.insertAdjacentHTML("beforeend", e)
                  : t.appendChild(e);
              }),
              this
            );
          }),
          (e.prototype.prepend = function (e) {
            return (
              this._each(function (t) {
                t.insertAdjacentHTML("afterbegin", e);
              }),
              this
            );
          }),
          (e.prototype.remove = function () {
            return (
              this._each(function (e) {
                e.parentNode.removeChild(e);
              }),
              this
            );
          }),
          (e.prototype.empty = function () {
            return (
              this._each(function (e) {
                e.innerHTML = "";
              }),
              this
            );
          }),
          (e.prototype.scrollTop = function (e) {
            return void 0 !== e
              ? ((document.body.scrollTop = e),
                (document.documentElement.scrollTop = e),
                this)
              : window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
          }),
          (e.prototype.scrollLeft = function (e) {
            return void 0 !== e
              ? ((document.body.scrollLeft = e),
                (document.documentElement.scrollLeft = e),
                this)
              : window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0;
          }),
          (e.prototype.offset = function () {
            if (!this.firstElement) return { left: 0, top: 0 };
            var e = this.firstElement.getBoundingClientRect(),
              t = Ee("body").style().marginLeft;
            return {
              left: e.left - parseFloat(t) + this.scrollLeft(),
              top: e.top + this.scrollTop(),
            };
          }),
          (e.prototype.style = function () {
            return this.firstElement
              ? this.firstElement.currentStyle ||
                  window.getComputedStyle(this.firstElement)
              : {};
          }),
          (e.prototype.width = function () {
            var e = this.style();
            return (
              this.firstElement.clientWidth -
              parseFloat(e.paddingLeft) -
              parseFloat(e.paddingRight)
            );
          }),
          (e.prototype.height = function () {
            var e = this.style();
            return (
              this.firstElement.clientHeight -
              parseFloat(e.paddingTop) -
              parseFloat(e.paddingBottom)
            );
          }),
          (e.eventListeners = {}),
          e
        );
      })();
      function Ee(e) {
        return (
          (function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: null };
              var i = document.createEvent("CustomEvent");
              return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
            };
          })(),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          new Te(e)
        );
      }
      var Ie = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
      ];
      function Oe(e) {
        return "href" === e
          ? "src"
          : (e = (e =
              (e = e.replace("data-", "")).charAt(0).toLowerCase() +
              e.slice(1)).replace(/-([a-z])/g, function (e) {
              return e[1].toUpperCase();
            }));
      }
      var Le = function (e, t, i, s) {
          void 0 === i && (i = 0);
          var n = Ee(e).attr("data-lg-size") || s;
          if (n) {
            var o = n.split(",");
            if (o[1])
              for (var r = window.innerWidth, a = 0; a < o.length; a++) {
                var l = o[a];
                if (parseInt(l.split("-")[2], 10) > r) {
                  n = l;
                  break;
                }
                a === o.length - 1 && (n = l);
              }
            var d = n.split("-"),
              c = parseInt(d[0], 10),
              u = parseInt(d[1], 10),
              h = t.width(),
              p = t.height() - i,
              g = Math.min(h, c),
              m = Math.min(p, u),
              f = Math.min(g / c, m / u);
            return { width: c * f, height: u * f };
          }
        },
        Pe = function (e, t, i, s, n) {
          if (n) {
            var o = Ee(e).find("img").first();
            if (o.get()) {
              var r = t.get().getBoundingClientRect(),
                a = r.width,
                l = t.height() - (i + s),
                d = o.width(),
                c = o.height(),
                u = o.style(),
                h =
                  (a - d) / 2 -
                  o.offset().left +
                  (parseFloat(u.paddingLeft) || 0) +
                  (parseFloat(u.borderLeft) || 0) +
                  Ee(window).scrollLeft() +
                  r.left,
                p =
                  (l - c) / 2 -
                  o.offset().top +
                  (parseFloat(u.paddingTop) || 0) +
                  (parseFloat(u.borderTop) || 0) +
                  Ee(window).scrollTop() +
                  i;
              return (
                "translate3d(" +
                (h *= -1) +
                "px, " +
                (p *= -1) +
                "px, 0) scale3d(" +
                d / n.width +
                ", " +
                c / n.height +
                ", 1)"
              );
            }
          }
        },
        Me = function (e, t, i, s, n, o) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            e +
            "; max-width:" +
            i +
            "; height: " +
            t +
            "; max-height:" +
            s +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (o ? 'title="' + o + '"' : "") +
            ' src="' +
            n +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        ke = function (e, t, i, s, n, o) {
          var r =
              "<img " +
              i +
              " " +
              (s ? 'srcset="' + s + '"' : "") +
              "  " +
              (n ? 'sizes="' + n + '"' : "") +
              ' class="lg-object lg-image" data-index="' +
              e +
              '" src="' +
              t +
              '" />',
            a = "";
          o &&
            (a = ("string" == typeof o ? JSON.parse(o) : o).map(function (e) {
              var t = "";
              return (
                Object.keys(e).forEach(function (i) {
                  t += " " + i + '="' + e[i] + '"';
                }),
                "<source " + t + "></source>"
              );
            }));
          return "" + a + r;
        },
        Ae = function (e) {
          for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
            var o = e[n].split(" ");
            "" === o[0] && o.splice(0, 1), i.push(o[0]), t.push(o[1]);
          }
          for (var r = window.innerWidth, a = 0; a < t.length; a++)
            if (parseInt(t[a], 10) > r) {
              s = i[a];
              break;
            }
          return s;
        },
        ze = function (e) {
          return !!e && !!e.complete && 0 !== e.naturalWidth;
        },
        $e = function (e, t, i, s) {
          return (
            '<div class="lg-video-cont ' +
            (s && s.youtube
              ? "lg-has-youtube"
              : s && s.vimeo
              ? "lg-has-vimeo"
              : "lg-has-html5") +
            '" style="' +
            i +
            '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
            (t || "") +
            '\n            <img class="lg-object lg-video-poster" src="' +
            e +
            '" />\n        </div>'
          );
        },
        De = function (e, t, i, s) {
          var n = [],
            o = (function () {
              for (var e = 0, t = 0, i = arguments.length; t < i; t++)
                e += arguments[t].length;
              var s = Array(e),
                n = 0;
              for (t = 0; t < i; t++)
                for (var o = arguments[t], r = 0, a = o.length; r < a; r++, n++)
                  s[n] = o[r];
              return s;
            })(Ie, t);
          return (
            [].forEach.call(e, function (e) {
              for (var t = {}, r = 0; r < e.attributes.length; r++) {
                var a = e.attributes[r];
                if (a.specified) {
                  var l = Oe(a.name),
                    d = "";
                  o.indexOf(l) > -1 && (d = l), d && (t[d] = a.value);
                }
              }
              var c = Ee(e),
                u = c.find("img").first().attr("alt"),
                h = c.attr("title"),
                p = s ? c.attr(s) : c.find("img").first().attr("src");
              (t.thumb = p),
                i && !t.subHtml && (t.subHtml = h || u || ""),
                (t.alt = u || h || ""),
                n.push(t);
            }),
            n
          );
        },
        _e = function () {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        Ve = function (e, t, i) {
          if (!e)
            return t
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (i + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var s = e.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            n = e.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            o = e.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return s
            ? { youtube: s }
            : n
            ? { vimeo: n }
            : o
            ? { wistia: o }
            : void 0;
        },
        Ne = {
          mode: "lg-slide",
          easing: "ease",
          speed: 400,
          licenseKey: "0000-0000-000-0000",
          height: "100%",
          width: "100%",
          addClass: "",
          startClass: "lg-start-zoom",
          backdropDuration: 300,
          container: "",
          startAnimationDuration: 400,
          zoomFromOrigin: !0,
          hideBarsDelay: 0,
          showBarsAfter: 1e4,
          slideDelay: 0,
          supportLegacyBrowser: !0,
          allowMediaOverlap: !1,
          videoMaxSize: "1280-720",
          loadYouTubePoster: !0,
          defaultCaptionHeight: 0,
          ariaLabelledby: "",
          ariaDescribedby: "",
          closable: !0,
          swipeToClose: !0,
          closeOnTap: !0,
          showCloseIcon: !0,
          showMaximizeIcon: !1,
          loop: !0,
          escKey: !0,
          keyPress: !0,
          controls: !0,
          slideEndAnimation: !0,
          hideControlOnEnd: !1,
          mousewheel: !1,
          getCaptionFromTitleOrAlt: !0,
          appendSubHtmlTo: ".lg-sub-html",
          subHtmlSelectorRelative: !1,
          preload: 2,
          numberOfSlideItemsInDom: 10,
          selector: "",
          selectWithin: "",
          nextHtml: "",
          prevHtml: "",
          index: 0,
          iframeWidth: "100%",
          iframeHeight: "100%",
          iframeMaxWidth: "100%",
          iframeMaxHeight: "100%",
          download: !0,
          counter: !0,
          appendCounterTo: ".lg-toolbar",
          swipeThreshold: 50,
          enableSwipe: !0,
          enableDrag: !0,
          dynamic: !1,
          dynamicEl: [],
          extraProps: [],
          exThumbImage: "",
          isMobile: void 0,
          mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
          plugins: [],
        },
        Ge = "lgAfterAppendSlide",
        Be = "lgInit",
        He = "lgHasVideo",
        Fe = "lgContainerResize",
        je = "lgUpdateSlides",
        Xe = "lgAfterAppendSubHtml",
        qe = "lgBeforeOpen",
        Ye = "lgAfterOpen",
        Re = "lgSlideItemLoad",
        We = "lgBeforeSlide",
        Ue = "lgAfterSlide",
        Ze = "lgPosterClick",
        Ke = "lgDragStart",
        Qe = "lgDragMove",
        Je = "lgDragEnd",
        et = "lgBeforeNextSlide",
        tt = "lgBeforePrevSlide",
        it = "lgBeforeClose",
        st = "lgAfterClose",
        nt = 0,
        ot = (function () {
          function e(e, t) {
            if (
              ((this.lgOpened = !1),
              (this.index = 0),
              (this.plugins = []),
              (this.lGalleryOn = !1),
              (this.lgBusy = !1),
              (this.currentItemsInDom = []),
              (this.prevScrollTop = 0),
              (this.isDummyImageRemoved = !1),
              (this.dragOrSwipeEnabled = !1),
              (this.mediaContainerPosition = { top: 0, bottom: 0 }),
              !e)
            )
              return this;
            if (
              (nt++,
              (this.lgId = nt),
              (this.el = e),
              (this.LGel = Ee(e)),
              this.generateSettings(t),
              this.buildModules(),
              this.settings.dynamic &&
                void 0 !== this.settings.dynamicEl &&
                !Array.isArray(this.settings.dynamicEl))
            )
              throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
              (this.galleryItems = this.getItems()),
              this.normalizeSettings(),
              this.init(),
              this.validateLicense(),
              this
            );
          }
          return (
            (e.prototype.generateSettings = function (e) {
              if (
                ((this.settings = xe(xe({}, Ne), e)),
                this.settings.isMobile &&
                "function" == typeof this.settings.isMobile
                  ? this.settings.isMobile()
                  : _e())
              ) {
                var t = xe(
                  xe({}, this.settings.mobileSettings),
                  this.settings.mobileSettings
                );
                this.settings = xe(xe({}, this.settings), t);
              }
            }),
            (e.prototype.normalizeSettings = function () {
              this.settings.slideEndAnimation &&
                (this.settings.hideControlOnEnd = !1),
                this.settings.closable || (this.settings.swipeToClose = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                this.settings.dynamic && (this.zoomFromOrigin = !1),
                this.settings.container ||
                  (this.settings.container = document.body),
                (this.settings.preload = Math.min(
                  this.settings.preload,
                  this.galleryItems.length
                ));
            }),
            (e.prototype.init = function () {
              var e = this;
              this.addSlideVideoInfo(this.galleryItems),
                this.buildStructure(),
                this.LGel.trigger(Be, { instance: this }),
                this.settings.keyPress && this.keyPress(),
                setTimeout(function () {
                  e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
                }, 50),
                this.arrow(),
                this.settings.mousewheel && this.mousewheel(),
                this.settings.dynamic || this.openGalleryOnItemClick();
            }),
            (e.prototype.openGalleryOnItemClick = function () {
              for (
                var e = this,
                  t = function (t) {
                    var s = i.items[t],
                      n = Ee(s),
                      o = Te.generateUUID();
                    n.attr("data-lg-id", o).on(
                      "click.lgcustom-item-" + o,
                      function (i) {
                        i.preventDefault();
                        var n = e.settings.index || t;
                        e.openGallery(n, s);
                      }
                    );
                  },
                  i = this,
                  s = 0;
                s < this.items.length;
                s++
              )
                t(s);
            }),
            (e.prototype.buildModules = function () {
              var e = this;
              this.settings.plugins.forEach(function (t) {
                e.plugins.push(new t(e, Ee));
              });
            }),
            (e.prototype.validateLicense = function () {
              this.settings.licenseKey
                ? "0000-0000-000-0000" === this.settings.licenseKey &&
                  console.warn(
                    "lightGallery: " +
                      this.settings.licenseKey +
                      " license key is not valid for production use"
                  )
                : console.error("Please provide a valid license key");
            }),
            (e.prototype.getSlideItem = function (e) {
              return Ee(this.getSlideItemId(e));
            }),
            (e.prototype.getSlideItemId = function (e) {
              return "#lg-item-" + this.lgId + "-" + e;
            }),
            (e.prototype.getIdName = function (e) {
              return e + "-" + this.lgId;
            }),
            (e.prototype.getElementById = function (e) {
              return Ee("#" + this.getIdName(e));
            }),
            (e.prototype.manageSingleSlideClassName = function () {
              this.galleryItems.length < 2
                ? this.outer.addClass("lg-single-item")
                : this.outer.removeClass("lg-single-item");
            }),
            (e.prototype.buildStructure = function () {
              var e = this;
              if (!(this.$container && this.$container.get())) {
                var t = "",
                  i = "";
                this.settings.controls &&
                  (t =
                    '<button type="button" id="' +
                    this.getIdName("lg-prev") +
                    '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                    this.settings.prevHtml +
                    ' </button>\n                <button type="button" id="' +
                    this.getIdName("lg-next") +
                    '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                    this.settings.nextHtml +
                    " </button>"),
                  ".lg-item" !== this.settings.appendSubHtmlTo &&
                    (i =
                      '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                var s = "";
                this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
                var n = this.settings.ariaLabelledby
                    ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                    : "",
                  o = this.settings.ariaDescribedby
                    ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                    : "",
                  r =
                    "lg-container " +
                    this.settings.addClass +
                    " " +
                    (document.body !== this.settings.container
                      ? "lg-inline"
                      : ""),
                  a =
                    this.settings.closable && this.settings.showCloseIcon
                      ? '<button type="button" aria-label="Close gallery" id="' +
                        this.getIdName("lg-close") +
                        '" class="lg-close lg-icon"></button>'
                      : "",
                  l = this.settings.showMaximizeIcon
                    ? '<button type="button" aria-label="Toggle maximize" id="' +
                      this.getIdName("lg-maximize") +
                      '" class="lg-maximize lg-icon"></button>'
                    : "",
                  d =
                    '\n        <div class="' +
                    r +
                    '" id="' +
                    this.getIdName("lg-container") +
                    '" tabindex="-1" aria-modal="true" ' +
                    n +
                    " " +
                    o +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    s +
                    ' ">\n\n              <div id="' +
                    this.getIdName("lg-content") +
                    '" class="lg-content">\n                <div id="' +
                    this.getIdName("lg-inner") +
                    '" class="lg-inner">\n                </div>\n                ' +
                    t +
                    '\n              </div>\n                <div id="' +
                    this.getIdName("lg-toolbar") +
                    '" class="lg-toolbar lg-group">\n                    ' +
                    l +
                    "\n                    " +
                    a +
                    "\n                    </div>\n                    " +
                    (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                    '\n                <div id="' +
                    this.getIdName("lg-components") +
                    '" class="lg-components">\n                    ' +
                    (".lg-sub-html" === this.settings.appendSubHtmlTo
                      ? i
                      : "") +
                    "\n                </div>\n            </div>\n        </div>\n        ";
                Ee(this.settings.container)
                  .css("position", "relative")
                  .append(d),
                  (this.outer = this.getElementById("lg-outer")),
                  (this.$lgComponents = this.getElementById("lg-components")),
                  (this.$backdrop = this.getElementById("lg-backdrop")),
                  (this.$container = this.getElementById("lg-container")),
                  (this.$inner = this.getElementById("lg-inner")),
                  (this.$content = this.getElementById("lg-content")),
                  (this.$toolbar = this.getElementById("lg-toolbar")),
                  this.$backdrop.css(
                    "transition-duration",
                    this.settings.backdropDuration + "ms"
                  );
                var c = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (c += "lg-grab "),
                  this.outer.addClass(c),
                  this.$inner.css(
                    "transition-timing-function",
                    this.settings.easing
                  ),
                  this.$inner.css(
                    "transition-duration",
                    this.settings.speed + "ms"
                  ),
                  this.settings.download &&
                    this.$toolbar.append(
                      '<a id="' +
                        this.getIdName("lg-download") +
                        '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                    ),
                  this.counter(),
                  Ee(window).on(
                    "resize.lg.global" +
                      this.lgId +
                      " orientationchange.lg.global" +
                      this.lgId,
                    function () {
                      e.refreshOnResize();
                    }
                  ),
                  this.hideBars(),
                  this.manageCloseGallery(),
                  this.toggleMaximize(),
                  this.initModules();
              }
            }),
            (e.prototype.refreshOnResize = function () {
              if (this.lgOpened) {
                var e = this.galleryItems[this.index].__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var t = this.mediaContainerPosition,
                  i = t.top,
                  s = t.bottom;
                if (
                  ((this.currentImageSize = Le(
                    this.items[this.index],
                    this.outer,
                    i + s,
                    e && this.settings.videoMaxSize
                  )),
                  e && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var n = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", n);
                }
                this.LGel.trigger(Fe);
              }
            }),
            (e.prototype.resizeVideoSlide = function (e, t) {
              var i = this.getVideoContStyle(t);
              this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
            }),
            (e.prototype.updateSlides = function (e, t) {
              if (
                (this.index > e.length - 1 && (this.index = e.length - 1),
                1 === e.length && (this.index = 0),
                e.length)
              ) {
                var i = this.galleryItems[t].src;
                (this.galleryItems = e),
                  this.updateControls(),
                  this.$inner.empty(),
                  (this.currentItemsInDom = []);
                var s = 0;
                this.galleryItems.some(function (e, t) {
                  return e.src === i && ((s = t), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
                  this.loadContent(s, !0),
                  this.getSlideItem(s).addClass("lg-current"),
                  (this.index = s),
                  this.updateCurrentCounter(s),
                  this.LGel.trigger(je);
              } else this.closeGallery();
            }),
            (e.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var e = Ee(this.settings.selectWithin);
                    this.items = e.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return De(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage
              );
            }),
            (e.prototype.openGallery = function (e, t) {
              var i = this;
              if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
                (this.lgOpened = !0),
                  this.outer.get().focus(),
                  this.outer.removeClass("lg-hide-items"),
                  this.$container.addClass("lg-show");
                var s = this.getItemsToBeInsertedToDom(e, e);
                this.currentItemsInDom = s;
                var n = "";
                s.forEach(function (e) {
                  n = n + '<div id="' + e + '" class="lg-item"></div>';
                }),
                  this.$inner.append(n),
                  this.addHtml(e);
                var o = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var r = this.mediaContainerPosition,
                  a = r.top,
                  l = r.bottom;
                this.settings.allowMediaOverlap ||
                  this.setMediaContainerPosition(a, l);
                var d = this.galleryItems[e].__slideVideoInfo;
                this.zoomFromOrigin &&
                  t &&
                  ((this.currentImageSize = Le(
                    t,
                    this.outer,
                    a + l,
                    d && this.settings.videoMaxSize
                  )),
                  (o = Pe(t, this.outer, a, l, this.currentImageSize))),
                  (this.zoomFromOrigin && o) ||
                    (this.outer.addClass(this.settings.startClass),
                    this.getSlideItem(e).removeClass("lg-complete"));
                var c = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  i.outer.addClass("lg-components-open");
                }, c),
                  (this.index = e),
                  this.LGel.trigger(qe),
                  this.getSlideItem(e).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = Ee(window).scrollTop()),
                  setTimeout(function () {
                    if (i.zoomFromOrigin && o) {
                      var t = i.getSlideItem(e);
                      t.css("transform", o),
                        setTimeout(function () {
                          t
                            .addClass("lg-start-progress lg-start-end-progress")
                            .css(
                              "transition-duration",
                              i.settings.startAnimationDuration + "ms"
                            ),
                            i.outer.addClass("lg-zoom-from-image");
                        }),
                        setTimeout(function () {
                          t.css("transform", "translate3d(0, 0, 0)");
                        }, 100);
                    }
                    setTimeout(function () {
                      i.$backdrop.addClass("in"),
                        i.$container.addClass("lg-show-in");
                    }, 10),
                      (i.zoomFromOrigin && o) ||
                        setTimeout(function () {
                          i.outer.addClass("lg-visible");
                        }, i.settings.backdropDuration),
                      i.slide(e, !1, !1, !1),
                      i.LGel.trigger(Ye);
                  }),
                  document.body === this.settings.container &&
                    Ee("html").addClass("lg-on");
              }
            }),
            (e.prototype.getMediaContainerPosition = function () {
              if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
              var e = this.$toolbar.get().clientHeight || 0,
                t = this.outer.find(".lg-components .lg-sub-html").get(),
                i =
                  this.settings.defaultCaptionHeight ||
                  (t && t.clientHeight) ||
                  0,
                s = this.outer.find(".lg-thumb-outer").get();
              return { top: e, bottom: (s ? s.clientHeight : 0) + i };
            }),
            (e.prototype.setMediaContainerPosition = function (e, t) {
              void 0 === e && (e = 0),
                void 0 === t && (t = 0),
                this.$content.css("top", e + "px").css("bottom", t + "px");
            }),
            (e.prototype.hideBars = function () {
              var e = this;
              setTimeout(function () {
                e.outer.removeClass("lg-hide-items"),
                  e.settings.hideBarsDelay > 0 &&
                    (e.outer.on(
                      "mousemove.lg click.lg touchstart.lg",
                      function () {
                        e.outer.removeClass("lg-hide-items"),
                          clearTimeout(e.hideBarTimeout),
                          (e.hideBarTimeout = setTimeout(function () {
                            e.outer.addClass("lg-hide-items");
                          }, e.settings.hideBarsDelay));
                      }
                    ),
                    e.outer.trigger("mousemove.lg"));
              }, this.settings.showBarsAfter);
            }),
            (e.prototype.initPictureFill = function (e) {
              if (this.settings.supportLegacyBrowser)
                try {
                  picturefill({ elements: [e.get()] });
                } catch (e) {
                  console.warn(
                    "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                  );
                }
            }),
            (e.prototype.counter = function () {
              if (this.settings.counter) {
                var e =
                  '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                  this.getIdName("lg-counter-current") +
                  '" class="lg-counter-current">' +
                  (this.index + 1) +
                  ' </span> /\n                <span id="' +
                  this.getIdName("lg-counter-all") +
                  '" class="lg-counter-all">' +
                  this.galleryItems.length +
                  " </span></div>";
                this.outer.find(this.settings.appendCounterTo).append(e);
              }
            }),
            (e.prototype.addHtml = function (e) {
              var t, i;
              if (
                (this.galleryItems[e].subHtmlUrl
                  ? (i = this.galleryItems[e].subHtmlUrl)
                  : (t = this.galleryItems[e].subHtml),
                !i)
              )
                if (t) {
                  var s = t.substring(0, 1);
                  ("." !== s && "#" !== s) ||
                    (t =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? Ee(this.items).eq(e).find(t).first().html()
                        : Ee(t).first().html());
                } else t = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                i
                  ? this.outer.find(".lg-sub-html").load(i)
                  : this.outer.find(".lg-sub-html").html(t);
              else {
                var n = Ee(this.getSlideItemId(e));
                i
                  ? n.load(i)
                  : n.append('<div class="lg-sub-html">' + t + "</div>");
              }
              null != t &&
                ("" === t
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(Xe, { index: e });
            }),
            (e.prototype.preload = function (e) {
              for (
                var t = 1;
                t <= this.settings.preload &&
                !(t >= this.galleryItems.length - e);
                t++
              )
                this.loadContent(e + t, !1);
              for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
                this.loadContent(e - i, !1);
            }),
            (e.prototype.getDummyImgStyles = function (e) {
              return e
                ? "width:" +
                    e.width +
                    "px;\n                margin-left: -" +
                    e.width / 2 +
                    "px;\n                margin-top: -" +
                    e.height / 2 +
                    "px;\n                height:" +
                    e.height +
                    "px"
                : "";
            }),
            (e.prototype.getVideoContStyle = function (e) {
              return e
                ? "width:" +
                    e.width +
                    "px;\n                height:" +
                    e.height +
                    "px"
                : "";
            }),
            (e.prototype.getDummyImageContent = function (e, t, i) {
              var s;
              if ((this.settings.dynamic || (s = Ee(this.items).eq(t)), s)) {
                var n = void 0;
                if (
                  !(n = this.settings.exThumbImage
                    ? s.attr(this.settings.exThumbImage)
                    : s.find("img").first().attr("src"))
                )
                  return "";
                var o =
                  "<img " +
                  i +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  n +
                  '" />';
                return (
                  e.addClass("lg-first-slide"),
                  this.outer.addClass("lg-first-slide-loading"),
                  o
                );
              }
              return "";
            }),
            (e.prototype.setImgMarkup = function (e, t, i) {
              var s = this.galleryItems[i],
                n = s.alt,
                o = s.srcset,
                r = s.sizes,
                a = s.sources,
                l = n ? 'alt="' + n + '"' : "",
                d =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(t, i, l)
                    : ke(i, e, l, o, r, a)) +
                  "</picture>";
              t.prepend(d);
            }),
            (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
              var n = e.find(".lg-object").first();
              ze(n.get()) || t
                ? i()
                : (n.on("load.lg error.lg", function () {
                    i && i();
                  }),
                  n.on("error.lg", function () {
                    s && s();
                  }));
            }),
            (e.prototype.onLgObjectLoad = function (e, t, i, s, n, o) {
              var r = this;
              this.onSlideObjectLoad(
                e,
                o,
                function () {
                  r.triggerSlideItemLoad(e, t, i, s, n);
                },
                function () {
                  e.addClass("lg-complete lg-complete_"),
                    e.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (e.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
              var o = this,
                r = this.galleryItems[t],
                a = n && "video" === this.getSlideType(r) && !r.poster ? s : 0;
              setTimeout(function () {
                e.addClass("lg-complete lg-complete_"),
                  o.LGel.trigger(Re, {
                    index: t,
                    delay: i || 0,
                    isFirstSlide: n,
                  });
              }, a);
            }),
            (e.prototype.isFirstSlideWithZoomAnimation = function () {
              return !(
                this.lGalleryOn ||
                !this.zoomFromOrigin ||
                !this.currentImageSize
              );
            }),
            (e.prototype.addSlideVideoInfo = function (e) {
              var t = this;
              e.forEach(function (e, i) {
                (e.__slideVideoInfo = Ve(e.src, !!e.video, i)),
                  e.__slideVideoInfo &&
                    t.settings.loadYouTubePoster &&
                    !e.poster &&
                    e.__slideVideoInfo.youtube &&
                    (e.poster =
                      "//img.youtube.com/vi/" +
                      e.__slideVideoInfo.youtube[1] +
                      "/maxresdefault.jpg");
              });
            }),
            (e.prototype.loadContent = function (e, t) {
              var i = this,
                s = this.galleryItems[e],
                n = Ee(this.getSlideItemId(e)),
                o = s.poster,
                r = s.srcset,
                a = s.sizes,
                l = s.sources,
                d = s.src,
                c = s.video,
                u = c && "string" == typeof c ? JSON.parse(c) : c;
              if (s.responsive) {
                var h = s.responsive.split(",");
                d = Ae(h) || d;
              }
              var p = s.__slideVideoInfo,
                g = "",
                m = !!s.iframe,
                f = !this.lGalleryOn,
                v = 0;
              if (
                (f &&
                  (v =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !n.hasClass("lg-loaded"))
              ) {
                if (p) {
                  var y = this.mediaContainerPosition,
                    b = y.top,
                    w = y.bottom,
                    S = Le(
                      this.items[e],
                      this.outer,
                      b + w,
                      p && this.settings.videoMaxSize
                    );
                  g = this.getVideoContStyle(S);
                }
                if (m) {
                  var C = Me(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    d,
                    s.iframeTitle
                  );
                  n.prepend(C);
                } else if (o) {
                  var x = "";
                  f &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (x = this.getDummyImageContent(n, e, ""));
                  C = $e(o, x || "", g, p);
                  n.prepend(C);
                } else if (p) {
                  C = '<div class="lg-video-cont " style="' + g + '"></div>';
                  n.prepend(C);
                } else if ((this.setImgMarkup(d, n, e), r || l)) {
                  var T = n.find(".lg-object");
                  this.initPictureFill(T);
                }
                (o || p) &&
                  this.LGel.trigger(He, {
                    index: e,
                    src: d,
                    html5Video: u,
                    hasPoster: !!o,
                  }),
                  this.LGel.trigger(Ge, { index: e }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(e);
              }
              var E = 0;
              v && !Ee(document.body).hasClass("lg-from-hash") && (E = v),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    n.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  n.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if (
                        "image" === i.getSlideType(s) &&
                        (n
                          .find(".lg-img-wrap")
                          .append(ke(e, d, "", r, a, s.sources)),
                        r || l)
                      ) {
                        var t = n.find(".lg-object");
                        i.initPictureFill(t);
                      }
                      ("image" === i.getSlideType(s) ||
                        ("video" === i.getSlideType(s) && o)) &&
                        (i.onLgObjectLoad(n, e, v, E, !0, !1),
                        i.onSlideObjectLoad(
                          n,
                          !(!p || !p.html5 || o),
                          function () {
                            i.loadContentOnFirstSlideLoad(e, n, E);
                          },
                          function () {
                            i.loadContentOnFirstSlideLoad(e, n, E);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                n.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(s) || o)) ||
                  this.onLgObjectLoad(n, e, v, E, f, !(!p || !p.html5 || o)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !n.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    n.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === t &&
                  (n.hasClass("lg-complete_")
                    ? this.preload(e)
                    : n
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          i.preload(e);
                        }));
            }),
            (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
              var s = this;
              setTimeout(function () {
                t.find(".lg-dummy-img").remove(),
                  t.removeClass("lg-first-slide"),
                  s.outer.removeClass("lg-first-slide-loading"),
                  (s.isDummyImageRemoved = !0),
                  s.preload(e);
              }, i + 300);
            }),
            (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
              var s = this;
              void 0 === i && (i = 0);
              var n = [],
                o = Math.max(i, 3);
              o = Math.min(o, this.galleryItems.length);
              var r = "lg-item-" + this.lgId + "-" + t;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (e, t) {
                    n.push("lg-item-" + s.lgId + "-" + t);
                  }),
                  n
                );
              if (e < (this.galleryItems.length - 1) / 2) {
                for (var a = e; a > e - o / 2 && a >= 0; a--)
                  n.push("lg-item-" + this.lgId + "-" + a);
                var l = n.length;
                for (a = 0; a < o - l; a++)
                  n.push("lg-item-" + this.lgId + "-" + (e + a + 1));
              } else {
                for (
                  a = e;
                  a <= this.galleryItems.length - 1 && a < e + o / 2;
                  a++
                )
                  n.push("lg-item-" + this.lgId + "-" + a);
                for (l = n.length, a = 0; a < o - l; a++)
                  n.push("lg-item-" + this.lgId + "-" + (e - a - 1));
              }
              return (
                this.settings.loop &&
                  (e === this.galleryItems.length - 1
                    ? n.push("lg-item-" + this.lgId + "-0")
                    : 0 === e &&
                      n.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + t),
                n
              );
            }),
            (e.prototype.organizeSlideItems = function (e, t) {
              var i = this,
                s = this.getItemsToBeInsertedToDom(
                  e,
                  t,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                s.forEach(function (e) {
                  -1 === i.currentItemsInDom.indexOf(e) &&
                    i.$inner.append(
                      '<div id="' + e + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (e) {
                  -1 === s.indexOf(e) && Ee("#" + e).remove();
                }),
                s
              );
            }),
            (e.prototype.getPreviousSlideIndex = function () {
              var e = 0;
              try {
                var t = this.outer.find(".lg-current").first().attr("id");
                e = parseInt(t.split("-")[3]) || 0;
              } catch (t) {
                e = 0;
              }
              return e;
            }),
            (e.prototype.setDownloadValue = function (e) {
              if (this.settings.download) {
                var t = this.galleryItems[e];
                if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                  this.outer.addClass("lg-hide-download");
                else {
                  var i = this.getElementById("lg-download");
                  this.outer.removeClass("lg-hide-download"),
                    i.attr("href", t.downloadUrl || t.src),
                    t.download && i.attr("download", t.download);
                }
              }
            }),
            (e.prototype.makeSlideAnimation = function (e, t, i) {
              var s = this;
              this.lGalleryOn && i.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    s.outer.addClass("lg-no-trans"),
                      s.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === e
                        ? (t.addClass("lg-prev-slide"),
                          i.addClass("lg-next-slide"))
                        : (t.addClass("lg-next-slide"),
                          i.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        s.outer.find(".lg-item").removeClass("lg-current"),
                          t.addClass("lg-current"),
                          s.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (e.prototype.slide = function (e, t, i, s) {
              var n = this,
                o = this.getPreviousSlideIndex();
              if (
                ((this.currentItemsInDom = this.organizeSlideItems(e, o)),
                !this.lGalleryOn || o !== e)
              ) {
                var r = this.galleryItems.length;
                if (!this.lgBusy) {
                  this.settings.counter && this.updateCurrentCounter(e);
                  var a = this.getSlideItem(e),
                    l = this.getSlideItem(o),
                    d = this.galleryItems[e],
                    c = d.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(d)
                    ),
                    this.setDownloadValue(e),
                    c)
                  ) {
                    var u = this.mediaContainerPosition,
                      h = u.top,
                      p = u.bottom,
                      g = Le(
                        this.items[e],
                        this.outer,
                        h + p,
                        c && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(e, g);
                  }
                  if (
                    (this.LGel.trigger(We, {
                      prevIndex: o,
                      index: e,
                      fromTouch: !!t,
                      fromThumb: !!i,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(e),
                    s || (e < o ? (s = "prev") : e > o && (s = "next")),
                    t)
                  ) {
                    this.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-current lg-next-slide");
                    var m = void 0,
                      f = void 0;
                    r > 2
                      ? ((m = e - 1),
                        (f = e + 1),
                        ((0 === e && o === r - 1) ||
                          (e === r - 1 && 0 === o)) &&
                          ((f = 0), (m = r - 1)))
                      : ((m = 0), (f = 1)),
                      "prev" === s
                        ? this.getSlideItem(f).addClass("lg-next-slide")
                        : this.getSlideItem(m).addClass("lg-prev-slide"),
                      a.addClass("lg-current");
                  } else this.makeSlideAnimation(s, a, l);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        n.loadContent(e, !0),
                          ".lg-item" !== n.settings.appendSubHtmlTo &&
                            n.addHtml(e);
                      }, this.settings.speed +
                        50 +
                        (t ? 0 : this.settings.slideDelay))
                    : this.loadContent(e, !0),
                    setTimeout(function () {
                      (n.lgBusy = !1),
                        l.removeClass("lg-slide-progress"),
                        n.LGel.trigger(Ue, {
                          prevIndex: o,
                          index: e,
                          fromTouch: t,
                          fromThumb: i,
                        });
                    }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                      (t ? 0 : this.settings.slideDelay));
                }
                this.index = e;
              }
            }),
            (e.prototype.updateCurrentCounter = function (e) {
              this.getElementById("lg-counter-current").html(e + 1 + "");
            }),
            (e.prototype.updateCounterTotal = function () {
              this.getElementById("lg-counter-all").html(
                this.galleryItems.length + ""
              );
            }),
            (e.prototype.getSlideType = function (e) {
              return e.__slideVideoInfo
                ? "video"
                : e.iframe
                ? "iframe"
                : "image";
            }),
            (e.prototype.touchMove = function (e, t, i) {
              var s = t.pageX - e.pageX,
                n = t.pageY - e.pageY,
                o = !1;
              if (
                (this.swipeDirection
                  ? (o = !0)
                  : Math.abs(s) > 15
                  ? ((this.swipeDirection = "horizontal"), (o = !0))
                  : Math.abs(n) > 15 &&
                    ((this.swipeDirection = "vertical"), (o = !0)),
                o)
              ) {
                var r = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == i || i.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(r, s, 0);
                  var a = r.get().offsetWidth,
                    l = (15 * a) / 100 - Math.abs((10 * s) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -a + s - l,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      a + s + l,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == i || i.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var d = 1 - Math.abs(n) / window.innerHeight;
                  this.$backdrop.css("opacity", d);
                  var c = 1 - Math.abs(n) / (2 * window.innerWidth);
                  this.setTranslate(r, 0, n, c, c),
                    Math.abs(n) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (e.prototype.touchEnd = function (e, t, i) {
              var s,
                n = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  n.$container.removeClass("lg-dragging-vertical"),
                    n.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var o = !0;
                  if ("horizontal" === n.swipeDirection) {
                    s = e.pageX - t.pageX;
                    var r = Math.abs(e.pageX - t.pageX);
                    s < 0 && r > n.settings.swipeThreshold
                      ? (n.goToNextSlide(!0), (o = !1))
                      : s > 0 &&
                        r > n.settings.swipeThreshold &&
                        (n.goToPrevSlide(!0), (o = !1));
                  } else if ("vertical" === n.swipeDirection) {
                    if (
                      ((s = Math.abs(e.pageY - t.pageY)),
                      n.settings.closable && n.settings.swipeToClose && s > 100)
                    )
                      return void n.closeGallery();
                    n.$backdrop.css("opacity", 1);
                  }
                  if (
                    (n.outer.find(".lg-item").removeAttr("style"),
                    o && Math.abs(e.pageX - t.pageX) < 5)
                  ) {
                    var a = Ee(i.target);
                    n.isPosterElement(a) && n.LGel.trigger(Ze);
                  }
                  n.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  n.outer.hasClass("lg-dragging") ||
                    "lg-slide" === n.settings.mode ||
                    n.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (e.prototype.enableSwipe = function () {
              var e = this,
                t = {},
                i = {},
                s = !1,
                n = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (i) {
                  e.dragOrSwipeEnabled = !0;
                  var s = e.getSlideItem(e.index);
                  (!Ee(i.target).hasClass("lg-item") &&
                    !s.get().contains(i.target)) ||
                    e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    1 !== i.targetTouches.length ||
                    ((n = !0),
                    (e.touchAction = "swipe"),
                    e.manageSwipeClass(),
                    (t = {
                      pageX: i.targetTouches[0].pageX,
                      pageY: i.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (o) {
                  n &&
                    "swipe" === e.touchAction &&
                    1 === o.targetTouches.length &&
                    ((i = {
                      pageX: o.targetTouches[0].pageX,
                      pageY: o.targetTouches[0].pageY,
                    }),
                    e.touchMove(t, i, o),
                    (s = !0));
                }),
                this.$inner.on("touchend.lg", function (o) {
                  if ("swipe" === e.touchAction) {
                    if (s) (s = !1), e.touchEnd(i, t, o);
                    else if (n) {
                      var r = Ee(o.target);
                      e.isPosterElement(r) && e.LGel.trigger(Ze);
                    }
                    (e.touchAction = void 0), (n = !1);
                  }
                }));
            }),
            (e.prototype.enableDrag = function () {
              var e = this,
                t = {},
                i = {},
                s = !1,
                n = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (i) {
                  e.dragOrSwipeEnabled = !0;
                  var n = e.getSlideItem(e.index);
                  (Ee(i.target).hasClass("lg-item") ||
                    n.get().contains(i.target)) &&
                    (e.outer.hasClass("lg-zoomed") ||
                      e.lgBusy ||
                      (i.preventDefault(),
                      e.lgBusy ||
                        (e.manageSwipeClass(),
                        (t = { pageX: i.pageX, pageY: i.pageY }),
                        (s = !0),
                        (e.outer.get().scrollLeft += 1),
                        (e.outer.get().scrollLeft -= 1),
                        e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        e.LGel.trigger(Ke))));
                }),
                Ee(window).on("mousemove.lg.global" + this.lgId, function (o) {
                  s &&
                    e.lgOpened &&
                    ((n = !0),
                    (i = { pageX: o.pageX, pageY: o.pageY }),
                    e.touchMove(t, i),
                    e.LGel.trigger(Qe));
                }),
                Ee(window).on("mouseup.lg.global" + this.lgId, function (o) {
                  if (e.lgOpened) {
                    var r = Ee(o.target);
                    n
                      ? ((n = !1), e.touchEnd(i, t, o), e.LGel.trigger(Je))
                      : e.isPosterElement(r) && e.LGel.trigger(Ze),
                      s &&
                        ((s = !1),
                        e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (e.prototype.triggerPosterClick = function () {
              var e = this;
              this.$inner.on("click.lg", function (t) {
                !e.dragOrSwipeEnabled &&
                  e.isPosterElement(Ee(t.target)) &&
                  e.LGel.trigger(Ze);
              });
            }),
            (e.prototype.manageSwipeClass = function () {
              var e = this.index + 1,
                t = this.index - 1;
              this.settings.loop &&
                this.galleryItems.length > 2 &&
                (0 === this.index
                  ? (t = this.galleryItems.length - 1)
                  : this.index === this.galleryItems.length - 1 && (e = 0)),
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-next-slide lg-prev-slide"),
                t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
                this.getSlideItem(e).addClass("lg-next-slide");
            }),
            (e.prototype.goToNextSlide = function (e) {
              var t = this,
                i = this.settings.loop;
              e && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index + 1 < this.galleryItems.length
                    ? (this.index++,
                      this.LGel.trigger(et, { index: this.index }),
                      this.slide(this.index, !!e, !1, "next"))
                    : i
                    ? ((this.index = 0),
                      this.LGel.trigger(et, { index: this.index }),
                      this.slide(this.index, !!e, !1, "next"))
                    : this.settings.slideEndAnimation &&
                      !e &&
                      (this.outer.addClass("lg-right-end"),
                      setTimeout(function () {
                        t.outer.removeClass("lg-right-end");
                      }, 400)));
            }),
            (e.prototype.goToPrevSlide = function (e) {
              var t = this,
                i = this.settings.loop;
              e && this.galleryItems.length < 3 && (i = !1),
                this.lgBusy ||
                  (this.index > 0
                    ? (this.index--,
                      this.LGel.trigger(tt, {
                        index: this.index,
                        fromTouch: e,
                      }),
                      this.slide(this.index, !!e, !1, "prev"))
                    : i
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(tt, {
                        index: this.index,
                        fromTouch: e,
                      }),
                      this.slide(this.index, !!e, !1, "prev"))
                    : this.settings.slideEndAnimation &&
                      !e &&
                      (this.outer.addClass("lg-left-end"),
                      setTimeout(function () {
                        t.outer.removeClass("lg-left-end");
                      }, 400)));
            }),
            (e.prototype.keyPress = function () {
              var e = this;
              Ee(window).on("keydown.lg.global" + this.lgId, function (t) {
                e.lgOpened &&
                  !0 === e.settings.escKey &&
                  27 === t.keyCode &&
                  (t.preventDefault(),
                  e.settings.allowMediaOverlap &&
                  e.outer.hasClass("lg-can-toggle") &&
                  e.outer.hasClass("lg-components-open")
                    ? e.outer.removeClass("lg-components-open")
                    : e.closeGallery()),
                  e.lgOpened &&
                    e.galleryItems.length > 1 &&
                    (37 === t.keyCode &&
                      (t.preventDefault(), e.goToPrevSlide()),
                    39 === t.keyCode &&
                      (t.preventDefault(), e.goToNextSlide()));
              });
            }),
            (e.prototype.arrow = function () {
              var e = this;
              this.getElementById("lg-prev").on("click.lg", function () {
                e.goToPrevSlide();
              }),
                this.getElementById("lg-next").on("click.lg", function () {
                  e.goToNextSlide();
                });
            }),
            (e.prototype.arrowDisable = function (e) {
              if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var t = this.getElementById("lg-prev"),
                  i = this.getElementById("lg-next");
                e + 1 === this.galleryItems.length
                  ? i.attr("disabled", "disabled").addClass("disabled")
                  : i.removeAttr("disabled").removeClass("disabled"),
                  0 === e
                    ? t.attr("disabled", "disabled").addClass("disabled")
                    : t.removeAttr("disabled").removeClass("disabled");
              }
            }),
            (e.prototype.setTranslate = function (e, t, i, s, n) {
              void 0 === s && (s = 1),
                void 0 === n && (n = 1),
                e.css(
                  "transform",
                  "translate3d(" +
                    t +
                    "px, " +
                    i +
                    "px, 0px) scale3d(" +
                    s +
                    ", " +
                    n +
                    ", 1)"
                );
            }),
            (e.prototype.mousewheel = function () {
              var e = this,
                t = 0;
              this.outer.on("wheel.lg", function (i) {
                if (i.deltaY && !(e.galleryItems.length < 2)) {
                  i.preventDefault();
                  var s = new Date().getTime();
                  s - t < 1e3 ||
                    ((t = s),
                    i.deltaY > 0
                      ? e.goToNextSlide()
                      : i.deltaY < 0 && e.goToPrevSlide());
                }
              });
            }),
            (e.prototype.isSlideElement = function (e) {
              return (
                e.hasClass("lg-outer") ||
                e.hasClass("lg-item") ||
                e.hasClass("lg-img-wrap")
              );
            }),
            (e.prototype.isPosterElement = function (e) {
              var t = this.getSlideItem(this.index)
                .find(".lg-video-play-button")
                .get();
              return (
                e.hasClass("lg-video-poster") ||
                e.hasClass("lg-video-play-button") ||
                (t && t.contains(e.get()))
              );
            }),
            (e.prototype.toggleMaximize = function () {
              var e = this;
              this.getElementById("lg-maximize").on("click.lg", function () {
                e.$container.toggleClass("lg-inline"), e.refreshOnResize();
              });
            }),
            (e.prototype.invalidateItems = function () {
              for (var e = 0; e < this.items.length; e++) {
                var t = Ee(this.items[e]);
                t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
              }
            }),
            (e.prototype.manageCloseGallery = function () {
              var e = this;
              if (this.settings.closable) {
                var t = !1;
                this.getElementById("lg-close").on("click.lg", function () {
                  e.closeGallery();
                }),
                  this.settings.closeOnTap &&
                    (this.outer.on("mousedown.lg", function (i) {
                      var s = Ee(i.target);
                      t = !!e.isSlideElement(s);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      t = !1;
                    }),
                    this.outer.on("mouseup.lg", function (i) {
                      var s = Ee(i.target);
                      e.isSlideElement(s) &&
                        t &&
                        (e.outer.hasClass("lg-dragging") || e.closeGallery());
                    }));
              }
            }),
            (e.prototype.closeGallery = function (e) {
              var t = this;
              if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
              this.LGel.trigger(it), Ee(window).scrollTop(this.prevScrollTop);
              var i,
                s = this.items[this.index];
              if (this.zoomFromOrigin && s) {
                var n = this.mediaContainerPosition,
                  o = n.top,
                  r = n.bottom,
                  a = this.galleryItems[this.index],
                  l = a.__slideVideoInfo,
                  d = a.poster,
                  c = Le(
                    s,
                    this.outer,
                    o + r,
                    l && d && this.settings.videoMaxSize
                  );
                i = Pe(s, this.outer, o, r, c);
              }
              this.zoomFromOrigin && i
                ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                  this.getSlideItem(this.index)
                    .addClass("lg-start-end-progress")
                    .css(
                      "transition-duration",
                      this.settings.startAnimationDuration + "ms"
                    )
                    .css("transform", i))
                : (this.outer.addClass("lg-hide-items"),
                  this.outer.removeClass("lg-zoom-from-image")),
                this.destroyModules(),
                (this.lGalleryOn = !1),
                (this.isDummyImageRemoved = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                clearTimeout(this.hideBarTimeout),
                (this.hideBarTimeout = !1),
                Ee("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var u =
                this.zoomFromOrigin && i
                  ? Math.max(
                      this.settings.startAnimationDuration,
                      this.settings.backdropDuration
                    )
                  : this.settings.backdropDuration;
              return (
                this.$container.removeClass("lg-show-in"),
                setTimeout(function () {
                  t.zoomFromOrigin &&
                    i &&
                    t.outer.removeClass("lg-zoom-from-image"),
                    t.$container.removeClass("lg-show"),
                    t.$backdrop
                      .removeAttr("style")
                      .css(
                        "transition-duration",
                        t.settings.backdropDuration + "ms"
                      ),
                    t.outer.removeClass("lg-closing " + t.settings.startClass),
                    t
                      .getSlideItem(t.index)
                      .removeClass("lg-start-end-progress"),
                    t.$inner.empty(),
                    t.lgOpened && t.LGel.trigger(st, { instance: t }),
                    t.outer.get() && t.outer.get().blur(),
                    (t.lgOpened = !1);
                }, u + 100),
                u + 100
              );
            }),
            (e.prototype.initModules = function () {
              this.plugins.forEach(function (e) {
                try {
                  e.init();
                } catch (e) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly initiated"
                  );
                }
              });
            }),
            (e.prototype.destroyModules = function (e) {
              this.plugins.forEach(function (t) {
                try {
                  e ? t.destroy() : t.closeGallery && t.closeGallery();
                } catch (e) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly destroyed"
                  );
                }
              });
            }),
            (e.prototype.refresh = function (e) {
              this.settings.dynamic || this.invalidateItems(),
                (this.galleryItems = e || this.getItems()),
                this.updateControls(),
                this.openGalleryOnItemClick(),
                this.LGel.trigger(je);
            }),
            (e.prototype.updateControls = function () {
              this.addSlideVideoInfo(this.galleryItems),
                this.updateCounterTotal(),
                this.manageSingleSlideClassName();
            }),
            (e.prototype.destroy = function () {
              var e = this,
                t = this.closeGallery(!0);
              return (
                setTimeout(function () {
                  e.destroyModules(!0),
                    e.settings.dynamic || e.invalidateItems(),
                    Ee(window).off(".lg.global" + e.lgId),
                    e.LGel.off(".lg"),
                    e.$container.remove();
                }, t),
                t
              );
            }),
            e
          );
        })();
      const rt = function (e, t) {
        return new ot(e, t);
      };
      var at = i(97),
        lt = i(86),
        dt = i(363);
      const ct = document.querySelectorAll("[data-gallery]");
      if (ct.length) {
        let e = [];
        ct.forEach((t) => {
          e.push({
            gallery: t,
            galleryClass: rt(t, {
              plugins: [lt, at, dt],
              videojs: !0,
              videojsOptions: { muted: !0 },
              licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
              speed: 500,
            }),
          });
        }),
          (Ce.gallery = e);
      }
      const ut = document.querySelectorAll("._anim-items");
      if (ut.length > 0) {
        function e() {
          for (let e = 0; e < ut.length; e++) {
            const i = ut[e],
              s = i.offsetHeight,
              n = t(i).top,
              o = 4;
            let r = window.innerHeight - s / o;
            s > window.innerHeight &&
              (r = window.innerHeight - window.innerHeight / o),
              pageYOffset > n - r && pageYOffset < n + s
                ? i.classList.add("_active")
                : i.classList.contains("_anim-no-hide") ||
                  i.classList.remove("_active");
          }
        }
        function t(e) {
          const t = e.getBoundingClientRect(),
            i = window.pageXOffset || document.documentElement.scrollLeft,
            s = window.pageYOffset || document.documentElement.scrollTop;
          return { top: t.top + s, left: t.left + i };
        }
        window.addEventListener("scroll", e),
          setTimeout(() => {
            e();
          }, 300);
      }
      var ht;
      (window.FLS = !0),
        (function (e) {
          let t = new Image();
          (t.onload = t.onerror =
            function () {
              e(2 == t.height);
            }),
            (t.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (e) {
          let t = !0 === e ? "webp" : "no-webp";
          document.documentElement.classList.add(t);
        }),
        t.any() && document.documentElement.classList.add("touch"),
        (function () {
          let e = document.querySelector(".icon-menu");
          e &&
            e.addEventListener("click", function (e) {
              o &&
                (r(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            t.any()
          ) {
            function e() {
              let e = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${e}px`);
            }
            window.addEventListener("resize", e), e();
          }
        })(),
        (function () {
          const e = document.querySelectorAll("[data-spollers]");
          if (e.length > 0) {
            const t = Array.from(e).filter(function (e, t, i) {
              return !e.dataset.spollers.split(",")[0];
            });
            t.length && o(t);
            let i = c(e, "spollers");
            function o(e, t = !1) {
              e.forEach((e) => {
                (e = t ? e.item : e),
                  t.matches || !t
                    ? (e.classList.add("_spoller-init"),
                      r(e),
                      e.addEventListener("click", a))
                    : (e.classList.remove("_spoller-init"),
                      r(e, !1),
                      e.removeEventListener("click", a));
              });
            }
            function r(e, t = !0) {
              const i = e.querySelectorAll("[data-spoller]");
              i.length > 0 &&
                i.forEach((e) => {
                  t
                    ? (e.removeAttribute("tabindex"),
                      e.classList.contains("_spoller-active") ||
                        (e.nextElementSibling.hidden = !0))
                    : (e.setAttribute("tabindex", "-1"),
                      (e.nextElementSibling.hidden = !1));
                });
            }
            function a(e) {
              const t = e.target;
              if (t.closest("[data-spoller]")) {
                const i = t.closest("[data-spoller]"),
                  o = i.closest("[data-spollers]"),
                  r = !!o.hasAttribute("data-one-spoller");
                o.querySelectorAll("._slide").length ||
                  (r && !i.classList.contains("_spoller-active") && l(o),
                  i.classList.toggle("_spoller-active"),
                  ((e, t = 500) => {
                    e.hidden ? n(e, t) : s(e, t);
                  })(i.nextElementSibling, 500)),
                  e.preventDefault();
              }
            }
            function l(e) {
              const t = e.querySelector("[data-spoller]._spoller-active");
              t &&
                (t.classList.remove("_spoller-active"),
                s(t.nextElementSibling, 500));
            }
            i &&
              i.length &&
              i.forEach((e) => {
                e.matchMedia.addEventListener("change", function () {
                  o(e.itemsArray, e.matchMedia);
                }),
                  o(e.itemsArray, e.matchMedia);
              });
          }
        })(),
        new e({}),
        (function () {
          const e = document.querySelectorAll(
            "input[placeholder],textarea[placeholder]"
          );
          e.length &&
            e.forEach((e) => {
              e.dataset.placeholder = e.placeholder;
            }),
            document.body.addEventListener("focusin", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder && (t.placeholder = ""),
                t.classList.add("_form-focus"),
                t.parentElement.classList.add("_form-focus"),
                m.removeError(t));
            }),
            document.body.addEventListener("focusout", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder &&
                  (t.placeholder = t.dataset.placeholder),
                t.classList.remove("_form-focus"),
                t.parentElement.classList.remove("_form-focus"),
                t.hasAttribute("data-validate") && m.validateInput(t));
            });
        })(),
        (function (e) {
          const t = document.forms;
          if (t.length)
            for (const e of t)
              e.addEventListener("submit", function (e) {
                i(e.target, e);
              }),
                e.addEventListener("reset", function (e) {
                  const t = e.target;
                  m.formClean(t);
                });
          async function i(t, i) {
            if (0 === (e ? m.getErrors(t) : 0)) {
              if (t.hasAttribute("data-ajax")) {
                i.preventDefault();
                const e = t.getAttribute("action")
                    ? t.getAttribute("action").trim()
                    : "#",
                  n = t.getAttribute("method")
                    ? t.getAttribute("method").trim()
                    : "GET",
                  o = new FormData(t);
                t.classList.add("_sending");
                const r = await fetch(e, { method: n, body: o });
                if (r.ok) {
                  await r.json();
                  t.classList.remove("_sending"), s(t);
                } else alert("Ошибка"), t.classList.remove("_sending");
              } else t.hasAttribute("data-dev") && (i.preventDefault(), s(t));
            } else {
              i.preventDefault();
              const e = t.querySelector("._form-error");
              e && t.hasAttribute("data-goto-error") && h(e, !0, 1e3);
            }
          }
          function s(e) {
            document.dispatchEvent(
              new CustomEvent("formSent", { detail: { form: e } })
            ),
              m.formClean(e),
              d(`[Формы]: ${"Форма отправлена!"}`);
          }
        })(!0),
        (g.inputMaskModule = new p({ logging: ht })),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const i = t.closest("[data-goto]"),
                  s = i.dataset.goto ? i.dataset.goto : "",
                  n = !!i.hasAttribute("data-goto-header"),
                  o = i.dataset.gotoSpeed ? i.dataset.gotoSpeed : "500";
                h(s, n, o), e.preventDefault();
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                i = t.target;
              if ("navigator" === i.dataset.watch) {
                const e = i.id,
                  s =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${e}"]`));
                t.isIntersecting
                  ? s && s.classList.add("_navigator-active")
                  : s && s.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e);
        })(),
        (function () {
          Se = !0;
          const e = document.querySelector("header.header"),
            t = e.hasAttribute("data-scroll-show"),
            i = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
            s = e.dataset.scroll ? e.dataset.scroll : 1;
          let n,
            o = 0;
          document.addEventListener("windowScroll", function (r) {
            const a = window.scrollY;
            clearTimeout(n),
              a >= s
                ? (!e.classList.contains("_header-scroll") &&
                    e.classList.add("_header-scroll"),
                  t &&
                    (a > o
                      ? e.classList.contains("_header-show") &&
                        e.classList.remove("_header-show")
                      : !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show"),
                    (n = setTimeout(() => {
                      !e.classList.contains("_header-show") &&
                        e.classList.add("_header-show");
                    }, i))))
                : (e.classList.contains("_header-scroll") &&
                    e.classList.remove("_header-scroll"),
                  t &&
                    e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")),
              (o = a <= 0 ? 0 : a);
          });
        })();
    })();
})();

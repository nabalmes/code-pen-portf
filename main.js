/* WORK.JS FUNCTIONS
 * ------------------------------------------------------------- */

/*
 * fullPage 2.2.1
 * https://github.com/alvarotrigo/fullPage.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */

(function (c, l) {
    "function" === typeof define && define.amd
      ? define(["jquery"], function (k) {
          return l(k, c, c.document, c.Math);
        })
      : "undefined" !== typeof exports
      ? (module.exports = l(require("jquery"), c, c.document, c.Math))
      : l(jQuery, c, c.document, c.Math);
  })("undefined" !== typeof window ? window : this, function (c, l, k, n, H) {
    var m = c(l),
      r = c(k);
    c.fn.fullpage = function (d) {
      function Ia(a) {
        a.find(".fp-slides").after(
          '<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'
        );
        "#fff" != d.controlArrowColor &&
          (a
            .find(".fp-controlArrow.fp-next")
            .css(
              "border-color",
              "transparent transparent transparent " + d.controlArrowColor
            ),
          a
            .find(".fp-controlArrow.fp-prev")
            .css(
              "border-color",
              "transparent " + d.controlArrowColor + " transparent transparent"
            ));
        d.loopHorizontal || a.find(".fp-controlArrow.fp-prev").hide();
      }
      function Ja() {
        p.append('<div id="fp-nav"><ul></ul></div>');
        z = c("#fp-nav");
        z.addClass(function () {
          return d.showActiveTooltip
            ? "fp-show-active " + d.navigationPosition
            : d.navigationPosition;
        });
        for (var a = 0; a < c(".fp-section").length; a++) {
          var b = "";
          d.anchors.length && (b = d.anchors[a]);
          var b = '<li><a href="#' + b + '"><span></span></a>',
            g = d.navigationTooltips[a];
          "undefined" !== typeof g &&
            "" !== g &&
            (b +=
              '<div class="fp-tooltip ' +
              d.navigationPosition +
              '">' +
              g +
              "</div>");
          b += "</li>";
          z.find("ul").append(b);
        }
      }
      function da() {
        c(".fp-section").each(function () {
          var a = c(this).find(".fp-slide");
          a.length
            ? a.each(function () {
                I(c(this));
              })
            : I(c(this));
        });
        ea();
      }
      function ea() {
        var a = c(".fp-section.active"),
          b = a.find("SLIDES_WRAPPER"),
          g = a.find(".fp-scrollable");
        b.length && (g = b.find(".fp-slide.active"));
        g.mouseover();
        fa(a);
        c.isFunction(d.afterLoad) &&
          d.afterLoad.call(a, a.data("anchor"), a.index(".fp-section") + 1);
        c.isFunction(d.afterRender) && d.afterRender.call(this);
      }
      function ga() {
        var a;
        if (!d.autoScrolling || d.scrollBar) {
          for (
            var b = m.scrollTop(),
              g = 0,
              J = n.abs(b - k.querySelectorAll(".fp-section")[0].offsetTop),
              e = k.querySelectorAll(".fp-section"),
              f = 0;
            f < e.length;
            ++f
          ) {
            var h = n.abs(b - e[f].offsetTop);
            h < J && ((g = f), (J = h));
          }
          a = c(e).eq(g);
        }
        if (!d.autoScrolling || d.scrollBar) {
          if (!a.hasClass("active")) {
            U = !0;
            b = c(".fp-section.active");
            g = b.index(".fp-section") + 1;
            J = V(a);
            e = a.data("anchor");
            f = a.index(".fp-section") + 1;
            h = a.find(".fp-slide.active");
            if (h.length)
              var l = h.data("anchor"),
                p = h.index();
            u &&
              (a.addClass("active").siblings().removeClass("active"),
              c.isFunction(d.onLeave) && d.onLeave.call(b, g, f, J),
              c.isFunction(d.afterLoad) && d.afterLoad.call(a, e, f),
              K(e, f - 1),
              d.anchors.length && ((A = e), W(p, l, e, f)));
            clearTimeout(ha);
            ha = setTimeout(function () {
              U = !1;
            }, 100);
          }
          d.fitToSection &&
            (clearTimeout(ia),
            (ia = setTimeout(function () {
              u && (c(".fp-section.active").is(a) && (v = !0), B(a), (v = !1));
            }, 1e3)));
        }
      }
      function ja(a) {
        return a.find(".fp-slides").length
          ? a.find(".fp-slide.active").find(".fp-scrollable")
          : a.find(".fp-scrollable");
      }
      function L(a, b) {
        if (h.m[a]) {
          var d, c;
          "down" == a
            ? ((d = "bottom"), (c = e.moveSectionDown))
            : ((d = "top"), (c = e.moveSectionUp));
          if (0 < b.length)
            if (
              ((d =
                "top" === d
                  ? !b.scrollTop()
                  : "bottom" === d
                  ? b.scrollTop() + 1 + b.innerHeight() >= b[0].scrollHeight
                  : void 0),
              d)
            )
              c();
            else return !0;
          else c();
        }
      }
      function Ka(a) {
        var b = a.originalEvent;
        if (!ka(a.target) && X(b)) {
          d.autoScrolling && a.preventDefault();
          a = c(".fp-section.active");
          var g = ja(a);
          u &&
            !w &&
            ((b = la(b)),
            (D = b.y),
            (M = b.x),
            a.find(".fp-slides").length && n.abs(N - M) > n.abs(E - D)
              ? n.abs(N - M) > (m.width() / 100) * d.touchSensitivity &&
                (N > M
                  ? h.m.right && e.moveSlideRight()
                  : h.m.left && e.moveSlideLeft())
              : d.autoScrolling &&
                n.abs(E - D) > (m.height() / 100) * d.touchSensitivity &&
                (E > D ? L("down", g) : D > E && L("up", g)));
        }
      }
      function ka(a, b) {
        b = b || 0;
        var g = c(a).parent();
        return b < d.normalScrollElementTouchThreshold &&
          g.is(d.normalScrollElements)
          ? !0
          : b == d.normalScrollElementTouchThreshold
          ? !1
          : ka(g, ++b);
      }
      function X(a) {
        return "undefined" === typeof a.pointerType || "mouse" != a.pointerType;
      }
      function La(a) {
        a = a.originalEvent;
        d.fitToSection && x.stop();
        X(a) && ((a = la(a)), (E = a.y), (N = a.x));
      }
      function ma(a, b) {
        for (
          var d = 0, c = a.slice(n.max(a.length - b, 1)), e = 0;
          e < c.length;
          e++
        )
          d += c[e];
        return n.ceil(d / b);
      }
      function t(a) {
        var b = new Date().getTime();
        if (d.autoScrolling && !O) {
          a = l.event || a;
          var g = a.wheelDelta || -a.deltaY || -a.detail,
            e = n.max(-1, n.min(1, g));
          149 < C.length && C.shift();
          C.push(n.abs(g));
          d.scrollBar &&
            (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
          a = c(".fp-section.active");
          a = ja(a);
          g = b - na;
          na = b;
          200 < g && (C = []);
          u &&
            ((b = ma(C, 10)),
            (g = ma(C, 70)),
            b >= g && (0 > e ? L("down", a) : L("up", a)));
          return !1;
        }
        d.fitToSection && x.stop();
      }
      function oa(a) {
        var b = c(".fp-section.active").find(".fp-slides"),
          g = b.find(".fp-slide").length;
        if (!(!b.length || w || 2 > g)) {
          var g = b.find(".fp-slide.active"),
            e = null,
            e = "prev" === a ? g.prev(".fp-slide") : g.next(".fp-slide");
          if (!e.length) {
            if (!d.loopHorizontal) return;
            e = "prev" === a ? g.siblings(":last") : g.siblings(":first");
          }
          w = !0;
          F(b, e);
        }
      }
      function pa() {
        c(".fp-slide.active").each(function () {
          Y(c(this), "internal");
        });
      }
      function B(a, b, g) {
        var e = a.position();
        if (
          "undefined" !== typeof e &&
          ((b = {
            element: a,
            callback: b,
            isMovementUp: g,
            dest: e,
            dtop: e.top,
            yMovement: V(a),
            anchorLink: a.data("anchor"),
            sectionIndex: a.index(".fp-section"),
            activeSlide: a.find(".fp-slide.active"),
            activeSection: c(".fp-section.active"),
            leavingSection: c(".fp-section.active").index(".fp-section") + 1,
            localIsResizing: v
          }),
          !(
            (b.activeSection.is(a) && !v) ||
            (d.scrollBar && m.scrollTop() === b.dtop)
          ))
        ) {
          if (b.activeSlide.length)
            var f = b.activeSlide.data("anchor"),
              h = b.activeSlide.index();
          d.autoScrolling &&
            d.continuousVertical &&
            "undefined" !== typeof b.isMovementUp &&
            ((!b.isMovementUp && "up" == b.yMovement) ||
              (b.isMovementUp && "down" == b.yMovement)) &&
            (b.isMovementUp
              ? c(".fp-section.active").before(
                  b.activeSection.nextAll(".fp-section")
                )
              : c(".fp-section.active").after(
                  b.activeSection.prevAll(".fp-section").get().reverse()
                ),
            y(c(".fp-section.active").position().top),
            pa(),
            (b.wrapAroundElements = b.activeSection),
            (b.dest = b.element.position()),
            (b.dtop = b.dest.top),
            (b.yMovement = V(b.element)));
          if (c.isFunction(d.onLeave) && !b.localIsResizing) {
            if (
              !1 ===
              d.onLeave.call(
                b.activeSection,
                b.leavingSection,
                b.sectionIndex + 1,
                b.yMovement
              )
            )
              return;
            Ma(b.activeSection);
          }
          a.addClass("active").siblings().removeClass("active");
          u = !1;
          W(h, f, b.anchorLink, b.sectionIndex);
          Na(b);
          A = b.anchorLink;
          K(b.anchorLink, b.sectionIndex);
        }
      }
      function Na(a) {
        if (d.css3 && d.autoScrolling && !d.scrollBar)
          qa("translate3d(0px, -" + a.dtop + "px, 0px)", !0),
            d.scrollingSpeed
              ? setTimeout(function () {
                  Z(a);
                }, d.scrollingSpeed)
              : Z(a);
        else {
          var b = Oa(a);
          c(b.element)
            .animate(b.options, d.scrollingSpeed, d.easing)
            .promise()
            .done(function () {
              Z(a);
            });
        }
      }
      function Oa(a) {
        var b = {};
        d.autoScrolling && !d.scrollBar
          ? ((b.options = { top: -a.dtop }), (b.element = ".fullpage-wrapper"))
          : ((b.options = { scrollTop: a.dtop }), (b.element = "html, body"));
        return b;
      }
      function Z(a) {
        a.wrapAroundElements &&
          a.wrapAroundElements.length &&
          (a.isMovementUp
            ? c(".fp-section:first").before(a.wrapAroundElements)
            : c(".fp-section:last").after(a.wrapAroundElements),
          y(c(".fp-section.active").position().top),
          pa());
        a.element.find(".fp-scrollable").mouseover();
        c.isFunction(d.afterLoad) &&
          !a.localIsResizing &&
          d.afterLoad.call(a.element, a.anchorLink, a.sectionIndex + 1);
        fa(a.element);
        Pa(a.element);
        u = !0;
        c.isFunction(a.callback) && a.callback.call(this);
      }
      function fa(a) {
        a.find("img[data-src], video[data-src], audio[data-src]").each(
          function () {
            c(this).attr("src", c(this).data("src"));
            c(this).removeAttr("data-src");
          }
        );
      }
      function Pa(a) {
        a.find("video, audio").each(function () {
          var a = c(this).get(0);
          a.hasAttribute("autoplay") && "function" === typeof a.play && a.play();
        });
      }
      function Ma(a) {
        a.find("video, audio").each(function () {
          var a = c(this).get(0);
          a.hasAttribute("data-ignore") ||
            "function" !== typeof a.pause ||
            a.pause();
        });
      }
      function ra() {
        if (!U && !d.lockAnchors) {
          var a = l.location.hash.replace("#", "").split("/"),
            b = a[0],
            a = a[1];
          if (b.length) {
            var c = "undefined" === typeof A,
              e = "undefined" === typeof A && "undefined" === typeof a && !w;
            ((b && b !== A && !c) || e || (!w && aa != a)) && ba(b, a);
          }
        }
      }
      function Qa(a) {
        u &&
          (a.pageY < P ? e.moveSectionUp() : a.pageY > P && e.moveSectionDown());
        P = a.pageY;
      }
      function F(a, b) {
        var g = b.position(),
          e = b.index(),
          f = a.closest(".fp-section"),
          h = f.index(".fp-section"),
          k = f.data("anchor"),
          l = f.find(".fp-slidesNav"),
          m = sa(b),
          p = v;
        if (d.onSlideLeave) {
          var t = f.find(".fp-slide.active"),
            q = t.index(),
            r;
          r = q == e ? "none" : q > e ? "left" : "right";
          if (
            !p &&
            "none" !== r &&
            c.isFunction(d.onSlideLeave) &&
            !1 === d.onSlideLeave.call(t, k, h + 1, q, r, e)
          ) {
            w = !1;
            return;
          }
        }
        b.addClass("active").siblings().removeClass("active");
        !d.loopHorizontal &&
          d.controlArrows &&
          (f.find(".fp-controlArrow.fp-prev").toggle(0 !== e),
          f.find(".fp-controlArrow.fp-next").toggle(!b.is(":last-child")));
        f.hasClass("active") && W(e, m, k, h);
        var u = function () {
          p ||
            (c.isFunction(d.afterSlideLoad) &&
              d.afterSlideLoad.call(b, k, h + 1, m, e));
          w = !1;
        };
        d.css3
          ? ((g = "translate3d(-" + n.round(g.left) + "px, 0px, 0px)"),
            ta(a.find(".fp-slidesContainer"), 0 < d.scrollingSpeed).css(ua(g)),
            setTimeout(
              function () {
                u();
              },
              d.scrollingSpeed,
              d.easing
            ))
          : a.animate(
              { scrollLeft: n.round(g.left) },
              d.scrollingSpeed,
              d.easing,
              function () {
                u();
              }
            );
        l.find(".active").removeClass("active");
        l.find("li").eq(e).find("a").addClass("active");
      }
      function va() {
        wa();
        if (Q) {
          var a = c(k.activeElement);
          a.is("textarea") ||
            a.is("input") ||
            a.is("select") ||
            ((a = m.height()),
            n.abs(a - ca) > (20 * n.max(ca, a)) / 100 &&
              (e.reBuild(!0), (ca = a)));
        } else
          clearTimeout(xa),
            (xa = setTimeout(function () {
              e.reBuild(!0);
            }, 350));
      }
      function wa() {
        var a = d.responsive || d.responsiveWidth,
          b = d.responsiveHeight;
        a && e.setResponsive(m.width() < a);
        b && (f.hasClass("fp-responsive") || e.setResponsive(m.height() < b));
      }
      function ta(a) {
        var b = "all " + d.scrollingSpeed + "ms " + d.easingcss3;
        a.removeClass("fp-notransition");
        return a.css({ "-webkit-transition": b, transition: b });
      }
      function Ra(a, b) {
        if (825 > a || 900 > b) {
          var d = n.min((100 * a) / 825, (100 * b) / 900).toFixed(2);
          p.css("font-size", d + "%");
        } else p.css("font-size", "100%");
      }
      function K(a, b) {
        d.menu &&
          (c(d.menu).find(".active").removeClass("active"),
          c(d.menu)
            .find('[data-menuanchor="' + a + '"]')
            .addClass("active"));
        d.navigation &&
          (c("#fp-nav").find(".active").removeClass("active"),
          a
            ? c("#fp-nav")
                .find('a[href="#' + a + '"]')
                .addClass("active")
            : c("#fp-nav").find("li").eq(b).find("a").addClass("active"));
      }
      function V(a) {
        var b = c(".fp-section.active").index(".fp-section");
        a = a.index(".fp-section");
        return b == a ? "none" : b > a ? "up" : "down";
      }
      function I(a) {
        a.css("overflow", "hidden");
        var b = a.closest(".fp-section"),
          c = a.find(".fp-scrollable"),
          e;
        c.length
          ? (e = c.get(0).scrollHeight)
          : ((e = a.get(0).scrollHeight),
            d.verticalCentered &&
              (e = a.find(".fp-tableCell").get(0).scrollHeight));
        b =
          q - parseInt(b.css("padding-bottom")) - parseInt(b.css("padding-top"));
        e > b
          ? c.length
            ? c
                .css("height", b + "px")
                .parent()
                .css("height", b + "px")
            : (d.verticalCentered
                ? a
                    .find(".fp-tableCell")
                    .wrapInner('<div class="fp-scrollable" />')
                : a.wrapInner('<div class="fp-scrollable" />'),
              a
                .find(".fp-scrollable")
                .slimScroll({
                  allowPageScroll: !0,
                  height: b + "px",
                  size: "10px",
                  alwaysVisible: !0
                }))
          : ya(a);
        a.css("overflow", "");
      }
      function ya(a) {
        a.find(".fp-scrollable").children().first().unwrap().unwrap();
        a.find(".slimScrollBar").remove();
        a.find(".slimScrollRail").remove();
      }
      function za(a) {
        a.addClass("fp-table").wrapInner(
          '<div class="fp-tableCell" style="height:' + Aa(a) + 'px;" />'
        );
      }
      function Aa(a) {
        var b = q;
        if (d.paddingTop || d.paddingBottom)
          (b = a),
            b.hasClass("fp-section") || (b = a.closest(".fp-section")),
            (a =
              parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom"))),
            (b = q - a);
        return b;
      }
      function qa(a, b) {
        b ? ta(f) : f.addClass("fp-notransition");
        f.css(ua(a));
        setTimeout(function () {
          f.removeClass("fp-notransition");
        }, 10);
      }
      function Ba(a) {
        var b = c('.fp-section[data-anchor="' + a + '"]');
        b.length || (b = c(".fp-section").eq(a - 1));
        return b;
      }
      function ba(a, b) {
        var d = Ba(a);
        "undefined" === typeof b && (b = 0);
        a === A || d.hasClass("active")
          ? Ca(d, b)
          : B(d, function () {
              Ca(d, b);
            });
      }
      function Ca(a, b) {
        if ("undefined" !== typeof b) {
          var d = a.find(".fp-slides"),
            c;
          c = a.find(".fp-slides");
          var e = c.find('.fp-slide[data-anchor="' + b + '"]');
          e.length || (e = c.find(".fp-slide").eq(b));
          c = e;
          c.length && F(d, c);
        }
      }
      function Sa(a, b) {
        a.append('<div class="fp-slidesNav"><ul></ul></div>');
        var c = a.find(".fp-slidesNav");
        c.addClass(d.slidesNavPosition);
        for (var e = 0; e < b; e++)
          c.find("ul").append('<li><a href="#"><span></span></a></li>');
        c.css("margin-left", "-" + c.width() / 2 + "px");
        c.find("li").first().find("a").addClass("active");
      }
      function W(a, b, c, e) {
        e = "";
        d.anchors.length &&
          !d.lockAnchors &&
          (a
            ? ("undefined" !== typeof c && (e = c),
              "undefined" === typeof b && (b = a),
              (aa = b),
              Da(e + "/" + b))
            : ("undefined" !== typeof a && (aa = b), Da(c)));
        Ea();
      }
      function Da(a) {
        if (d.recordHistory) location.hash = a;
        else if (Q || R) history.replaceState(H, H, "#" + a);
        else {
          var b = l.location.href.split("#")[0];
          l.location.replace(b + "#" + a);
        }
      }
      function sa(a) {
        var b = a.data("anchor");
        a = a.index();
        "undefined" === typeof b && (b = a);
        return b;
      }
      function Ea() {
        var a = c(".fp-section.active"),
          b = a.find(".fp-slide.active"),
          e = a.data("anchor"),
          f = sa(b),
          a = a.index(".fp-section"),
          a = String(a);
        d.anchors.length && (a = e);
        b.length && (a = a + "-" + f);
        a = a.replace("/", "-").replace("#", "");
        p[0].className = p[0].className.replace(
          RegExp("\\b\\s?fp-viewing-[^\\s]+\\b", "g"),
          ""
        );
        p.addClass("fp-viewing-" + a);
      }
      function Ta() {
        var a = k.createElement("p"),
          b,
          c = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
          };
        k.body.insertBefore(a, null);
        for (var d in c)
          a.style[d] !== H &&
            ((a.style[d] = "translate3d(1px,1px,1px)"),
            (b = l.getComputedStyle(a).getPropertyValue(c[d])));
        k.body.removeChild(a);
        return b !== H && 0 < b.length && "none" !== b;
      }
      function Ua() {
        if (Q || R) {
          var a = Fa();
          c(".fullpage-wrapper")
            .off("touchstart " + a.down)
            .on("touchstart " + a.down, La);
          c(".fullpage-wrapper")
            .off("touchmove " + a.move)
            .on("touchmove " + a.move, Ka);
        }
      }
      function Va() {
        if (Q || R) {
          var a = Fa();
          c(".fullpage-wrapper").off("touchstart " + a.down);
          c(".fullpage-wrapper").off("touchmove " + a.move);
        }
      }
      function Fa() {
        return l.PointerEvent
          ? { down: "pointerdown", move: "pointermove" }
          : { down: "MSPointerDown", move: "MSPointerMove" };
      }
      function la(a) {
        var b = [];
        b.y =
          "undefined" !== typeof a.pageY && (a.pageY || a.pageX)
            ? a.pageY
            : a.touches[0].pageY;
        b.x =
          "undefined" !== typeof a.pageX && (a.pageY || a.pageX)
            ? a.pageX
            : a.touches[0].pageX;
        R && X(a) && ((b.y = a.touches[0].pageY), (b.x = a.touches[0].pageX));
        return b;
      }
      function Y(a, b) {
        e.setScrollingSpeed(0, "internal");
        "undefined" !== typeof b && (v = !0);
        F(a.closest(".fp-slides"), a);
        "undefined" !== typeof b && (v = !1);
        e.setScrollingSpeed(G.scrollingSpeed, "internal");
      }
      function y(a) {
        d.scrollBar
          ? f.scrollTop(a)
          : d.css3
          ? qa("translate3d(0px, -" + a + "px, 0px)", !1)
          : f.css("top", -a);
      }
      function ua(a) {
        return {
          "-webkit-transform": a,
          "-moz-transform": a,
          "-ms-transform": a,
          transform: a
        };
      }
      function Ga(a, b, c) {
        switch (b) {
          case "up":
            h[c].up = a;
            break;
          case "down":
            h[c].down = a;
            break;
          case "left":
            h[c].left = a;
            break;
          case "right":
            h[c].right = a;
            break;
          case "all":
            "m" == c ? e.setAllowScrolling(a) : e.setKeyboardScrolling(a);
        }
      }
      function Wa() {
        y(0);
        c("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();
        c(".fp-section").css({ height: "", "background-color": "", padding: "" });
        c(".fp-slide").css({ width: "" });
        f.css({
          height: "",
          position: "",
          "-ms-touch-action": "",
          "touch-action": ""
        });
        c(".fp-section, .fp-slide").each(function () {
          ya(c(this));
          c(this).removeClass("fp-table active");
        });
        f.addClass("fp-notransition");
        f.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(
          function () {
            c(this).replaceWith(this.childNodes);
          }
        );
        x.scrollTop(0);
      }
      function S(a, b, c) {
        d[a] = b;
        "internal" !== c && (G[a] = b);
      }
      function T(a, b) {
        console && console[a] && console[a]("fullPage: " + b);
      }
      var x = c("html, body"),
        p = c("body"),
        e = c.fn.fullpage;
      d = c.extend(
        {
          menu: !1,
          anchors: [],
          lockAnchors: !1,
          navigation: !1,
          navigationPosition: "right",
          navigationTooltips: [],
          showActiveTooltip: !1,
          slidesNavigation: !1,
          slidesNavPosition: "bottom",
          scrollBar: !1,
          css3: !0,
          scrollingSpeed: 700,
          autoScrolling: !0,
          fitToSection: !0,
          easing: "easeInOutCubic",
          easingcss3: "ease",
          loopBottom: !1,
          loopTop: !1,
          loopHorizontal: !0,
          continuousVertical: !1,
          normalScrollElements: null,
          scrollOverflow: !1,
          touchSensitivity: 5,
          normalScrollElementTouchThreshold: 5,
          keyboardScrolling: !0,
          animateAnchor: !0,
          recordHistory: !0,
          controlArrows: !0,
          controlArrowColor: "#fff",
          verticalCentered: !0,
          resize: !1,
          sectionsColor: [],
          paddingTop: 0,
          paddingBottom: 0,
          fixedElements: null,
          responsive: 0,
          responsiveWidth: 0,
          responsiveHeight: 0,
          sectionSelector: ".section",
          slideSelector: ".slide",
          afterLoad: null,
          onLeave: null,
          afterRender: null,
          afterResize: null,
          afterReBuild: null,
          afterSlideLoad: null,
          onSlideLeave: null
        },
        d
      );
      (function () {
        d.continuousVertical &&
          (d.loopTop || d.loopBottom) &&
          ((d.continuousVertical = !1),
          T(
            "warn",
            "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"
          ));
        d.continuousVertical &&
          d.scrollBar &&
          ((d.continuousVertical = !1),
          T(
            "warn",
            "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"
          ));
        c.each(d.anchors, function (a, b) {
          (c("#" + b).length || c('[name="' + b + '"]').length) &&
            T(
              "error",
              "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."
            );
        });
      })();
      c.extend(c.easing, {
        easeInOutCubic: function (a, b, c, d, e) {
          return 1 > (b /= e / 2)
            ? (d / 2) * b * b * b + c
            : (d / 2) * ((b -= 2) * b * b + 2) + c;
        }
      });
      c.extend(c.easing, {
        easeInQuart: function (a, b, c, d, e) {
          return d * (b /= e) * b * b * b + c;
        }
      });
      e.setAutoScrolling = function (a, b) {
        S("autoScrolling", a, b);
        var g = c(".fp-section.active");
        d.autoScrolling && !d.scrollBar
          ? (x.css({ overflow: "hidden", height: "100%" }),
            e.setRecordHistory(d.recordHistory, "internal"),
            f.css({ "-ms-touch-action": "none", "touch-action": "none" }),
            g.length && y(g.position().top))
          : (x.css({ overflow: "visible", height: "initial" }),
            e.setRecordHistory(!1, "internal"),
            f.css({ "-ms-touch-action": "", "touch-action": "" }),
            y(0),
            g.length && x.scrollTop(g.position().top));
      };
      e.setRecordHistory = function (a, b) {
        S("recordHistory", a, b);
      };
      e.setScrollingSpeed = function (a, b) {
        S("scrollingSpeed", a, b);
      };
      e.setFitToSection = function (a, b) {
        S("fitToSection", a, b);
      };
      e.setLockAnchors = function (a) {
        d.lockAnchors = a;
      };
      e.setMouseWheelScrolling = function (a) {
        a
          ? k.addEventListener
            ? (k.addEventListener("mousewheel", t, !1),
              k.addEventListener("wheel", t, !1),
              k.addEventListener("DOMMouseScroll", t, !1))
            : k.attachEvent("onmousewheel", t)
          : k.addEventListener
          ? (k.removeEventListener("mousewheel", t, !1),
            k.removeEventListener("wheel", t, !1),
            k.removeEventListener("DOMMouseScroll", t, !1))
          : k.detachEvent("onmousewheel", t);
      };
      e.setAllowScrolling = function (a, b) {
        "undefined" !== typeof b
          ? ((b = b.replace(/ /g, "").split(",")),
            c.each(b, function (b, c) {
              Ga(a, c, "m");
            }))
          : a
          ? (e.setMouseWheelScrolling(!0), Ua())
          : (e.setMouseWheelScrolling(!1), Va());
      };
      e.setKeyboardScrolling = function (a, b) {
        "undefined" !== typeof b
          ? ((b = b.replace(/ /g, "").split(",")),
            c.each(b, function (b, c) {
              Ga(a, c, "k");
            }))
          : (d.keyboardScrolling = a);
      };
      e.moveSectionUp = function () {
        var a = c(".fp-section.active").prev(".fp-section");
        a.length ||
          (!d.loopTop && !d.continuousVertical) ||
          (a = c(".fp-section").last());
        a.length && B(a, null, !0);
      };
      e.moveSectionDown = function () {
        var a = c(".fp-section.active").next(".fp-section");
        a.length ||
          (!d.loopBottom && !d.continuousVertical) ||
          (a = c(".fp-section").first());
        !a.length ||
          (d.onBeforeMoveSection &&
            c.isFunction(d.onBeforeMoveSection) &&
            !1 ===
              d.onBeforeMoveSection.call(
                this,
                direction,
                currentSlide,
                destiny,
                slides,
                activeSection
              )) ||
          B(a, null, !1);
      };
      e.silentMoveTo = function (a, b) {
        e.setScrollingSpeed(0, "internal");
        e.moveTo(a, b);
        e.setScrollingSpeed(G.scrollingSpeed, "internal");
      };
      e.moveTo = function (a, b) {
        var c = Ba(a);
        "undefined" !== typeof b ? ba(a, b) : 0 < c.length && B(c);
      };
      e.moveSlideRight = function () {
        oa("next");
      };
      e.moveSlideLeft = function () {
        oa("prev");
      };
      e.reBuild = function (a) {
        if (!f.hasClass("fp-destroyed")) {
          v = !0;
          var b = m.width();
          q = m.height();
          d.resize && Ra(q, b);
          c(".fp-section").each(function () {
            var a = c(this).find(".fp-slides"),
              b = c(this).find(".fp-slide");
            d.verticalCentered &&
              c(this)
                .find(".fp-tableCell")
                .css("height", Aa(c(this)) + "px");
            c(this).css("height", q + "px");
            d.scrollOverflow &&
              (b.length
                ? b.each(function () {
                    I(c(this));
                  })
                : I(c(this)));
            1 < b.length && F(a, a.find(".fp-slide.active"));
          });
          (b = c(".fp-section.active").index(".fp-section")) &&
            e.silentMoveTo(b + 1);
          v = !1;
          c.isFunction(d.afterResize) && a && d.afterResize.call(f);
          c.isFunction(d.afterReBuild) && !a && d.afterReBuild.call(f);
        }
      };
      e.setResponsive = function (a) {
        var b = f.hasClass("fp-responsive");
        a
          ? b ||
            (e.setAutoScrolling(!1, "internal"),
            e.setFitToSection(!1, "internal"),
            c("#fp-nav").hide(),
            f.addClass("fp-responsive"))
          : b &&
            (e.setAutoScrolling(G.autoScrolling, "internal"),
            e.setFitToSection(G.autoScrolling, "internal"),
            c("#fp-nav").show(),
            f.removeClass("fp-responsive"));
      };
      var w = !1,
        Q = navigator.userAgent.match(
          /(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/
        ),
        R =
          "ontouchstart" in l ||
          0 < navigator.msMaxTouchPoints ||
          navigator.maxTouchPoints,
        f = c(this),
        q = m.height(),
        v = !1,
        A,
        aa,
        u = !0,
        C = [],
        z,
        O,
        h = { m: { up: !0, down: !0, left: !0, right: !0 } };
      h.k = c.extend(!0, {}, h.m);
      var G = c.extend(!0, {}, d);
      c(this).length
        ? (f.css({ height: "100%", position: "relative" }),
          f.addClass("fullpage-wrapper"),
          c("html").addClass("fp-enabled"))
        : T(
            "error",
            "Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"
          );
      d.css3 && (d.css3 = Ta());
      e.setAllowScrolling(!0);
      f.removeClass("fp-destroyed");
      c(d.sectionSelector).each(function () {
        c(this).addClass("fp-section");
      });
      c(d.slideSelector).each(function () {
        c(this).addClass("fp-slide");
      });
      d.navigation && Ja();
      c(".fp-section")
        .each(function (a) {
          var b = c(this),
            e = c(this).find(".fp-slide"),
            f = e.length;
          a || 0 !== c(".fp-section.active").length || c(this).addClass("active");
          c(this).css("height", q + "px");
          d.paddingTop && c(this).css("padding-top", d.paddingTop);
          d.paddingBottom && c(this).css("padding-bottom", d.paddingBottom);
          "undefined" !== typeof d.sectionsColor[a] &&
            c(this).css("background-color", d.sectionsColor[a]);
          "undefined" !== typeof d.anchors[a] &&
            (c(this).attr("data-anchor", d.anchors[a]),
            c(this).hasClass("active") && K(d.anchors[a], a));
          if (0 < f) {
            a = 100 * f;
            var h = 100 / f;
            e.wrapAll('<div class="fp-slidesContainer" />');
            e.parent().wrap('<div class="fp-slides" />');
            c(this)
              .find(".fp-slidesContainer")
              .css("width", a + "%");
            1 < f &&
              (d.controlArrows && Ia(c(this)),
              d.slidesNavigation && Sa(c(this), f));
            e.each(function (a) {
              c(this).css("width", h + "%");
              d.verticalCentered && za(c(this));
            });
            b = b.find(".fp-slide.active");
            b.length ? Y(b) : e.eq(0).addClass("active");
          } else d.verticalCentered && za(c(this));
        })
        .promise()
        .done(function () {
          e.setAutoScrolling(d.autoScrolling, "internal");
          var a = c(".fp-section.active").find(".fp-slide.active");
          a.length &&
            (0 !== c(".fp-section.active").index(".fp-section") ||
              (0 === c(".fp-section.active").index(".fp-section") &&
                0 !== a.index())) &&
            Y(a);
          d.fixedElements && d.css3 && c(d.fixedElements).appendTo(p);
          d.navigation &&
            (z.css("margin-top", "-" + z.height() / 2 + "px"),
            z
              .find("li")
              .eq(c(".fp-section.active").index(".fp-section"))
              .find("a")
              .addClass("active"));
          d.menu &&
            d.css3 &&
            c(d.menu).closest(".fullpage-wrapper").length &&
            c(d.menu).appendTo(p);
          d.scrollOverflow
            ? ("complete" === k.readyState && da(), m.on("load", da))
            : ea();
          wa();
          if (
            !d.animateAnchor &&
            ((a = l.location.hash.replace("#", "").split("/")[0]), a.length)
          ) {
            var b = c('[data-anchor="' + a + '"]');
            b.length &&
              (d.autoScrolling
                ? y(b.position().top)
                : (y(0), x.scrollTop(b.position().top)),
              K(a, null),
              c.isFunction(d.afterLoad) &&
                d.afterLoad.call(b, a, b.index(".fp-section") + 1),
              b.addClass("active").siblings().removeClass("active"));
          }
          Ea();
          m.on("load", function () {
            var a = l.location.hash.replace("#", "").split("/"),
              b = a[0],
              a = a[1];
            b && ba(b, a);
          });
        });
      var ha,
        ia,
        U = !1;
      m.on("scroll", ga);
      var E = 0,
        N = 0,
        D = 0,
        M = 0,
        na = new Date().getTime();
      m.on("hashchange", ra);
      r.keydown(function (a) {
        clearTimeout(Ha);
        var b = c(":focus");
        b.is("textarea") ||
          b.is("input") ||
          b.is("select") ||
          !d.keyboardScrolling ||
          !d.autoScrolling ||
          (-1 < c.inArray(a.which, [40, 38, 32, 33, 34]) && a.preventDefault(),
          (Ha = setTimeout(function () {
            var b = a.shiftKey;
            O = a.ctrlKey;
            switch (a.which) {
              case 38:
              case 33:
                h.k.up && e.moveSectionUp();
                break;
              case 32:
                if (b && h.k.up) {
                  e.moveSectionUp();
                  break;
                }
              case 40:
              case 34:
                h.k.down && e.moveSectionDown();
                break;
              case 36:
                h.k.up && e.moveTo(1);
                break;
              case 35:
                h.k.down && e.moveTo(c(".fp-section").length);
                break;
              case 37:
                h.k.left && e.moveSlideLeft();
                break;
              case 39:
                h.k.right && e.moveSlideRight();
            }
          }, 150)));
      });
      r.keyup(function (a) {
        O = a.ctrlKey;
      });
      c(l).blur(function () {
        O = !1;
      });
      var Ha;
      f.mousedown(function (a) {
        2 == a.which && ((P = a.pageY), f.on("mousemove", Qa));
      });
      f.mouseup(function (a) {
        2 == a.which && f.off("mousemove");
      });
      var P = 0;
      r.on("click touchstart", "#fp-nav a", function (a) {
        a.preventDefault();
        a = c(this).parent().index();
        B(c(".fp-section").eq(a));
      });
      r.on("click touchstart", ".fp-slidesNav a", function (a) {
        a.preventDefault();
        a = c(this).closest(".fp-section").find(".fp-slides");
        var b = a.find(".fp-slide").eq(c(this).closest("li").index());
        F(a, b);
      });
      d.normalScrollElements &&
        (r.on("mouseenter", d.normalScrollElements, function () {
          e.setMouseWheelScrolling(!1);
        }),
        r.on("mouseleave", d.normalScrollElements, function () {
          e.setMouseWheelScrolling(!0);
        }));
      c(".fp-section").on("click touchstart", ".fp-controlArrow", function () {
        c(this).hasClass("fp-prev")
          ? h.m.left && e.moveSlideLeft()
          : h.m.right && e.moveSlideRight();
      });
      m.resize(va);
      var ca = q,
        xa;
      e.destroy = function (a) {
        e.setAutoScrolling(!1, "internal");
        e.setAllowScrolling(!1);
        e.setKeyboardScrolling(!1);
        f.addClass("fp-destroyed");
        m.off("scroll", ga).off("hashchange", ra).off("resize", va);
        r.off("click", "#fp-nav a")
          .off("mouseenter", "#fp-nav li")
          .off("mouseleave", "#fp-nav li")
          .off("click", ".fp-slidesNav a")
          .off("mouseover", d.normalScrollElements)
          .off("mouseout", d.normalScrollElements);
        c(".fp-section").off("click", ".fp-controlArrow");
        a && Wa();
      };
    };
  });
  
  //Fullpage Js General Setting//
  $(document).ready(function () {
    $("#fullpage").fullpage({
      navigation: true,
      navigationPosition: "right",
      continuousVertical: true,
      controlArrows: true,
      slidesNavigation: false,
      sectionsColor: ["none", "none", "none", "none"],
      anchors: ["section0", "section1", "section2"],
      css3: true,
      verticalCentered: false
    });
  
    //Open and Close Info Tabs//
    $(".info_button").click(function () {
      $(".button_text").toggleClass("active");
      $(".info").toggleClass("open");
      $(".work_headers").toggleClass("active");
    });
  
    //Change Elements on Animation//
    var black = $(".black"),
      white = $(".white");
  
    //Stop Scrolling When Black Animation Begins//
    black.on(
      "webkitAnimationStart oanimationstart msAnimationStart animationstart",
      function (e) {
        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
      }
    );
  
    //Allow Scrolling When Black Animations Executes//
    black.on(
      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
      function (e) {
        $.fn.fullpage.setMouseWheelScrolling(true);
        $.fn.fullpage.setAllowScrolling(true);
      }
    );
  
    //On Page Transition Automatically Close Menu If Open//
    white.on(
      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
      function (e) {
        $(".button_text").removeClass("active");
        $(".info").removeClass("open");
        $(".work_headers").removeClass("active");
      }
    );
  });
  

  console.log('im here');
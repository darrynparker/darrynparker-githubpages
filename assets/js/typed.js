!function (b) {
    var a = function (d, c) {
        this.el = b(d);
        this.options = b.extend({}, b.fn.typed.defaults, c);
        this.isInput = this.el.is("input");
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.shuffle = this.options.shuffle;
        this.sequence = [];
        this.build()
    };
    a.prototype = {
        constructor: a, init: function () {
            var c = this;
            c.timeout = setTimeout(function () {
                for (var d = 0;
                    d < c.strings.length;
                    ++d) {
                        c.sequence[d] = d
                } if (c.shuffle) {
                    c.sequence = c.shuffleArray(c.sequence)
                } c.typewrite(c.strings[c.sequence[c.arrayPos]], c.strPos)
            }, c.startDelay)
        }, build: function () {
            if (this.showCursor === true) {
                this.cursor = b('<span class="typed-cursor">' + this.cursorChar + "</span>");
                this.el.after(this.cursor)
            } this.init()
        }, typewrite: function (d, e) {
            if (this.stop === true) {
                return
            } var f = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var c = this;
            c.timeout = setTimeout(function () {
                var i = 0;
                var l = d.substr(e);
                if (l.charAt(0) === "^") {
                    var k = 1;
                    if (/^\^\d+/.test(l)) {
                        l = /\d+/.exec(l)[0];
                        k += l.length;
                        i = parseInt(l)
                    } d = d.substring(0, e) + d.substring(e + k)
                } if (c.contentType === "html") {
                    var h = d.substr(e).charAt(0);
                    if (h === "<" || h === "&") {
                        var g = "";
                        var j = "";
                        if (h === "<") {
                            j = ">"
                        } else {
                            j = ";"
                        } while (d.substr(e).charAt(0) !== j) {
                            g += d.substr(e).charAt(0);
                            e++
                        } e++;
                        g += j
                    }
                } c.timeout = setTimeout(function () {
                    if (e === d.length) {
                        c.options.onStringTyped(c.arrayPos);
                        if (c.arrayPos === c.strings.length - 1) {
                            c.options.callback();
                            c.curLoop++;
                            if (c.loop === false || c.curLoop === c.loopCount) {
                                return
                            }
                        } c.timeout = setTimeout(function () {
                            c.backspace(d, e)
                        }, c.backDelay)
                    } else {
                        if (e === 0) {
                            c.options.preStringTyped(c.arrayPos)
                        } var m = d.substr(0, e + 1);
                        if (c.attr) {
                            c.el.attr(c.attr, m)
                        } else {
                            if (c.isInput) {
                                c.el.val(m)
                            } else {
                                if (c.contentType === "html") {
                                    c.el.html(m)
                                } else {
                                    c.el.text(m)
                                }
                            }
                        } e++;
                        c.typewrite(d, e)
                    }
                }, i)
            }, f)
        }, backspace: function (d, e) {
            if (this.stop === true) {
                return
            } var f = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var c = this;
            c.timeout = setTimeout(function () {
                if (c.contentType === "html") {
                    if (d.substr(e).charAt(0) === ">") {
                        var g = "";
                        while (d.substr(e).charAt(0) !== "<") {
                            g -= d.substr(e).charAt(0);
                            e--
                        } e--;
                        g += "<"
                    }
                } var h = d.substr(0, e);
                if (c.attr) {
                    c.el.attr(c.attr, h)
                } else {
                    if (c.isInput) {
                        c.el.val(h)
                    } else {
                        if (c.contentType === "html") {
                            c.el.html(h)
                        } else {
                            c.el.text(h)
                        }
                    }
                } if (e > c.stopNum) {
                    e--;
                    c.backspace(d, e)
                } else {
                    if (e <= c.stopNum) {
                        c.arrayPos++;
                        if (c.arrayPos === c.strings.length) {
                            c.arrayPos = 0;
                            if (c.shuffle) {
                                c.sequence = c.shuffleArray(c.sequence)
                            } c.init()
                        } else {
                            c.typewrite(c.strings[c.sequence[c.arrayPos]], e)
                        }
                    }
                }
            }, f)
        }, shuffleArray: function (f) {
            var c, e, d = f.length;
            if (d) {
                while (--d) {
                    e = Math.floor(Math.random() * (d + 1));
                    c = f[e];
                    f[e] = f[d];
                    f[d] = c
                }
            } return f
        }, reset: function () {
            var c = this;
            clearInterval(c.timeout);
            var d = this.el.attr("id");
            this.el.after('<span id="' + d + '"/>');
            this.el.remove();
            if (typeof this.cursor !== "undefined") {
                this.cursor.remove()
            } c.options.resetCallback()
        }
    };
    b.fn.typed = function (c) {
        return this.each(function () {
            var f = b(this), e = f.data("typed"), d = typeof c == "object" && c;
            if (!e) {
                f.data("typed", (e = new a(this, d)))
            } if (typeof c == "string") {
                e[c]()
            }
        })
    };
    b.fn.typed.defaults = { strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"], typeSpeed: 0, startDelay: 0, backSpeed: 0, shuffle: false, backDelay: 500, loop: false, loopCount: false, showCursor: true, cursorChar: "|", attr: null, contentType: "html", callback: function () { }, preStringTyped: function () { }, onStringTyped: function () { }, resetCallback: function () { } }
}(window.jQuery);
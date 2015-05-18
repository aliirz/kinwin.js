
//***************************************
//  kinwin.js
//  An independent micro DOM manipulation framework
//  Author: Ali Raza (aliirz)
//***************************************
'use strict';

(function () {
    function KinWin(s) {
        var z = 'getElement', g = 'Name', a = {'#': 'ById', '.': 'sByClass' + g, '@': 'sBy' + g, '=': 'sByTag' + g}[s[0]] || false,
            b = s.slice(1), u = (a ? document[z + a](b) : document.querySelectorAll(b));
        this.element = (this.checkIf(u, 'NodeList')) ? Array.prototype.slice.call(u) : u;
    }

  KinWin.prototype = {

    constructor: KinWin,

    KindaSortaTypa: function (obj, type) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    },

    get : function () {
      // Get element
      return this.element;
    },

    set: function (element, name, value) {
      if (this.KindaSortaTypa(name, "String")) {
        element.setAttribute(name, value);
      } else if (this.KindaSortaTypa(name, "Object")) {
        for (var property in name) {
          element.setAttribute(property, name[property]);
        }
      }
    },

    parent: function () {
      return (!this.KindaSortaTypa(this.element, "Array")) ? this.element.parentNode : null;
    },

    hide: function () {
      this.each(function (element) {
        element.style.display = 'none';
      });
      return this;  
    },

    show: function () {
      this.each(function (element) {
        element.style.display = '';
      });
      return this;
    },

    html: function (html) {
      if (typeof html === "undefined") {
        return this.element.innerHTML;
      }
      this.each(function (element) {
        element.innerHTML = html;
      });
      return this;
    },

    css: function (obj) {
      if (typeof obj === "undefined") {
        return this.element.style;
      }
      this.each(function (element) {
        for (var key in obj) {
          element.style[key] = obj[key];
        }
      });
      return this;
    },

    attr: function (name, value) {
      if (this.KindaSortaTypa(name, 'String') && typeof value === "undefined") {
        return this.element.getAttribute(name);
      }
      var that = this;
      this.each(function (element) {
        that.set(element, name, value);
      });
      return this;
    },

    remove: function () {
      this.each(function (element) {
        element.parentNode && element.parentNode.removeChild(element);
      });
      return this;
    },

    prepend: function (doc) {
      var type = this.kindaSortaTypa(doc, "String");
      if (type) {
        this.each(function (element) {
          element.insertAdjacentHTML('afterbegin', doc);
        });
      } else {
        this.each(function (element) {
          element.insertBefore(doc.cloneNode(true), element.firstChild);
        });
      }
      return this;

    },

    append: function (doc) {
      var type = this.kindaSortaTypa(doc, "String");
      if (type) {
        this.each(function (element) {
          element.insertAdjacentHTML('beforeend', doc);
        });
      } else {
        this.each(function (element) {
          element.appendChild(doc.cloneNode(true));
        });
      }
      return this;

    },
  }

  window.kw = function (s) {
    return new KinWin(s);
  }

})();

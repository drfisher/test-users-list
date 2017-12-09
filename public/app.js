/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elemFromString_1 = __webpack_require__(5);
/**
 * An abstract class with basic capabilities
 */
var Component = /** @class */ (function () {
    function Component(options) {
        this.options = Object.assign(this.defaultOptions, options);
    }
    Object.defineProperty(Component.prototype, "defaultOptions", {
        /**
         * @returns {O}
         */
        get: function () {
            return {
                template: function () { }
            };
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.render = function (templateParams) {
        return elemFromString_1.default(this.options.template(templateParams));
    };
    return Component;
}());
exports.default = Component;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var promisified_dom_events_1 = __webpack_require__(18);
__webpack_require__(3);
var Form_1 = __webpack_require__(4);
var Popup_1 = __webpack_require__(6);
var editUserFormTemplate = __webpack_require__(7);
var popupTemplate = __webpack_require__(9);
var usersListTemplate = __webpack_require__(19);
var clickHandlers = {
    'js-users-list-next': function (e, target) {
        drawUsersList(target.dataset.url || '');
        e.preventDefault();
    },
    'js-users-list-user': function (e, target) {
        editUser(target.dataset.id || '');
        e.preventDefault();
    }
};
var appCont;
window.scrollTo(0, 0);
// Entry point
promisified_dom_events_1.ready.then(function () {
    appCont = document.querySelector('#app');
    if (!appCont) {
        throw new Error('App root container is required');
    }
    // handle all clicks in app with one handler
    appCont.addEventListener('click', function (e) {
        var handlers = Object.keys(clickHandlers);
        var target = e.target;
        do {
            handlers.forEach(function (className) {
                if (target.classList.contains(className)) {
                    clickHandlers[className](e, target);
                }
            });
            target = target.parentElement;
        } while (target && target !== appCont);
    });
    pause(1000).then(function () { return drawUsersList('/api/users/'); });
});
/**
 * Loads and shows a users list
 * @param {string} url
 */
function drawUsersList(url) {
    window.scrollTo(0, 0);
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (json) { return usersListTemplate(json); })
        .then(function (html) { return appCont.innerHTML = html; })
        .catch(logError);
}
/**
 * Loads user's data and shows a form
 */
function editUser(id) {
    var popup = new Popup_1.default({ template: popupTemplate });
    var formPromise = fetch("/api/user/" + id + "/")
        .then(function (response) { return response.json(); })
        .then(function (json) { return pause(500).then(function () { return json; }); })
        .then(function (json) {
        var userForm = new Form_1.default({
            onSubmit: function (formData) {
                saveUser(formData).then(function (response) {
                    if (response.success) {
                        userForm.destroy();
                        popup.destroy();
                        updateUser(response.user);
                    }
                });
            },
            template: editUserFormTemplate
        }, {
            action: "/api/users/" + id + "/",
            user: json
        });
        return userForm.element;
    });
    popup.show(formPromise);
}
/**
 * Updates user is a list
 * @param {object} user
 */
function updateUser(user) {
    var id = user.id, name = user.name;
    var userElem = appCont.querySelector(".js-users-list-user[data-id=\"" + id + "\"]");
    if (userElem) {
        userElem.querySelector('.user__name').textContent = name;
        userElem.classList.add('user_updated');
        setTimeout(function () { return userElem.classList.remove('user_updated'); }, 1100);
    }
}
/**
 * Saves user's data to a server
 * @param {FormData} formData
 * @returns {Promise}
 */
function saveUser(formData) {
    var action = formData.action, method = formData.method, body = formData.body;
    return fetch(action, { method: method, body: body })
        .then(function (response) { return response.json(); });
}
/**
 * @param {number} delay
 * @returns {Promise<void>} a promise which resolves after delay
 */
function pause(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}
/**
 * Simple error handler
 * @param {Error} err
 */
function logError(err) {
    console.error(err);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(1);
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    /**
     * Creates a new instance of form controller
     * @param {FormOptions} options
     * @param {*} templateParams
     */
    function Form(options, templateParams) {
        var _this = _super.call(this, options) || this;
        _this.submitHandler = _this.submitHandler.bind(_this);
        _this.form = _this.render(templateParams);
        if (!_this.form || _this.form.tagName !== 'FORM') {
            throw new Error('Template should create a form element');
        }
        _this.form.addEventListener('submit', _this.submitHandler);
        return _this;
    }
    Object.defineProperty(Form.prototype, "element", {
        /**
         * @returns {HTMLFormElement}
         */
        get: function () {
            return this.form;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Removes event listeners and links to objects
     */
    Form.prototype.destroy = function () {
        this.form.removeEventListener('submit', this.submitHandler);
        delete this.form;
        delete this.options;
    };
    Object.defineProperty(Form.prototype, "defaultOptions", {
        get: function () {
            return {
                shouldPreventDefaultSubmit: true,
                template: function () { throw new Error('Template function is required'); }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "formData", {
        /**
         * @returns {object} formData as a plane object
         */
        get: function () {
            var form = this.form;
            return Array.from(form.querySelectorAll('[name]'))
                .reduce(function (acc, elem) {
                var name = elem.name, value = elem.value;
                if (name && typeof value !== 'undefined') {
                    acc.body.append(name, value);
                }
                return acc;
            }, {
                action: form.action,
                method: form.method,
                body: new FormData()
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Listens to submit
     * @param {Event} e
     */
    Form.prototype.submitHandler = function (e) {
        if (this.options.shouldPreventDefaultSubmit) {
            e.preventDefault();
        }
        if (typeof this.options.onSubmit === 'function') {
            this.options.onSubmit(this.formData);
        }
    };
    return Form;
}(Component_1.default));
exports.default = Form;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elemFromString = function (html) {
    var tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = html;
    return tempWrapper.children[0];
};
exports.default = elemFromString;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __webpack_require__(1);
var keyboard_1 = __webpack_require__(16);
var html;
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(options) {
        var _this = _super.call(this, options) || this;
        if (!html) {
            html = document.querySelector('html');
        }
        _this.popup = _this.render();
        document.body.appendChild(_this.popup);
        _this.hide = _this.hide.bind(_this);
        _this.onCloseClick = _this.onCloseClick.bind(_this);
        // Listen to events
        if (_this.options.cssModClose) {
            _this.popup.addEventListener('click', _this.onCloseClick);
        }
        toggleEscapeButtonSubscription.call(_this, true);
        return _this;
    }
    /**
     * Removes all content from popup
     * @returns {Popup}
     */
    Popup.prototype.clear = function () {
        this.container.innerHTML = '';
        return this;
    };
    /**
     * Remove event listeners and popup itself
     */
    Popup.prototype.destroy = function () {
        var popup = this.popup;
        var popupParent = popup.parentElement;
        this.clear().hide();
        delete this.popup;
        popup.removeEventListener('click', this.onCloseClick);
        if (popupParent) {
            popupParent.removeChild(popup);
        }
    };
    /**
     * Hides popup
     */
    Popup.prototype.hide = function () {
        var _a = this.options, cssModHtmlFrized = _a.cssModHtmlFrized, cssModVisible = _a.cssModVisible;
        toggleEscapeButtonSubscription.call(this, false);
        cssModVisible && this.popup.classList.remove(cssModVisible);
        cssModHtmlFrized && html.classList.remove(cssModHtmlFrized);
        return this;
    };
    /**
     * Shows passed element in an popup or just popup
     * @param {HTMLElement|Promise<HTMLElement>} element
     */
    Popup.prototype.show = function (element) {
        var _this = this;
        var _a = this.options, cssModHtmlFrized = _a.cssModHtmlFrized, cssModVisible = _a.cssModVisible;
        if (element) {
            this.toggleLoading(true);
            Promise.resolve(element).then(function (element) {
                _this.clear();
                _this.container.appendChild(element);
                _this.toggleLoading(false);
            });
        }
        toggleEscapeButtonSubscription.call(this, true);
        cssModVisible && this.popup.classList.add(cssModVisible);
        cssModHtmlFrized && html.classList.add(cssModHtmlFrized);
        return this;
    };
    /**
     * Toggles preloader
     * @param {boolean} shouldShowLoading
     * @returns {Popup}
     */
    Popup.prototype.toggleLoading = function (shouldShowLoading) {
        var loadingMod = this.options.cssModLoading;
        if (loadingMod) {
            this.popup.classList.toggle(loadingMod, shouldShowLoading);
        }
        return this;
    };
    Object.defineProperty(Popup.prototype, "visible", {
        /**
         * Checks if a popup is visible
         * @returns {boolean}
         */
        get: function () {
            return this.popup.classList.contains(this.options.cssModVisible || '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Popup.prototype, "container", {
        get: function () {
            var cssSel = this.options.cssSelContainer;
            if (!this._container && cssSel) {
                var container = this.popup.querySelector(cssSel);
                this._container = container;
            }
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {MouseEvent} e
     */
    Popup.prototype.onCloseClick = function (e) {
        var _a = this.options, cssModClose = _a.cssModClose, _b = _a.cssModCloseIgnore, cssModCloseIgnore = _b === void 0 ? [] : _b;
        var target = e.target;
        var shouldClose = false;
        var _loop_1 = function () {
            var classList = target.classList;
            if (classList.contains(cssModClose)) {
                shouldClose = true;
                return "break";
            }
            var shouldIgnore = cssModCloseIgnore.some(function (className) { return classList.contains(className); });
            if (shouldIgnore) {
                return "break";
            }
            target = target.parentElement;
        };
        do {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        } while (target && target !== this.popup);
        if (shouldClose) {
            this.hide();
        }
    };
    Object.defineProperty(Popup.prototype, "defaultOptions", {
        get: function () {
            return {
                cssModClose: 'js-overlay-close',
                cssModCloseIgnore: ['overlay__box'],
                cssModHtmlFrized: 'frized',
                cssModLoading: 'overlay_loading',
                cssModVisible: 'overlay_visible',
                cssSelContainer: '.js-overlay-content',
                template: function () {
                    throw new Error('Template is required');
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return Popup;
}(Component_1.default));
/**
 * @this {Popup}
 * @param {boolean} shouldSubscribe
 */
function toggleEscapeButtonSubscription(shouldSubscribe) {
    keyboard_1.default.subscribe(this.hide, { keyCode: 27, eventName: 'keydown' });
}
exports.default = Popup;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (action, method, user) {pug_html = pug_html + "\u003Cform" + (" class=\"edit-user\""+pug.attr("action", action, true, true)+pug.attr("method", (method || 'POST'), true, true)) + "\u003E\u003Cimg" + (" class=\"edit-user__photo\""+pug.attr("src", user.avatarUrl, true, true)+pug.attr("alt", user.name, true, true)) + "\u003E\u003Cinput" + (" name=\"avatarUrl\" type=\"hidden\""+pug.attr("value", user.avatarUrl, true, true)) + "\u003E\u003Cdiv class=\"form-field\"\u003E\u003Clabel class=\"form-field__label\"\u003E\u003Cdiv class=\"form-field__label__text\"\u003EName*\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"form-field__input\""+" name=\"name\" type=\"text\""+pug.attr("value", user.name, true, true)+" required=\"required\" placeholder=\"John Doe\"") + "\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cbutton class=\"form-button\"\u003Esave\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";}.call(this,"action" in locals_for_with?locals_for_with.action:typeof action!=="undefined"?action:undefined,"method" in locals_for_with?locals_for_with.method:typeof method!=="undefined"?method:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection class=\"overlay overlay_loading js-overlay-close\"\u003E\u003Cdiv class=\"overlay__box\"\u003E\u003Cspan class=\"overlay__close js-overlay-close\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"overlay__box__content js-overlay-content\"\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = __webpack_require__(10).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"preloader\"\u003E\u003Cdiv class=\"preloader__dot\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"preloader__dot\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"preloader__dot\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"preloader__dot\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A storage of all event listeners
 * @type {{}}
 */
var listeners = {};
var allowedEvents = ['keypress', 'keydown', 'keyup'];
/**
 * Add a new event listener
 * @param {string} eventName
 */
var listenTo = function (eventName) {
    var eventSpace = getEventSpace(eventName);
    if (!eventSpace.isListening) {
        document.addEventListener(eventName, eventHandler);
    }
};
/**
 * Common handler for all keyboard events
 * @param {KeyboardEvent} e
 */
var eventHandler = function (e) {
    var type = e.type, keyCode = e.keyCode;
    getKeyListeners(type, keyCode).forEach(function (handler) { return handler(e); });
};
/**
 * Returns a structure for event name or creates it and returns
 * @param {string} eventName
 * @returns {object}
 */
var getEventSpace = function (eventName) {
    if (!listeners[eventName]) {
        listeners[eventName] = {
            isListening: false,
            keys: {}
        };
    }
    return listeners[eventName];
};
/**
 * Creates a structure for key ode in an event space
 * @param {string} eventName
 * @param {string} keyCode
 */
var getKeyListeners = function (eventName, keyCode) {
    var eventKeys = getEventSpace(eventName).keys;
    if (!eventKeys[keyCode]) {
        eventKeys[keyCode] = [];
    }
    return eventKeys[keyCode];
};
/**
 * Add new event handlers
 * @param {function} handler
 * @param {object} params
 */
exports.subscribe = function (handler, params) {
    var keyCode = params.keyCode, _a = params.eventName, eventName = _a === void 0 ? 'keypress' : _a;
    if (allowedEvents.indexOf(eventName) === -1) {
        console.error(eventName + " is not allowed keyboard event");
        return;
    }
    var eventListeners = getKeyListeners(eventName, keyCode);
    // TODO: we can use Set here instead of array:
    if (eventListeners.indexOf(handler) === -1) {
        eventListeners.push(handler);
    }
    listenTo(eventName);
};
/**
 * Removed event handler
 * @param {function} handler
 * @param {object} params
 */
exports.unsubscribe = function (handler, params) {
    var keyCode = params.keyCode, _a = params.eventName, eventName = _a === void 0 ? 'keypress' : _a;
    var handlers = getKeyListeners(eventName, keyCode);
    var handlerIndex = handlers.findIndex(handler);
    if (handlerIndex !== -1) {
        handlers.splice(handlerIndex, 1);
    }
};
exports.default = { subscribe: exports.subscribe, unsubscribe: exports.unsubscribe };


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EVENT_DOM_READY = 'DOMContentLoaded';
var EVENT_WINDOW_LOADED = 'load';
exports.ready = new Promise(function (resolve) {
    var readyState = window.document.readyState;
    if (readyState === 'loading') {
        var readyHandler_1 = function () {
            window.document.removeEventListener(EVENT_DOM_READY, readyHandler_1);
            resolve();
        };
        window.document.addEventListener(EVENT_DOM_READY, readyHandler_1);
    }
    else {
        resolve();
    }
});
exports.loaded = new Promise(function (resolve) {
    var readyState = window.document.readyState;
    if (readyState !== 'complete') {
        var loadHandler_1 = function () {
            window.removeEventListener(EVENT_WINDOW_LOADED, loadHandler_1);
            resolve();
        };
        window.addEventListener(EVENT_WINDOW_LOADED, loadHandler_1);
    }
    else {
        resolve();
    }
});
window['promisifiedDomEvents'] = { ready: exports.ready, loaded: exports.loaded };
//# sourceMappingURL=promisifiedDomEvents.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (nextPageUrl, previousPageUrl, result) {pug_html = pug_html + "\u003Cdiv class=\"users\"\u003E\u003Cul class=\"users-list\"\u003E";
// iterate result
;(function(){
  var $$obj = result;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var user = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (" class=\"user js-users-list-user\""+pug.attr("data-id", user.id, true, true)) + "\u003E\u003Cdiv class=\"user__content\"\u003E\u003Cimg" + (" class=\"user__photo\""+pug.attr("alt", user.name, true, true)+pug.attr("src", user.avatarUrl, true, true)) + "\u003E\u003Cspan class=\"user__name\"\u003E" + (pug.escape(null == (pug_interp = user.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var user = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli" + (" class=\"user js-users-list-user\""+pug.attr("data-id", user.id, true, true)) + "\u003E\u003Cdiv class=\"user__content\"\u003E\u003Cimg" + (" class=\"user__photo\""+pug.attr("alt", user.name, true, true)+pug.attr("src", user.avatarUrl, true, true)) + "\u003E\u003Cspan class=\"user__name\"\u003E" + (pug.escape(null == (pug_interp = user.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
if ((previousPageUrl || nextPageUrl)) {
pug_html = pug_html + "\u003Cdiv class=\"paging\"\u003E";
if (previousPageUrl) {
pug_html = pug_html + "\u003Cbutton" + (" class=\"form-button paging__button_prev js-users-list-next\""+pug.attr("data-url", previousPageUrl, true, true)) + "\u003Eprevious\u003C\u002Fbutton\u003E";
}
if (nextPageUrl) {
pug_html = pug_html + "\u003Cbutton" + (" class=\"form-button paging__button_next js-users-list-next\""+pug.attr("data-url", nextPageUrl, true, true)) + "\u003Enext\u003C\u002Fbutton\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";}.call(this,"nextPageUrl" in locals_for_with?locals_for_with.nextPageUrl:typeof nextPageUrl!=="undefined"?nextPageUrl:undefined,"previousPageUrl" in locals_for_with?locals_for_with.previousPageUrl:typeof previousPageUrl!=="undefined"?previousPageUrl:undefined,"result" in locals_for_with?locals_for_with.result:typeof result!=="undefined"?result:undefined));;return pug_html;};
module.exports = template;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDU2ZWMwMGIxNDlkMjNhNTRhMGZjIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvYXBwLnN0eWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb21wb25lbnRzL0Zvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90b29scy9lbGVtRnJvbVN0cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbXBvbmVudHMvUG9wdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC90ZW1wbGF0ZXMvZWRpdFVzZXJGb3JtLnB1ZyIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIiwid2VicGFjazovLy8uL3NyYy9hcHAvdGVtcGxhdGVzL3BvcHVwLnB1ZyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RlbXBsYXRlcy9wcmVsb2FkZXIucHVnIiwid2VicGFjazovLy8uL3NyYy9hcHAvdG9vbHMva2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb21pc2lmaWVkLWRvbS1ldmVudHMvZGlzdC9wcm9taXNpZmllZERvbUV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL3RlbXBsYXRlcy91c2Vyc0xpc3QucHVnIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU2ZWMwMGIxNDlkMjNhNTRhMGZjIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVnX2hhc19vd25fcHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBwdWdfbWVyZ2U7XG5mdW5jdGlvbiBwdWdfbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IHB1Z19tZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSA9PT0gJ2NsYXNzJykge1xuICAgICAgdmFyIHZhbEEgPSBhW2tleV0gfHwgW107XG4gICAgICBhW2tleV0gPSAoQXJyYXkuaXNBcnJheSh2YWxBKSA/IHZhbEEgOiBbdmFsQV0pLmNvbmNhdChiW2tleV0gfHwgW10pO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICB2YXIgdmFsQSA9IHB1Z19zdHlsZShhW2tleV0pO1xuICAgICAgdmFyIHZhbEIgPSBwdWdfc3R5bGUoYltrZXldKTtcbiAgICAgIGFba2V5XSA9IHZhbEEgKyB2YWxCO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXksIG9iamVjdCwgb3Igc3RyaW5nIGFzIGEgc3RyaW5nIG9mIGNsYXNzZXMgZGVsaW1pdGVkIGJ5IGEgc3BhY2UuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gYXJyYXksIGFsbCBtZW1iZXJzIG9mIGl0IGFuZCBpdHMgc3ViYXJyYXlzIGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBJZiBgZXNjYXBpbmdgIGlzIGFuIGFycmF5LCB0aGVuIHdoZXRoZXIgb3Igbm90IHRoZSBpdGVtIGluIGB2YWxgIGlzXG4gKiBlc2NhcGVkIGRlcGVuZHMgb24gdGhlIGNvcnJlc3BvbmRpbmcgaXRlbSBpbiBgZXNjYXBpbmdgLiBJZiBgZXNjYXBpbmdgIGlzXG4gKiBub3QgYW4gYXJyYXksIG5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogSWYgYHZhbGAgaXMgYW4gb2JqZWN0LCBhbGwgdGhlIGtleXMgd2hvc2UgdmFsdWUgaXMgdHJ1dGh5IGFyZSBjb3VudGVkIGFzXG4gKiBjbGFzc2VzLiBObyBlc2NhcGluZyBpcyBkb25lLlxuICpcbiAqIElmIGB2YWxgIGlzIGEgc3RyaW5nLCBpdCBpcyBjb3VudGVkIGFzIGEgY2xhc3MuIE5vIGVzY2FwaW5nIGlzIGRvbmUuXG4gKlxuICogQHBhcmFtIHsoQXJyYXkuPHN0cmluZz58T2JqZWN0LjxzdHJpbmcsIGJvb2xlYW4+fHN0cmluZyl9IHZhbFxuICogQHBhcmFtIHs/QXJyYXkuPHN0cmluZz59IGVzY2FwaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xhc3NlcyA9IHB1Z19jbGFzc2VzO1xuZnVuY3Rpb24gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZykge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgY2xhc3NOYW1lLCBwYWRkaW5nID0gJycsIGVzY2FwZUVuYWJsZWQgPSBBcnJheS5pc0FycmF5KGVzY2FwaW5nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICBjbGFzc05hbWUgPSBwdWdfY2xhc3Nlcyh2YWxbaV0pO1xuICAgIGlmICghY2xhc3NOYW1lKSBjb250aW51ZTtcbiAgICBlc2NhcGVFbmFibGVkICYmIGVzY2FwaW5nW2ldICYmIChjbGFzc05hbWUgPSBwdWdfZXNjYXBlKGNsYXNzTmFtZSkpO1xuICAgIGNsYXNzU3RyaW5nID0gY2xhc3NTdHJpbmcgKyBwYWRkaW5nICsgY2xhc3NOYW1lO1xuICAgIHBhZGRpbmcgPSAnICc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzU3RyaW5nO1xufVxuZnVuY3Rpb24gcHVnX2NsYXNzZXNfb2JqZWN0KHZhbCkge1xuICB2YXIgY2xhc3NTdHJpbmcgPSAnJywgcGFkZGluZyA9ICcnO1xuICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XG4gICAgaWYgKGtleSAmJiB2YWxba2V5XSAmJiBwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSkge1xuICAgICAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyArIHBhZGRpbmcgKyBrZXk7XG4gICAgICBwYWRkaW5nID0gJyAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NTdHJpbmc7XG59XG5mdW5jdGlvbiBwdWdfY2xhc3Nlcyh2YWwsIGVzY2FwaW5nKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gcHVnX2NsYXNzZXNfYXJyYXkodmFsLCBlc2NhcGluZyk7XG4gIH0gZWxzZSBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHB1Z19jbGFzc2VzX29iamVjdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgfHwgJyc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IG9iamVjdCBvciBzdHJpbmcgdG8gYSBzdHJpbmcgb2YgQ1NTIHN0eWxlcyBkZWxpbWl0ZWQgYnkgYSBzZW1pY29sb24uXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0LjxzdHJpbmcsIHN0cmluZz58c3RyaW5nKX0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZXhwb3J0cy5zdHlsZSA9IHB1Z19zdHlsZTtcbmZ1bmN0aW9uIHB1Z19zdHlsZSh2YWwpIHtcbiAgaWYgKCF2YWwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIHN0eWxlIGluIHZhbCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmIChwdWdfaGFzX293bl9wcm9wZXJ0eS5jYWxsKHZhbCwgc3R5bGUpKSB7XG4gICAgICAgIG91dCA9IG91dCArIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXSArICc7JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfSBlbHNlIHtcbiAgICB2YWwgKz0gJyc7XG4gICAgaWYgKHZhbFt2YWwubGVuZ3RoIC0gMV0gIT09ICc7JykgXG4gICAgICByZXR1cm4gdmFsICsgJzsnO1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IHB1Z19hdHRyO1xuZnVuY3Rpb24gcHVnX2F0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmICh2YWwgPT09IGZhbHNlIHx8IHZhbCA9PSBudWxsIHx8ICF2YWwgJiYgKGtleSA9PT0gJ2NsYXNzJyB8fCBrZXkgPT09ICdzdHlsZScpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbC50b0pTT04gPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YWwgPSB2YWwudG9KU09OKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICBpZiAoIWVzY2FwZWQgJiYgdmFsLmluZGV4T2YoJ1wiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cXCcnICsgdmFsLnJlcGxhY2UoLycvZywgJyYjMzk7JykgKyAnXFwnJztcbiAgICB9XG4gIH1cbiAgaWYgKGVzY2FwZWQpIHZhbCA9IHB1Z19lc2NhcGUodmFsKTtcbiAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gdGVyc2Ugd2hldGhlciB0byB1c2UgSFRNTDUgdGVyc2UgYm9vbGVhbiBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBwdWdfYXR0cnM7XG5mdW5jdGlvbiBwdWdfYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBhdHRycyA9ICcnO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAocHVnX2hhc19vd25fcHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfY2xhc3Nlcyh2YWwpO1xuICAgICAgICBhdHRycyA9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpICsgYXR0cnM7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCdzdHlsZScgPT09IGtleSkge1xuICAgICAgICB2YWwgPSBwdWdfc3R5bGUodmFsKTtcbiAgICAgIH1cbiAgICAgIGF0dHJzICs9IHB1Z19hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRycztcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgcHVnX21hdGNoX2h0bWwgPSAvW1wiJjw+XS87XG5leHBvcnRzLmVzY2FwZSA9IHB1Z19lc2NhcGU7XG5mdW5jdGlvbiBwdWdfZXNjYXBlKF9odG1sKXtcbiAgdmFyIGh0bWwgPSAnJyArIF9odG1sO1xuICB2YXIgcmVnZXhSZXN1bHQgPSBwdWdfbWF0Y2hfaHRtbC5leGVjKGh0bWwpO1xuICBpZiAoIXJlZ2V4UmVzdWx0KSByZXR1cm4gX2h0bWw7XG5cbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgaSwgbGFzdEluZGV4LCBlc2NhcGU7XG4gIGZvciAoaSA9IHJlZ2V4UmVzdWx0LmluZGV4LCBsYXN0SW5kZXggPSAwOyBpIDwgaHRtbC5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAoaHRtbC5jaGFyQ29kZUF0KGkpKSB7XG4gICAgICBjYXNlIDM0OiBlc2NhcGUgPSAnJnF1b3Q7JzsgYnJlYWs7XG4gICAgICBjYXNlIDM4OiBlc2NhcGUgPSAnJmFtcDsnOyBicmVhaztcbiAgICAgIGNhc2UgNjA6IGVzY2FwZSA9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlIDYyOiBlc2NhcGUgPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdDogY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYXN0SW5kZXggIT09IGkpIHJlc3VsdCArPSBodG1sLnN1YnN0cmluZyhsYXN0SW5kZXgsIGkpO1xuICAgIGxhc3RJbmRleCA9IGkgKyAxO1xuICAgIHJlc3VsdCArPSBlc2NhcGU7XG4gIH1cbiAgaWYgKGxhc3RJbmRleCAhPT0gaSkgcmV0dXJuIHJlc3VsdCArIGh0bWwuc3Vic3RyaW5nKGxhc3RJbmRleCwgaSk7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgcHVnIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIG9yaWdpbmFsIHNvdXJjZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gcHVnX3JldGhyb3c7XG5mdW5jdGlvbiBwdWdfcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcHVnX3JldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdQdWcnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBlbGVtRnJvbVN0cmluZyBmcm9tICcuLi90b29scy9lbGVtRnJvbVN0cmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50T3B0aW9uczxUPiB7XG5cdHRlbXBsYXRlOiAodGVtcGxhdGVQYXJhbXM/Om9iamVjdCkgPT4gVDtcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBjbGFzcyB3aXRoIGJhc2ljIGNhcGFiaWxpdGllc1xuICovXG5jbGFzcyBDb21wb25lbnQ8TyBleHRlbmRzIENvbXBvbmVudE9wdGlvbnM8YW55Pj4ge1xuXHRwcm90ZWN0ZWQgb3B0aW9uczogTztcblxuXHRjb25zdHJ1Y3RvciAob3B0aW9uczpPKSB7XG5cdFx0dGhpcy5vcHRpb25zID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24odGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge099XG5cdCAqL1xuXHRwcm90ZWN0ZWQgZ2V0IGRlZmF1bHRPcHRpb25zICgpOk8ge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0ZW1wbGF0ZTogKCkgPT4ge31cblx0XHR9IGFzIE87XG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVuZGVyICh0ZW1wbGF0ZVBhcmFtcz86b2JqZWN0KTpFbGVtZW50IHtcblx0XHRyZXR1cm4gZWxlbUZyb21TdHJpbmcodGhpcy5vcHRpb25zLnRlbXBsYXRlKHRlbXBsYXRlUGFyYW1zKSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL0NvbXBvbmVudC50cyIsImltcG9ydCB7cmVhZHl9IGZyb20gJ3Byb21pc2lmaWVkLWRvbS1ldmVudHMnO1xuXG5pbXBvcnQgJy4vYXBwLnN0eWwnO1xuaW1wb3J0IEZvcm0sIHtGb3JtSW5mb30gZnJvbSAnLi9jb21wb25lbnRzL0Zvcm0nO1xuaW1wb3J0IFBvcHVwIGZyb20gJy4vY29tcG9uZW50cy9Qb3B1cCc7XG5cbmNvbnN0IGVkaXRVc2VyRm9ybVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZWRpdFVzZXJGb3JtLnB1ZycpO1xuY29uc3QgcG9wdXBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3BvcHVwLnB1ZycpO1xuY29uc3QgdXNlcnNMaXN0VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy91c2Vyc0xpc3QucHVnJyk7XG5cbmNvbnN0IGNsaWNrSGFuZGxlcnMgPSB7XG5cdCdqcy11c2Vycy1saXN0LW5leHQnOiAoZTpNb3VzZUV2ZW50LCB0YXJnZXQ6SFRNTEVsZW1lbnQpOnZvaWQgPT4ge1xuXHRcdGRyYXdVc2Vyc0xpc3QodGFyZ2V0LmRhdGFzZXQudXJsIHx8ICcnKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0sXG5cdCdqcy11c2Vycy1saXN0LXVzZXInOiAoZTpNb3VzZUV2ZW50LCB0YXJnZXQ6SFRNTEVsZW1lbnQpOnZvaWQgPT4ge1xuXHRcdGVkaXRVc2VyKHRhcmdldC5kYXRhc2V0LmlkIHx8ICcnKTtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH1cbn07XG5cbmxldCBhcHBDb250OkhUTUxFbGVtZW50O1xud2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4vLyBFbnRyeSBwb2ludFxucmVhZHkudGhlbigoKSA9PiB7XG5cdGFwcENvbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwJykgYXMgSFRNTEVsZW1lbnQ7XG5cblx0aWYgKCFhcHBDb250KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdBcHAgcm9vdCBjb250YWluZXIgaXMgcmVxdWlyZWQnKTtcblx0fVxuXG5cdC8vIGhhbmRsZSBhbGwgY2xpY2tzIGluIGFwcCB3aXRoIG9uZSBoYW5kbGVyXG5cdGFwcENvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTpNb3VzZUV2ZW50KTp2b2lkID0+IHtcblx0XHRjb25zdCBoYW5kbGVycyA9IE9iamVjdC5rZXlzKGNsaWNrSGFuZGxlcnMpO1xuXHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuXHRcdGRvIHtcblx0XHRcdGhhbmRsZXJzLmZvckVhY2goKGNsYXNzTmFtZTpzdHJpbmcpID0+IHtcblx0XHRcdFx0aWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuXHRcdFx0XHRcdGNsaWNrSGFuZGxlcnNbY2xhc3NOYW1lXShlLCB0YXJnZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXHRcdH0gd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IGFwcENvbnQpO1xuXHR9KTtcblxuXHRwYXVzZSgxMDAwKS50aGVuKCgpID0+IGRyYXdVc2Vyc0xpc3QoJy9hcGkvdXNlcnMvJykpO1xufSk7XG5cbi8qKlxuICogTG9hZHMgYW5kIHNob3dzIGEgdXNlcnMgbGlzdFxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICovXG5mdW5jdGlvbiBkcmF3VXNlcnNMaXN0ICh1cmw6c3RyaW5nKTp2b2lkIHtcblx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRmZXRjaCh1cmwpXG5cdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdC50aGVuKGpzb24gPT4gdXNlcnNMaXN0VGVtcGxhdGUoanNvbikpXG5cdFx0LnRoZW4oaHRtbCA9PiBhcHBDb250LmlubmVySFRNTCA9IGh0bWwpXG5cdFx0LmNhdGNoKGxvZ0Vycm9yKTtcbn1cblxuLyoqXG4gKiBMb2FkcyB1c2VyJ3MgZGF0YSBhbmQgc2hvd3MgYSBmb3JtXG4gKi9cbmZ1bmN0aW9uIGVkaXRVc2VyIChpZDpzdHJpbmcpOnZvaWQge1xuXHRjb25zdCBwb3B1cCA9IG5ldyBQb3B1cCh7IHRlbXBsYXRlOiBwb3B1cFRlbXBsYXRlIH0pO1xuXHRjb25zdCBmb3JtUHJvbWlzZSA9IGZldGNoKGAvYXBpL3VzZXIvJHtpZH0vYClcblx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0Ly8gaW1pdGF0aW9uIGZvciBhIHNsb3cgbmV0d29yayB0byBsZXQgeW91IHNlZSBhIHByZWxvYWRlclxuXHRcdC50aGVuKGpzb24gPT4gcGF1c2UoNTAwKS50aGVuKCgpID0+IGpzb24pKVxuXHRcdC50aGVuKGpzb24gPT4ge1xuXHRcdFx0Y29uc3QgdXNlckZvcm0gPSBuZXcgRm9ybSh7XG5cdFx0XHRcdG9uU3VibWl0OiBmb3JtRGF0YSA9PiB7XG5cdFx0XHRcdFx0c2F2ZVVzZXIoZm9ybURhdGEpLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0dXNlckZvcm0uZGVzdHJveSgpO1xuXHRcdFx0XHRcdFx0XHRwb3B1cC5kZXN0cm95KCk7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVVzZXIocmVzcG9uc2UudXNlcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRlbXBsYXRlOiBlZGl0VXNlckZvcm1UZW1wbGF0ZVxuXHRcdFx0fSwge1xuXHRcdFx0XHRhY3Rpb246IGAvYXBpL3VzZXJzLyR7aWR9L2AsXG5cdFx0XHRcdHVzZXI6IGpzb25cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHVzZXJGb3JtLmVsZW1lbnQ7XG5cdFx0fSk7XG5cdHBvcHVwLnNob3coZm9ybVByb21pc2UpO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdXNlciBpcyBhIGxpc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB1c2VyXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVVzZXIgKHVzZXIpIHtcblx0Y29uc3QgeyBpZCwgbmFtZSB9ID0gdXNlcjtcblx0Y29uc3QgdXNlckVsZW0gPSBhcHBDb250LnF1ZXJ5U2VsZWN0b3IoYC5qcy11c2Vycy1saXN0LXVzZXJbZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG5cdGlmICh1c2VyRWxlbSkge1xuXHRcdCh1c2VyRWxlbS5xdWVyeVNlbGVjdG9yKCcudXNlcl9fbmFtZScpIGFzIEhUTUxFbGVtZW50KS50ZXh0Q29udGVudCA9IG5hbWU7XG5cdFx0dXNlckVsZW0uY2xhc3NMaXN0LmFkZCgndXNlcl91cGRhdGVkJyk7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB1c2VyRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCd1c2VyX3VwZGF0ZWQnKSwgMTEwMCk7XG5cdH1cbn1cblxuLyoqXG4gKiBTYXZlcyB1c2VyJ3MgZGF0YSB0byBhIHNlcnZlclxuICogQHBhcmFtIHtGb3JtRGF0YX0gZm9ybURhdGFcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5mdW5jdGlvbiBzYXZlVXNlciAoZm9ybURhdGE6Rm9ybUluZm8pOlByb21pc2U8YW55PiB7XG5cdGNvbnN0IHsgYWN0aW9uLCBtZXRob2QsIGJvZHkgfSA9IGZvcm1EYXRhO1xuXHRyZXR1cm4gZmV0Y2goYWN0aW9uLCB7IG1ldGhvZCwgYm9keSB9KVxuXHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gYSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIGFmdGVyIGRlbGF5XG4gKi9cbmZ1bmN0aW9uIHBhdXNlIChkZWxheSk6UHJvbWlzZTx2b2lkPiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRzZXRUaW1lb3V0KHJlc29sdmUsIGRlbGF5KTtcblx0fSk7XG59XG5cbi8qKlxuICogU2ltcGxlIGVycm9yIGhhbmRsZXJcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICovXG5mdW5jdGlvbiBsb2dFcnJvciAoZXJyOkVycm9yKSB7XG5cdGNvbnNvbGUuZXJyb3IoZXJyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvYXBwLnRzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9hcHAvYXBwLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybU9wdGlvbnMge1xuXHRvblN1Ym1pdD86IChmb3JtRGF0YTpGb3JtSW5mbykgPT4gdm9pZDtcblx0dGVtcGxhdGU6ICh0ZW1wbGF0ZURhdGE/Om9iamVjdCkgPT4gc3RyaW5nO1xuXHRzaG91bGRQcmV2ZW50RGVmYXVsdFN1Ym1pdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybUluZm8ge1xuXHRhY3Rpb246IHN0cmluZztcblx0bWV0aG9kOiBzdHJpbmc7XG5cdGJvZHk6IEZvcm1EYXRhO1xufVxuXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50PEZvcm1PcHRpb25zPiB7XG5cdHByaXZhdGUgZm9ybTpIVE1MRm9ybUVsZW1lbnQ7XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgZm9ybSBjb250cm9sbGVyXG5cdCAqIEBwYXJhbSB7Rm9ybU9wdGlvbnN9IG9wdGlvbnNcblx0ICogQHBhcmFtIHsqfSB0ZW1wbGF0ZVBhcmFtc1xuXHQgKi9cblx0Y29uc3RydWN0b3IgKG9wdGlvbnM6Rm9ybU9wdGlvbnMsIHRlbXBsYXRlUGFyYW1zPzpvYmplY3QpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRcblx0XHR0aGlzLnN1Ym1pdEhhbmRsZXIgPSB0aGlzLnN1Ym1pdEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmZvcm0gPSB0aGlzLnJlbmRlcih0ZW1wbGF0ZVBhcmFtcykgYXMgSFRNTEZvcm1FbGVtZW50O1xuXHRcdGlmICghdGhpcy5mb3JtIHx8IHRoaXMuZm9ybS50YWdOYW1lICE9PSAnRk9STScpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignVGVtcGxhdGUgc2hvdWxkIGNyZWF0ZSBhIGZvcm0gZWxlbWVudCcpO1xuXHRcdH1cblx0XHR0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7SFRNTEZvcm1FbGVtZW50fVxuXHQgKi9cblx0cHVibGljIGdldCBlbGVtZW50ICgpOkhUTUxGb3JtRWxlbWVudCB7XG5cdFx0cmV0dXJuIHRoaXMuZm9ybTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBhbmQgbGlua3MgdG8gb2JqZWN0c1xuXHQgKi9cblx0cHVibGljIGRlc3Ryb3kgKCk6dm9pZCB7XG5cdFx0dGhpcy5mb3JtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcik7XG5cdFx0ZGVsZXRlIHRoaXMuZm9ybTtcblx0XHRkZWxldGUgdGhpcy5vcHRpb25zO1xuXHR9XG5cblx0cHJvdGVjdGVkIGdldCBkZWZhdWx0T3B0aW9ucyAoKTpGb3JtT3B0aW9ucyB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNob3VsZFByZXZlbnREZWZhdWx0U3VibWl0OiB0cnVlLFxuXHRcdFx0dGVtcGxhdGU6ICgpID0+IHt0aHJvdyBuZXcgRXJyb3IoJ1RlbXBsYXRlIGZ1bmN0aW9uIGlzIHJlcXVpcmVkJyk7fVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge29iamVjdH0gZm9ybURhdGEgYXMgYSBwbGFuZSBvYmplY3Rcblx0ICovXG5cdHByaXZhdGUgZ2V0IGZvcm1EYXRhICgpIHtcblx0XHRjb25zdCBmb3JtID0gdGhpcy5mb3JtO1xuXHRcdHJldHVybiAoPGFueT5BcnJheSkuZnJvbShmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lXScpKVxuXHRcdFx0LnJlZHVjZSgoYWNjOkZvcm1JbmZvLCBlbGVtOkhUTUxJbnB1dEVsZW1lbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZWxlbTtcblx0XHRcdFx0aWYgKG5hbWUgJiYgdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdGFjYy5ib2R5LmFwcGVuZChuYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGFjYztcblx0XHRcdH0sIHtcblx0XHRcdFx0YWN0aW9uOiBmb3JtLmFjdGlvbixcblx0XHRcdFx0bWV0aG9kOiBmb3JtLm1ldGhvZCxcblx0XHRcdFx0Ym9keTogbmV3IEZvcm1EYXRhKClcblx0XHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3RlbnMgdG8gc3VibWl0XG5cdCAqIEBwYXJhbSB7RXZlbnR9IGVcblx0ICovXG5cdHByaXZhdGUgc3VibWl0SGFuZGxlciAoZTpFdmVudCk6dm9pZCB7XG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zaG91bGRQcmV2ZW50RGVmYXVsdFN1Ym1pdCkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5vblN1Ym1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5vcHRpb25zLm9uU3VibWl0KHRoaXMuZm9ybURhdGEpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9jb21wb25lbnRzL0Zvcm0udHMiLCJjb25zdCBlbGVtRnJvbVN0cmluZyA9IChodG1sOnN0cmluZyk6RWxlbWVudCA9PiB7XG5cdGNvbnN0IHRlbXBXcmFwcGVyOkhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdHRlbXBXcmFwcGVyLmlubmVySFRNTCA9IGh0bWw7XG5cdHJldHVybiB0ZW1wV3JhcHBlci5jaGlsZHJlblswXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVsZW1Gcm9tU3RyaW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC90b29scy9lbGVtRnJvbVN0cmluZy50cyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4uL3Rvb2xzL2tleWJvYXJkJztcblxubGV0IGh0bWw6SFRNTEh0bWxFbGVtZW50O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvcHVwT3B0aW9ucyB7XG5cdC8vIGNzcyBjbGFzcyBvZiBcImNsb3NlXCIgYnV0dG9uc1xuXHRjc3NNb2RDbG9zZT86IHN0cmluZztcblx0Ly8gYSBsaXN0IG9mIGNzcyBjbGFzc2VzIHdoaWNoIHNvdWxkIGJlIGlnbm9yZWQgb24gXCJjbG9zZVwiIGNsaWNrXG5cdGNzc01vZENsb3NlSWdub3JlPzogc3RyaW5nW107XG5cdC8vIGNzcyBtb2RpZmljYXRvciBmb3IgZG9jdW1lbnQuaHRtbCB3aGVuIHBvcHVwIGlzIGFjdGl2ZVxuXHRjc3NNb2RIdG1sRnJpemVkPzogc3RyaW5nO1xuXHQvLyBjc3MgbW9kaWZpY2F0b3IgZm9yIHRoaXMucG9wdXAgdG8gc2hvdyBsb2FkaW5nXG5cdGNzc01vZExvYWRpbmc/OiBzdHJpbmc7XG5cdC8vIGNzcyBtb2RpZmljYXRvciBmb3IgdGhpcy5wb3B1cCB0byBzaG93IHBvcHVwXG5cdGNzc01vZFZpc2libGU/OiBzdHJpbmc7XG5cdC8vIHNlbGVjdG9yIG9mIGEgY29udGFpbmVyIG9mIHBvcHVwJ3MgY29udGVudFxuXHRjc3NTZWxDb250YWluZXI/OiBzdHJpbmc7XG5cdC8vIGEgdGVtcGxhdGUgd2hpY2ggcmV0dXJucyBwb3B1cCdzIGh0bWwgbWFya3VwXG5cdHRlbXBsYXRlOiAoKSA9PiBzdHJpbmdcbn1cblxuY2xhc3MgUG9wdXAgZXh0ZW5kcyBDb21wb25lbnQ8UG9wdXBPcHRpb25zPiB7XG5cdHByaXZhdGUgX2NvbnRhaW5lcjpIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBwb3B1cDpIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciAob3B0aW9uczpQb3B1cE9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdGlmICghaHRtbCkge1xuXHRcdFx0aHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSBhcyBIVE1MSHRtbEVsZW1lbnQ7XG5cdFx0fVxuXG5cdFx0dGhpcy5wb3B1cCA9IHRoaXMucmVuZGVyKCkgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnBvcHVwKTtcblxuXHRcdHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub25DbG9zZUNsaWNrID0gdGhpcy5vbkNsb3NlQ2xpY2suYmluZCh0aGlzKTtcblxuXHRcdC8vIExpc3RlbiB0byBldmVudHNcblx0XHRpZiAodGhpcy5vcHRpb25zLmNzc01vZENsb3NlKSB7XG5cdFx0XHR0aGlzLnBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsb3NlQ2xpY2spXG5cdFx0fVxuXHRcdHRvZ2dsZUVzY2FwZUJ1dHRvblN1YnNjcmlwdGlvbi5jYWxsKHRoaXMsIHRydWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYWxsIGNvbnRlbnQgZnJvbSBwb3B1cFxuXHQgKiBAcmV0dXJucyB7UG9wdXB9XG5cdCAqL1xuXHRwdWJsaWMgY2xlYXIgKCk6UG9wdXAge1xuXHRcdHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgYW5kIHBvcHVwIGl0c2VsZlxuXHQgKi9cblx0cHVibGljIGRlc3Ryb3kgKCkge1xuXHRcdGNvbnN0IHBvcHVwID0gdGhpcy5wb3B1cDtcblx0XHRjb25zdCBwb3B1cFBhcmVudCA9IHBvcHVwLnBhcmVudEVsZW1lbnQ7XG5cdFx0dGhpcy5jbGVhcigpLmhpZGUoKTtcblx0XHRkZWxldGUgdGhpcy5wb3B1cDtcblx0XHRwb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbG9zZUNsaWNrKTtcblx0XHRpZiAocG9wdXBQYXJlbnQpIHtcblx0XHRcdHBvcHVwUGFyZW50LnJlbW92ZUNoaWxkKHBvcHVwKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGlkZXMgcG9wdXBcblx0ICovXG5cdHB1YmxpYyBoaWRlICgpOlBvcHVwIHtcblx0XHRjb25zdCB7IGNzc01vZEh0bWxGcml6ZWQsIGNzc01vZFZpc2libGUgfSA9IHRoaXMub3B0aW9ucztcblx0XHR0b2dnbGVFc2NhcGVCdXR0b25TdWJzY3JpcHRpb24uY2FsbCh0aGlzLCBmYWxzZSk7XG5cdFx0Y3NzTW9kVmlzaWJsZSAmJiB0aGlzLnBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoY3NzTW9kVmlzaWJsZSk7XG5cdFx0Y3NzTW9kSHRtbEZyaXplZCAmJiBodG1sLmNsYXNzTGlzdC5yZW1vdmUoY3NzTW9kSHRtbEZyaXplZCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKipcblx0ICogU2hvd3MgcGFzc2VkIGVsZW1lbnQgaW4gYW4gcG9wdXAgb3IganVzdCBwb3B1cFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFByb21pc2U8SFRNTEVsZW1lbnQ+fSBlbGVtZW50XG5cdCAqL1xuXHRwdWJsaWMgc2hvdyAoZWxlbWVudDpIVE1MRWxlbWVudHxQcm9taXNlPEhUTUxFbGVtZW50Pik6UG9wdXAge1xuXHRcdGNvbnN0IHsgY3NzTW9kSHRtbEZyaXplZCwgY3NzTW9kVmlzaWJsZSB9ID0gdGhpcy5vcHRpb25zO1xuXHRcdGlmIChlbGVtZW50KSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUxvYWRpbmcodHJ1ZSk7XG5cdFx0XHRQcm9taXNlLnJlc29sdmUoZWxlbWVudCkudGhlbihlbGVtZW50ID0+IHtcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xuXHRcdFx0XHR0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcblx0XHRcdFx0dGhpcy50b2dnbGVMb2FkaW5nKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0b2dnbGVFc2NhcGVCdXR0b25TdWJzY3JpcHRpb24uY2FsbCh0aGlzLCB0cnVlKTtcblx0XHRjc3NNb2RWaXNpYmxlICYmIHRoaXMucG9wdXAuY2xhc3NMaXN0LmFkZChjc3NNb2RWaXNpYmxlKTtcblx0XHRjc3NNb2RIdG1sRnJpemVkICYmIGh0bWwuY2xhc3NMaXN0LmFkZChjc3NNb2RIdG1sRnJpemVkKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUb2dnbGVzIHByZWxvYWRlclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFNob3dMb2FkaW5nXG5cdCAqIEByZXR1cm5zIHtQb3B1cH1cblx0ICovXG5cdHB1YmxpYyB0b2dnbGVMb2FkaW5nIChzaG91bGRTaG93TG9hZGluZzpib29sZWFuKTpQb3B1cCB7XG5cdFx0Y29uc3QgbG9hZGluZ01vZCA9IHRoaXMub3B0aW9ucy5jc3NNb2RMb2FkaW5nO1xuXHRcdGlmIChsb2FkaW5nTW9kKSB7XG5cdFx0XHR0aGlzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUobG9hZGluZ01vZCwgc2hvdWxkU2hvd0xvYWRpbmcpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYSBwb3B1cCBpcyB2aXNpYmxlXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0cHVibGljIGdldCB2aXNpYmxlICgpOmJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLnBvcHVwLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLm9wdGlvbnMuY3NzTW9kVmlzaWJsZSB8fCAnJyk7XG5cdH1cblxuXHRwcml2YXRlIGdldCBjb250YWluZXIgKCk6SFRNTEVsZW1lbnQge1xuXHRcdGNvbnN0IGNzc1NlbCA9IHRoaXMub3B0aW9ucy5jc3NTZWxDb250YWluZXI7XG5cdFx0aWYgKCF0aGlzLl9jb250YWluZXIgJiYgY3NzU2VsKSB7XG5cdFx0XHRjb25zdCBjb250YWluZXIgPSB0aGlzLnBvcHVwLnF1ZXJ5U2VsZWN0b3IoY3NzU2VsKSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcblx0ICovXG5cdHByaXZhdGUgb25DbG9zZUNsaWNrIChlOk1vdXNlRXZlbnQpOnZvaWQge1xuXHRcdGNvbnN0IHsgY3NzTW9kQ2xvc2UsIGNzc01vZENsb3NlSWdub3JlID0gW119ID0gdGhpcy5vcHRpb25zO1xuXHRcdGxldCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cdFx0bGV0IHNob3VsZENsb3NlID0gZmFsc2U7XG5cblx0XHRkbyB7XG5cdFx0XHRsZXQgY2xhc3NMaXN0ID0gdGFyZ2V0LmNsYXNzTGlzdDtcblx0XHRcdGlmIChjbGFzc0xpc3QuY29udGFpbnMoY3NzTW9kQ2xvc2UgYXMgc3RyaW5nKSkge1xuXHRcdFx0XHRzaG91bGRDbG9zZSA9IHRydWU7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHNob3VsZElnbm9yZSA9IGNzc01vZENsb3NlSWdub3JlLnNvbWUoY2xhc3NOYW1lID0+IGNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKTtcblx0XHRcdGlmIChzaG91bGRJZ25vcmUpIHtcblx0XHRcdFx0Ly8gSWYgdGFyZ2V0IGlzIGluIGlnbm9yZWQgY29udGFpbmVyIHdlIHNob3VsZCBzdG9wIGNoZWNraW5nc1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXHRcdH0gd2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IHRoaXMucG9wdXApO1xuXG5cdFx0aWYgKHNob3VsZENsb3NlKSB7XG5cdFx0XHR0aGlzLmhpZGUoKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0IGRlZmF1bHRPcHRpb25zICgpOlBvcHVwT3B0aW9ucyB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNzc01vZENsb3NlOiAnanMtb3ZlcmxheS1jbG9zZScsXG5cdFx0XHRjc3NNb2RDbG9zZUlnbm9yZTogWydvdmVybGF5X19ib3gnXSxcblx0XHRcdGNzc01vZEh0bWxGcml6ZWQ6ICdmcml6ZWQnLFxuXHRcdFx0Y3NzTW9kTG9hZGluZzogJ292ZXJsYXlfbG9hZGluZycsXG5cdFx0XHRjc3NNb2RWaXNpYmxlOiAnb3ZlcmxheV92aXNpYmxlJyxcblx0XHRcdGNzc1NlbENvbnRhaW5lcjogJy5qcy1vdmVybGF5LWNvbnRlbnQnLFxuXHRcdFx0dGVtcGxhdGU6ICgpID0+IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdUZW1wbGF0ZSBpcyByZXF1aXJlZCcpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn1cblxuLyoqXG4gKiBAdGhpcyB7UG9wdXB9XG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFN1YnNjcmliZVxuICovXG5mdW5jdGlvbiB0b2dnbGVFc2NhcGVCdXR0b25TdWJzY3JpcHRpb24gKHNob3VsZFN1YnNjcmliZTpib29sZWFuKTp2b2lkIHtcblx0a2V5Ym9hcmQuc3Vic2NyaWJlKHRoaXMuaGlkZSwge2tleUNvZGU6IDI3LCBldmVudE5hbWU6ICdrZXlkb3duJ30pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBQb3B1cDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvY29tcG9uZW50cy9Qb3B1cC50cyIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwOzt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChhY3Rpb24sIG1ldGhvZCwgdXNlcikge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0Nmb3JtXCIgKyAoXCIgY2xhc3M9XFxcImVkaXQtdXNlclxcXCJcIitwdWcuYXR0cihcImFjdGlvblwiLCBhY3Rpb24sIHRydWUsIHRydWUpK3B1Zy5hdHRyKFwibWV0aG9kXCIsIChtZXRob2QgfHwgJ1BPU1QnKSwgdHJ1ZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ2ltZ1wiICsgKFwiIGNsYXNzPVxcXCJlZGl0LXVzZXJfX3Bob3RvXFxcIlwiK3B1Zy5hdHRyKFwic3JjXCIsIHVzZXIuYXZhdGFyVXJsLCB0cnVlLCB0cnVlKStwdWcuYXR0cihcImFsdFwiLCB1c2VyLm5hbWUsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NpbnB1dFwiICsgKFwiIG5hbWU9XFxcImF2YXRhclVybFxcXCIgdHlwZT1cXFwiaGlkZGVuXFxcIlwiK3B1Zy5hdHRyKFwidmFsdWVcIiwgdXNlci5hdmF0YXJVcmwsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImZvcm0tZmllbGRcXFwiXFx1MDAzRVxcdTAwM0NsYWJlbCBjbGFzcz1cXFwiZm9ybS1maWVsZF9fbGFiZWxcXFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcImZvcm0tZmllbGRfX2xhYmVsX190ZXh0XFxcIlxcdTAwM0VOYW1lKlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NpbnB1dFwiICsgKFwiIGNsYXNzPVxcXCJmb3JtLWZpZWxkX19pbnB1dFxcXCJcIitcIiBuYW1lPVxcXCJuYW1lXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIlwiK3B1Zy5hdHRyKFwidmFsdWVcIiwgdXNlci5uYW1lLCB0cnVlLCB0cnVlKStcIiByZXF1aXJlZD1cXFwicmVxdWlyZWRcXFwiIHBsYWNlaG9sZGVyPVxcXCJKb2huIERvZVxcXCJcIikgKyBcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmxhYmVsXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NidXR0b24gY2xhc3M9XFxcImZvcm0tYnV0dG9uXFxcIlxcdTAwM0VzYXZlXFx1MDAzQ1xcdTAwMkZidXR0b25cXHUwMDNFXFx1MDAzQ1xcdTAwMkZmb3JtXFx1MDAzRVwiO30uY2FsbCh0aGlzLFwiYWN0aW9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5hY3Rpb246dHlwZW9mIGFjdGlvbiE9PVwidW5kZWZpbmVkXCI/YWN0aW9uOnVuZGVmaW5lZCxcIm1ldGhvZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubWV0aG9kOnR5cGVvZiBtZXRob2QhPT1cInVuZGVmaW5lZFwiP21ldGhvZDp1bmRlZmluZWQsXCJ1c2VyXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2VyOnR5cGVvZiB1c2VyIT09XCJ1bmRlZmluZWRcIj91c2VyOnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL3RlbXBsYXRlcy9lZGl0VXNlckZvcm0ucHVnXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGZzIChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcHVnID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcHVnLXJ1bnRpbWUvaW5kZXguanNcIik7XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge3ZhciBwdWdfaHRtbCA9IFwiXCIsIHB1Z19taXhpbnMgPSB7fSwgcHVnX2ludGVycDtwdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDc2VjdGlvbiBjbGFzcz1cXFwib3ZlcmxheSBvdmVybGF5X2xvYWRpbmcganMtb3ZlcmxheS1jbG9zZVxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwib3ZlcmxheV9fYm94XFxcIlxcdTAwM0VcXHUwMDNDc3BhbiBjbGFzcz1cXFwib3ZlcmxheV9fY2xvc2UganMtb3ZlcmxheS1jbG9zZVxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZzcGFuXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcIm92ZXJsYXlfX2JveF9fY29udGVudCBqcy1vdmVybGF5LWNvbnRlbnRcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiICsgKG51bGwgPT0gKHB1Z19pbnRlcnAgPSByZXF1aXJlKFwiLi9wcmVsb2FkZXIucHVnXCIpLmNhbGwodGhpcywgbG9jYWxzKSkgPyBcIlwiIDogcHVnX2ludGVycCkgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGc2VjdGlvblxcdTAwM0VcIjs7cmV0dXJuIHB1Z19odG1sO307XG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FwcC90ZW1wbGF0ZXMvcG9wdXAucHVnXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwdWcgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wdWctcnVudGltZS9pbmRleC5qc1wiKTtcblxuZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7dmFyIHB1Z19odG1sID0gXCJcIiwgcHVnX21peGlucyA9IHt9LCBwdWdfaW50ZXJwO3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcInByZWxvYWRlclxcXCJcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicHJlbG9hZGVyX19kb3RcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInByZWxvYWRlcl9fZG90XFxcIlxcdTAwM0VcXHUwMDNDXFx1MDAyRmRpdlxcdTAwM0VcXHUwMDNDZGl2IGNsYXNzPVxcXCJwcmVsb2FkZXJfX2RvdFxcXCJcXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ2RpdiBjbGFzcz1cXFwicHJlbG9hZGVyX19kb3RcXFwiXFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL3RlbXBsYXRlcy9wcmVsb2FkZXIucHVnXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEEgc3RvcmFnZSBvZiBhbGwgZXZlbnQgbGlzdGVuZXJzXG4gKiBAdHlwZSB7e319XG4gKi9cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuXG5jb25zdCBhbGxvd2VkRXZlbnRzID0gWydrZXlwcmVzcycsICdrZXlkb3duJywgJ2tleXVwJ107XG5cbi8qKlxuICogQWRkIGEgbmV3IGV2ZW50IGxpc3RlbmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gKi9cbmNvbnN0IGxpc3RlblRvID0gKGV2ZW50TmFtZTpzdHJpbmcpID0+IHtcblx0Y29uc3QgZXZlbnRTcGFjZSA9IGdldEV2ZW50U3BhY2UoZXZlbnROYW1lKTtcblx0aWYgKCFldmVudFNwYWNlLmlzTGlzdGVuaW5nKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XG5cdH1cbn07XG5cbi8qKlxuICogQ29tbW9uIGhhbmRsZXIgZm9yIGFsbCBrZXlib2FyZCBldmVudHNcbiAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZVxuICovXG5jb25zdCBldmVudEhhbmRsZXIgPSAoZTpLZXlib2FyZEV2ZW50KSA9PiB7XG5cdGNvbnN0IHt0eXBlLCBrZXlDb2RlfSA9IGU7XG5cdGdldEtleUxpc3RlbmVycyh0eXBlLCBrZXlDb2RlKS5mb3JFYWNoKGhhbmRsZXIgPT4gaGFuZGxlcihlKSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJ1Y3R1cmUgZm9yIGV2ZW50IG5hbWUgb3IgY3JlYXRlcyBpdCBhbmQgcmV0dXJuc1xuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuY29uc3QgZ2V0RXZlbnRTcGFjZSA9IChldmVudE5hbWU6c3RyaW5nKSA9PiB7XG5cdGlmICghbGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcblx0XHRsaXN0ZW5lcnNbZXZlbnROYW1lXSA9IHtcblx0XHRcdGlzTGlzdGVuaW5nOiBmYWxzZSxcblx0XHRcdGtleXM6IHt9XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gbGlzdGVuZXJzW2V2ZW50TmFtZV07XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdHJ1Y3R1cmUgZm9yIGtleSBvZGUgaW4gYW4gZXZlbnQgc3BhY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlDb2RlXG4gKi9cbmNvbnN0IGdldEtleUxpc3RlbmVycyA9IChldmVudE5hbWU6c3RyaW5nLCBrZXlDb2RlOm51bWJlcikgPT4ge1xuXHRjb25zdCBldmVudEtleXMgPSBnZXRFdmVudFNwYWNlKGV2ZW50TmFtZSkua2V5cztcblx0aWYgKCFldmVudEtleXNba2V5Q29kZV0pIHtcblx0XHRldmVudEtleXNba2V5Q29kZV0gPSBbXTtcblx0fVxuXHRyZXR1cm4gZXZlbnRLZXlzW2tleUNvZGVdO1xufTtcblxuLyoqXG4gKiBBZGQgbmV3IGV2ZW50IGhhbmRsZXJzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zXG4gKi9cbmV4cG9ydCBjb25zdCBzdWJzY3JpYmUgPSAoaGFuZGxlcjooKT0+YW55LCBwYXJhbXM6SGFuZGxlclBhcmFtcyk6dm9pZCA9PiB7XG5cdGNvbnN0IHtrZXlDb2RlLCBldmVudE5hbWUgPSAna2V5cHJlc3MnfSA9IHBhcmFtcztcblxuXHRpZiAoYWxsb3dlZEV2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgPT09IC0xKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgJHtldmVudE5hbWV9IGlzIG5vdCBhbGxvd2VkIGtleWJvYXJkIGV2ZW50YCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRMaXN0ZW5lcnMgPSBnZXRLZXlMaXN0ZW5lcnMoZXZlbnROYW1lLCBrZXlDb2RlKTtcblx0XG5cdC8vIFRPRE86IHdlIGNhbiB1c2UgU2V0IGhlcmUgaW5zdGVhZCBvZiBhcnJheTpcblx0aWYgKGV2ZW50TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcikgPT09IC0xKSB7XG5cdFx0ZXZlbnRMaXN0ZW5lcnMucHVzaChoYW5kbGVyKTtcblx0fVxuXHRsaXN0ZW5UbyhldmVudE5hbWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVkIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGhhbmRsZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IHVuc3Vic2NyaWJlID0gKGhhbmRsZXI6KCk9PmFueSwgcGFyYW1zOkhhbmRsZXJQYXJhbXMpOnZvaWQgPT4ge1xuXHRjb25zdCB7a2V5Q29kZSwgZXZlbnROYW1lID0gJ2tleXByZXNzJ30gPSBwYXJhbXM7XG5cdGNvbnN0IGhhbmRsZXJzID0gZ2V0S2V5TGlzdGVuZXJzKGV2ZW50TmFtZSwga2V5Q29kZSk7XG5cdGNvbnN0IGhhbmRsZXJJbmRleCA9IGhhbmRsZXJzLmZpbmRJbmRleChoYW5kbGVyKTtcblx0aWYgKGhhbmRsZXJJbmRleCAhPT0gLTEpIHtcblx0XHRoYW5kbGVycy5zcGxpY2UoaGFuZGxlckluZGV4LCAxKTtcblx0fVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBIYW5kbGVyUGFyYW1zIHtcblx0Ly8gS2V5Ym9hcmRFdmVudC5rZXlDb2RlXG5cdGtleUNvZGU6IG51bWJlcjtcblx0Ly8gS2V5Ym9hcmRFdmVudC50eXBlXG5cdGV2ZW50TmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBzdWJzY3JpYmUsIHVuc3Vic2NyaWJlIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAvdG9vbHMva2V5Ym9hcmQudHMiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBFVkVOVF9ET01fUkVBRFkgPSAnRE9NQ29udGVudExvYWRlZCc7XG52YXIgRVZFTlRfV0lORE9XX0xPQURFRCA9ICdsb2FkJztcbmV4cG9ydHMucmVhZHkgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHZhciByZWFkeVN0YXRlID0gd2luZG93LmRvY3VtZW50LnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICB2YXIgcmVhZHlIYW5kbGVyXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihFVkVOVF9ET01fUkVBRFksIHJlYWR5SGFuZGxlcl8xKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfRE9NX1JFQURZLCByZWFkeUhhbmRsZXJfMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgfVxufSk7XG5leHBvcnRzLmxvYWRlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIHJlYWR5U3RhdGUgPSB3aW5kb3cuZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSAhPT0gJ2NvbXBsZXRlJykge1xuICAgICAgICB2YXIgbG9hZEhhbmRsZXJfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKEVWRU5UX1dJTkRPV19MT0FERUQsIGxvYWRIYW5kbGVyXzEpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9XSU5ET1dfTE9BREVELCBsb2FkSGFuZGxlcl8xKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICB9XG59KTtcbndpbmRvd1sncHJvbWlzaWZpZWREb21FdmVudHMnXSA9IHsgcmVhZHk6IGV4cG9ydHMucmVhZHksIGxvYWRlZDogZXhwb3J0cy5sb2FkZWQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2lmaWVkRG9tRXZlbnRzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb21pc2lmaWVkLWRvbS1ldmVudHMvZGlzdC9wcm9taXNpZmllZERvbUV2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHB1ZyA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3B1Zy1ydW50aW1lL2luZGV4LmpzXCIpO1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHt2YXIgcHVnX2h0bWwgPSBcIlwiLCBwdWdfbWl4aW5zID0ge30sIHB1Z19pbnRlcnA7O3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5leHRQYWdlVXJsLCBwcmV2aW91c1BhZ2VVcmwsIHJlc3VsdCkge3B1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcInVzZXJzXFxcIlxcdTAwM0VcXHUwMDNDdWwgY2xhc3M9XFxcInVzZXJzLWxpc3RcXFwiXFx1MDAzRVwiO1xuLy8gaXRlcmF0ZSByZXN1bHRcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcmVzdWx0O1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcHVnX2luZGV4MCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgcHVnX2luZGV4MCA8ICQkbDsgcHVnX2luZGV4MCsrKSB7XG4gICAgICAgIHZhciB1c2VyID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGlcIiArIChcIiBjbGFzcz1cXFwidXNlciBqcy11c2Vycy1saXN0LXVzZXJcXFwiXCIrcHVnLmF0dHIoXCJkYXRhLWlkXCIsIHVzZXIuaWQsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInVzZXJfX2NvbnRlbnRcXFwiXFx1MDAzRVxcdTAwM0NpbWdcIiArIChcIiBjbGFzcz1cXFwidXNlcl9fcGhvdG9cXFwiXCIrcHVnLmF0dHIoXCJhbHRcIiwgdXNlci5uYW1lLCB0cnVlLCB0cnVlKStwdWcuYXR0cihcInNyY1wiLCB1c2VyLmF2YXRhclVybCwgdHJ1ZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInVzZXJfX25hbWVcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IHVzZXIubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciBwdWdfaW5kZXgwIGluICQkb2JqKSB7XG4gICAgICAkJGwrKztcbiAgICAgIHZhciB1c2VyID0gJCRvYmpbcHVnX2luZGV4MF07XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDbGlcIiArIChcIiBjbGFzcz1cXFwidXNlciBqcy11c2Vycy1saXN0LXVzZXJcXFwiXCIrcHVnLmF0dHIoXCJkYXRhLWlkXCIsIHVzZXIuaWQsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRVxcdTAwM0NkaXYgY2xhc3M9XFxcInVzZXJfX2NvbnRlbnRcXFwiXFx1MDAzRVxcdTAwM0NpbWdcIiArIChcIiBjbGFzcz1cXFwidXNlcl9fcGhvdG9cXFwiXCIrcHVnLmF0dHIoXCJhbHRcIiwgdXNlci5uYW1lLCB0cnVlLCB0cnVlKStwdWcuYXR0cihcInNyY1wiLCB1c2VyLmF2YXRhclVybCwgdHJ1ZSwgdHJ1ZSkpICsgXCJcXHUwMDNFXFx1MDAzQ3NwYW4gY2xhc3M9XFxcInVzZXJfX25hbWVcXFwiXFx1MDAzRVwiICsgKHB1Zy5lc2NhcGUobnVsbCA9PSAocHVnX2ludGVycCA9IHVzZXIubmFtZSkgPyBcIlwiIDogcHVnX2ludGVycCkpICsgXCJcXHUwMDNDXFx1MDAyRnNwYW5cXHUwMDNFXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXFx1MDAzQ1xcdTAwMkZsaVxcdTAwM0VcIjtcbiAgICB9XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGdWxcXHUwMDNFXCI7XG5pZiAoKHByZXZpb3VzUGFnZVVybCB8fCBuZXh0UGFnZVVybCkpIHtcbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NkaXYgY2xhc3M9XFxcInBhZ2luZ1xcXCJcXHUwMDNFXCI7XG5pZiAocHJldmlvdXNQYWdlVXJsKSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnV0dG9uXCIgKyAoXCIgY2xhc3M9XFxcImZvcm0tYnV0dG9uIHBhZ2luZ19fYnV0dG9uX3ByZXYganMtdXNlcnMtbGlzdC1uZXh0XFxcIlwiK3B1Zy5hdHRyKFwiZGF0YS11cmxcIiwgcHJldmlvdXNQYWdlVXJsLCB0cnVlLCB0cnVlKSkgKyBcIlxcdTAwM0VwcmV2aW91c1xcdTAwM0NcXHUwMDJGYnV0dG9uXFx1MDAzRVwiO1xufVxuaWYgKG5leHRQYWdlVXJsKSB7XG5wdWdfaHRtbCA9IHB1Z19odG1sICsgXCJcXHUwMDNDYnV0dG9uXCIgKyAoXCIgY2xhc3M9XFxcImZvcm0tYnV0dG9uIHBhZ2luZ19fYnV0dG9uX25leHQganMtdXNlcnMtbGlzdC1uZXh0XFxcIlwiK3B1Zy5hdHRyKFwiZGF0YS11cmxcIiwgbmV4dFBhZ2VVcmwsIHRydWUsIHRydWUpKSArIFwiXFx1MDAzRW5leHRcXHUwMDNDXFx1MDAyRmJ1dHRvblxcdTAwM0VcIjtcbn1cbnB1Z19odG1sID0gcHVnX2h0bWwgKyBcIlxcdTAwM0NcXHUwMDJGZGl2XFx1MDAzRVwiO1xufVxucHVnX2h0bWwgPSBwdWdfaHRtbCArIFwiXFx1MDAzQ1xcdTAwMkZkaXZcXHUwMDNFXCI7fS5jYWxsKHRoaXMsXCJuZXh0UGFnZVVybFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmV4dFBhZ2VVcmw6dHlwZW9mIG5leHRQYWdlVXJsIT09XCJ1bmRlZmluZWRcIj9uZXh0UGFnZVVybDp1bmRlZmluZWQsXCJwcmV2aW91c1BhZ2VVcmxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnByZXZpb3VzUGFnZVVybDp0eXBlb2YgcHJldmlvdXNQYWdlVXJsIT09XCJ1bmRlZmluZWRcIj9wcmV2aW91c1BhZ2VVcmw6dW5kZWZpbmVkLFwicmVzdWx0XCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5yZXN1bHQ6dHlwZW9mIHJlc3VsdCE9PVwidW5kZWZpbmVkXCI/cmVzdWx0OnVuZGVmaW5lZCkpOztyZXR1cm4gcHVnX2h0bWw7fTtcbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwL3RlbXBsYXRlcy91c2Vyc0xpc3QucHVnXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDN1BBO0FBTUE7O0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7Ozs7Ozs7OztBQzlCQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdElBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFjQTtBQUFBO0FBR0E7Ozs7QUFJQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFLQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBO0FBbUJBO0FBQUE7QUFJQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFKQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFaQTs7OztBQVlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDSEE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNIQTs7O0FBR0E7QUFDQTtBQUVBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFTQTs7Ozs7Ozs7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=
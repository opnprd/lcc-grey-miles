(function (Vue, Vuex) {
  'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  Vuex = Vuex && Object.prototype.hasOwnProperty.call(Vuex, 'default') ? Vuex['default'] : Vuex;

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    methods: {
      calculate: function calculate() {
        this.$store.dispatch('planTravel');
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }
  //# sourceMappingURL=normalize-component.mjs.map

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("form", [
      _vm._m(0),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _vm._m(2),
      _vm._v(" "),
      _vm._m(3),
      _vm._v(" "),
      _vm._m(4),
      _vm._v(" "),
      _vm._m(5),
      _vm._v(" "),
      _c(
        "button",
        {
          on: {
            click: function($event) {
              return _vm.calculate()
            }
          }
        },
        [_vm._v("Calculate")]
      )
    ])
  };
  var __vue_staticRenderFns__ = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("label", { attrs: { for: "from" } }, [_vm._v("From:")]),
        _vm._v(" "),
        _c("input", {
          attrs: { id: "from", type: "text", value: "Merrion House" }
        })
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("label", { attrs: { for: "to" } }, [_vm._v("To:")]),
        _vm._v(" "),
        _c("input", { attrs: { id: "from", type: "text", value: "Hough Top" } })
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("input", {
          attrs: { id: "roundtrip", name: "roundtrip", type: "checkbox" }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "roundtrip" } }, [
          _vm._v("I am going and then coming back again")
        ])
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("label", { attrs: { for: "roundtriptime" } }, [
          _vm._v("Hours spent at location")
        ]),
        _vm._v(" "),
        _c("input", {
          attrs: { id: "roundtriptime", name: "roundtrip", type: "number" }
        })
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("input", {
          attrs: { id: "presence", name: "presence", type: "checkbox" }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "presence" } }, [
          _vm._v("I need to travel to the destination")
        ])
      ])
    },
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "row" }, [
        _c("input", {
          attrs: { id: "carrying", name: "carrying", type: "checkbox" }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "carrying" } }, [
          _vm._v("I am transporting a lot of stuff")
        ])
      ])
    }
  ];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$1 = {
    props: {
      title: {
        type: String,
        required: true
      },
      details: {
        type: Object,
        required: false,
        "default": function _default() {}
      },
      summarise: {
        type: Function,
        "default": function _default() {
          return function () {
            return null;
          };
        }
      },
      costFn: {
        type: Function,
        required: true
      }
    },
    data: function data() {
      return {
        viewState: 'closed'
      };
    },
    computed: {
      summary: function summary() {
        return this.summarise(this.$store.getters.journey);
      },
      cost: function cost() {
        return this.costFn(this.$store.getters.journey);
      }
    },
    methods: {
      toggleView: function toggleView() {
        var currentState = this.viewState;
        this.viewState = currentState === 'open' ? 'closed' : 'open';
      }
    }
  };

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }
  //# sourceMappingURL=browser.mjs.map

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "section",
      {
        on: {
          click: function($event) {
            return _vm.toggleView()
          }
        }
      },
      [
        _c("div", [
          _vm.viewState === "closed"
            ? _c("div", { staticClass: "open" }, [_vm._v("more info")])
            : _vm._e(),
          _vm._v(" "),
          _c("h3", [_vm._v(_vm._s(_vm.title))]),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.summary))]),
          _vm._v(" "),
          _c("p", [_vm._v("£" + _vm._s(_vm.cost))])
        ]),
        _vm._v(" "),
        _vm.viewState === "open"
          ? _c(_vm.details, { tag: "component" })
          : _vm._e()
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-db181f58_0", { source: "\n.open[data-v-db181f58] {\n  display: inline-block;\n  float: right;\n  padding-right: 1em;\n  line-height: 1.5em;\n}\n", map: {"version":3,"sources":["/Users/gilesdring/src/opnprd/greymiles/src/components/ModeOfTransport.vue"],"names":[],"mappings":";AAYA;EACA,qBAAA;EACA,YAAA;EACA,kBAAA;EACA,kBAAA;AACA","file":"ModeOfTransport.vue","sourcesContent":["<template>\n  <section @click=\"toggleView()\">\n    <div>\n      <div v-if=\"viewState ==='closed'\" class=\"open\">more info</div>\n      <h3>{{ title }}</h3>\n      <p>{{ summary }}</p>\n      <p>£{{ cost }}</p>\n    </div>\n    <component :is=\"details\" v-if=\"viewState ==='open'\" />\n  </section>  \n</template>\n<style scoped>\n.open {\n  display: inline-block;\n  float: right;\n  padding-right: 1em;\n  line-height: 1.5em;\n}\n</style>\n<script>\nexport default {\n  props: {\n    title: {\n      type: String,\n      required: true,\n    },\n    details: {\n      type: Object,\n      required: false,\n      default: () => {},\n    },\n    summarise: {\n      type: Function,\n      default: () => () => null,\n    },\n    costFn: {\n      type: Function,\n      required: true,\n    },\n  },\n  data: function () {\n    return {\n      viewState: 'closed',\n    };\n  },\n  computed: {\n    summary() {\n      return this.summarise(this.$store.getters.journey);\n    },\n    cost() {\n      return this.costFn(this.$store.getters.journey);\n    },\n  },\n  methods: {\n    toggleView() {\n      const currentState = this.viewState;\n      this.viewState = currentState === 'open' ? 'closed' : 'open';\n    },\n  },\n};\n</script>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-db181f58";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$2 = {
    components: {
      SearchForm: __vue_component__,
      ModeOfTransport: __vue_component__$1
    },
    props: {
      modes: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      rawModes: {
        type: Array,
        "default": function _default() {
          return [];
        }
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("article", { attrs: { id: "app" } }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { attrs: { id: "main" } }, [
        _c(
          "section",
          [
            _c("p", [
              _vm._v(
                "Can you make your journey cleaner? Move up Leeds City Council's travel hierarchy to reduce your emissions and help tackle the #ClimateEmergency"
              )
            ]),
            _vm._v(" "),
            _c("search-form")
          ],
          1
        )
      ])
    ])
  };
  var __vue_staticRenderFns__$2 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("header", [
        _c("p", [_vm._v("Towards a lower emissions city")]),
        _vm._v(" "),
        _c("h1", [_vm._v("Leeds Council Staff Travel Options")])
      ])
    }
  ];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$3 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p", [
          _vm._v(
            "Did you know that there are Metro cards available for staff to use? "
          ),
          _c("a", { attrs: { href: "" } }, [_vm._v("Find out more")]),
          _vm._v(".")
        ]),
        _vm._v(" "),
        _c("p", [_vm._v("Bus and train options:")]),
        _vm._v(" "),
        _c("ul", [
          _c("li", [
            _vm._v(
              "4 minute walk to Albion Street. 13:42 X11 bus from blah to somewhere. 5 minute walk"
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _vm._v(
              "8 minute walk to Leeds Station. 13:45 train to Bramley. 5 minute walk"
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _vm._v(
              "4 minute walk to Albion Street. 14:35 X11 bus from blah to somewhere. 5 minute walk"
            )
          ])
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "grid" }, [
          _c("li", [
            _c(
              "a",
              {
                staticClass: "c12-bg",
                attrs: {
                  href:
                    "https://planner.wymetro.com/lts/#/travelInfo?originLatitude=53.79776064711342&originLongitude=-1.5423548931625677&originId=N0077039&originName=Leeds%20City%20Centre,%20West%20Yorkshire&originType=LOCALITY&originRegion=&destinationLatitude=53.79865625203192&destinationLongitude=-1.641909584429088&destinationId=&destinationName=Leeds%20City%20Council,%20Hough%20Top%20Court,%20Hough%20Top,%20%20Leeds,%20%20LS134QP&destinationType=LOCATION&destinationRegion=&type=LEAVE_AFTER&date=1571236959320&time=1571236959320&modes=%7CBUS%7CCOACH%7CTRAIN&maxWalkTime=30&minComfortWaitTime=5&routeType=FASTEST&walkingSpeed=1&cycleRouteType=BALANCED&cycleSpeedIntervals=20&operator="
                }
              },
              [
                _c("h2", [_vm._v("Public transport journey planner")]),
                _c("p", [_vm._v("WY Metro")])
              ]
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("Access a council Metro Card")]),
              _c("p", [_vm._v("Do this")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("No Metro Card nearby")]),
              _c("p", [
                _vm._v(
                  "Find out how to request that your department gets a Metro card for bus and train travel within West Yorkshire."
                )
              ])
            ])
          ])
        ])
      ])
    }
  ];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      {},
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$4 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p", [
          _vm._v(
            "Car clubs are the cleanest way of travelling in a private vehicle because the are ultra-low emission and they encourage journeys to be shorter. The prices are around £5.20 per hour or £41.95 daily. The car will need to be returned to its location."
          )
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "grid" }, [
          _c("li", [
            _c(
              "a",
              {
                staticClass: "c2-bg",
                attrs: {
                  href:
                    "https://www.enterprisecarclub.co.uk/gb/en/programs/regions/north-east-england/leeds.html"
                }
              },
              [_c("h2", [_vm._v("CarClub")])]
            )
          ])
        ])
      ])
    }
  ];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      {},
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$5 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p", [
          _vm._v(
            "This option relies on having access to a pool car. It is better than car clubs if you are travelling all day but requires some logistics to obtain a car."
          )
        ]),
        _vm._v(" "),
        _c("p", [_vm._v("Other options:")]),
        _vm._v(" "),
        _c("ul", [
          _c("li", [
            _c("a", { attrs: { href: "" } }, [_vm._v("e-Bike / 30-40 minutes")])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _vm._v("Train / 23 minutes from Leeds Railway Station")
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _vm._v("Bus / 28 minutes from Albion Street")
            ])
          ])
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "grid" }, [
          _c("li", [
            _c("a", { staticClass: "c1-bg", attrs: { href: "" } }, [
              _c("h2", [_vm._v("Book a pool car")]),
              _c("p", [_vm._v("From Fleet Services")])
            ])
          ])
        ])
      ])
    }
  ];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      {},
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$6 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p", [
          _vm._v(
            "Save time and reduce travel emissions completely by having a virtual meeting. This option may not be practical for all services or situations. There are a variety of videoconferencing facilities available."
          )
        ]),
        _vm._v(" "),
        _c("ul", { staticClass: "grid" }, [
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("Book Skype facilities")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("How to use the equipment")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("Teleconferencing training")])
            ])
          ])
        ])
      ])
    }
  ];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      {},
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$7 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p"),
        _vm._v(" "),
        _c("ul", { staticClass: "grid" }, [
          _c("li", [
            _c("a", { attrs: { href: "" } }, [
              _c("h2", [_vm._v("e-Bike")]),
              _c("p", [_vm._v("Borrow an e-Bike from Merrion House")])
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c(
              "a",
              {
                attrs: {
                  href: "https://www.cyclecityconnect.co.uk/journey-planner/"
                }
              },
              [
                _c("h2", [_vm._v("Plan your cycle journey")]),
                _c("p", [_vm._v("City Connect")])
              ]
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _c(
              "a",
              {
                attrs: {
                  href:
                    "https://github.com/odileeds/west-yorkshire-mapping/blob/master/data/leeds/leeds-amenities-bicycle_parking.geojson"
                }
              },
              [_c("h2", [_vm._v("Cycle parking facilities")])]
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _c(
              "a",
              {
                attrs: {
                  href:
                    "http://walkit.com/?city=leeds&from=Merrion+Street&fuid=&to=&tuid=&rta=&direct=0"
                }
              },
              [
                _c("h2", [_vm._v("Walking directions")]),
                _c("p", [_vm._v("Walkit")])
              ]
            )
          ]),
          _vm._v(" "),
          _c("li", [
            _c(
              "a",
              {
                attrs: {
                  href:
                    "https://www.google.com/maps/dir/Merrion+House,+Merrion+Way,+Leeds+LS2+8PD/Hough+Top,+Leeds/@53.7978393,-1.6290147,13z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x48795c1c9367fd93:0xe92b938ab9b454f3!2m2!1d-1.5449067!2d53.8026793!1m5!1m1!1s0x48795f44cabb111d:0x7280a679a7a7329f!2m2!1d-1.6431878!2d53.7978499!3e2"
                }
              },
              [
                _c("h2", [_vm._v("Walking directions")]),
                _c("p", [_vm._v("Google Directions")])
              ]
            )
          ])
        ])
      ])
    }
  ];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      {},
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("p", [_vm._v("Take a cab!")])
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = undefined;
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      {},
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm._m(0)
  };
  var __vue_staticRenderFns__$9 = [
    function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("section", [
        _c("p", [
          _vm._v(
            "The council would prefer you not to use your own car (unless it is a fully electric vehicle) as it contributes the most to our emissions and contributes to congestion. Where possible - depending on your service - the following options may be available instead:"
          )
        ]),
        _vm._v(" "),
        _c("ul", [
          _c("li", [
            _c("a", { attrs: { href: "#2" } }, [_vm._v("e-Bike / 30-40 minutes")])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#3" } }, [
              _vm._v("Train / 23 minutes from Leeds Railway Station")
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#4" } }, [
              _vm._v("Bus / 28 minutes from Albion Street")
            ])
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { attrs: { href: "#5" } }, [
              _vm._v("CarClub / 22 minutes from Cookridge Street")
            ])
          ])
        ])
      ])
    }
  ];
  __vue_render__$9._withStripped = true;

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      {},
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * Each mode of transport is described below. The fields are as follows:
   * * title: Display name of the mode of transport
   * * details: A Vue component to render for detailed information
   * * summarise: A function to present the summary of the function
   * * costFn: A function to calculate the cost of travel
   */

  var modes = [{
    title: 'Tele/videoconference',
    details: __vue_component__$6,
    summarise: function summarise(j) {
      return "Skype facilities at ".concat(j.source);
    },
    costFn: function costFn(j) {
      return 0;
    }
  }, {
    title: 'Walk/Cycle',
    details: __vue_component__$7,
    summarise: function summarise(j) {
      return "30-40 minutes by bike (xx ebikes nearby at ".concat(j.source, ")");
    },
    costFn: function costFn(j) {
      return 0;
    }
  }, {
    title: 'Bus/train',
    details: __vue_component__$3,
    summarise: function summarise(j) {
      return "".concat(j.time.train, " minutes by train or ").concat(j.time.bus, " minutes by bus (xx Metro cards are available nearby)");
    },
    costFn: function costFn(j) {
      // TODO Need to calculate cost with/without metro card
      return 5;
    }
  }, {
    title: 'Pool vehicle',
    details: __vue_component__$5,
    summarise: function summarise(j) {
      return "".concat(j.time.drive, " minutes drive (needs booking in advance)");
    },
    costFn: function costFn(j) {
      // TODO How is this calculated?
      return 10;
    }
  }, {
    title: 'Car club',
    details: __vue_component__$4,
    summarise: function summarise(j) {
      return "".concat(j.time.drive, " minutes drive (xx cars at Cookridge Street)");
    },
    costFn: function costFn(j) {
      // TODO How is this calculated?
      return (10 * j.time.drive / 30).toFixed(2);
    }
  }, {
    title: 'Taxi',
    details: __vue_component__$8,
    summarise: function summarise(j) {
      return "".concat(j.time.drive, " minutes (AAA Taxis)");
    },
    costFn: function costFn(j) {
      // TODO How is this calculated?
      return (0.50 * j.time.drive).toFixed(2);
    }
  }, {
    title: 'Self drive',
    details: __vue_component__$9,
    summarise: function summarise(j) {
      return "".concat(j.time.drive, " minutes");
    },
    costFn: function costFn(j) {
      // TODO How is this calculated?
      return 0.5 * j.time.drive;
    }
  }];

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function geoCode(_x) {
    return _geoCode.apply(this, arguments);
  }

  function _geoCode() {
    _geoCode = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(location) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _geoCode.apply(this, arguments);
  }

  function getPublicTransport(_x, _x2) {
    return _getPublicTransport.apply(this, arguments);
  }

  function _getPublicTransport() {
    _getPublicTransport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(origin, destination) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", {
                distance: {
                  value: 100,
                  unit: 'km'
                },
                time: {
                  value: 30,
                  unit: 'minutes'
                }
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getPublicTransport.apply(this, arguments);
  }

  function queryOpenRouteService(_x3, _x4, _x5) {
    return _queryOpenRouteService.apply(this, arguments);
  }

  function _queryOpenRouteService() {
    _queryOpenRouteService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(origin, destination, profileName) {
      var key, response, journeyData, _journeyData$features, _journeyData$features2, distance, duration;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              key = '5b3ce3597851110001cf6248104657ec14464cc68a8aaaf62a878b74';
              _context2.next = 3;
              return fetch("https://api.openrouteservice.org/v2/directions/".concat(profileName, "?api_key=").concat(key, "&start=").concat(origin.toString(), "&end=").concat(destination.toString()));

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return response.json();

            case 6:
              journeyData = _context2.sent;
              // Grab summary via destructuring assignment
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/
              _journeyData$features = _slicedToArray(journeyData.features, 1), _journeyData$features2 = _journeyData$features[0].properties.summary, distance = _journeyData$features2.distance, duration = _journeyData$features2.duration;
              return _context2.abrupt("return", {
                distance: {
                  value: (distance / 1000).toFixed(2),
                  unit: 'km'
                },
                time: {
                  value: (duration / 60).toFixed(1),
                  unit: 'minutes'
                }
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _queryOpenRouteService.apply(this, arguments);
  }

  function journey (_x6, _x7) {
    return _ref.apply(this, arguments);
  }

  function _ref() {
    _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(from, to) {
      var _ref2, _ref3, fromCoords, toCoords, _ref4, _ref5, publicTransport, driving, cycling, walking;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Promise.all([from, to].map(geoCode));

            case 2:
              _ref2 = _context3.sent;
              _ref3 = _slicedToArray(_ref2, 2);
              fromCoords = _ref3[0];
              toCoords = _ref3[1];
              _context3.next = 8;
              return Promise.all([getPublicTransport(fromCoords, toCoords), queryOpenRouteService(fromCoords, toCoords, 'driving-car'), // mode names for the openrouteservice api - could perhaps be in modes.js file
              queryOpenRouteService(fromCoords, toCoords, 'cycling-regular'), queryOpenRouteService(fromCoords, toCoords, 'foot-walking')]);

            case 8:
              _ref4 = _context3.sent;
              _ref5 = _slicedToArray(_ref4, 4);
              publicTransport = _ref5[0];
              driving = _ref5[1];
              cycling = _ref5[2];
              walking = _ref5[3];
              return _context3.abrupt("return", {
                publicTransport: publicTransport,
                driving: driving,
                cycling: cycling,
                walking: walking
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _ref.apply(this, arguments);
  }

  function planTravel(_x) {
    return _planTravel.apply(this, arguments);
  }

  function _planTravel() {
    _planTravel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context) {
      var state, commit, source, destination, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('BEING CALLED');
              state = context.state, commit = context.commit;
              source = state.source, destination = state.destination;
              _context.next = 5;
              return journey(source, destination);

            case 5:
              data = _context.sent;
              commit('setTravelDetails', data);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _planTravel.apply(this, arguments);
  }

  var actions = {
    planTravel: planTravel
  };

  function setTravelDetails(state, update) {
    var driving = update.driving,
        cycling = update.cycling,
        walking = update.walking,
        publicTransport = update.publicTransport;
    state.cycling = cycling;
    state.driving = driving;
    state.walking = walking;
    state.publicTransport = publicTransport;
  }

  function clearTravelDetails(state) {
    state.cycling = null;
    state.driving = null;
    state.walking = null;
    state.publicTransport = null;
  }

  var mutations = {
    clearTravelDetails: clearTravelDetails,
    setTravelDetails: setTravelDetails
  };

  Vue.use(Vuex);
  var store = new Vuex.Store({
    actions: actions,
    mutations: mutations,
    state: {
      source: 'Merrion House',
      destination: 'Hough Top',
      publicTransport: null,
      driving: null,
      cycling: null,
      walking: null
    },
    getters: {
      journey: function journey(state) {
        var source = state.source,
            destination = state.destination,
            publicTransport = state.publicTransport,
            driving = state.driving,
            cycling = state.cycling,
            walking = state.walking;
        return {
          source: source,
          destination: destination,
          publicTransport: publicTransport,
          driving: driving,
          cycling: cycling,
          walking: walking
        };
      }
    }
  });

  new Vue({
    el: '#app',
    store: store,
    render: function render(h) {
      return h(__vue_component__$2, {
        props: {
          modes: modes
        }
      });
    }
  });

}(Vue, Vuex));
(function (Vue) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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

    /* script */

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm._m(0)
    };
    var __vue_staticRenderFns__ = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("form", [
          _c("div", { staticClass: "row" }, [
            _c("label", { attrs: { for: "from" } }, [_vm._v("From:")]),
            _vm._v(" "),
            _c("input", {
              attrs: { id: "from", type: "text", value: "Merrion House" }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("label", { attrs: { for: "to" } }, [_vm._v("To:")]),
            _vm._v(" "),
            _c("input", { attrs: { id: "from", type: "text", value: "Hough Top" } })
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
        {},
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
    var script = {
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
        }
      },
      data: function data() {
        return {
          viewState: 'closed'
        };
      },
      computed: {
        summary: function summary() {
          // Ultimately this should wire up to a vuex store...
          return this.summarise(this.$root.journey);
        }
      },
      methods: {
        toggleView: function toggleView() {
          var currentState = this.viewState;
          this.viewState = currentState === 'open' ? 'closed' : 'open';
        }
      }
    };

    /* script */
    const __vue_script__ = script;

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
            _c("p", [_vm._v(_vm._s(_vm.summary))])
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
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    //
    var script$1 = {
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
    const __vue_script__$1 = script$1;

    /* template */
    var __vue_render__$2 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("article", [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { attrs: { id: "main" } }, [
          _c(
            "div",
            { staticClass: "main c6-bg" },
            [
              _c("p", { staticClass: "intro" }, [
                _vm._v(
                  "Can you make your journey cleaner? Move up Leeds City Council's travel hierarchy to reduce your emissions and help tackle the #ClimateEmergency"
                )
              ]),
              _vm._v(" "),
              _c("search-form")
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "ol",
            { staticClass: "c6-bg" },
            _vm._l(_vm.modes, function(mode, i) {
              return _c(
                "li",
                { key: i, class: "mode" + (i + 1) },
                [
                  _c(
                    "mode-of-transport",
                    _vm._b({}, "mode-of-transport", mode, false)
                  )
                ],
                1
              )
            }),
            0
          )
        ])
      ])
    };
    var __vue_staticRenderFns__$2 = [
      function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c("header", { staticClass: "c6-bg" }, [
          _c("p", { staticClass: "b1-bg" }, [
            _vm._v("Towards a lower emissions city")
          ]),
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
        __vue_script__$1,
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
              _c("a", { staticClass: "c12-bg", attrs: { href: "" } }, [
                _c("h2", [_vm._v("Access a council Metro Card")]),
                _c("p", [_vm._v("Do this")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { staticClass: "c12-bg", attrs: { href: "" } }, [
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
              _c("a", { staticClass: "c4-bg", attrs: { href: "" } }, [
                _c("h2", [_vm._v("Book Skype facilities")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { staticClass: "c4-bg", attrs: { href: "" } }, [
                _c("h2", [_vm._v("How to use the equipment")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c("a", { staticClass: "c4-bg", attrs: { href: "" } }, [
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
              _c("a", { staticClass: "c7-bg", attrs: { href: "" } }, [
                _c("h2", [_vm._v("e-Bike")]),
                _c("p", [_vm._v("Borrow an e-Bike from Merrion House")])
              ])
            ]),
            _vm._v(" "),
            _c("li", [
              _c(
                "a",
                {
                  staticClass: "c7-bg",
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
                  staticClass: "c2-bg",
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
                  staticClass: "c3-bg",
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
                  staticClass: "c14-bg",
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
          _c("ul", { staticClass: "c6-bg" }, [
            _c("li", { staticClass: "mode2" }, [
              _c("a", { attrs: { href: "#2" } }, [_vm._v("e-Bike / 30-40 minutes")])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "mode3" }, [
              _c("a", { attrs: { href: "#3" } }, [
                _vm._v("Train / 23 minutes from Leeds Railway Station")
              ])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "mode4" }, [
              _c("a", { attrs: { href: "#4" } }, [
                _vm._v("Bus / 28 minutes from Albion Street")
              ])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "mode5" }, [
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

    var modes = [{
      title: 'Tele/videoconference',
      details: __vue_component__$6,
      summarise: function summarise(j) {
        return "Skype facilities at ".concat(j.source);
      }
    }, {
      title: 'Walk/Cycle',
      details: __vue_component__$7,
      summarise: function summarise(j) {
        return "30-40 minutes by bike (2 ebikes nearby at ".concat(j.source, ")");
      }
    }, {
      title: 'Bus/train',
      details: __vue_component__$3,
      summarise: function summarise(j) {
        return '23 minutes by train or 28 minutes by bus (2 Metro cards are available nearby)';
      }
    }, {
      title: 'Pool vehicle',
      details: __vue_component__$5,
      summarise: function summarise(j) {
        return '22 minutes drive (needs booking in advance)';
      }
    }, {
      title: 'Car club',
      details: __vue_component__$4,
      summarise: function summarise(j) {
        return '22 minutes drive (20 cars at Cookridge Street)';
      }
    }, {
      title: 'Taxi',
      details: __vue_component__$8,
      summarise: function summarise() {
        return '22 minutes (Arrow Taxis)';
      }
    }, {
      title: 'Self drive',
      details: __vue_component__$9,
      summarise: function summarise() {
        return '22 minutes';
      }
    }];

    new Vue({
      el: '#app',
      data: {
        journey: {
          source: 'Merrion House'
        }
      },
      render: function render(h) {
        return h(__vue_component__$2, {
          props: {
            modes: modes
          }
        });
      }
    });

}(Vue));

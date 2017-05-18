define("templates",["handlebars"],function(Handlebars){Handlebars.templates={};Handlebars.templates['accordion']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <div class=\"accordion-item "
    + container.escapeExpression(((helper = (helper = helpers._classes || (depth0 != null ? depth0._classes : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_classes","hash":{},"data":data}) : helper)))
    + "\">\r\n            <button role=\"button\" class=\"base accordion-item-title "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisited : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-expanded=\"false\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">\r\n              <div class=\"accordion-item-title-inner\">\r\n                <div class=\"accordion-item-title-icon icon icon-plus h5\"></div>\r\n                      "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n              </div>\r\n            </button>\r\n            <div class=\"accordion-item-body\">\r\n                <div class=\"accordion-item-body-inner\">\r\n                    <div class=\"accordion-item-text\">\r\n                        "
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n                    </div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._graphic : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "visited";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <div class=\"accordion-item-graphic\">\r\n                        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" tabindex=\"0\">\r\n                    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"accordion-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._accordion : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"accordion-widget component-widget\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"append-text\">\r\n        "
    + ((stack1 = ((helper = (helper = helpers.appendText || (depth0 != null ? depth0.appendText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"appendText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});Handlebars.templates['blank']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"blank-inner component-inner\"></div>\r\n";
},"useData":true});Handlebars.templates['gmcq']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " disabled "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " complete submitted show-user-answer "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    return "correct";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "        <div class=\"gmcq-item component-item "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " item-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + " "
    + container.escapeExpression((helpers.odd || (depth0 && depth0.odd) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(data && data.index),{"name":"odd","hash":{},"data":data}))
    + "\">\r\n            <input type=\"checkbox\" id=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\" aria-labelledby=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "-aria\""
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression((helpers.a11y_normalize || (depth0 && depth0.a11y_normalize) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.text : depth0),{"name":"a11y_normalize","hash":{},"data":data}))
    + " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\"/>\r\n            <label aria-hidden=\"true\" id=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "-aria\" for=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " component-item-color component-item-text-color component-item-border "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isSelected : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n\r\n                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" data-large=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.large : stack1), depth0))
    + "\" data-small=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.small : stack1), depth0))
    + "\"/>\r\n\r\n                <div class=\"gmcq-item-checkbox\">\r\n                    <div class=\"gmcq-item-state\">\r\n                        <div class=\"gmcq-item-icon gmcq-answer-icon "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isRadio : depths[1]),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.program(18, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + " icon\"></div>\r\n                        <div class=\"gmcq-item-icon gmcq-correct-icon icon icon-tick\"></div>\r\n                        <div class=\"gmcq-item-icon gmcq-incorrect-icon icon icon-cross\"></div>\r\n                    </div>\r\n                    <div class=\"gmcq-item-inner\">\r\n                        "
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n                    </div>\r\n                </div>\r\n            </label>\r\n        </div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._canShowMarking : depths[1]),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "incorrect";
},"10":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"12":function(container,depth0,helpers,partials,data) {
    return "disabled ";
},"14":function(container,depth0,helpers,partials,data) {
    return "selected";
},"16":function(container,depth0,helpers,partials,data) {
    return "radio";
},"18":function(container,depth0,helpers,partials,data) {
    return "checkbox";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"gmcq-inner component-inner clearfix\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._gmcq : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"gmcq-widget component-widget clearfix "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isEnabled : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"buttons\">\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true,"useDepths":true});Handlebars.templates['graphic']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " graphic-widget-attribution";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" tabindex=\"0\"";
},"5":function(container,depth0,helpers,partials,data) {
    return " class=\"a11y-ignore\" aria-hidden=\"true\" tabindex=\"-1\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <div class=\"graphic-attribution\">"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.attribution : stack1), depth0)) != null ? stack1 : "")
    + "</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"graphic-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._graphic : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"graphic-widget component-widget"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.attribution : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n      <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" data-large=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.large : stack1), depth0))
    + "\" data-small=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.small : stack1), depth0))
    + "\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "/>\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.attribution : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});Handlebars.templates['mcq']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "tabindex=\"0\"";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " disabled "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " complete submitted show-user-answer "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return "correct";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "        <div class=\"mcq-item component-item component-item-color "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " item-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n            <input type=\"checkbox\" id=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\" aria-labelledby=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "-aria\""
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression((helpers.a11y_normalize || (depth0 && depth0.a11y_normalize) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.text : depth0),{"name":"a11y_normalize","hash":{},"data":data}))
    + "\"/>\r\n            <label aria-hidden=\"true\" id=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "-aria\" for=\""
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1]._id : depths[1]), depth0))
    + "-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"component-item-text-color component-item-border"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isEnabled : depths[1]),{"name":"unless","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isSelected : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                <div class=\"mcq-item-state\">\r\n                    <div class=\"mcq-item-icon mcq-answer-icon "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._isRadio : depths[1]),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.program(20, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + " component-item-text-color icon\"></div>\r\n                    <div class=\"mcq-item-icon mcq-correct-icon icon icon-tick\"></div>\r\n                    <div class=\"mcq-item-icon mcq-incorrect-icon icon icon-cross\"></div>\r\n                </div>\r\n                <div class=\"mcq-item-inner\">\r\n                    "
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n                </div>\r\n            </label>\r\n        </div>\r\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1]._canShowMarking : depths[1]),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "incorrect";
},"12":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"14":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"16":function(container,depth0,helpers,partials,data) {
    return " selected";
},"18":function(container,depth0,helpers,partials,data) {
    return "radio";
},"20":function(container,depth0,helpers,partials,data) {
    return "checkbox";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"mcq-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._mcq : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._mcq : stack1)) != null ? stack1.ariaRegion : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"mcq-widget component-widget "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isEnabled : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"buttons\">\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true,"useDepths":true});Handlebars.templates['media']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._media : stack1)) != null ? stack1.transcriptButton : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    return "tabindex=\"0\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <audio src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.mp3 : stack1), depth0))
    + "\" type=\"audio/mp3\" style=\"width: 100%; height: 100%;\"/>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.ogg : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <audio src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.ogg : stack1), depth0))
    + "\" type=\"audio/ogg\" style=\"width: 100%; height: 100%;\"/>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <video preload=\"none\" width=\"640\" height=\"360\" "
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.type : stack1),"video/vimeo",{"name":"if_value_equals","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + " style=\"width:100%; height:100%;\" controls=\"controls\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.source : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._useClosedCaptions : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </video>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "poster=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.poster : stack1), depth0))
    + "\"";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <source src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.source : stack1), depth0))
    + "\" type=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.type : stack1), depth0))
    + "\"/>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.mp4 : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.ogv : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.webm : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <source src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.mp4 : stack1), depth0))
    + "\" type=\"video/mp4\"/>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <source src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.ogv : stack1), depth0))
    + "\" type=\"video/ogg\"/>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <source src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.webm : stack1), depth0))
    + "\" type=\"video/webm\"/>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.cc : stack1),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"25":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                  <track kind=\"subtitles\" src=\""
    + container.escapeExpression(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"src","hash":{},"data":data}) : helper)))
    + "\" type=\"text/vtt\" srclang=\""
    + container.escapeExpression(((helper = (helper = helpers.srclang || (depth0 != null ? depth0.srclang : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"srclang","hash":{},"data":data}) : helper)))
    + "\" />\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"media-transcript-container\">\r\n\r\n      <div class=\"media-transcript-button-container\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1._inlineTranscript : stack1),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1._externalTranscript : stack1),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1._inlineTranscript : stack1),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </div>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <button class=\"media-inline-transcript-button button\" role=\"button\">\r\n            <div class=\"transcript-text-container\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.inlineTranscriptButton : stack1),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.program(31, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n          </button>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.inlineTranscriptButton : stack1), depth0))
    + "\r\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.transcriptLink : stack1), depth0))
    + "\r\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <button onclick=\"window.open('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.transcriptLink : stack1), depth0))
    + "')\" class=\"media-external-transcript-button button\" role=\"button\">\r\n            <div class=\"transcript-text-container\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.transcriptLinkButton : stack1),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.program(31, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n          </button>\r\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.transcriptLinkButton : stack1), depth0))
    + "\r\n";
},"36":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <div class=\"media-inline-transcript-body-container\">\r\n            <div class=\"media-inline-transcript-body\">\r\n            "
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._transcript : depth0)) != null ? stack1.inlineTranscriptBody : stack1),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n            </div>\r\n          </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"media-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._media : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.transcriptLink : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._media : stack1)) != null ? stack1.ariaRegion : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"media-widget component-widget a11y-ignore-aria\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._media : depth0)) != null ? stack1.mp3 : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._transcript : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    \r\n</div>\r\n";
},"usePartial":true,"useData":true});Handlebars.templates['narrative']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "narrative-text-controls";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	                <div class=\"narrative-content-item\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	                </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	                    <div class=\"narrative-content-title\">\n	                        <div class=\"narrative-content-title-inner accessible-text-block h5\" role=\"heading\" aria-level=\"5\" tabindex=\"0\">\n	                            "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " \n	                        </div>\n	                    </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	                    <div class=\"narrative-content-body\">\n	                        <div class=\"narrative-content-body-inner\">\n	                            "
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\n	                        </div> \n	                    </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	                        <div class=\"narrative-progress component-item-color component-item-border\"></div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "	                    <button role=\"button\" class=\"base narrative-strapline-title\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.strapline || (depth0 != null ? depth0.strapline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"strapline","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">\n	                        <div class=\"narrative-strapline-title-inner accessible-text-block h5\">\n	                            "
    + ((stack1 = ((helper = (helper = helpers.strapline || (depth0 != null ? depth0.strapline : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"strapline","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " \n	                        </div>\n\n	                        <div class=\"icon icon-plus\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.straplineIconText : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    		</div>\n	                        <div class=\"focus-rect\"></div>\n	                    </button>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	                        	<div class=\"narrative-strapline-icon-text\">\n	                        		"
    + container.escapeExpression(((helper = (helper = helpers.straplineIconText || (depth0 != null ? depth0.straplineIconText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"straplineIconText","hash":{},"data":data}) : helper)))
    + "\n                        		</div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	                <div class=\"narrative-slider-graphic "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisited : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n	                    <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\"/>\n	                </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "visited";
},"16":function(container,depth0,helpers,partials,data) {
    return "	                <div class=\"narrative-progress component-item-color component-item-border\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"narrative-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._narrative : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"narrative-widget component-widget "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._hasNavigationInTextArea : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n	    <div class=\"narrative-widget-inner component-widget-inner\">\n	        <div class=\"narrative-content\">\n	            <div class=\"narrative-content-inner\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	                <div class=\"narrative-controls-container clearfix\">\n	                    <div class=\"narrative-indicators\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	                    </div>\n	                    <button class=\"base narrative-controls narrative-control-left\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.previous : stack1), depth0))
    + "\">\n	                        <div class=\"icon icon-controls-left\"></div>\n	                    </button>\n	                    <button class=\"base narrative-controls narrative-control-right\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.next : stack1), depth0))
    + "\">\n	                        <div class=\"icon icon-controls-right\"></div>\n	                    </button>\n	                </div>\n	            </div>\n	        </div>\n\n	        <div class=\"narrative-strapline\">\n	            <div class=\"narrative-strapline-header\">\n	                <div class=\"narrative-strapline-header-inner clearfix\">\n	                    <div></div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	                </div>\n	            </div>\n	        </div>\n\n	        <div class=\"narrative-slide-container\">\n\n	            <button class=\"base narrative-controls narrative-control-left\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.previous : stack1), depth0))
    + "\">\n	                <div class=\"icon icon-controls-left\"></div>\n	            </button>\n	            <button class=\"base narrative-controls narrative-control-right\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.next : stack1), depth0))
    + "\">\n	                <div class=\"icon icon-controls-right\"></div>\n	            </button>\n\n	            <div class=\"narrative-slider clearfix\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	            </div>\n	            <div class=\"narrative-indicators\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	            </div>\n	        </div>\n\n	        <div class=\"clearfix\"></div>\n\n	    </div>    \n    </div>    \n</div>\n";
},"usePartial":true,"useData":true});Handlebars.templates['text']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"text-inner component-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._text : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});Handlebars.templates['hotgrid']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "tabindex=\"0\"";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                <div class=\"hotgrid-grid-item "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.visited : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                    <button class=\"base hotgrid-item-image hotgrid-item-states-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.hasImageStates : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\" role=\"button\" aria-label=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.title : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.visited : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n                        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\"/>\r\n                        \r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.hasImageStates : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        \r\n                    </button>\r\n                    \r\n                    <div class=\"hotgrid-item-title\"><span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span></div>   \r\n                    \r\n                </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "visited";
},"6":function(container,depth0,helpers,partials,data) {
    return "image";
},"8":function(container,depth0,helpers,partials,data) {
    return "css";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.title : stack1), depth0))
    + ".";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + ".";
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2]._globals : depths[2])) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.visited : stack1), depth0))
    + ".";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.srcHover : stack1), depth0))
    + "\" class=\"hotgrid-item-image-hover\"/>\r\n                        <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.srcVisited : stack1), depth0))
    + "\" class=\"hotgrid-item-image-visited\"/>                                          \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"component-inner hotgrid-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._hotgrid : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._components : stack1)) != null ? stack1._hotgrid : stack1)) != null ? stack1.ariaRegion : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = container.invokePartial(partials.component,depth0,{"name":"component","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    <div class=\"component-widget hotgrid-widget\">\r\n\r\n        <div class=\"hotgrid-grid\">\r\n            <div class=\"hotgrid-grid-inner clearfix\">\r\n                \r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                \r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true,"useDepths":true});Handlebars.templates['searchBox']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"list-item search\">\r\n    <input type=\"text\" placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\" class=\"search-box\">\r\n</div>\r\n";
},"useData":true});Handlebars.templates['searchResults']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"search-results-inner\">\r\n    <div class=\"search-results-content\">\r\n    </div>\r\n</div>";
},"useData":true});Handlebars.templates['searchResultsContent']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isAwaitingResults : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <div class=\"no-results\" tabindex=\"0\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.awaitingResultsMessage || (depth0 != null ? depth0.awaitingResultsMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"awaitingResultsMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" role=\"region\">\r\n        <div class=\"search-result-inner\">\r\n            "
    + ((stack1 = ((helper = (helper = helpers.awaitingResultsMessage || (depth0 != null ? depth0.awaitingResultsMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"awaitingResultsMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n        </div>\r\n    </div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.formattedResults : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(19, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "        <button class=\"base search-result\" data-id=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.searchTitle || (depth0 != null ? depth0.searchTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"searchTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ". "
    + ((stack1 = ((helper = (helper = helpers.textPreview || (depth0 != null ? depth0.textPreview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"textPreview","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">\r\n            <div class=\"search-result-inner\">\r\n                <div class=\"result-title\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[2] != null ? depths[2]._showHighlights : depths[2]),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.textPreview : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[2] != null ? depths[2]._showFoundWords : depths[2]),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </button>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return ((stack1 = ((helper = (helper = helpers.searchTitleTagged || (depth0 != null ? depth0.searchTitleTagged : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"searchTitleTagged","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return ((stack1 = ((helper = (helper = helpers.searchTitle || (depth0 != null ? depth0.searchTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"searchTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                    <div class=\"result-preview\">\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depths[2] != null ? depths[2]._showHighlights : depths[2]),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\"</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return ((stack1 = ((helper = (helper = helpers.textPreviewTagged || (depth0 != null ? depth0.textPreviewTagged : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"textPreviewTagged","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return ((stack1 = ((helper = (helper = helpers.textPreview || (depth0 != null ? depth0.textPreview : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"textPreview","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <div class=\"result-foundwords\"><i>"
    + ((stack1 = ((helper = (helper = helpers.foundWords || (depth0 != null ? depth0.foundWords : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"foundWords","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</i></div>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "         <div class=\"no-results\" tabindex=\"0\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.noResultsMessage || (depth0 != null ? depth0.noResultsMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"noResultsMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" role=\"region\">\r\n            <div class=\"search-result-inner\">\r\n                "
    + ((stack1 = ((helper = (helper = helpers.noResultsMessage || (depth0 != null ? depth0.noResultsMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"noResultsMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n            </div>\r\n        </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isBlank : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});Handlebars.templates['searchSingleItem']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"drawer-item\">\r\n	<div class=\"base drawer-item-open search-drawer\"> \r\n		<div class=\"drawer-item-title\">\r\n			<div class=\"drawer-item-title-inner h5\" tabindex=\"0\" aria-role=\"region\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n		</div>\r\n		<div class=\"drawer-item-description\">\r\n			<div class=\"drawer-item-description-inner\">"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.description : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\r\n		</div>\r\n	</div>\r\n</div>";
},"useData":true});Handlebars.templates['resources']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"base resources-show-all selected\" data-filter=\"all\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterAria : stack1)) != null ? stack1.allAria : stack1), depth0))
    + "\" tabindex=\"0\" role=\"button\">\r\n				<span>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterButtons : stack1)) != null ? stack1.all : stack1), depth0))
    + "</span>\r\n			</button>\r\n"
    + ((stack1 = (helpers.if_collection_contains || (depth0 && depth0.if_collection_contains) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),"_type","document",{"name":"if_collection_contains","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_collection_contains || (depth0 && depth0.if_collection_contains) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),"_type","media",{"name":"if_collection_contains","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_collection_contains || (depth0 && depth0.if_collection_contains) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),"_type","link",{"name":"if_collection_contains","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"base resources-show-document\" data-filter=\"document\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterAria : stack1)) != null ? stack1.documentAria : stack1), depth0))
    + "\" tabindex=\"0\" role=\"button\">\r\n				<span>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterButtons : stack1)) != null ? stack1.document : stack1), depth0))
    + "</span>\r\n			</button>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"base resources-show-media\" data-filter=\"media\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterAria : stack1)) != null ? stack1.mediaAria : stack1), depth0))
    + "\" tabindex=\"0\" role=\"button\">\r\n				<span>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterButtons : stack1)) != null ? stack1.media : stack1), depth0))
    + "</span>\r\n			</button>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"base resources-show-link\" data-filter=\"link\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterAria : stack1)) != null ? stack1.linkAria : stack1), depth0))
    + "\" tabindex=\"0\" role=\"button\">\r\n				<span>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1._filterButtons : stack1)) != null ? stack1.link : stack1), depth0))
    + "</span>\r\n			</button>\r\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "	<div class=\"resources-item drawer-item "
    + container.escapeExpression(((helper = (helper = helpers._type || (depth0 != null ? depth0._type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_type","hash":{},"data":data}) : helper)))
    + "\">\r\n		<button class=\"base resources-item-open drawer-item-open\" data-href=\""
    + container.escapeExpression(((helper = (helper = helpers._link || (depth0 != null ? depth0._link : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_link","hash":{},"data":data}) : helper)))
    + "\" tabindex=\"0\" role=\"button\" aria-label=\""
    + container.escapeExpression(helpers.lookup.call(depth0 != null ? depth0 : {},((stack1 = (depths[1] != null ? depths[1].model : depths[1])) != null ? stack1._filterButtons : stack1),(depth0 != null ? depth0._type : depth0),{"name":"lookup","hash":{},"data":data}))
    + ". "
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? depths[1].model : depths[1])) != null ? stack1.itemAriaExternal : stack1), depth0))
    + ". "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ". "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">\r\n			<div class=\"drawer-item-title\">\r\n				<div class=\"drawer-item-title-inner h5\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n			</div>\r\n			<div class=\"drawer-item-description\">\r\n				<div class=\"drawer-item-description-inner\">"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n			</div>\r\n		</button>\r\n	</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"resources-inner\" role=\"complementary\">\r\n	<div class=\"resources-filter clearfix resources-col-"
    + container.escapeExpression((helpers.return_column_layout_from_collection_length || (depth0 && depth0.return_column_layout_from_collection_length) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),"_type",{"name":"return_column_layout_from_collection_length","hash":{},"data":data}))
    + "\">\r\n"
    + ((stack1 = (helpers.if_collection_contains_only_one_item || (depth0 && depth0.if_collection_contains_only_one_item) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),"_type",{"name":"if_collection_contains_only_one_item","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "	</div>\r\n	<div class=\"resources-item-container\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.resources : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n	<div class=\"aria-label a11y-ignore-focus prevent-default\" tabindex=\"0\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._extensions : stack1)) != null ? stack1._resources : stack1)) != null ? stack1.resourcesEnd : stack1), depth0))
    + "\"/>\r\n</div>\r\n";
},"useData":true,"useDepths":true});Handlebars.templates['adapt-article-reveal']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n<div class=\"article-reveal-inner "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._classes : stack1), depth0))
    + "\" style=\"height:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._height : stack1), depth0))
    + "px; "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._backgroundImage : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._ariaRegions : stack1)) != null ? stack1.articleReveal : stack1), depth0))
    + "\">\r\n    \r\n    <a href=\"#\" class=\"article-reveal-open-button\" style=\"top:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._triggerPosition : stack1)) != null ? stack1._top : stack1), depth0))
    + "%; left:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._triggerPosition : stack1)) != null ? stack1._left : stack1), depth0))
    + "%;\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.openArticle : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1["_num-text"] : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "		<span class=\"article-reveal-open-button-text\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1["_icon-text"] : stack1), depth0))
    + "</span>\r\n		<div class=\"article-reveal-open-button-icon icon icon-plus\"></div>\r\n    </a>\r\n    \r\n</div>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " background: url('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._backgroundImage : stack1), depth0))
    + "') center top no-repeat; ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"article-reveal-open-button-number\">\r\n				<div class=\"article-reveal-open-button-number-inner\">\r\n					"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1["_num-text"] : stack1), depth0)) != null ? stack1 : "")
    + "\r\n				</div>\r\n			</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"article-reveal-open-button-arrow\">\r\n				<div class=\"article-reveal-open-button-arrow-inner\">\r\n					<span class=\"icon icon-arrow-down\"></span>\r\n				</div>\r\n			</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n<div class=\"article-reveal-inner "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._classes : stack1), depth0))
    + "\" style=\"height:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._mobileHeight : stack1), depth0))
    + "px; "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._mobileBackgroundImage : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._ariaRegions : stack1)) != null ? stack1.articleReveal : stack1), depth0))
    + "\">\r\n    \r\n    <a href=\"#\" class=\"article-reveal-open-button\" style=\"top:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._triggerPosition : stack1)) != null ? stack1._top : stack1), depth0))
    + "%; left:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._triggerPosition : stack1)) != null ? stack1._left : stack1), depth0))
    + "%;\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.openArticle : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1["_num-text"] : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "		<span class=\"article-reveal-open-button-text\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1["_icon-text"] : stack1), depth0))
    + "</span>\r\n		<div class=\"article-reveal-open-button-icon icon icon-plus\"></div>\r\n    </a>\r\n\r\n</div>\r\n\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " background: url('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._articleReveal : depth0)) != null ? stack1._mobileBackgroundImage : stack1), depth0))
    + "') center top no-repeat; ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isDesktop : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});Handlebars.templates['glossary']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"glossary-inner\" role=\"complementary\">\n    <div class=\"glossary-textbox-container\">\n        <label for=\"glossarySearch\" class=\"glossary-textbox-label icon icon-search\"></label>\n        <input id=\"glossarySearch\" type=\"text\" placeholder=\""
    + ((stack1 = ((helper = (helper = helpers.searchPlaceholder || (depth0 != null ? depth0.searchPlaceholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"searchPlaceholder","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" class=\"glossary-textbox\">\n        <div class=\"glossary-cancel-button icon icon-cross display-none\"></div>\n    </div>\n    <div class=\"glossary-checkbox-container\">\n        <input id=\"glossaryCheckbox\" type=\"checkbox\" class=\"glossary-checkbox\">\n        <label for=\"glossaryCheckbox\" class=\"glossary-checkbox-label\">"
    + ((stack1 = ((helper = (helper = helpers.searchWithInDescriptionLabel || (depth0 != null ? depth0.searchWithInDescriptionLabel : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"searchWithInDescriptionLabel","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</label>\n    </div>\n\n    <div class=\"glossary-items-container\"></div>\n\n    <div class=\"glossary-item-not-found h6 display-none\">"
    + ((stack1 = ((helper = (helper = helpers.itemNotFoundMessage || (depth0 != null ? depth0.itemNotFoundMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"itemNotFoundMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});Handlebars.templates['glossaryItem']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<button class=\"base glossary-item-term\" tabindex=\"0\" role=\"button\" aria-expanded=\"false\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"term","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">\n    <div class=\"glossary-item-term-inner h5\">\n        "
    + ((stack1 = ((helper = (helper = helpers.term || (depth0 != null ? depth0.term : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"term","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</button>\n<div class=\"glossary-item-description\">\n    <div class=\"glossary-item-description-inner\">\n        "
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.description : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});Handlebars.templates['pageLevelProgress']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "tabindex=\"0\"";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isPartOfAssessment : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "            <div role=\"listitem\" class=\"page-level-progress-item drawer-item\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisible : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "                    <div class=\"page-level-progress-item-title-inner accessible-text-block h5\">\r\n                    "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n                    </div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisible : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <button class=\"base page-level-progress-item-title clearfix drawer-item-open\" tabindex=\"0\" role=\"button\" data-page-level-progress-id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" aria-label=\""
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.complete : stack1), depth0));
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.incomplete : stack1), depth0));
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <div class=\"page-level-progress-item-title drawer-item-open disabled clearfix\">\r\n                    <span class=\"aria-label prevent-default\" tabindex=\"0\" role=\"button\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.locked : stack1), depth0))
    + ". "
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</span>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <div class=\"page-level-progress-indicator page-level-progress-indicator-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n                            <div class=\"page-level-progress-indicator-bar\">\r\n                            </div>\r\n                        </div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "complete";
},"15":function(container,depth0,helpers,partials,data) {
    return "incomplete";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isOptional : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <div class=\"page-level-progress-item-optional-text\">\r\n                            "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._extensions : stack1)) != null ? stack1._pageLevelProgress : stack1)) != null ? stack1.optionalContent : stack1), depth0))
    + "\r\n                            </div>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <div class=\"page-level-progress-indicator page-level-progress-indicator-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isInteractionComplete : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n                                <div class=\"page-level-progress-indicator-bar\">\r\n                                </div>\r\n                            </div>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "                </button>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "                </div>\r\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "            <div role=\"listitem\" class=\"page-level-progress-item drawer-item\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisible : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "                    <div class=\"page-level-progress-item-title-inner accessible-text-block h5\">\r\n                    "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n                    </div>\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.program(31, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisible : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <button class=\"base page-level-progress-item-title clearfix drawer-item-open\" tabindex=\"0\" role=\"button\" data-page-level-progress-id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" aria-label=\""
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <div class=\"page-level-progress-indicator page-level-progress-indicator-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n                            <div class=\"page-level-progress-indicator-bar\">\r\n                            </div>\r\n                        </div>\r\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isOptional : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(32, data, 0),"data":data})) != null ? stack1 : "");
},"32":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <div class=\"page-level-progress-indicator page-level-progress-indicator-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n                                <div class=\"page-level-progress-indicator-bar\">\r\n                                </div>\r\n                            </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"page-level-progress-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._extensions : stack1)) != null ? stack1._pageLevelProgress : stack1)) != null ? stack1.pageLevelProgress : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._extensions : stack1)) != null ? stack1._pageLevelProgress : stack1)) != null ? stack1.pageLevelProgress : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n    <div role=\"list\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.components : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"aria-label a11y-ignore-focus prevent-default\" tabindex=\"0\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._extensions : stack1)) != null ? stack1._pageLevelProgress : stack1)) != null ? stack1.pageLevelProgressEnd : stack1), depth0))
    + "\"/>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['pageLevelProgressMenu']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-level-progress-menu-item-indicator\">\r\n	<div class=\"page-level-progress-menu-item-indicator-bar\"><span class=\"aria-label\" role=\"region\" tabindex=\"0\"></span></div>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['pageLevelProgressNavigation']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"page-level-progress-navigation-completion\">\r\n    <div class=\"page-level-progress-navigation-bar\"></div>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['trickle-button']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " trickle-full-width";
},"3":function(container,depth0,helpers,partials,data) {
    return " locking";
},"5":function(container,depth0,helpers,partials,data) {
    return "display-none";
},"7":function(container,depth0,helpers,partials,data) {
    return "disabled\" disabled=\"disabled\"";
},"9":function(container,depth0,helpers,partials,data) {
    return "\"";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.finalText : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		        		"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.finalText : stack1), depth0)) != null ? stack1 : "")
    + "\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		        		"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.text : stack1), depth0)) != null ? stack1 : "")
    + "\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._isStart : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(20, data, 0),"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.startText : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			        		"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.startText : stack1), depth0)) != null ? stack1 : "")
    + "\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			        	"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1.text : stack1), depth0)) != null ? stack1 : "")
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"component "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._component : stack1), depth0))
    + "-component "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._component : stack1), depth0))
    + "-component-"
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._isFullWidth : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._className : stack1), depth0))
    + "\">\r\n	<div class=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._component : stack1), depth0))
    + "-inner component-inner"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._isLocking : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._isVisible : stack1),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	        <button role=\"button\" class=\"button "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._button : stack1)) != null ? stack1._isDisabled : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._trickle : depth0)) != null ? stack1._isFinal : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "	        </button>\r\n	</div>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['devtools']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"devtools-button-container\">\r\n    <div class=\"section-general\">\r\n        <span>General</span>\r\n    </div>\r\n    <div class=\"drawer-item toggle hinting\">\r\n        <input type=\"checkbox\" id=\"toggle-hinting\"/>\r\n        <label for=\"toggle-hinting\">\r\n            <div class=\"toggle-state\">\r\n                <div class=\"checkbox icon\"></div>\r\n            </div>\r\n            <div class=\"toggle-inner h5\">Question hinting</div>\r\n        </label>\r\n    </div>\r\n    <div class=\"drawer-item toggle auto-correct\">\r\n        <input type=\"checkbox\" id=\"toggle-auto-correct\"/>\r\n        <label for=\"toggle-auto-correct\">\r\n            <div class=\"toggle-state\">\r\n                <div class=\"checkbox icon\"></div>\r\n            </div>\r\n            <div class=\"toggle-inner h5\">Auto correct</div>\r\n        </label>\r\n    </div>\r\n    <div class=\"drawer-item tip auto-correct\"><em>ctrl+click submit to correctly answer questions (ctrl+shift+click for incorrect answer)</em></div>\r\n    <div class=\"drawer-item toggle feedback\">\r\n        <input type=\"checkbox\" id=\"toggle-feedback\"/>\r\n        <label for=\"toggle-feedback\">\r\n            <div class=\"toggle-state\">\r\n                <div class=\"checkbox icon\"></div>\r\n            </div>\r\n            <div class=\"toggle-inner h5\">Tutor</div>\r\n        </label>\r\n    </div>\r\n    <div class=\"drawer-item toggle alt-text\">\r\n        <input type=\"checkbox\" id=\"toggle-alt-text\"/>\r\n        <label for=\"toggle-alt-text\">\r\n            <div class=\"toggle-state\">\r\n                <div class=\"checkbox icon\"></div>\r\n            </div>\r\n            <div class=\"toggle-inner h5\">Show alt text</div>\r\n        </label>\r\n    </div>\r\n    <button class=\"drawer-item unlock\">Unlock</button>\r\n    <button class=\"drawer-item open-map\"><span>Open course map</span><span class=\"devtools-alpha\">ALPHA</span></button>\r\n    <div class=\"section-page\">\r\n        <span>Page</span>\r\n    </div>\r\n    <div class=\"drawer-item toggle banking\">\r\n        <input type=\"checkbox\" id=\"toggle-banking\"/>\r\n        <label for=\"toggle-banking\">\r\n            <div class=\"toggle-state\">\r\n                <div class=\"checkbox icon\"></div>\r\n            </div>\r\n            <div class=\"toggle-inner h5\">Question banks <em>(this page)</em></div>\r\n        </label>\r\n    </div>\r\n    <button class=\"drawer-item end-trickle\">Untrickle</button>\r\n    <button class=\"drawer-item complete-page\">Complete page</button>\r\n    <div class=\"drawer-item tip pass-half-fail\"></div>\r\n    <div class=\"pass-half-fail-container\">\r\n        <button class=\"drawer-item pass\">Pass</button>\r\n        <button class=\"drawer-item half\">Half</button>\r\n        <button class=\"drawer-item fail\">Fail</button>\r\n    </div>\r\n    <div class=\"drawer-item tip\"><em>Dev tip: control-click to reveal models</em></div>\r\n</div>";
},"useData":true});Handlebars.templates['devtoolsAnnotation']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "No alt text/aria-label";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"devtools-annotation\"><em class=\"annotation-text\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.text : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</em></span>";
},"useData":true});Handlebars.templates['devtoolsMap']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"devtools-map-container\">\r\n"
    + ((stack1 = container.invokePartial(partials.devtoolsMapMenu,(depth0 != null ? depth0.course : depth0),{"name":"devtoolsMapMenu","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});Handlebars.templates['devtoolsNavigation']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"base devtools-navigation-drawer-toggle-button icon icon-cog\">\r\n</a>\r\n";
},"useData":true});Handlebars.registerPartial('devtoolsMapMenu',Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.isMenu || (depth0 != null ? depth0.isMenu : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"isMenu","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(9, data, 0),"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.isMenu) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\"devtools-map-menu"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.last),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n			<a href=\"#"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "\" class=\"devtools-map-menu-title"
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isComplete",{"name":"when","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isOptional",{"name":"when","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n				<span class=\"devtools-map-abc-id\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n	            <span class=\"devtools-map-abc-label\">"
    + container.escapeExpression(((helper = (helper = helpers.getTitle || (depth0 != null ? depth0.getTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"getTitle","hash":{},"data":data}) : helper)))
    + "</span>\r\n			</a>\r\n			<div class=\"devtools-map-menu-items\">\r\n"
    + ((stack1 = container.invokePartial(partials.devtoolsMapMenu,depth0,{"name":"devtoolsMapMenu","data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "			</div>\r\n		</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " last";
},"5":function(container,depth0,helpers,partials,data) {
    return " devtools-map-completed";
},"7":function(container,depth0,helpers,partials,data) {
    return " devtools-map-optional";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.devtoolsMapPage,depth0,{"name":"devtoolsMapPage","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.eachChild || (depth0 != null ? depth0.eachChild : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"eachChild","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.eachChild) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"usePartial":true,"useData":true}));Handlebars.registerPartial('devtoolsMapPage',Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " last";
},"3":function(container,depth0,helpers,partials,data) {
    return " devtools-map-completed";
},"5":function(container,depth0,helpers,partials,data) {
    return " devtools-map-optional";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "			<div class=\"devtools-map-article"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.last),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	            <a href=\"#"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "\" class=\"devtools-map-article-title"
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isComplete",{"name":"when","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isOptional",{"name":"when","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	            	<div class=\"devtools-map-article-header\">\r\n	            		<span class=\"devtools-map-abc-id\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n	            		";
  stack1 = ((helper = (helper = helpers.isTrickled || (depth0 != null ? depth0.isTrickled : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"isTrickled","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.isTrickled) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n	            	</div\r\n	            	<span class=\"devtools-map-abc-label\">"
    + container.escapeExpression(((helper = (helper = helpers.getTitle || (depth0 != null ? depth0.getTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"getTitle","hash":{},"data":data}) : helper)))
    + "</span>\r\n	            </a>\r\n	            <div class=\"devtools-map-article-blocks\">\r\n";
  stack1 = ((helper = (helper = helpers.eachChild || (depth0 != null ? depth0.eachChild : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"eachChild","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.eachChild) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	            </div>\r\n		    </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "<div class=\"trickled\"></div>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "		                <div class=\"devtools-map-block"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.last),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.isTrickled || (depth0 != null ? depth0.isTrickled : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"isTrickled","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.isTrickled) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\r\n		                    <a href=\"#"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "\" class=\"devtools-map-block-title"
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isComplete",{"name":"when","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isOptional",{"name":"when","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n		                        <span class=\"devtools-map-abc-id\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n		                    </a>\r\n		                    <div class=\"devtools-map-block-components\">\r\n";
  stack1 = ((helper = (helper = helpers.eachChild || (depth0 != null ? depth0.eachChild : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"eachChild","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.eachChild) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		                	</div>\r\n		                </div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return " trickled";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "				                	<a href=\"#"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "\" class=\"devtools-map-component"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.last),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " devtools-map-component-"
    + container.escapeExpression(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"index","hash":{},"data":data}) : helper)))
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isComplete",{"name":"when","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isOptional",{"name":"when","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isSubmitted",{"name":"when","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n				                        <span class=\"devtools-map-abc-id\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n				                        <div class=\"devtools-map-component-info\">\r\n				                        	<span class=\"devtools-map-component-type\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_component",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n				                        	<span class=\"devtools-map-component-mark\"></span>\r\n				                    	</div>\r\n				                        <span class=\"devtools-map-component-label\">"
    + container.escapeExpression(((helper = (helper = helpers.getTitle || (depth0 != null ? depth0.getTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"getTitle","hash":{},"data":data}) : helper)))
    + "</span>\r\n				                    </a>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isCorrect",{"name":"when","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "correct";
},"17":function(container,depth0,helpers,partials,data) {
    return "incorrect";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"devtools-map-content-object"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(data && data.last),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	<a href=\"#"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "\" class=\"devtools-map-content-object-title"
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isComplete",{"name":"when","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.when || (depth0 && depth0.when) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_isOptional",{"name":"when","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n		<span class=\"devtools-map-abc-id\">"
    + container.escapeExpression((helpers.getProp || (depth0 && depth0.getProp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"_id",{"name":"getProp","hash":{},"data":data}))
    + "</span>\r\n	    <span class=\"devtools-map-abc-label\">"
    + container.escapeExpression(((helper = (helper = helpers.getTitle || (depth0 != null ? depth0.getTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"getTitle","hash":{},"data":data}) : helper)))
    + "</span>\r\n	</a>\r\n	<div class=\"devtools-map-article-container\">\r\n";
  stack1 = ((helper = (helper = helpers.eachChild || (depth0 != null ? depth0.eachChild : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"eachChild","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.eachChild) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\r\n</div>";
},"useData":true}));Handlebars.templates['inspector']=Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "<div class=\"inspector-inner\">\r\n	<"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._tracUrl : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + " class=\"inspector-text a11y-ignore\" title=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._parentId : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._classes : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._layout : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "Title: "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._component : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._selectable : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._component : depth0),"matching",{"name":"if_value_equals","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._component : depth0),"slider",{"name":"if_value_equals","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._component : depth0),"textinput",{"name":"if_value_equals","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" tabindex=\"-1\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._component : depth0),{"name":"if","hash":{},"fn":container.program(46, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + container.escapeExpression(((helper = (helper = helpers._type || (depth0 != null ? depth0._type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_type","hash":{},"data":data}) : helper)))
    + " <span class=\"inspector-id\">"
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_id","hash":{},"data":data}) : helper)))
    + "</span></"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._tracUrl : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ">\r\n	<div class=\"inspector-arrow\"></div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "a href=\""
    + container.escapeExpression(((helper = (helper = helpers._tracUrl || (depth0 != null ? depth0._tracUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_tracUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"";
},"4":function(container,depth0,helpers,partials,data) {
    return "div";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Parent: "
    + container.escapeExpression(((helper = (helper = helpers._parentId || (depth0 != null ? depth0._parentId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_parentId","hash":{},"data":data}) : helper)))
    + "\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Classes: "
    + container.escapeExpression(((helper = (helper = helpers._classes || (depth0 != null ? depth0._classes : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_classes","hash":{},"data":data}) : helper)))
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Layout: "
    + container.escapeExpression(((helper = (helper = helpers._layout || (depth0 != null ? depth0._layout : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_layout","hash":{},"data":data}) : helper)))
    + "\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)));
},"14":function(container,depth0,helpers,partials,data) {
    return "<none>";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\nPage Level Progress: "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._pageLevelProgress : depth0)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "enabled";
},"19":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\nCorrect:"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._shouldBeSelected : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((helpers.numbers || (depth0 && depth0.numbers) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(data && data.index),{"name":"numbers","hash":{},"data":data}));
},"25":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\nCorrect:"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"26":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depths[1] != null ? depths[1]._items : depths[1])) != null ? stack1["1"] : stack1),{"name":"if","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._options : depth0),{"name":"each","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data) {
    return "\r\n"
    + container.escapeExpression((helpers.numbers || (depth0 && depth0.numbers) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(data && data.index),{"name":"numbers","hash":{},"data":data}))
    + ".";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"30":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)));
},"32":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\nCorrect: "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._correctAnswer : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.program(35, data, 0),"data":data})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers._correctAnswer || (depth0 != null ? depth0._correctAnswer : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_correctAnswer","hash":{},"data":data}) : helper)));
},"35":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._correctRange : depth0)) != null ? stack1._bottom : stack1), depth0))
    + "–"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._correctRange : depth0)) != null ? stack1._top : stack1), depth0));
},"37":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\nCorrect:"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._answers : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0, blockParams, depths),"inverse":container.program(43, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"38":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._answers : depth0),{"name":"each","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"39":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"40":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(depth0, depth0))
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(data && data.last),{"name":"unless","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"41":function(container,depth0,helpers,partials,data) {
    return ", ";
},"43":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._items : depth0),{"name":"each","hash":{},"fn":container.program(44, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"44":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depths[1] != null ? depths[1]._items : depths[1])) != null ? stack1["1"] : stack1),{"name":"if","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._answers : depth0),{"name":"each","hash":{},"fn":container.program(40, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"46":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + " ";
},"48":function(container,depth0,helpers,partials,data) {
    return "a";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});Handlebars.templates['quicknav-bar']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n	<button id=\"previous\" class=\"button icon "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1._icon : stack1), depth0))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isFirstPage : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isFirstPage : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1.text : stack1), depth0))
    + "\"></button>\r\n\r\n	<button id=\"root\" class=\"button icon "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1._icon : stack1), depth0))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1.text : stack1), depth0))
    + "\"></button>\r\n\r\n	<button id=\"up\" class=\"button icon "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1._icon : stack1), depth0))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1.text : stack1), depth0))
    + "\"></button>\r\n\r\n	<button id=\"next\" class=\"button icon "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1._icon : stack1), depth0))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isLastPage : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isLastPage : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1.text : stack1), depth0))
    + "\"></button>\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " display-none";
},"4":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"6":function(container,depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n	<button id=\"previous\" class=\"button"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isFirstPage : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isFirstPage : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1.text : stack1), depth0))
    + "\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._previous : stack1)) != null ? stack1.text : stack1), depth0))
    + "</button>\r\n\r\n	<button id=\"root\" class=\"button"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1.text : stack1), depth0))
    + "\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._root : stack1)) != null ? stack1.text : stack1), depth0))
    + "</button>\r\n\r\n	<button id=\"up\" class=\"button"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1.text : stack1), depth0))
    + "\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._up : stack1)) != null ? stack1.text : stack1), depth0))
    + "</button>\r\n\r\n	<button id=\"next\" class=\"button"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1._isHidden : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isLastPage : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.state : depth0)) != null ? stack1.isLastPage : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1.text : stack1), depth0))
    + "\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._next : stack1)) != null ? stack1.text : stack1), depth0))
    + "</button>\r\n	\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"block-inner quicknav-inner\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0.config : depth0)) != null ? stack1._buttons : stack1)) != null ? stack1._hasIcons : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"useData":true});Handlebars.templates['quicknav']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});Handlebars.templates['boxmenu-item']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return " -->\n    <div class=\"menu-item-header-inner\">\n        <div class=\"menu-item-header-title\">\n            <div class=\"menu-item-header-title-inner\">\n                "
    + ((stack1 = ((helper = (helper = helpers.menuHeaderText || (depth0 != null ? depth0.menuHeaderText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"menuHeaderText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n<!-- ";
},"3":function(container,depth0,helpers,partials,data) {
    return "tabindex=\"0\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1), depth0))
    + "\" alt=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" />\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.visited : stack1), depth0));
},"9":function(container,depth0,helpers,partials,data) {
    return "visited";
},"11":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"13":function(container,depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "            <span class=\"menu-item-duration accessible-text-block\" role=\"region\" tabindex=\"0\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.durationLabel : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = ((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"duration","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.durationLabel : stack1), depth0)) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!-- "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.menuHeaderText : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->\n\n<div class=\"menu-item-inner\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.menuItem : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.menuItem : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <div class=\"menu-item-graphic\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.src : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"menu-item-title\">\n        <div class=\"menu-item-title-inner h3 accessible-text-block\" role=\"heading\" aria-level=\"2\" tabindex=\"0\">"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n    </div>\n    <div class=\"menu-item-body\">\n        <div class=\"menu-item-body-inner\">"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n    </div>\n    <div class=\"menu-item-button\">\n        <button aria-label=\""
    + container.escapeExpression(((helper = (helper = helpers.linkText || (depth0 != null ? depth0.linkText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"linkText","hash":{},"data":data}) : helper)))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisited : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" class=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isVisited : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isLocked : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " accessible-text-block\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isLocked : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n            "
    + ((stack1 = ((helper = (helper = helpers.linkText || (depth0 != null ? depth0.linkText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"linkText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </button>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.duration : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});Handlebars.templates['boxmenu']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "				<div class=\"menu-title\">\n					<div class=\"menu-title-inner h1 accessible-text-block\" role=\"heading\" aria-level=\"1\" tabindex=\"0\">\n						"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n					</div>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"menu-body\">\n						<div class=\"menu-body-inner accessible-text-block\">\n							"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\n						</div>\n					</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"menu-container\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.ariaRegion : stack1), depth0))
    + "\">\n	<div class='menu-container-inner box-menu-inner clearfix'>\n		<div class=\"menu-header\">\n			<div class=\"menu-header-inner\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n		</div>\n	</div>\n	<div class=\"aria-label relative a11y-ignore-focus prevent-default\" tabindex=\"0\" role=\"region\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._menu : stack1)) != null ? stack1._boxmenu : stack1)) != null ? stack1.menuEnd : stack1), depth0))
    + "</div>\n</div>\n";
},"useData":true});Handlebars.templates['article']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\"article-title "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n			<div role=\"heading\" tabindex=\"0\" class=\"article-title-inner h2\"  aria-level=\"2\">\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._articleHeading : stack1), depth0)) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._articleHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "<span><span>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._articleHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "</span></span>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"article-body\">\r\n			<div class=\"article-body-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"article-instruction\">\r\n			<div class=\"article-instruction-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "\r\n"
    + container.escapeExpression(((helper = (helper = helpers.themeConfig || (depth0 != null ? depth0.themeConfig : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"themeConfig","hash":{},"data":data}) : helper)))
    + "\r\n\r\n<div class=\"article-inner block-container\">\r\n\r\n	<div class=\"article-header\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n\r\n</div>\r\n";
},"useData":true});Handlebars.templates['block']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"block-icon\">\r\n			<div class=\"block-icon-inner\">\r\n				<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._blockIcon : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\" data=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.blockIcon : depth0)) != null ? stack1.icon : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.blockIcon : depth0)) != null ? stack1.alt : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "/>\r\n			</div>\r\n		</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.blockIcon : depth0)) != null ? stack1.alt : stack1), depth0))
    + "\" tabindex=\"0\"";
},"4":function(container,depth0,helpers,partials,data) {
    return " class=\"a11y-ignore\" aria-hidden=\"true\" tabindex=\"-1\"";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\"block-title "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n			<div role=\"heading\" tabindex=\"0\" class=\"block-title-inner h3\"  aria-level=\"3\">\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._blockHeading : stack1), depth0)) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._blockHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "<span><span>";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._blockHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "</span></span>";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"block-body\">\r\n			<div class=\"block-body-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"block-instruction\">\r\n			<div class=\"block-instruction-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "\r\n"
    + container.escapeExpression(((helper = (helper = helpers.themeConfig || (depth0 != null ? depth0.themeConfig : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"themeConfig","hash":{},"data":data}) : helper)))
    + "\r\n<div class=\"block-inner\">\r\n	<div class=\"block-inner-left\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._blockIcon : depth0)) != null ? stack1.icon : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n	<div class=\"block-inner-right\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n\r\n	<div class=\"component-container\"></div>\r\n	\r\n</div>\r\n";
},"useData":true});Handlebars.templates['buttons']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"buttons-marking-icon icon display-none\"></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"buttons-display\">\r\n		<div class=\"buttons-marking-icon icon display-none\"></div>\r\n		<div class=\"buttons-display-inner\"></div>\r\n	</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"buttons-inner\">\r\n\r\n	<div class=\"buttons-cluster clearfix\">\r\n\r\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._shouldDisplayAttempts : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n		<button class=\"buttons-action\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1._submit : stack1)) != null ? stack1.ariaLabel : stack1), depth0))
    + "\">\r\n			"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1._submit : stack1)) != null ? stack1.buttonText : stack1), depth0)) != null ? stack1 : "")
    + "\r\n		</button>\r\n		<button class=\"buttons-feedback\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1._showFeedback : stack1)) != null ? stack1.ariaLabel : stack1), depth0))
    + "\" disabled=\"true\">\r\n			"
    + ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1._showFeedback : stack1)) != null ? stack1.buttonText : stack1), depth0)) != null ? stack1 : "")
    + "\r\n		</button>\r\n	</div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._shouldDisplayAttempts : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"useData":true});Handlebars.templates['drawer']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"drawer-inner\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.drawer : stack1), depth0))
    + "\">\r\n\r\n	<div class=\"drawer-toolbar clearfix\">\r\n		<div class=\"drawer-back-button\">\r\n			<button class=\"base drawer-back icon icon-controls-small-left\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.previous : stack1), depth0))
    + "\"></button>\r\n		</div>\r\n\r\n		<div class=\"drawer-close-button\">\r\n			<button class=\"base drawer-close icon icon-cross\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.closeDrawer : stack1), depth0))
    + "\"></button>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"drawer-holder\"></div>\r\n\r\n</div>\r\n";
},"useData":true});Handlebars.templates['drawerItem']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<button class=\"base drawer-item-open "
    + container.escapeExpression(((helper = (helper = helpers.className || (depth0 != null ? depth0.className : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"className","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n	<div class=\"drawer-item-title\">\r\n		<div class=\"drawer-item-title-inner h5\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n	</div>\r\n\r\n	<div class=\"drawer-item-description\">\r\n		<div class=\"drawer-item-description-inner\">"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.description : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\r\n	</div>\r\n\r\n</button>\r\n";
},"useData":true});Handlebars.templates['loading']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"loading\">\r\n	<div class=\"loader-gif\"></div>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['navigation']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n<div class=\"navigation-inner clearfix\" role=\"navigation\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.navigation : stack1), depth0))
    + "\">\r\n	<button class=\"base navigation-back-button icon icon-home\" data-event=\"backButton\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.previous : stack1), depth0))
    + "\"></button>\r\n	<div class=\"navigation-logo\">\r\n		<div class=\"navigation-logo-inner\" />\r\n	</div>\r\n	<button class=\"base navigation-drawer-toggle-button icon icon-list\" data-event=\"toggleDrawer\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.navigationDrawer : stack1), depth0))
    + "\"></button>\r\n</div>\r\n";
},"useData":true});Handlebars.templates['notify']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"notify-popup-icon\">\r\n						<div class=\"icon"
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._type : depth0),"prompt",{"name":"if_value_equals","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._type : depth0),"alert",{"name":"if_value_equals","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n						</div>\r\n					</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " icon-question";
},"4":function(container,depth0,helpers,partials,data) {
    return " icon-warning";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "					<div class=\"notify-popup-title\">\r\n						<div class=\"notify-popup-title-inner\" tabindex=\"0\" role=\"heading\" aria-level=\"1\">\r\n						"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n						</div>\r\n					</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"notify-popup-body\">\r\n						<div class=\"notify-popup-body-inner\">"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\r\n					</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "				<div class=\"notify-popup-buttons\">\r\n					<button class=\"notify-popup-button notify-popup-alert-button\" role=\"button\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.confirmText || (depth0 != null ? depth0.confirmText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"confirmText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.confirmText || (depth0 != null ? depth0.confirmText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"confirmText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\r\n				</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"notify-popup-buttons\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._prompts : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "						<button class=\"notify-popup-button notify-popup-prompt-button\" data-event=\""
    + container.escapeExpression(((helper = (helper = helpers._callbackEvent || (depth0 != null ? depth0._callbackEvent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_callbackEvent","hash":{},"data":data}) : helper)))
    + "\" role=\"button\" aria-label=\""
    + ((stack1 = ((helper = (helper = helpers.promptText || (depth0 != null ? depth0.promptText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"promptText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.promptText || (depth0 != null ? depth0.promptText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"promptText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"base notify-popup-done\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.closePopup : stack1), depth0))
    + "\">\r\n				<div class=\"notify-popup-icon-close icon icon-cross\"></div>\r\n			</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"notify-popup notify-type-"
    + container.escapeExpression(((helper = (helper = helpers._type || (depth0 != null ? depth0._type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_type","hash":{},"data":data}) : helper)))
    + " "
    + container.escapeExpression(((helper = (helper = helpers._classes || (depth0 != null ? depth0._classes : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_classes","hash":{},"data":data}) : helper)))
    + "\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.feedbackPopUp : stack1), depth0))
    + "\">\r\n	<div class=\"notify-popup-inner\">\r\n\r\n		<div class=\"notify-popup-content\">\r\n			<div class=\"notify-popup-content-inner\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._showIcon : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._type : depth0),"alert",{"name":"if_value_equals","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._type : depth0),"prompt",{"name":"if_value_equals","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n\r\n"
    + ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._type : depth0),"popup",{"name":"if_value_equals","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n	</div>\r\n</div>\r\n\r\n<div class=\"notify-shadow\"></div>\r\n";
},"useData":true});Handlebars.templates['notifyPush']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"notify-push-inner\" role=\"region\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.feedbackPopUp : stack1), depth0))
    + "\">\r\n\r\n	<div class=\"notify-push-title\">\r\n		<div class=\"notify-push-title-inner h5\" tabindex=\"0\" role=\"heading\" aria-level=\"1\">\r\n			"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"notify-push-body\">\r\n		<div class=\"notify-push-body-inner\">\r\n			"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n		</div>\r\n	</div>\r\n\r\n</div>\r\n\r\n<button class=\"base notify-push-close\" role=\"button\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.closePopup : stack1), depth0))
    + "\">\r\n	<span class=\"icon icon-cross\"></span>\r\n</button>\r\n";
},"useData":true});Handlebars.templates['page']=Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"page-header-progress\">\r\n			<div class=\"page-header-progress-inner\">\r\n				<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.pageHeaderProgress : stack1), depth0))
    + "\" data=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.graphic : depth0)) != null ? stack1.pageHeaderProgress : stack1), depth0))
    + "\" />\r\n			</div>\r\n		</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"page-header"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._pageHeader : stack1)) != null ? stack1._showScrollButton : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n		<div class=\"page-header-inner clearfix\">\r\n\r\n			<div class=\"page-header-content\">\r\n				<div class=\"page-header-content-inner\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n				</div>\r\n			</div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._pageHeader : stack1)) != null ? stack1._showScrollButton : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n		</div>\r\n	</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " has-scroll";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "					<div class=\"page-title "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n						<div class=\"page-title-inner h1\" role=\"heading\" tabindex=\"0\" aria-level=\"1\">\r\n							"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n							"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n							"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n						</div>\r\n					</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._pageHeading : stack1), depth0)) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._pageHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "<span><span>";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._pageHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "</span></span>";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"page-body\">\r\n						<div class=\"page-body-inner\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.pageBody : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "						</div>\r\n					</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.pageBody : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"page-instruction\">\r\n						<div class=\"page-instruction-inner\">\r\n							"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n						</div>\r\n					</div>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"page-header-scroll-button\">\r\n				<button class=\"base page-header-scroll-button-inner icon icon-controls-down a11y-ignore\" tabindex=\"-1\" aria-hidden=\"true\"></button>\r\n			</div>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"page-header\">\r\n		<div class=\"page-header-inner clearfix\">\r\n\r\n			<div class=\"page-header-content\">\r\n				<div class=\"page-header-content-inner\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n	</div>\r\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "					<div class=\"page-title\">\r\n						<div class=\"page-title-inner h1\" role=\"heading\" tabindex=\"0\" aria-level=\"1\">\r\n							"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n						</div>\r\n					</div>\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"page-footer\" style=\"background-color:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._pageFooter : stack1)) != null ? stack1._backgroundColor : stack1), depth0))
    + ";\">\r\n		<div class=\"page-footer-inner clearfix\"></div>\r\n	</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"page-inner article-container\" role=\"main\" aria-label=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._accessibility : depth0)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.page : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0._graphic : depth0)) != null ? stack1.pageHeaderProgress : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._pageHeader : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n</div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._pageFooter : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});Handlebars.templates['shadow']=Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"shadow\" class=\"shadow display-none\"></div>\r\n";
},"useData":true});Handlebars.registerPartial('buttons',Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<button class=\"base button submit\">\r\n	<span>\r\n		"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1.submit : stack1), depth0)) != null ? stack1 : "")
    + " \r\n	</span>\r\n</button>\r\n<button class=\"base button reset\">\r\n	<span>\r\n		"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1.reset : stack1), depth0)) != null ? stack1 : "")
    + " \r\n	</span>\r\n</button> \r\n<button class=\"base button model\">\r\n	<span>\r\n		"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1.showCorrectAnswer : stack1), depth0)) != null ? stack1 : "")
    + " \r\n	</span>\r\n</button>\r\n<button class=\"base button user\">\r\n	<span>\r\n		"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0._buttons : depth0)) != null ? stack1.hideCorrectAnswer : stack1), depth0)) != null ? stack1 : "")
    + " \r\n	</span>\r\n</button>";
},"useData":true}));Handlebars.registerPartial('component',Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-title component-title "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n			<div role=\"heading\" tabindex=\"0\" class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-title-inner component-title-inner\"  aria-level=\"4\">\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = ((helper = (helper = helpers.displayTitle || (depth0 != null ? depth0.displayTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"displayTitle","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n				"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._isEnabled : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._componentHeading : stack1), depth0)) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._componentHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "<span><span>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_value_equals || (depth0 && depth0.if_value_equals) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0._theme : depth0)) != null ? stack1._headings : stack1)) != null ? stack1._componentHeading : stack1),"magazine",{"name":"if_value_equals","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "</span></span>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-body component-body\">\r\n			<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-body-inner component-body-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "		<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-instruction component-instruction\">\r\n			<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-instruction-inner component-instruction-inner\">\r\n				"
    + ((stack1 = (helpers.a11y_text || (depth0 && depth0.a11y_text) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"a11y_text","hash":{},"data":data})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return container.escapeExpression(((helper = (helper = helpers.themeConfig || (depth0 != null ? depth0.themeConfig : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"themeConfig","hash":{},"data":data}) : helper)))
    + "\r\n\r\n<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-header component-header\">\r\n	<div class=\""
    + container.escapeExpression(((helper = (helper = helpers._component || (depth0 != null ? depth0._component : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"_component","hash":{},"data":data}) : helper)))
    + "-header-inner component-header-inner\">\r\n\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.body : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.instruction : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n	</div>\r\n</div>\r\n";
},"useData":true}));Handlebars.registerPartial('state',Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<span tabindex=\"0\" role=\"region\" class=\"aria-label a11y-ignore-focus prevent-default\" id=\"buttons-aria-label-complete\">"
    + container.escapeExpression((helpers.a11y_normalize || (depth0 && depth0.a11y_normalize) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"a11y_normalize","hash":{},"data":data}))
    + " "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.complete : stack1), depth0))
    + " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isQuestionType : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._canShowFeedback : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isCorrect : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.correct : stack1), depth0));
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.incorrect : stack1), depth0));
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<span tabindex=\"0\" role=\"region\" class=\"aria-label a11y-ignore-focus prevent-default\" id=\"buttons-aria-label-incomplete\">"
    + container.escapeExpression((helpers.a11y_normalize || (depth0 && depth0.a11y_normalize) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.displayTitle : depth0),{"name":"a11y_normalize","hash":{},"data":data}))
    + " "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0._globals : depth0)) != null ? stack1._accessibility : stack1)) != null ? stack1._ariaLabels : stack1)) != null ? stack1.incomplete : stack1), depth0))
    + "</span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"accessibility-state\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0._isComplete : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true}));});
$.widget("xfaWidget.XfaHMRCCheckbox", $.xfaWidget.XfaCheckBox, {

    _widgetName : "XfaHMRCCheckbox",

    getOptionsMap : function() {
		var parentOptionsMap = $.xfaWidget.XfaCheckBox.prototype.getOptionsMap.apply(this, arguments);
        return $.extend({}, parentOptionsMap, {
            "displayValue": function (val) {
                parentOptionsMap.displayValue.apply(this, arguments);
                this.element.toggleClass("selected", this.options.state === 0);
            }
        })
    },
    getCommitValue : function() {
		var retVal = $.xfaWidget.XfaCheckBox.prototype.getCommitValue.apply(this,arguments);
        this.element.toggleClass("selected", this.options.state === 0);
        return retVal;
    }
})


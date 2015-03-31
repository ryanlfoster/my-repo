/*//////////////////////////////////////////////////////////////////////////////////////////*/
/*/										functions										   /*/
/*//////////////////////////////////////////////////////////////////////////////////////////*/

function setTemplate(dialog, record){

    //	dialog fields
    var titleField = dialog.getField("./jcr:title"),
        mandatoryField = dialog.getField("./mandatory"),
    	validationField = dialog.getField("./validateExp"),
		validationRequiredMessageField = dialog.getField("./mandatoryMessage"),
		validationMessageField = dialog.getField("./validateExpMessage"),

        arrIndex = null;

    //	gets the index of the selected template
    _.each(jsonarr, function(data, id) {
        if (_.isEqual(data.value, record.data.value)) {
            arrIndex = id;
            return;
        }
    });

    //	gets the current template as an element of the array that matches the index
    var cTemplate = jsonarr[arrIndex];

    //	sets all the fields to the retrived values
    titleField.setValue(cTemplate.title);
    mandatoryField.setValue(cTemplate.mandatory);
    validationField.setValue(cTemplate.validationFunc);
    validationRequiredMessageField.setValue(cTemplate.validationRequiredMessage);
    validationMessageField.setValue(cTemplate.validationMessage);

}

//----------------------------------------------------------------------------//

CQ.form.TemplateSelector = CQ.Ext.extend(CQ.form.Selection, {

    /**
     * Fires the "selectionchanged" event for comboboxes.
     * @param {Element} combo the checkbox/radiobutton
     * @param {Record} record the selected <code>Ext.data.Record</code>
     * @param {Number} index the selected index
     * @private
     */
    fireComboboxSelectionChanged: function(combo, record, index) {
        this.fireEvent(CQ.form.Selection.EVENT_SELECTION_CHANGED,
                this, record.data.value, true);

        //	call custom function and pass data and dialog
        var dialog = this.findParentByType("dialog");
        setTemplate(dialog, record);
    }
});

CQ.form.TemplateSelector.EVENT_SELECTION_CHANGED = "selectionchanged";
CQ.form.TemplateSelector.PATH_PLACEHOLDER = "$PATH";
CQ.form.TemplateSelector.PATH_PLACEHOLDER_REGEX = /\$PATH/g;

CQ.Ext.reg("templateselector", CQ.form.TemplateSelector);

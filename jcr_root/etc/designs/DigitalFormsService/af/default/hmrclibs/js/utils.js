
/*
Map for replacing dangerous HTML characters with something safer
*/
var safeEntityMap =
{
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
};

/**

Replace HTML special characters in a string with escaped alternatives.

@param string String to escape
@return the escaped string.

*/

function isTrulyVisible(cmp){
	var isVisible = true;
    var currentObject = cmp;
    while (isVisible && currentObject != null)
    {
        isVisible = currentObject.visible;
        currentObject = currentObject.parent;
    }
    return isVisible;
}

function safeEscapeHtml(string)
{
    return String(string).replace(/[&<>"'\/]/g, function (aChar)
    {
      return safeEntityMap[aChar];
    });
}

function forceValidate(field){
	window.guideBridge.validate([],field.somExpression)
}



function validateAndSubmit(){
    if(window.guideBridge.validate([])){
        //	if form is valid, submit it
        window.guideBridge.submit()
    }
}

function addLeadingZeroBelowLength(a,targetLength) {
    str = a.value.toString();
    if (str.length < targetLength){
		var diff = targetLength - str.length;
        for(var i = 0; i < diff; i++){
			a.value = "0" + a.value;
        }
    }
}

function upperCaseField(a){
    var val = a.value;
    a.value = val.toUpperCase();
	return val;
}

//	add this to the options expression in the dropdown field
function taxYearsList(from, to) {
    var dteNow = new Date();
    var yr = dteNow.getUTCFullYear();
    var dte5AprilThisYear = new Date(yr,3,6);
    var taxYear = (dteNow < dte5AprilThisYear) ? yr : yr+1;
	var years = [];

    //------- Settings --------//
    var earliest = taxYear + from;
    var latest = taxYear + to;
    //-------------------------//

	var numYears = Math.abs(latest - earliest);
    for(var i = 0; i < numYears; i++){
		years.push(latest - i)
    }
    return years;
}


//-----------------------------------------------------------------------------------------------//
//	Functions for dynamically changing fields data or labels etc
//-----------------------------------------------------------------------------------------------//

//	tax year radio buttons that need their values and labels changed based on the current tax year
function dynamicTaxYearRadio(object){
	var taxYears = taxYearsList(-5,-1)
    var taxYearsOptions = [];
    var $taxYearField = $("#" + object.id)
    var $taxYearChildElements = $taxYearField.children();
    $taxYearChildElements.children().find("label").each(function(index){
        var labelText = "6 April "+(taxYears[index]-1)+" to 5 April "+taxYears[index];
        $(this).text(labelText);
        taxYearsOptions.push(index+"="+labelText)
    });
	//console.log(object.options.jsonModel.options)
    $(object)[0].options.jsonModel.options = taxYearsOptions;
}



//	label change function
// @object refers to the object we want to change the label of
// @newLabel refers to the new label as a string

function changeLabel(object, newLabel){
	$('#'+object.id).find('label')[0].innerHTML = safeEscapeHtml(newLabel);
}


function addRepeat(object){

    object.instanceManager.addInstance();
    var title = object.panel.repeatHeading_title.value;
    var children = object.instanceManager.instances;
    var childLength = children.length;
    var lastChild = children[childLength - 1];
    var childHeading = lastChild.panel.repeatHeading_title;
    var titleText = $(title).text();
	childHeading.value = '<h4>' + titleText + " " + childLength + '</h4><br/>';
}

function repeatStart(object) {

    var title = object.panel.repeatHeading_title.value;
    var titleText = $(title).text();
	$('.repeatTitle').html(titleText + ' 1');
}

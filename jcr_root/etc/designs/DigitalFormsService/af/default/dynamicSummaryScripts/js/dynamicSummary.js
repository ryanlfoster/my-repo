var isPageValid;

//==============================//
//			Main code           //
//==============================//
function initDynamicSummary(){
    console.log("summary init");
}

//	main variables
var fieldArray = [];


//	generate field array to contain all components and various properties needed for display
function dynamicSummary(){
    fieldArray = [];	//	clear array so everytime this is called we update the data
    window.guideBridge.visit(function(cmp){
         var name = cmp.name;
         if(name && isVisible(cmp)){
            var grouped = isGrouped(cmp);
            var hideLabel = isHideLabel(cmp);
            var hideLink = isHideLink(cmp);

            if(name.indexOf("block_heading_") == 0){//	check if block heading (like for the address block fields)
                fieldArray.push({"type":"block_heading","size":size(cmp),"name":cmp.name,"value":$(cmp.value).html(),"grouped":grouped, "hideLink":hideLink, "className":cmp.className, "cssClassName":cmp.cssClassName,"id":cmp.id,"som":cmp.somExpression});
            }
            else if(name.indexOf("block_") == 0) {//	check if object is a group panel
                fieldArray.push({"type":"block","size":size(cmp),"name":cmp.name,"title":cmp.title, "grouped":grouped, "className":cmp.className, "id":cmp.id,"som":cmp.somExpression});
            }
            else if(name.indexOf("heading_") == 0){//	check if heading
                fieldArray.push({"type":"heading","size":size(cmp),"name":cmp.name,"value":$(cmp.value).html(),"grouped":grouped, "hideLink":hideLink, "className":cmp.className, "cssClassName":cmp.cssClassName,"id":cmp.id,"som":cmp.somExpression});
            }
            else{
                //if(cmp.value != null){
                    if(cmp.className == "guideTextBox"){
                        fieldArray.push({"type":"field","name":cmp.name,"title":cmp.title,"grouped":grouped,"hideLabel":hideLabel, "hideLink":hideLink, "value":((cmp.value)?cmp.value:"Not provided"),"className":cmp.className,"id":cmp.id,"som":cmp.somExpression});
                    }
                    if(cmp.className == "guideRadioButton" ||
                        cmp.className == "guideCheckBox" ){
                        fieldArray.push({"type":"option","name":cmp.name,"title":cmp.title,"grouped":grouped,"hideLabel":hideLabel,"hideLink":hideLink, "value":((cmp.value)?cmp.value:"Not provided"), "obj":cmp,"className":cmp.className,"id":cmp.id,"som":cmp.somExpression});
                    }
                //}
            }
         }
    });

    renderHTML();	//	this generates the html inside the summary component
}


function renderHTML(){
    var $populateHere = $("#dynamic-content");	//	get the dynamic container to be populated
	$populateHere.html("")	//	clear content so we can generate up to date html

	var totalFields = fieldArray.length;
	for(var i = 0; i < totalFields; i++){

        //	check what type of component
		switch (fieldArray[i].type){
			case "block":
				break;

			case "block_heading":
                var label = "<div"+htmlGroup(fieldArray[i])+" style='overflow: visible;z-index: 10000;height: 0px;'><span class='hmrc-s-label'>"+escapeHtml($.trim(fieldArray[i].value)) + "</span>";
                var value = "<span class='hmrc-s-data'></span>"
                var link = "<span class='hmrc-s-link' id='summary_link_" + String(i) +"'><a href='' onclick='return false'><span>" + fieldArray[i].title + " </span> Change this</a></span></div>"

                var finalHTML = label + value + link;

                $(finalHTML).appendTo($populateHere);

                var som = fieldArray[i].som;
                var id = fieldArray[i].id;

                $(".hmrc-summary").on('click', '#summary_link_' + String(i),{som:som, id:id}, goToField);

				break;

			case "heading":
				var size = fieldArray[i].size
                if( size == "h1"){
                    var heading = "<h2>" +   escapeHtml($.trim(fieldArray[i].value))+ "</h2>";
                    $(heading).appendTo($populateHere);
                }
                else if( size == "h2"){
                    var label = "<div"+htmlGroup(fieldArray[i])+"><span class='hmrc-s-label'>"+escapeHtml($.trim(fieldArray[i].value)) + "</span>";
                    var value = "<span class='hmrc-s-data'></span>"
                    var link = "<span class='hmrc-s-link' id='summary_link_" + String(i) +"'><a href='' onclick='return false'><span>" + fieldArray[i].title + " </span> Change this</a></span></div>"

                    var finalHTML = label + value + link;

                    $(finalHTML).appendTo($populateHere);

                    var som = fieldArray[i].som;

                     $(".hmrc-summary").on('click', '#summary_link_' + String(i),{som:som}, goToField);
                }
				break;

			case "field":
				if(fieldArray[i].value != null){ //doesnt draw anything if the text box is empty (for example optional fields)

                    var label = "<div"+htmlGroup(fieldArray[i])+"><span class='hmrc-s-label'"+ htmlVisibility(fieldArray[i].hideLabel) +">" + fieldArray[i].title + "</span>";
                    var value = "<span id='summary_"+fieldArray[i].name+"' class='hmrc-s-data'>" + escapeHtml($.trim(fieldArray[i].value)) + "</span>"
                    var link = "<span class='hmrc-s-link' id='summary_link_" + String(i) +"' " +htmlVisibility(fieldArray[i].hideLink) + "><a href='' onclick='return false'><span>" + fieldArray[i].title + " </span> Change this</a></span></div>"

                    var finalHTML = label + value + link;

                    $(finalHTML).appendTo($populateHere);

					var som = fieldArray[i].som;
					var id = fieldArray[i].id;
                    $(".hmrc-summary").on('click', '#summary_link_' + String(i),{som:som, id:id}, goToField);

            	}
				break;

			case "option":
				if(fieldArray[i].value != null){ //doesnt draw anything if the text box is empty (for example optional fields)
                    var label = "<div"+htmlGroup(fieldArray[i])+"><span class='hmrc-s-label'"+htmlVisibility(fieldArray[i])+">" + fieldArray[i].title + "</span>";
                    var value = "<span class='hmrc-s-data'>" + escapeHtml($.trim(findOptionText(fieldArray[i].obj, fieldArray[i].value))) + "</span>";
                    var link = "<span class='hmrc-s-link' id='summary_link_" + String(i) +"' " +htmlVisibility(fieldArray[i].hideLink) + "><a href='' onclick='return false'><span>" + fieldArray[i].title + " </span> Change this</a></span></div>";

                    var finalHTML = label + value + link;

                    $(finalHTML).appendTo($populateHere);

                    var som = fieldArray[i].som;
                    var id = fieldArray[i].id;

                    $(".hmrc-summary").on('click', '#summary_link_' + String(i),{som:som, id:id}, goToField);
                }
				break;
		}
	}
}

//==============================================================//
//	Events and global declaration of initialise function		//
//==============================================================//


//	initialise all event listeners for the summary. for example the button click listener to check when to generate the summary
function initialiseDynamicSummary(){
    if(window.guideBridge.isConnected()){
        //	event listeners to check if page is valid before setting current page and checking which button was clicked
        window.guideBridge.on("validationComplete", function (event,data){
            isPageValid = data._property;
        });

        window.guideBridge.on("elementButtonClicked", function(evnt, data) {
            if(pageManager.nextPage() == pageManager.lastPage || isPageValid){
				dynamicSummary();
            }
        });
    }

}



//==============================//
//	function declarations		//
//==============================//
function goToField(event){
	//	create the "back to summary" link
    /*var fieldId = "#"+event.data.id
    if($("#"+event.data.id+"_back_to_summary").length == 0){
        //	add link to summary in the field label
        var goTarget = $(fieldId)

        var label = goTarget.find(".guideFieldLabel");
        if(label.length !=0){
			label.append("<span class='backToSummary' id='"+event.data.id+"_back_to_summary'><a href='' onclick='return false'>Back to summary</a></span>")
        }
        else{

            var heading = goTarget.find("h2")
			if(heading.length != 0){
                heading.append("<span class='backToSummary' id='"+event.data.id+"_back_to_summary'><a href='' onclick='return false'>Back to summary</a></span>")
            }
        }

        // set click event listener
        $("#"+event.data.id).on('click', '#'+event.data.id+"_back_to_summary",function(){
            var rootContext = window.guideBridge.resolveNode("guide[0].guide1[0].guideRootPanel[0]");
            if(	window.guideBridge.validate([], rootContext.panel.navigationContext.currentItem.somExpression)){
                dynamicSummary(); //	re-generate the ENTIRE summary. This will need to be optimised so that it only updates the field we've just changed.
                guideBridge.setFocus(pageManager.lastPage().som, "firstItem", false);
                $("#"+event.data.id+"_back_to_summary").remove();
            }
        });
    }*/

    //	go to the field
    guideBridge.setFocus(event.data.som, "firstItem", false);

}

//	adds group or single css class to element
function htmlGroup (arrElement){
    return ((arrElement.grouped == true) ? " class='hmrc-s-grouped' " : " class='hmrc-s-single' ")
}

function htmlVisibility (arrElementOption){
    return ((arrElementOption == true) ? " style='visibility:hidden;' " : "")
}

function size(htmlElement){
	var str = $(htmlElement.value)
    var tagg = str.prop("tagName");
    var className = htmlElement.cssClassName;

    if(tagg == "H1" || tagg == "H2" || tagg == "H3" || tagg == "H4"){
    	return tagg.toLowerCase();//	returns the heading tag
    }
    else if(className == "miscHeading"){
		return "h3";//	returns the heading tag
    }
}

//	checks if component is truly visible
function isVisible(anObject){
    try
    {
        var isVisible = true;
        var currentObject = anObject;
        while (isVisible && currentObject != null)
        {
            isVisible = currentObject.visible;
            currentObject = currentObject.parent;
        }
        return isVisible;
    }
    catch(err)
    {
        console.log("Excception: " + err);
    }
}

// checks if component has "block_" prefix that defines a group
function isGrouped(anObject){
    try
    {
        var isGrouped = false;
        var currentObject = anObject;
        while (isGrouped == false && currentObject != null)
        {
        	if(currentObject.name != null){
		        isGrouped = (currentObject.name.indexOf("block_") != -1);
		    }
		    else{
		    	isGrouped = false;
		    }
	        currentObject = currentObject.parent;
        }

        return isGrouped;
    }
    catch(err)
    {
        console.log("Excception: " + err);
    }
}

//	checks if component has prefix "noLabels_" which allows it to hide the label for example for something like a grouped component like the address field
function isHideLabel(anObject){
    try
    {
        var currentObject = anObject;
        return (currentObject.name.indexOf("noLabel_") != -1); //	If noLabel_ exists in the name, return true.
    }
    catch(err)
    {
        try
        {
            var isVisible = true;
            var currentObject = anObject;
            while (isVisible && currentObject != null)
            {
                isVisible = currentObject.visible;
                currentObject = currentObject.parent;
            }
            return isVisible;
        }
        catch(err)
        {
            console.log("Excception: " + err);
        }
        console.log("Excception: " + err);
    }
}

//	checks if component has prefix "noLink_" which allows it to hide the link eg. for pre populated fields
function isHideLink(anObject){
    try
    {
        var currentObject = anObject;
        return (currentObject.name.indexOf("noLink_") != -1); //	If noLink_ exists in the name, return true.
    }
    catch(err)
    {
        console.log("Excception: " + err);
    }
}

//	gets the label text for radio buttons
function findOptionText(dataObject, optionValue)
{
	var optionList = dataObject.jsonModel.options;
	var text = null;
	for (var i = 0 ; i < optionList.length && text == null ; ++i)
	{
		var optionString = optionList[i];
		var valueTextArray = optionString.split("=");
		// TODO it's possible that the option text could contain = chars
		if (valueTextArray[0] == optionValue)
		{
			text = valueTextArray[1];
		}
	}
	return text;
}

/*
Map for replacing dangerous HTML characters with something safer
*/
var entityMap =
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
function escapeHtml(string)
{
    return String(string).replace(/[&<>"'\/]/g, function (aChar)
    {
      return entityMap[aChar];
    });
}







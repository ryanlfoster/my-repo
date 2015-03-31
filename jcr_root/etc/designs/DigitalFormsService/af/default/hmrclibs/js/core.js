//	globalVars
var pageManager;

//=================================================================================================//
//	Main template javascript file that sets up event listeners and does DOM modification.
//=================================================================================================//

window.addEventListener("bridgeInitializeStart", function(evnt) {
	var errorDebug = false

    var gb = evnt.detail.guideBridge;

    //=========    DEBUG     =======================//
    if (errorDebug == true){
        gb.on("validationComplete", function (event, data)  {
            //show hidden fields being validated in the console
            console.log("==================================")
            console.log("FIELD ERRORS")
            console.log(data.jsonModel.newText);
            var errorNo = data.jsonModel.newText.length;
            if (errorNo > 0){
                console.log("Validated fields with errors(some of these may be hidden)")
                for(var i = 0; i < errorNo; i++){
                    console.log("error " + data.jsonModel.newText[i]['som'])
                }
            }
        });
    }
	//=========    END DEBUG     ==================//


    //=========    Initialise event    ============//

    var $document = $(document);

    //	connect to guidebridge
	gb.connect( function(data){

        //	when connected do all this stuff
        if(gb.isConnected()){

            //	initialise the pageManager object
			pageManager = new pageManager2;

            // make toolbar visible (now that everything is loaded)
            var formWrapper = document.getElementById("toolbarWrapper");
            formWrapper.className = "";

            // parse the form and do stuff to each individual field
            gb.visit(function(cmp){

                //	If "cmp == radiobutton" add legend and fieldset wrappers
                if(cmp.className == 'guideRadioButton'){
					var parentElem= $("#"+cmp.id);
                    // Add legend tags around radio buttons
                    parentElem.find(".guideFieldLabel").wrap('<legend></legend>');
                    parentElem.children().wrapAll("<fieldset></fieldset>");
                }

                //	if "cmp == some kind of entry field (inluding radio button)" check if visible. If it isnt visible, disable validation
                if(cmp.className == 'guideRadioButton' || cmp.className == 'guideTextBox' ||
                   cmp.className == 'guideCheckBox' || cmp.className == 'guidePanel')
                {
                   try
                    {
                        var isVisible = true;
                        var currentObject = cmp;
                        while (isVisible && currentObject != null)
                        {
                        	isVisible = currentObject.visible;
                           	currentObject = currentObject.parent
                        }
                        cmp.validationsDisabled = !isVisible;
                    }
                    catch(err)
                    {
                        console.log("Excception: " + err);
                 	}
                    //console.log("som: "+cmp.somExpression + " cmp: "+cmp.className + " isValidated?: " + isVisible) // Visibility and validation debug
                }
            });

            // Set up the event listener which listens for objects becoming hidden or visible
            eventDisableValidationOnAllHidden();

            //	when jQuery ready, do all this
			 $document.ready( function() {

                //	Radio button highlight
                var radioButton = $("input[type='radio']");

                radioButton.focusin( function() {
                   var element = $(this);
                   var elementParent = element.parent().parent();
                   $(elementParent).addClass('focus');
                });

                radioButton.focusout( function() {
                   var element = $(this);
                   var elementParent = element.parent().parent();
                   $(elementParent).removeClass('focus');
                });

                //	Checkbox highlight
				var checkBox = $("input[type='checkbox']");

				checkBox.focusin( function() {
                   var element = $(this);
                   var elementParent = element.parent().parent();
                   $(elementParent).addClass('focus');
                });

                checkBox.focusout( function() {
                   var element = $(this);
                   var elementParent = element.parent().parent();
                   $(elementParent).removeClass('focus');
                });

                //	change the type of element from text to tel and number for fields that have the fake class telephoneKeyboard and numbericKeyboard.
                //	These fake classes have no styling applied to them and only serve the purpose of identifying the field as requiriong a specific keyboard
                $(".telephoneKeyboard input").each(function(i){
                    $(this).prop("type", "tel")
                });
                $(".numericKeyboard input").each(function(i){
                    // $(this).prop("type", "number") // Fix: removed this for now because of a bug where non numeric characters cause the field to be cleared
                    $(this).prop("type", "tel") // Added telephone instead because this one works. Not ideal but best we can do for now.
                });
            });
        }
    });


    //	This function is called on initialise and sets up an event listener that disables validation when they become hidden.
    function eventDisableValidationOnAllHidden(){

        //	on visibility change event and set validation to enabled if field is visible. This runs everytime a field changes visibility
		gb.on('elementVisibleChanged', function(event, data){
            var cmp = data.target; // get object which has changed visibility
            //console.log("field: "+cmp.somExpression)
            if(cmp.className == 'guideRadioButton' || cmp.className == 'guideTextBox' ||
               cmp.className == 'guideCheckBox' || cmp.className == 'guidePanel')
            {
                try
                {
                    if(cmp.className != 'guidePanel'){ // if not a guidepanel do the normal stuff
                        var isVisible = true;
                        var currentObject = cmp;
                        while (isVisible && currentObject != null)
                        {
                            isVisible = currentObject.visible;
                            currentObject = currentObject.parent
                        }
                        //console.log("validated?: " + isVisible)
                        cmp.validationsDisabled = !isVisible;

                    }
                    else{ // if a guidepanel, need to check visibility of items inside it
                        var children = cmp.items;
                        var total = children.length;

                        //	check visibility of panel
                        cmp.validationsDisabled = !isTrulyVisible(cmp);

                        for(var i = 0; i < total; i++){
                            var isVisible = true;
                            var currentObject = children[i];
                            while (isVisible && currentObject != null)
                            {
                                isVisible = currentObject.visible;
                                currentObject = currentObject.parent;
                            }
                            children[i].validationsDisabled = !isVisible;
                        }
                    }
                }
                catch(err)
                {
                    console.log("Excception: " + err);
                }
            }
            else{
                //console.log("Will not change validationDisabled")
            }
        });
    }



    //=======================================================    Functions         ===========================================================//

	function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

	//	This function is called on submit. It goes through the form removing unwanted data.
    function purgeUnusedData(){
        gb.visit(function(cmp){
            if(cmp.className === 'guideRadioButton' ||
                cmp.className === 'guideTextBox' ||
                cmp.className === 'guideCheckBox' ||
                cmp.className === 'guidePanel')
            {
                try
                {
                    var isVisible = true;
                    var currentObject = cmp;
                    while (isVisible && currentObject != null)
                    {
                        isVisible = currentObject.visible;
                        currentObject = currentObject.parent;
                    }
                    if(!isVisible){
                        cmp.value = null;
                    }
                }
                catch(err)
                {
                    console.log("Excception: " + err);
                }
            }
        });
    }


});





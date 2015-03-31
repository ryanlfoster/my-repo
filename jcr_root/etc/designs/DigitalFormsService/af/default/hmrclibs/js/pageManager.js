var pageManager2 = function(){
    try{
    var rootContext = window.guideBridge.resolveNode("guide[0].guide1[0].guideRootPanel[0]");
    var pagesItems = rootContext.panel.navigationContext.options.parentPanel.items;
    var index = [];
    var ids = [];
    var soms = [];
	var reachedSummary = false;
	this.reachedSummary = false;

    //	Hide summary link from the nav bar
	$("#go-to-summary-link").hide();

    for(var i = 0; i < pagesItems.length; i++){
        index.push(i);
        ids.push(pagesItems[i].id);
        soms.push(pagesItems[i].somExpression);
    }
    }catch(e){
		console.log(e)
    }

	//	initialise the title etc
    window.location.replace("#1");
    document.title = formTitle + " - " + rootContext.panel.navigationContext.currentItem.title;

    //	methods
    this.currentPage = function(){
        var pageSom = rootContext.panel.navigationContext.currentItem;
        if(pageSom)
        	return {index: soms.indexOf(pageSom.somExpression), som:pageSom.somExpression};
        else
            return null
    }


    this.firstPage = function(){
        var pageSom = rootContext.panel.navigationContext.firstItem;
        if(pageSom)
        	return {index: soms.indexOf(pageSom.somExpression), som:pageSom.somExpression};
        else
            return null
    }


    this.lastPage = function(){

        var pageSom = rootContext.panel.navigationContext.lastItem;
        if(pageSom)
        	return {index: soms.indexOf(pageSom.somExpression), som:pageSom.somExpression};
        else
            return null
    }


    this.nextPage = function(){

        var pageSom = rootContext.panel.navigationContext.nextItem;
        if(pageSom)
        	return {index: soms.indexOf(pageSom.somExpression), som:pageSom.somExpression};
        else
            return null
    }


    this.prevPage = function(){
        var pageSom = rootContext.panel.navigationContext.prevItem;
        if(pageSom)
        	return {index: soms.indexOf(pageSom.somExpression), som:pageSom.somExpression};
        else
            return null
    }

	this.goToNextPage = function(){

        keepSessionAlive();

        //if(	window.guideBridge.validate([], rootContext.panel.navigationContext.currentItem.somExpression)){
        if(	validateCurrentFormAndShowErrors(rootContext.panel.navigationContext.currentItem.somExpression) ){
            var nextTitle = rootContext.panel.navigationContext.nextItem.title;
        	document.title = formTitle + " - " + nextTitle;
            window.location.replace("#"+(this.nextPage().index + 1));



            try{
                ga('send', 'pageview', {
                 'page': location.pathname + location.search  + location.hash
                });
            }catch(e){
				console.log(e)
            }

            //	change page
            window.guideBridge.setFocus(rootContext.panel.somExpression, 'nextItem',true);

            //	check if there are errors on the page (without validating the page)
            if($("#"+rootContext.panel.navigationContext.currentItem.id + " .validation-failure").length){
                //if yes show the error summary
                var $container = $("[data-dfs-global-errors]");
                $container.show();
            }

	        document.body.scrollTop = document.documentElement.scrollTop = 0;
	    }
        else{
			document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        if(this.currentPage().som == this.lastPage().som && this.reachedSummary == false){
			$("#go-to-summary-link").show();
        	this.reachedSummary = true;
        }
    }


    this.goToPreviousPage = function(){
        var prevTitle = rootContext.panel.navigationContext.prevItem.title;
        document.title = formTitle + " - " + prevTitle;
        window.location.replace("#"+(this.prevPage().index + 1));

        try{
            ga('send', 'pageview', {
                'page': location.pathname + location.search  + location.hash
            });
        }catch(e){
			console.log(e)
        }

        //	hide error when user clicks back
    	removeErrorAndMoveToPreviousSection(rootContext.panel.navigationContext.currentItem.somExpression)

        window.guideBridge.setFocus(rootContext.panel.somExpression, 'prevItem',true);
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        keepSessionAlive();
    }

    this.goToSummaryPage = function(){

        keepSessionAlive();

        if(validateCurrentFormAndShowErrors(rootContext.panel.navigationContext.currentItem.somExpression)){

            dynamicSummary(); //	re-generate the ENTIRE summary. This will need to be optimised so that it only updates the field we've just changed.
            guideBridge.setFocus(this.lastPage().som, "firstItem", false);

            document.title = formTitle + " - " + rootContext.panel.navigationContext.lastItem.title;
            window.location.replace("#"+(this.lastPage().index + 1));
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

	this.submitForm = function(){
        try{
            ga('send', 'pageview', {
                'page': location.pathname + location.search  + location.hash
            });
        }catch(e){
			console.log(e)
        }

		keepSessionAlive();

        window.guideBridge.submit()
    }


    function keepSessionAlive(){
        var http = new XMLHttpRequest();

       	var isUrlDefined = "BBVariableSubmitUrl" in window;
    	var url = (isUrlDefined)? BBVariableSubmitUrl: "UrlNotProvided";
		var clean = url.split('?')[0];

        http.open('HEAD', clean, true);
        http.send();

    }



}

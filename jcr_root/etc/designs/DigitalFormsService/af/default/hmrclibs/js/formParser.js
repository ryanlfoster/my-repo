// this is the form parser used to generate the schema

function formParser() {
    var soms = [];

    try {
        var i = 0,
            components = [],
            //  There are teh component we want. Seperated by spaces.
            componentList = "guidePanel guideTextBox guideNumericBox guideTextDraw guideRadioButton guideCheckBox";

        //  get only Components we are interested in
        window.guideBridge.visit(function (cmp) {
            if (componentList.indexOf(cmp.className) !== -1) {
                var som = cmp.somExpression;
                components.push({type: cmp.className,
                                name: cmp.name,
                                label: cmp.title,
                                value: cmp.value,
                                visible: isTrulyVisible(),
                                getPageName: function(){
                                    var pageStr = som.split(".")[3];//  get the part of the som that represents the page
                                    var result = pageStr.replace(/\[[0-9]+\]/, "");// remove the square brackets and numbers
                                    console.log(result)
                                    return result;
                                },
                                som: som});
                soms.push(som);
                //console.log(cmp.somExpression);
                i++;
            }
        });
        console.log(components)

        //  generate JSON   ///////////////////////////////////////////////////////////
        var total = components.length,
            varCmp,
            innerSchemaStructure = [];

        for (var i = 0; i < total; i++) {
            varCmp = components[i];
            var pageName = varCmp.getPageName(),
                name = varCmp.name,
                som = varCmp.som,
                componentJson = {},
                componentParams =  {label: varCmp.label,
                                    value: varCmp.value,
                                   value: varCmp.type};
            componentJson[name] = componentParams;

            var pageExists = hasPage(innerSchemaStructure, pageName);
            if(pageExists.statement == false) {
                var page = {name: pageName, fields: [componentJson]}
                innerSchemaStructure.push(page)
            }
            else {
                try{
                    innerSchemaStructure[pageExists.index].fields.push(componentJson)
                }
                catch(e){
                    //  do nothing
                }
            }
        }

        //  display json
        var schemaJSON = JSON.stringify({form:innerSchemaStructure});
        //console.log(schemaJSON, null, 2));



        ////////////////////////               make XML                       ////////////////////////////////////
        var XML = document.createElement("form"),
        appendToPage = false,
        appendTo,
        pageSom,
        xml="";


        //get Pages.
        console.log("get pages.")
        components.forEach(function(obj){
             var somArr = obj.som.split("."),
                somLength = somArr.length,
                elementName = sanitise(somArr[somLength-1]);
            if(somLength === 4){ //    is page som
                var Page = document.createElement(elementName);
                XML.appendChild(Page)
            }
        });

        //get elements within those pages.
        console.log("get elements.")
        components.forEach(function(obj){
            var somArr = obj.som.split("."),
                somLength = somArr.length,
                elementName = sanitise(somArr[somLength-1]),
                pageName = sanitise(somArr[3]),
                value = obj.value;

            if(somLength > 4){
                try{
                    var page = XML.getElementsByTagName(pageName)[0],
                        element = document.createElement(elementName),
                        value = document.createTextNode(value);
                    element.appendChild(value); // add a value to complete the element node. Do the same for attributes etc
                    page.appendChild(element); // add the completed element node to the existing page
                }catch(e){
                    console.log(e.stack)
                }
            }

        });
        console.log("Finished XML")
        console.log(XML)

        function strStartsWith(str, prefix) {
            return str.indexOf(prefix) === 0;
        }
        function sanitise(str){
            var result = str.replace(/\[[0-9]+\]/, "");// remove the square brackets and numbers
            return result;
        }


        //**************    Utility functions   **********************//
        function hasPage(array, pageName) {
            var index,
                i = 0,
                HASPAGE = false,
                total = array.length;

            while (HASPAGE === false && i < total) {
                if (array.length > 0) {
                    if (array[i].name === pageName) {
                        HASPAGE = true;
                        index = i;
                    }
                    i++;
                } else {
                    return false;
                }
            }
            return {statement: HASPAGE, index: index};
        }

    } catch(e) {
        console.log("JSON parsing error")
        console.log(e.stack)
    }
}

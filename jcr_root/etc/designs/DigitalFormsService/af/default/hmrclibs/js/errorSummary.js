////////////////////////	used to make the summary not update the summary as soon as the entries are changed	////////////////////////
////////////////////////	also added functionality to hide the error summary when going back
window.onload = function(){
    window.validateCurrentFormAndShowErrors = function (currentSomExpression) {
        var $container = $("[data-dfs-global-errors]");
        var $errorItem = $container.find("[data-dfs-global-error-item]").eq(0);
        //empty the existing errors
        var $existingItems = $container.find("[data-dfs-global-error-item]");
        var errors = [];
        var result = window.guideBridge.validate(errors, currentSomExpression);
        //for each error clone the error-item div and append the error message
        _.each(errors, function (error) {
            var clone = $errorItem.clone();
            clone.find("[data-dfs-global-error-text]").text(error.errorText).attr("data-som", error.som);
            clone.appendTo($container);
        });
        //show the container if there are errors otherwise hide it.
        if(errors.length) {
            $existingItems.remove();
            $container.show();
        } else {
            $container.hide();
        }
        return result;
    }

    $(function () {
        $("[data-dfs-global-errors]").on("click", "[data-dfs-global-error-text]", function () {
            // here `this` represents the error message being clicked
            var somExpression = $(this).attr("data-som");
            guideBridge.setFocus(somExpression, null, true);
        });
    });

    window.removeErrorAndMoveToPreviousSection = function (currentSomExpression) {
        var $container = $("[data-dfs-global-errors]");
        //$container.find("[data-af-global-error-item]").hide();
        //window.guideBridge.setFocus(currentSomExpression, 'prevItem', false)
        $container.hide();
    }
};

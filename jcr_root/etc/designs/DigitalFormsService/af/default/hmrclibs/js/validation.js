//------------------------------------------------------------------//
//	This is the function that disables validation when a field is
//	hidden. -- doesnt work....
//------------------------------------------------------------------//
/*function disableValidationHidden(a){
    console.log(a.validationsDisabled)
    if ( !isVisible(a) ){
        console.log(a.validationsDisabled)
		a.validationsDisabled = true;
    }
    else{
        console.log(a.validationsDisabled)
		a.validationsDisabled = false;
    }
}*/


//---------------- 			misc		   --------------------------//
//
//	functions that are not validation. This could probably
//	go in utils.js
//
//-------------------------------------------------------------------//

function trimString(aString)
{
    if(aString){
        newStr = aString.trim()
        return newStr;
    }
}

//returns true if the field is hidden which allows validation to continue when there are fields inside hidden fields etc
function visHack(a){
    return !isVisible(a)
}

//---------------- Component validation    --------------------------//
//
//  All component validations will start with the name of the field
//  and end with 'Field'
//
//-------------------------------------------------------------------//
function emailAddressField(a){
    a.value = trimString(a.value)
    return ( !isNotEmpty(a) || isEmail(a) ) //	field is optional
}
function taxYearField(a){
    a.value = trimString(a.value)
	return( isNotEmpty(a) && isTaxYear(a))
}

function taxPeriodStartField(a){
    a.value = trimString(a.value)
	return( isNotEmpty(a) && isTaxPeriodStart(a))
}


function taxPeriodEndField(a,periodStart){
    a.value = trimString(a.value)
    var aPeriodEnd = a.value;
    var bPeriodStart = periodStart.value;
    var crossValidation = true;
    if (isNotEmpty(periodStart)){
    	crossValidation = (bPeriodStart < aPeriodEnd);
    }
	return( isNotEmpty(a) && isTaxPeriodEnd(a) && crossValidation)
}


function dateField(a){
    a.value = trimString(a.value)
    return( isNotEmpty(a) && isDate(a) )
}

function dateLaterThanOrEqualField(a,b)
{
    a.value = trimString(a.value);
    b.value = trimString(b.value);
    var ret = false

    if (isDate(a))
    {
    	//  If b is not a valid date, we ignore it and validate only on this field
    	if (!isDate(b))
    	{
    		ret = true;
    	}
    	else
    	{
    		ret = isDateEarlierThanOrEqual(b, a);
    	}
    }
    return ret;
}

function dateEarlierThanOrEqualField(a,b){
    a.value = trimString(a.value)
    b.value = trimString(b.value)
    var ret = false

    if (isDate(a))
    {
    	//  If b is not a valid date, we ignore it and validate only on this field
    	if (!isDate(b))
    	{
    		ret = true;
    	}
    	else
    	{
    		ret = isDateEarlierThanOrEqual(a, b);
    	}
    }
    return ret;
}

function requiredField(a){
    return isNotEmpty(a)
}


function percentageField(a){
    return(isNotEmpty(a) && isPercentage(a))
}

function bankAccountNumberField(a){
    //addLeadingZeroBelowLength(a,8);
    return(isNotEmpty(a) && isBankAccountNumber(a))
}

function sortCodeField(a){
    return(isNotEmpty(a) && isSortCode(a))
}

function telephoneField(a){
	return (isNotEmpty(a) && isTelephone(a))
}

function postcodeField(a){
	return (isNotEmpty(a) && isPostcode(a))
}

function ninoField(a) {
    return (isNotEmpty(a) && isNino(a))
}

function agentRefField(a) {
    return (isNotEmpty(a) && isAgentRef(a))
}

function utrField(a) {
    return (isNotEmpty(a) && isNumeric(a) && isCharLengthExactly(a,10))
}

function addressLineRequiredField(a){
    return (isNotEmpty(a) && isAlphaNumeric(a) && !isCharLimitReached(a,27))
}

function addressLineOptionalField(a){
    if (isNotEmpty(a)) {
    	return (isAlphaNumeric(a) && !isCharLimitReached(a,27))
    }
    else{
		return true;
    }
}

function addressLine4Field(a){
    if (isNotEmpty(a)){
		return (isAlphaNumeric(a) && !isCharLimitReached(a,18))
    }
    else{
        return ; //optional field so return true by default
    }
}

function countryField(a){
    return (isNotEmpty(a) && isAlphaNumeric(a) && !isCharLimitReached(a,18))
}

function mediumTextField(a){
	return (isNotEmpty(a) && !isCharLimitReached(a,1000) && isAlphaNumericIncludingNewLine(a))
}

//---------------- Basic validation elements -----------------------//
//
//  These are the most primitive validations a field might need. They
//  are assembled in the above section to produce the complete set of
//  checks a field needs to be considered validated.
//  e.g. a date field needs same same checks as all field plus a valid
//  date check: (isNotEmpty() && isDate())
//
//  All element will start with 'is'
//
//------------------------------------------------------------------//


function isCharLimitReached(a,charLimit){
    var str = a.value.toString();
    if (str.length > charLimit){
		return true;
    }
    else{

        return false;
    }
}

function isCharLengthExactly(a,charLimit){
    var str = a.value.toString();
    if (str.length == charLimit){
		return true;
    }
    else{
        return false;
    }
}


function isDate(dateField)
{
	var regExp = /^[0-3][0-9]\/[0-1][0-9]\/[[1-9][0-9][0-9][0-9]$/ ;
	if (!regExp.test(dateField.value))
	{
		return false;
	}
    var dateStrSplit = dateField.value.split(/[\/]/);
    var day = dateStrSplit[0];
    var month = dateStrSplit[1];
    var year = dateStrSplit[2];

    var dateObj = new Date(year,month-1,day);

    var vDay = dateObj.getDate();
    var vMonth = dateObj.getMonth();

    var convertedDay = (""+vDay.toString().length )< 2 ? "0" + vDay : vDay;
    var convertedMonth = (""+(vMonth + 1).toString().length)< 2 ? "0" + (vMonth + 1) : vMonth + 1;

    var convertedGivenDate = ""+ ((""+(month).toString().length)< 2 ? "0" + (month) : month) + " " + ((""+day.toString().length )< 2 ? "0" + day : day)  ;
    var convertedDate =""+ convertedMonth +" "+ convertedDay;

    return ( (convertedGivenDate == convertedDate) && year.toString().length == 4);

}

/**
 *  Check if two dates are ordered or the same
 */
function isDateEarlierThanOrEqual(a,b)
{
        var aStr = a.value;
        var bStr = b.value;
        if (aStr == bStr)
        {
        	return true;
        }
        var dateStrSplit = aStr.split(/[\/]/);
        var day = dateStrSplit[0];
        var month = dateStrSplit[1];
        var year = dateStrSplit[2];

        var bdateStrSplit = bStr.split(/[\/]/);
        var bday = bdateStrSplit[0];
        var bmonth = bdateStrSplit[1];
        var byear = bdateStrSplit[2];

        var aDate = new Date(year, month-1, day);
        var bDate = new Date(byear, bmonth-1, bday);
        var aDateMs = aDate.getTime();
        var bDateMs = bDate.getTime();

        return aDateMs <= bDateMs;
}

function isNotEmpty(aField){
    var value = aField.value;
    aField.value = trimString(aField.value);
    value = aField.value;
    return (!(/^\s*$/.test( value )) && value != null && value != "");

}

function isAlphaNumeric(a){
	return (/^[A-Za-z0-9 &'\(\)\*,\-\./@£]*$/.test( a.value ));
}

function isAlphaNumericIncludingNewLine(a){
	return (/^[A-Za-z0-9 &'\(\)\*,\-\./@£\r\n\\]*$/.test( a.value ));
}

function isNumeric(a){
	return (/^[0-9]*$/.test( a.value ));
}

function isVisible(anObject)
{
    try
    {
        var isVisible = true;
        var currentObject = anObject;
        while (isVisible && currentObject != null)
        {
            isVisible = currentObject.visible;
            currentObject = currentObject.parent
        }
        return isVisible;
    }
    catch(err)
    {
        console.log("Excception: " + err);
    }
}

function isMatchRegEx(a,expression){
    return (expression.test(a.value));
}

//------   Field Specific ----//


function isTaxYear(a){
    return (/^[0-9]{4}$/.test( a.value ));
}

function isTaxPeriodStart(a){
    var str = a.value;
    var cDate = new Date();
    var cYear = cDate.getFullYear();
    return ((str.length == 4) && (str >= (cYear - 5)) && (str <= (cYear - 2)));

}

function isTaxPeriodEnd(a){
    var str = a.value;
    var cDate = new Date();
    var cYear = cDate.getFullYear();
    return ((str.length == 4) && (str <= (cYear - 1)));
}

function isBankAccountNumber() {
    var value = arguments[0].value;
    return (/^[0-9]{7,8}$/.test( value ));
}

function isSortCode() {
    var value = arguments[0].value;
    return (/^[0-9]{6}$/.test( value ));
}

function isTelephone(a) {
    return (/^\+?[0-9\s\(\)]{1,20}$/.test( a.value ));
}

function isPostcode(a) {
    return (/^(([aA-zZ]{1,2}[0-9]{1,2}?[\s]?[0-9][aA-zZ]{2})|([aA-zZ]{1,2}[0-9]{1,2}?[aA-zZ][\s]?[0-9][aA-zZ]{2}))$/.test( a.value ));
}

function isNino(a) {
    var exp = /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\d){6}([A-D]|\s)?$/i;
    return (exp.test( a.value));
}

function isAgentRef(a) {
    var exp = /^[0-9]{5}[aA-zZ]{1}|[aA-zZ]{1}[0-9]{4}[aA-zZ]{1}$/;
    return (exp.test( a.value));
}

function isUtr(a, isSA){
    var str = a.value;
    if(str.length > 10){
		return false;
    }
    var sum = (str[1]*6) + (str[2]*7) + (str[3]*8) + (str[4]*9) + (str[5]*10) + (str[6]*5) + (str[7]*4) + (str[8]*3) + (str[9]*2);
    var remainder = sum % 11;
    var result = 11 - remainder;

    if (result > 9){
        result = result - 9;
    }
    if (str[0] == result){
        var lastFive = parseInt(str.substr(str.length - 5));
        var cleanResult = (lastFive == NaN || lastFive == null) ? 0 : lastFive;
        if(isSA){
            var test = cleanResult > 30000 ? true : false;
            return test;
        }else{
            var test = (cleanResult >= 0 && cleanResult < 30000) ? true : false;
            return test;
        }

    }else{
        return false;
    }
}

function isEmail(a){
    try{
	var exp = /^[-aA-zZ0-9._%+']+@[-aA-zZ0-9.']+\.[aA-zZ]{2,4}$/;
    }catch(e){
		console.log(e)
    }
    return (exp.test( a.value));
}

function isPercentage(a){
	var exp = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
    return (exp.test( a.value));
}

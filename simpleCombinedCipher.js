"use strict";
var fullDate = new Date();
var dayOfWeek = fullDate.getDay() + 1; //Note: Sunday is 0, Monday is 1, and so on.
var wraparoundOffset = fullDate.getDate()%7; // 1 - 31 

var encodeMe = function(inputString){
	var res = "";
	var text = inputString.toLowerCase();

	//caeser shift forward by day of week  -- http://www.nayuki.io/res/caesar-cipher-javascript.js
	for (var i=0; i<inputString.length; i++){
		var eachChar = inputString.charCodeAt(i);

		if (eachChar >= 97 && eachChar <= 122){
			var temp = (eachChar - 97 + dayOfWeek) % 26 + 97;
			temp = temp.toString(2); //temp is binary number as string
			var stringBitShift = temp.substr(wraparoundOffset) + temp.substr(0, wraparoundOffset); //mimic bit shift with wrap around
			var convTemp = String.fromCharCode(parseInt(stringBitShift,2).toString(10));
			res += convTemp; //parse to binary int, convert to decimal, convert to ascii char, push to array
		}
		else if (inputString[i] === " "){
			res += " ";
		}
		/*
		else if ((eachChar>=33 && eachChar<=47) || (eachChar>=58 && eachChar<=64) || (eachChar>=91 && eachChar<=96) || (eachChar>=123 && eachChar<=126)){
			res += inputString[i];
		}
		*/
		else{
			var temp = eachChar.toString(2);
			//console.log(temp)
			var stringBitShift = temp.substr(wraparoundOffset) + temp.substr(0, wraparoundOffset); //mimic bit shift with wrap around
			//console.log(stringBitShift);
			var convTemp = String.fromCharCode(parseInt(stringBitShift,2).toString(10));
			//console.log(convTemp)
			res += convTemp; //parse to binary int, convert to decimal, convert to ascii char, push to array
		}
	}
	console.log(res);
}

var decodeMe = function(inputString){
	var resultArray = inputString.split("");
	var finalResult = "";

	for (var i=0; i<resultArray.length; i++){
		var firstConversion = inputString.charCodeAt(i); //ascii char as decimal
		var eachChar = parseInt(firstConversion,10).toString(2); //eachChar is string
		var newOffset = eachChar.length - wraparoundOffset;
		var reverseShift = eachChar.substr(newOffset) + eachChar.substr(0, newOffset); //descrambled binary string
		eachChar = parseInt(reverseShift,2).toString(10);

		if (eachChar >= 97 && eachChar <= 122){
			var finalConversion = (eachChar - 97 - (7-dayOfWeek-1)) % 26 + 97;
			finalConversion = String.fromCharCode(finalConversion);
			finalResult += finalConversion;
		}
		else if (resultArray[i] === " "){
			finalResult += " ";
		}/*
		else if ((eachChar>=33 && eachChar<=47) || (eachChar>=58 && eachChar<=64) || (eachChar>=91 && eachChar<=96) || (eachChar>=123 && eachChar<=126)){
			finalResult += resultArray[i];
		}*/
		else{
			finalResult += String.fromCharCode(eachChar);
		}
	}
	console.log(finalResult)
}

/*
[1. DICTIONARY]
	200 -> OK
	201 -> Created
	304 -> Not Modified
	400 -> Bad Request
	401 -> Unauthorized
	403 -> Forbidden 
	404 -> Not Found
	500 -> Internal Server Error

[2. FUNCTION getFamily]
	RECEIVES a code
	CALCULATE the family: divide the code by 100 and round down
	IF is 2 -> "Success"
	IF is 3 -> "Redirection"
	IF is 4 -> "Client Error"
	IF is 5 -> "Server Error"
	NONE -> "Unknown Code"
	

[3. FUNCTION diagnose]
    RECEIVES a code
	IF the code is between 400 & 499
		RETURN "Check the client request"
	ELSE IF the code is between 500 & 599
		RETURN "Check the server code"
	ELSE
		RETURN "Not an error"

[4. SITUATIONS array]
	CREATE an array of situations
	EACH element with two data: description and a code
		"Load products list" -> 200
		"New account is created" -> 201
		"A form with an invalid email arrives" -> 400
		"A not logged-in user opens his/her profile" -> 401
		"A logged-in user tries to open administration panel" -> 403
		"Database fails when saving" -> 500 

[5. LOOP AND PRINT]
	FOR each situation of situations list:
		TAKE their description and code
		SEARCH the code name on dictionary
		GET the family with getFamily
		PRINT: description -> code name (family)

	AFTER all:
		PRINT diagnose result for 400, 403, 500 and 200 
*/
const httpCodes = {
	'200': 'OK', 
	'201': 'Created', 
	'304': 'Not Modified', 
	'400': 'Bad Request', 
	'401': 'Unauthorized', 
	'403': 'Forbidden', 
	'404': 'Not Found', 
	'500': 'Internal Server Error'
};

const getFamily = (code) => {
	const family = Math.floor(code / 100);
	switch(family) {
		case 2:
			return 'Success';
		case 3:
			return 'Redirection';
		case 4:
			return 'Client Error';
		case 5:
			return 'Server Error';
		default:
			return 'Unknown Code';
	}
};
console.log(getFamily(200));
console.log(getFamily(301));
console.log(getFamily(404));
console.log(getFamily(503));
console.log(getFamily(999));

const diagnose = (code) => {
	if (code >= 400 && code <= 499) {
		return `${code}: Check the client request.`;
	} else if (code >= 500 && code <= 599) {
		return `${code}: Check the server code.`;
	} else {
		return `${code}: Not an error.`;
	}
	// Proposal: codes outside 100-599 are not valid HTTP codes
};
console.log(diagnose(200)); // Expected to return "200: Not an error."
console.log(diagnose(299)); // Expected to return "299: Not an error."
console.log(diagnose(300)); // Expected to return "300: Not an error."
console.log(diagnose(399)); // Expected to return "399: Not an error."
console.log(diagnose(400)); // Expected to return "400: Check the client request."
console.log(diagnose(499)); // Expected to return "499: Check the client request."
console.log(diagnose(500)); // Expected to return "500: Check the server code."
console.log(diagnose(599)); // Expected to return "599: Check the server code."
console.log(diagnose(600)); // Expected to return "600: Not an error."

const situations = [
	{
		description: 'Load products list',
		code: 200
	}, 
	{
		description: 'New account is created', 
		code: 201
	}, 
	{
		description: 'A form with an invalid email arrives', 
		code: 400
	}, 
	{
		description: 'A not logged-in user opens his/her profile',
		code: 401
	}, 
	// 403, not 401: the user is logged in, but doesn't have permission
	{
		description: 'A logged-in user tries to open administration panel', 
		code: 403
	}, 
	{
		description: 'Database fails when saving', 
		code: 500
	}
];
for (const {description, code} of situations) {
	const name = httpCodes[code] || 'Unknown Code';
	const family = getFamily(code);
	console.log(`${description} -> ${code} ${name} (${family})`);

}
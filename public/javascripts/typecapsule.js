// requires jQuery
// requires moment.js

var typecapForm = function()	{

	return {
	
		"problem": function typecapForm_problem(formItem)	{

				console.log("In formProblem");

				var errMsg;
				
				switch(formItem)	{
				
					case "time":
						errMsg = "Enter a number, please!";
						break;
					case "text":
						errMsg = "Some of these characters aren't allowed. "
										+ "See the FAQ for details.";
						break;
					case "denom":
				
				}
				
				$("#" + formItem + "Err").text(errMsg);
				$("#" + formItem + "Err").css({ 	"border-color": "#FF0000",
															"color": "#FF0000"	});
			},

		"clearErrs": function typecapForm_clearErrs()	{

			// TODO: refactor by putting all input box names
			// in an array (which can be used in the problem method,
			// for instance)
			$("#responseArea").empty();
			$("#timeErr").empty();
			$("#textErr").empty();
		
		}
	
	
	}

}();


$("#msgEntry").submit(function sendCapsule()	{

	var submitMoment = moment();
	var releaseMoment = submitMoment.clone();

	// remove all error messages from page
	typecapForm.clearErrs();

	// verify that time box is a number	
	var rawDelay = +($("input[name=time]").val());
	if (isNaN(rawDelay)) typecapForm.problem("time");
	console.log(rawDelay);

	// add the given time onto the original submission time
	var delayDenom = $("input[name=denom]").filter(":checked").val();

	releaseMoment.add(rawDelay, delayDenom);

	releaseMoment = releaseMoment.unix();
	submitMoment = submitMoment.unix();

	// get the text submitted
	var text = $("textArea[name=text]").val();

	capsule = {

		"s":	submitMoment,
		"r":	releaseMoment,
		"t":	text
	
	};

	$.post('/seal', capsule)
		.done(function (response)	{ // AJAX post success


			if (response.success === true)	{

				var releaseDate = new Date(+response.release);
			
				$("#responseArea").removeClass("errorMsg");
				$("#responseArea").addClass("successMsg");
				$("#responseArea").text("Message saved. We'll release it at "
													+ releaseDate.toLocaleString());
			
			}
			else if (response.success === false)	{

				$("#responseArea").removeClass("successMsg");
				$("#responseArea").addClass("errorMsg");
				$("#responseArea").text(response.error);
			
			}
		
		})
		.fail(function ()	{ // AJAX post fail

			console.log("AJAX failure");

			$("#responseArea").removeClass("successMsg");
			$("#responseArea").addClass("errorMsg");
			$("#responseArea").text("Problem communicating with the server. Try again later.")
		
		});

	return false;

});

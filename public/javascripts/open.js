var capsuleRequest = {

	"o": 0,	// offset from most recent capsule
				// to start getting capsules at
	"c": 40 // number of caps to get

}

$.post('/open/list', capsuleRequest)
	.done(function(response)	{

		console.log(response);

		$(document).ready(displayCapsules(response));
	
	})
	.fail(function(err)	{
	
		console.log(err);
	
	});

function displayCapsules(capsuleObj)	{

	for (var id in capsuleObj)	{

		if (capsuleObj.hasOwnProperty(id))	{
		
			var capsule = capsuleObj[id];

			// format in locale-dependent format, and include
			// month name, day of month, day of week, year,
			// and time
			var submitTime = moment(+(capsule.s) * 1000);
			var releaseTime = moment(+(capsule.r) * 1000);
			var delay = moment.preciseDiff(releaseTime, submitTime);
			submitTime = submitTime.format("LLL");
			releaseTime = releaseTime.format("LLL");
			//console.log(submitTime);
			//console.log(releaseTime);

			var article =
				"<article>" +
				"<p>" + capsule.t + "</p>" +
				"<div><p>Submitted: " + submitTime + "</p></div>" +
				"<div><p>Released: " + releaseTime + "</p></div>" +
				"<div><p>Delayed for " + delay + "</p></div>" +
				"</article>";

			$("#capsules").prepend(article);
		
		}
	
	}

}

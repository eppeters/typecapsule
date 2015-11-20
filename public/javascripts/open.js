var capsuleRequest = {

	"o": 0,	// offset from most recent capsule
				// to start getting capsules at
	"c": 100 // number of caps to get

};

$.post('/open/list', capsuleRequest)
  .done(function(response)	{
    $(document).ready(displayCapsules(response));
  })
  .fail(function(err)	{
    console.log(err);
  });

/**
 * Once we get the capsules, build the HTML for the page.
 * 
 * Yes, jQuery sucks for templating.
 *
 * I could've used Knockout or some other MVVM solution for this, and may if
 * the project grows, but... come on. It's not necessary to introduce that dependency
 * for the little amount of templating I need.
 */
function displayCapsules(capsuleObj)	{

	for (var id in capsuleObj)	{

		if (capsuleObj.hasOwnProperty(id))	{
		
			var capsule = capsuleObj[id];

			// format in locale-dependent format, and include
			// month name, day of month, day of week, year,
			// and time
			var submitTime = moment(+(capsule.stime) * 1000);
			var releaseTime = moment(+(capsule.rtime) * 1000);
			var delay = moment.preciseDiff(releaseTime, submitTime);

			submitTime = submitTime.format("LLL");
			releaseTime = releaseTime.format("LLL");

			var article =
				"<article>" +
				"<p>" + capsule.stext + "</p>" +
				"<div><p>Submitted: " + submitTime + "</p></div>" +
				"<div><p>Released: " + releaseTime + "</p></div>" +
				"<div><p>Delayed for " + delay + "</p></div>" +
				"</article>";

			$("#capsules").append(article);
		}
	
	}

}

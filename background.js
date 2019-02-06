console.log('Background Script Running')

let compatibility
try {
	compatibility = chrome
} catch(e)  {
  compatibility = browser
}

function lis(details) {
	compatibility.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  compatibility.tabs.sendMessage(tabs[0].id, {message: "Completed"}, function(response) {
	    console.log(response)
	  	console.log('Completed removing crap from Facebook')
	  })
	})
}

compatibility.webNavigation.onCompleted.addListener(lis)
compatibility.webNavigation.onHistoryStateUpdated.addListener(lis)

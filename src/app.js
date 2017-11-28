require("../node_modules/@microsoft/microsoft-graph-client/lib/graph-js-sdk-web");

require("./secrets");

var client = MicrosoftGraph.Client.init({
			debugLogging: true,
			authProvider: function(done) {
				done(null, SECRETS.ACCESS_TOKEN);
			}
		});
		client
			.api('/me')
			.select("displayName")
			.get((err, res) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log(res);
			});
		// Example of downloading the user's profile photo and displaying it in an img tag
		client
			.api('/me/photo/$value')
			.responseType('blob')
			.get((err, res, rawResponse) => {
				if (err) throw err;
				const url = window.URL;
				const blobUrl = url.createObjectURL(rawResponse.xhr.response);
				document.getElementById("profileImg").setAttribute("src", blobUrl);
			});		
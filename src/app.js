import * as Msal from "msal";
require("../node_modules/@microsoft/microsoft-graph-client/lib/graph-js-sdk-web");

import { SECRETS } from "./secrets";
var applicationConfig = {
    clientID: SECRETS.CLIENT_ID,
    graphScopes: ["user.read"]//, "mail.send"]
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  var el = document.getElementById("btnLogin");
  console.log("el?", el);
  el.addEventListener("click", function eventClick(){
    loginWithMS();
  });
}

function loginWithMS(){
  var logger = new Msal.Logger(loggerCallback, { level: Msal.LogLevel.Verbose, correlationId:'12345' }); // level and correlationId are optional parameters.
  //Logger has other optional parameters like piiLoggingEnabled which can be assigned as shown aabove. Please refer to the docs to see the full list and their default values.

  function loggerCallback(logLevel, message, piiLoggingEnabled) {
      console.log(message);
  }

  var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, authCallback, { logger: logger, cacheLocation: 'localStorage'}); //logger and cacheLocation are optional parameters.
  //userAgentApplication has other optional parameters like redirectUri which can be assigned as shown above.Please refer to the docs to see the full list and their default values.
  function authCallback(errorDesc, token, error, tokenType) {
      if (token) {
      }
      else {
          log(error + ":" + errorDesc);
      }
  }

  userAgentApplication.loginPopup(applicationConfig.graphScopes).then(function (idToken) {
      //Login Success
      userAgentApplication.acquireTokenSilent(applicationConfig.graphScopes).then(function (accessToken) {
          //AcquireToken Success
          console.log("LOGGED IN! Hello World!");
      }, function (error) {
          //AcquireToken Failure, send an interactive request.
          userAgentApplication.acquireTokenPopup(applicationConfig.graphScopes).then(function (accessToken) {
              updateUI();
          }, function (error) {
              console.log(error);
          });
      })
  }, function (error) {
      console.log(error);
  });
}






/*var client = MicrosoftGraph.Client.init({
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
      */
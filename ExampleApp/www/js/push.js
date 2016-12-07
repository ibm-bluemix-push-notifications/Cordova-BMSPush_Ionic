var initializePush = function() {
  if(window.cordova) {
    console.log('Started BMSpush initializ');
    BMSClient.initialize("Push service region");
      var appGUID = "Your Push service AppGUID";
      var clientSecret = "Your Push service clientSecret";
      
      BMSPush.initialize(appGUID,clientSecret);
    BMSPush.registerNotificationsCallback(function(notification) {
      console.log('registering NotificationsCallback: '+JSON.parse(notification));
      //alert(JSON.parse(notification) + ' register notification');
    });
    var settings = {};

    BMSPush.registerDevice(settings,
      function(success){
        console.log('registering Device Success: '+JSON.parse(success));
        
        //Get a list of available tags to which the device can subscribe
        BMSPush.retrieveAvailableTags(function(tags) {
          console.log("retrieveAvailableTags : " + tags);
            BMSPush.subscribe(tags, null, null);
        }, null);

        //Get a list of available tags to which the device is subscribed.
        BMSPush.retrieveSubscriptions(function(tags) {
          console.log("retrieveSubscriptions : " + tags);
        }, null);
    },
     function(failure){
       console.log('registering Device Failed: '+JSON.parse(failure));
    });
  }else{
    console.log('window cordova = false!!!');
  }
};

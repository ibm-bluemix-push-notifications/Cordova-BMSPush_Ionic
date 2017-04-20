// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    console.log('Started BMSpush initialize');
    
    BMSClient.initialize("Push service region");
    var appGUID = "Your Push service AppGUID";
    var clientSecret = "Your Push service clientSecret";

    BMSPush.initialize(appGUID,clientSecret);
    BMSPush.registerNotificationsCallback(function(notification) {
      console.log('registering NotificationsCallback: '+JSON.parse(notification));
      alert(JSON.parse(notification) + ' register notification');
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
    });
  })

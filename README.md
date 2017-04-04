# Cordova_Ionic_HelloPush

Cordova_Ionic_HelloPush is an example usage of Bluemix push Cordova plugin in Ionic platform.

## Prerequisites

<ol>
<li>Cordova Latest version</li>
<li>Ionic </li>
<li>Android Studio</li>
<li>Xcode</li>
</ol>

 <p>To install the Ionic platform follow this [doc](https://ionicframework.com/getting-started/)</p>

## Creating Ionic App.

To create an Ionic app follow the below steps,

1. Open the terminal app and run the following command to create an app

  ```
  ionic start {appname} {template}
  ```
  For Example;

  ```
  ionic start ExampleApp blank
  ```
2. Go to your appname directory,

  ```
  cd {appname}
  ```

  For Example;

  ```
  cd ExampleApp
  ```
3. Add platforms

  ```
  ionic platform add ios
  ionic platform add android
  ```
4. Add the <strong>bms-push</strong> plugin to the project

  ```
  cordova plugin add bms-push
  ```

  <p>It will add `bms-push` and `bms-core` plugins to your app</p>


5. Edit the `www/index.html` and add your code for <strong>initializing</strong> and <strong>registering</strong> for Bluemix Push notifications. For reference check [Example App Index.html](https://github.com/ibm-bluemix-push-notifications/Cordova_Ionic_HelloPush/ExampleApp/www/index.html) & [Exaple app push.js](https://github.com/ibm-bluemix-push-notifications/Cordova_Ionic_HelloPush/ExampleApp/www/js/push.js)

6. Do the `cordova prepare` and `cordova build`.

>Note: You may get ios build fail and you can neglect it.

## Run Applications

### Android

Get your `bundle id` from `config.xml` and add it to [Firebase app](https://console.firebase.google.com/). Download the `google-services.json` and add to **platforms -> android** 

<p>To run the Android application got to **platforms -> android** and open it in **Android Studio** . </p>

<p>Open the `build.gradle (Module: android)` and,

* Under `buildscript` locate `dependencies` and add `classpath 'com.google.gms:google-services:3.0.0'`.
* Scroll down and locate `dependencies {compile fileTree(dir: 'libs', include: '*.jar') , ...}`  and add the following code `apply plugin: 'com.google.gms.google-services'` just below the ending of `dependencies {}`

  For example,

```
  dependencies {
    compile fileTree(dir: 'libs', include: '*.jar')
    // SUB-PROJECT DEPENDENCIES START
    debugCompile(project(path: "CordovaLib", configuration: "debug"))
    releaseCompile(project(path: "CordovaLib", configuration: "release"))
    compile "com.android.support:appcompat-v7:23.2.1"
    compile "com.google.firebase:firebase-messaging:9.0.2"
    // SUB-PROJECT DEPENDENCIES END
  }
  apply plugin: 'com.google.gms.google-services'
```

<p> Build and run your application. </p>

### iOS

<p>For running the iOS application got to **platforms -> ios** and open **yourApp.xcworkspace** in the latest Xcode (8+)</p>

Follow the steps to complete the building of iOS App,

1. Change the *Bundle Identifier* and *Signing credentials*
2. Go to the *AppDelegate.m* file and add the following snippets

    Add the **#import "yourApp-swift.h"**

#### Objective-C:

   ```
   // Register device token with Bluemix Push Notification Service
   - (void)application:(UIApplication *)application
  didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{

     [[CDVBMSPush sharedInstance] didRegisterForRemoteNotifications:deviceToken];
  }

  // Handle error when failed to register device token with APNs
  - (void)application:(UIApplication*)application
  didFailToRegisterForRemoteNotificationsWithError:(NSError*)error {

    [[CDVBMSPush sharedInstance] didFailToRegisterForRemoteNotifications:error];
  }

  // Handle receiving a remote notification
  -(void)application:(UIApplication *)application
  didReceiveRemoteNotification:(NSDictionary *)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {

    [[CDVBMSPush sharedInstance] didReceiveRemoteNotification:userInfo];
  }
  ```

#### Swift:

  ```
   // Register device token with Bluemix Push Notification Service
   func application(application: UIApplication,
   	didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData) {

   	CDVBMSPush.sharedInstance().didRegisterForRemoteNotificationsWithDeviceToken(deviceToken)
   }

   // Handle error when failed to register device token with APNs
   func application(application: UIApplication,
   	didFailToRegisterForRemoteNotificationsWithError error: NSErrorPointer) {

   	CDVBMSPush.sharedInstance().didReceiveRemoteNotificationWithNotification(error)
   }

   // Handle receiving a remote notification
   func application(application: UIApplication,
   	didReceiveRemoteNotification userInfo: [NSObject : AnyObject], 	fetchCompletionHandler completionHandler: ) {

   	CDVBMSPush.sharedInstance().didReceiveRemoteNotificationWithNotification(userInfo)
   }

   // Handle receiving a remote notification on launch
   func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
     let remoteNotif = launchOptions?[UIApplicationLaunchOptionsKey.remoteNotification] as? NSDictionary

     if remoteNotif != nil {
       CDVBMSPush.sharedInstance().didReceiveRemoteNotificationOnLaunchWithLaunchOptions(launchOptions)
     }
   }
   ```
  You can follow the this [README](https://github.com/ibm-bluemix-mobile-services/bms-clientsdk-cordova-plugin-push/blob/master/README.md) to setup **bms-push**.

3. You have to set the **Swift Legacy** to **yes** in your `application` and in the `pod frameworks (BMSPush, BMSAnalytics, BMSAnalyticsAPI, BMSCore and BMSSecurity)`.

4. Clean and build the application.
5. Run the application.

## Example App

The [ExampleApp](https://github.com/ibm-bluemix-push-notifications/Cordova_Ionic_HelloPush/ExampleApp) is an ionic app using bluemix push notifcations cordova plugin.

1. Edit the **www/js/push.js** file with your `APPGUID`,`ClientSecret` and `App Region`. Do the `Cordova Prepare` and `Cordova build`.

2. To run the iOS app got to **platforms -> ios** open in Xcode , build and Run the app.
3. To run the android app got to **platforms -> android** open in Android Studio , build and Run the app.


## Copyright 2016-17 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

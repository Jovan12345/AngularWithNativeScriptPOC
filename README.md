

# Angular with NativeScript app - READ ME

  

This file is created to layout the steps for installation and starting the app as well as the most important parts of the Application explained on high level.

  

## Installation

  

**Prerequisites**

  

- Installed [Node.js](https://nodejs.org/en/)

- Installed command line tool NativeScript CLI - `npm install -g nativescript`

- Configure [iOS and Android requirements](https://docs.nativescript.org/angular/start/quick-setup#step-2-install-ios-and-android-requirements)

- Physical device Android or iOS, or emulator.

  
  
  

**Installation Steps**

  

1. Open CLI (command line interface)

2. Navigate to the project folder

3. run `tns run <platform>`, can be android or ios (ex. `tns run android` or `tns run ios`)

4. The app will run in development mode. You may have to wait a minute while your project bundles and loads for the first time.

## App description

  

- This application is built using NativeScript 7 and Angular.

- In the application has Login screen (Sign in and Sign up), where once the user logs in successfully its routed to the Home screen

- There is a home screen with bottom tabs for navigation.

- The bottom tabs have navigation for 3 screens (List, Camera, Location)

- The List screen shows list of photos from a jsonPlaceholder API.

- The Camera screen allows the user to take a photo with the device and display the photo on the screen

- The Location screen offers a Google map

## Detailed app description
**Login Screen**
The Login screen is the screen that shows when the application is started. 
For the login with email functionality of this component an API provided by NativeScript is used (the API is used in the [Playground sample](https://play.nativescript.org/?template=groceries-ng&tutorial=groceries-ng&autoStart=true)).
The user can create an account (Sign Up), or login if he already had created an account beforehand. 

There is a validation on the input fields of the login screen. Validation applies if the fields are empty. Error handling is implement in the component as well, ex. if the user enters invalid credentials, an error will be thrown and popup alert message will be shown to the user.

The second option uses a fingerprint scanner (if the device has any). At first there is a validation to check if the device on which the application is running has a fingerprint scanner available. If yes, there is a flag, which changes based on the previous condition, and the fingerprint scanner will be shown. 
The library for biometrics which is used for this POC is `nativescript-fingerprint-auth` by [EddyVerbruggen](https://github.com/EddyVerbruggen/nativescript-fingerprint-auth/commits?author=EddyVerbruggen "View all commits by EddyVerbruggen"). It uses the data which is actually saved in the phone. So the user must pervious scan their finger in the device, and that same recorded fingerprint can be used to authenticate in the app itself. 

If the login (email or fingerprint) is successful, the user will be routed to the home screen.

**Home Screen**
The home screen component uses an NativeScript element BottomNavigation, where there are multiple screens(components) added:     
 - List tab (used for displaying list with pagination) 
	 -	In this screen a list of Posts is created, for this purpose, data from Unsplash API has been used. Following there are couple of directives that are used (ex. ngFor is used to iterate and create the list items). An angular service has been created to make the GET request to the API (http common library from angular). In the list component, on initialization the component subscribes to the observer that gets the data from the api.
	 -	On the bottom of the list there are two more buttons used for displaying another set of posts (pagination) 
 - Post tab (used for creating posts) 
	 - The post tab is fairly straight fowrad, it's soul purpose is to demonstrate the use and implementation of POST requests in an Angular with Nativescript application. 
	 - The Component is made of a label couple of input fields and a service. Once the input fields are populated with data, an post request can be sent to the API and the response is shown back yo the user in alert box.  
 - Camera tab
	 - The camera component allows the user to take a photo, and the display the photo on the screen (once taken). The picture is stored in the device. To be able to use this feature as on of the native features for both Mobile OS, permission were added in the AndroidManifest.xml file.
 - Location tab
	 - Is the location tab, again an native feature is utilized. Where in this case an google map is implemented using the library nativescript-google-maps-sdk to display a Map, Marker and Position. To locate the current location of the user, the nativescript-geolocation api is used.

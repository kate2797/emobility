# Electromobility Tool
This project is intended to provide users with a predictable, personalised, and optimised charging experience considering the relative lack of public EV charging infrastructure in the UK and certain impracticalities associated with owning an EV.

  <img src="https://github.com/kate2797/emobility/assets/52212037/6a8b19f2-44f3-48d3-8f4a-3b8a1b623d60" height="600" />
  <img src="https://github.com/kate2797/emobility/assets/52212037/c28638bb-1db2-4bee-9415-50bea83ccbe5" height="600" />
  <img src="https://github.com/kate2797/emobility/assets/52212037/d4f5b7c3-75b0-4caf-8bde-c5e926f69280" height="600" />

## View the Project on Your Physical Device
Please read the consideration sections for your operating system before viewing the project.
### iOS User Considerations
The Location API on Expo SDK 40+ versions is slow to retrieve geolocation on iOS devices (~10 seconds). In order to resolve this issue (~0.025 seconds), please follow the instructions below once you have been asked to share your location:
1. Go to "Settings" and find the "Expo Go" application 
2. Click on "Expo Go" and navigate to the "Location" section
3. Press on the "Location" section and disable "Precise Location" via the toggle button

### Android User Considerations
There are no issues with the Location API on Android phones. However, at the present time, there is a problem integrating the date and time components due to the Android's native API. Thus, you will experience a less smooth booking experience on Android. There may be a flicker upon button press or issues with format of the date and time upon getting a slot replacement as the project is now only using a temporary solution to solve these issues.

## Run the Project Locally
### Installing Prerequisites
1. Install npm
```
npm install npm@latest -g
```
2. Install Node.js from the official [Node.js website](https://nodejs.org/en/download/)
3. Verify Node.js installation
```
node -v
```
4. Install Expo CLI and web dependencies
```
npm i --g expo-cli
```
```
expo install react-native-web react-dom
```
5. Install [Xcode](https://developer.apple.com/xcode/) or [Android Studio](https://developer.android.com/studio) to be able to run the project on iOS or Android simulator, respectively

### Accessing the Submitted Project Folder
```
cd msc-tool
```

### Installing Dependencies
```
npm install expo --legacy-peer-deps
```

### Usage
Run the project either on iOS or Android simulator
```
expo start --ios
```
```
expo start --android
```
To obtain local QR code
```
expo start
```

## Technology Stack
- Expo CLI
- React Native
- Firebase
- React Navigation
- React Native Paper
- React Native Maps
- Google Places Autocomplete
- URQL Client
- Zustand
- Date-fns
- Turf.js
- Jest

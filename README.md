## React Native - User AuthN

### GitHub repo

- https://github.com/nirgluzman/React-Native-MyFavourites.git

- https://github.com/academind/react-native-practical-guide-code.git (course)

### Start a new React Native project with Expo

https://reactnative.dev/docs/environment-setup, https://docs.expo.dev/

```bash
npx create-expo-app <project name> --template blank
```

### React Navigation

https://reactnavigation.org/docs/getting-started

- Mandatory installations:

```bash
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
```

- Native Stack Navigator:

```bash
npm install @react-navigation/native-stack
```

- Bottom Tabs Navigator:

```bash
npm install @react-navigation/bottom-tabs
```

### Environment variables in Expo

https://docs.expo.dev/guides/environment-variables/

- The Expo CLI will automatically load environment variables with an `EXPO_PUBLIC_` prefix from .env
  files for use within your JavaScript code.

- Do not store sensitive info, such as private keys, in `EXPO_PUBLIC_` variables. These variables
  will be visible in plain-text in your compiled application.

### Expo Camera -> comprehensive camera manegement package

https://docs.expo.dev/versions/latest/sdk/camera/

- `expo-camera` provides a React component that renders a preview of the device's front or back
  camera.

- Using `CameraView`, you can take photos and record videos that are saved to the app's cache.

### Expo ImagePicker

https://docs.expo.dev/versions/latest/sdk/imagepicker/

- A library that provides access to the system's UI for selecting images and videos from the phone's
  library or taking a photo with the camera.

- `ImagePicker` requires permissions to pick images from the gallery and to capture new images from
  the camera. We need to add these permissions to `app.json`.
  https://docs.expo.dev/versions/latest/sdk/imagepicker/#configuration-in-appjsonappconfigjs

### Expo Location

https://docs.expo.dev/versions/latest/sdk/location/

- A library that provides access to reading geolocation information, polling current location or
  subscribing location update events from the device.

- `expo-location` allows reading geolocation information from the device.

### Difference between ScrollView and FlatList

https://pankajhasmukh2014.medium.com/difference-between-scrollview-and-flatlist-react-native-20a2e49238f9

- In React Native, both ScrollView and FlatList are components used for displaying a scrollable list
  of items, but they have different use cases and benefits.

- `ScrollView` is a general-purpose component for scrolling. It’s suitable when you have a small,
  finite list of items that you want to display on a screen. It’s not ideal for very long lists or
  dynamic data, as it renders all the items at once.

- `FlatList` is specifically designed for efficiently rendering long lists of data. It’s a more
  performant option for large datasets or dynamic content. It only renders the items that are
  currently visible on the screen, making it more memory-efficient.

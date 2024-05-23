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

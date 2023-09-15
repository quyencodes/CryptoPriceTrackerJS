##Useful Error Handling

When trying to create a React Native project entirely with Yarn I ran into an error:
Installing Expo automatically defaults to using NPM (as of September 2023)

Source: https://stackoverflow.com/questions/49589493/is-there-any-harm-in-using-npm-and-yarn-in-the-same-project#:~:text=If%20you%20use%20NPM%20to,mismatches%20when%20running%20your%20application.

Source: https://stackoverflow.com/questions/74382036/why-creating-new-expo-react-native-app-starts-installing-with-yarn

```bash
yarn create expo-app
```

When adding NativewindCSS I ran into an error:
relativePath/fileName.js: Use process(css).then(cb) to work with async plugins
Source: https://stackoverflow.com/questions/76688256/getting-error-use-processcss-thencb-to-work-with-async-plugins

```bash
yarn add --dev tailwindcss@3.3.2
```

When trying to add the BottomSheet Modal I ran into an error:
PanGestureHandler must be used as a decendant of GestureHandlerRootView

Source: https://github.com/gorhom/react-native-bottom-sheet/issues/1389

Look at top upvoted comment

Blank white screen after wrapping code in `<GestureHandlerRootView>`

Source: https://github.com/software-mansion/react-native-gesture-handler/issues/1955

Look at top upvoted comment

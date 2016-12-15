# README

## Installations

- clone code from github
- install node packages: `npm install`

### Run in iOS
- install `ruby` and `cocoapods` gem:
  `gem install cocoapods`
- install pod dependencties
  `cd ios && pod install`
- launch app `react-native run-ios`

### Run in Android
- install Android Studio
- create an Emulator, for example sdk v23
- launch app `react-native run-android`

## Debugging
- `react-native log-ios` or `react-native log-android`

## Tools & Documentations
- `Redux`: http://redux.js.org/
- `redux-api`: https://github.com/lexich/redux-api/blob/master/docs/DOCS.md
- `native-base`: http://nativebase.io/docs/v0.5.13/components
- `material-ui`: https://github.com/xotahal/react-native-material-ui

## Workflow
- Every change must be in branch
- Lint code before commit `npm run eslint js`
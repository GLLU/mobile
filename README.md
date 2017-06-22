# README

## Installations

- clone code from github
- install node packages: `npm install`
- brew cask install react-native-debugger

### Run in iOS
- install `ruby` and `cocoapods` gem:
  `gem install cocoapods`
- install pod dependencties
  `cd ios && pod install` (read the note below)
- launch app `react-native run-ios`

### Install Pods Differently
`pod install` or `pod setup` fetches whole repo with history when you first time run it. 
You don't need that commit history.

Instead, run:
- `pod setup`
- `Ctrl +C` to kill the setup.
- `cd ~/.cocoapods/repos`
- `git clone --depth 1 https://github.com/CocoaPods/Specs.git master`

It'll take significantly less time to clone.

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

## CodePush
- To update Release you first need to update the staging version:
     code-push release-react infash android (for IOS just change to IOS)
- If everything is ok you can promote the update to production:
     code-push promote infash Production Staging
import { StackNavigator } from 'react-navigation'
import SplashPage from './components/splashscreen/';
import FeedPage from './components/feedscreen';
import AddItemPage from './components/addItemScreen';
import MyBodyType from './components/myBodyType';
import MyBodyMeasure from './components/myBodyMeasure';
import SignUpPage from './components/signup';
import SignInPage from './components/signin';
import SignUpGenderPage from './components/signup/SignUpGenderPage.js';
import ForgotPassword from './components/forgotPassword';
import LooksScreen from './components/looksScreen';
import ProfileScreen from './components/profileScreen';
import FollowScreen from './components/profileScreen/follows/followscreen';
import FollowerScreen from './components/profileScreen/follows/followerscreen';
import NotificationsScreen from './components/notificationsscreen';
import SettingsScreen from './components/settingsScreen';
import EditProfile from './components/profileScreen/EditProfile.js';
import FinishLookScreen from './components/finishLookScreen';
import TutorialScreen from './components/tutorialScreen'
import BadNavigationScreen from './components/badNavigationScreen'
import likesScreen from './components/likesScreen'

const stackNavigatorConfig = {
  initialRouteName: 'splashscreen',
  headerMode: 'none',
  gesturesEnabled: true
};

const routes = {
  splashscreen: {
    screen: SplashPage,
  },
  signupemail: {
    screen: SignUpPage,
  },
  genderselect: {
    screen: SignUpGenderPage,
  },
  signinemail: {
    screen: SignInPage,
  },
  forgotpassword: {
    screen: ForgotPassword,
  },
  feedscreen: {
    screen: FeedPage,
  },
  addItemScreen: {
    screen: AddItemPage,
  },
  finishLookScreen: {
    screen: FinishLookScreen,
  },
  myBodyType: {
    screen: MyBodyType,
  },
  myBodyMeasure: {
    screen: MyBodyMeasure,
  },
  looksScreen: {
    screen: LooksScreen,
  },
  profileScreen: {
    screen: ProfileScreen,
  },
  followScreen: {
    screen: FollowScreen,
  },
  likesscreen: {
    screen: likesScreen,
  },
  followerScreen: {
    screen: FollowerScreen,
  },
  notificationsScreen: {
    screen: NotificationsScreen
  },
  settingsScreen: {
    screen: SettingsScreen
  },
  editProfileScreen: {
    screen: EditProfile,
  },
  tutorialscreen: {
    screen: TutorialScreen
  },
  badNavigation: {
    screen: BadNavigationScreen
  }
};

export default StackNavigator(routes, stackNavigatorConfig);


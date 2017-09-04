import { StackNavigator } from 'react-navigation';
import LoginPage from './components/loginScreen/';
import FeedPage from './components/feedscreen';
import UploadLookScreen from './components/uploadLookScreen/UploadLookScreenContainer';
import MyBodyType from './components/myBodyType';
import MyBodyMeasure from './components/myBodyMeasure';
import SignUpPage from './components/signup';
import SignInPage from './components/signin';
import SignUpGenderPage from './components/signup/SignUpGenderContainer.js';
import ForgotPassword from './components/forgotPassword';
import ProfileScreen from './components/profileScreen/profileScreenContainer';
import FollowingLooks from './components/looksScreen/LooksFollowingContainer';
import BestMatchLooks from './components/looksScreen/LooksBestMatchContainer';
import WhatsHotLooks from './components/looksScreen/LooksWhatsHotContainer';
import ProfileLooks from './components/looksScreen/LooksProfileContainer';
import FollowScreen from './components/profileScreen/follows/followscreen';
import FollowerScreen from './components/profileScreen/follows/followerscreen';
import NotificationsScreen from './components/notificationsscreen/NotificationsContainer';
import SettingsScreen from './components/settingsScreen/SettingsContainer';
import EditProfile from './components/profileScreen/EditProfile.js';
import FinishLookScreen from './components/finishLookScreen';
import TutorialScreen from './components/tutorialScreen';
import BadNavigationScreen from './components/badNavigationScreen';
import likesScreen from './components/likesScreen';
import BlockedUsersScreen from './components/blockedUsersScreen';
import SearchScreen from './components/searchScreen/SearchScreenContainer';
import Splash from './components/splashScreen/SplashContainer';

const stackNavigatorConfig = {
  initialRouteName: 'splash',
  headerMode: 'none',
  gesturesEnabled: true,
};

const routes = {
  splash: {
    screen: Splash,
  },
  loginscreen: {
    screen: LoginPage,
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
  uploadLookScreen: {
    screen: UploadLookScreen,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  finishLookScreen: {
    screen: FinishLookScreen,
  },
  searchScreen: {
    screen: SearchScreen,
  },
  myBodyType: {
    screen: MyBodyType,
  },
  myBodyMeasure: {
    screen: MyBodyMeasure,
  },
  lookScreenFollwing: {
    screen: FollowingLooks,
  },
  lookScreenBestMatch: {
    screen: BestMatchLooks,
  },
  lookScreenWhatsHot: {
    screen: WhatsHotLooks,
  },
  lookScreenProfile: {
    screen: ProfileLooks,
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
    screen: NotificationsScreen,
  },
  settingsScreen: {
    screen: SettingsScreen,
  },
  blockedUsersScreen: {
    screen: BlockedUsersScreen,
  },
  editProfileScreen: {
    screen: EditProfile,
  },
  tutorialscreen: {
    screen: TutorialScreen,
  },
  badNavigation: {
    screen: BadNavigationScreen,
  },
};

export default StackNavigator(routes, stackNavigatorConfig);


import { StackNavigator } from 'react-navigation'

const stackNavigatorConfig = {
  initialRouteName: 'splashscreen',
  headerMode: 'none',
  gesturesEnabled: true
};

const optional = props.scene.route.optional ? props.scene.route.optional: '';

const routes = {
  Splash: {
    screen: SplashPage
  },
  Activation: {
    screen: ActivationCodeScreen,
    navigation: {continueTo: props.scene.route}
  },
  SignUp: {
    screen: SignUpPage,
    navigation: {gender: props.scene.route.gender}
  },
  GenderSelect: {
    screen: SignUpGenderPage
  },
  SignIn: {
    screen: SignInPage
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  Feed: {
    screen: FeedPage
  },
  AddItem: {
    screen: AddItemPage,
    navigation: {mode: optional ? optional.mode : 'create'}
  },
  FinishLook: {
    screen: FinishLookScreen
  },
  MyBodyType: {
    screen: MyBodyType,
  },
  MyBodyMeasure: {
    screen: MyBodyMeasure,
  },
  Looks: {
    screen: LooksScreen,
    navigation: {flatLook: props.scene.route.optional}
  },
  Profile: {
    screen: ProfileScreen,
    navigation: {userData: props.scene.route.optional}
  },
  Follow: {
    screen: FollowScreen,
    navigation: {userData: props.scene.route.optional}
  },
  Follower: {
    screen: FollowerScreen,
    navigation: {userData: props.scene.route.optional}
  },
  Notifications: {
    screen: NotificationsScreen
  },
  Settings: {
    screen: SettingsScreen
  },
  EditProfile: {
    screen: EditProfile,
    navigation: {userData: props.scene.route.optional}
  }
};

export default StackNavigator(routes, stackNavigatorConfig);


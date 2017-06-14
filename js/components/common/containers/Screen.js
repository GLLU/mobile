import withNavigation from "../navigation/WithNavigation";
import withAnalytics from "../analytics/WithAnalytics";
import withBugsnag from "../bugsnag/WithBugsnag";


export default function asScreen(WrappedComponent) {

  return withNavigation(withBugsnag(withAnalytics(WrappedComponent)))

}
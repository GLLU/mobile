import withNavigation from "../navigation/WithNavigation";
import withAnalytics from "../analytics/WithAnalytics";


export default function asScreen(WrappedComponent) {

  return withNavigation(withAnalytics(WrappedComponent))

}
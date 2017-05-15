import StackNavigator from '../routes'

export default function manageStackReducer(state , action) {
  return StackNavigator.router.getStateForAction(action,state)
}

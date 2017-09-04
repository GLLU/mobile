// @flow

import {connect} from 'react-redux';
import SignUpGenderPage from './SignUpGenderPage';
import asScreen from '../common/containers/Screen';
import { instagramSignIn } from '../../actions/user';

function bindAction(dispatch) {
  return {
    instagramSignIn: (accessToken, gender) => dispatch(instagramSignIn(accessToken, gender)),
  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(asScreen(SignUpGenderPage));

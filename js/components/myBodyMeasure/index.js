import React, {Component} from 'react';
import {Container, Header, Content, Button, Icon, Title } from 'native-base';
import {Text, View} from 'react-native';
import myStyles from './styles';
import glluTheme from '../../themes/gllu-theme';

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { saveUserSize} from '../../actions/myBodyMeasure';

import BodyMeasureView from './bodyMeasureView';
import InformationTextIcon from '../common/informationTextIcon';


const { popRoute } = actions

class MyBodyMeasure extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    user_size: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    gender: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    saveUserSize: React.PropTypes.func,
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _saveUserSize() {
    const { user_size, currentBodyType } = this.props;
    if(Object.keys(this.props.user_size).length !== 0) {
      console.log('start');
    }
    const data = {
      body_type: currentBodyType.uniqueName,
      chest: user_size.chest,
      waist: user_size.waist,
      hips: user_size.hips,
      height: user_size.height,
      measurements_scale: user_size.measurements_scale
    };
    this.props.saveUserSize(data);
  }

  render() {
    return (
      <Container theme={glluTheme}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>My Body Measures</Title>
        </Header>
        <Content>
          <Text style={myStyles.selectBodyTypeText}>This will help us find unique items for a perfect fit</Text>
          <View style={myStyles.container}>
            <BodyMeasureView gender={this.props.gender} bodyType={this.props.currentBodyType} />
          </View>
          <View style={{marginTop: 15}}>
            <InformationTextIcon text={'This information is private to you only'} />
          </View>
          <Button block primary style={myStyles.continueButton} onPress={() => this._saveUserSize()}>All Set. Let's GLLU!</Button>
        </Content>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements))
  };
}

const mapStateToProps = state => {
  const userSize = state.user.user_size ? state.user.user_size : {};
  return {
    navigation: state.cardNavigation,
    currentBodyType: state.myBodyType.currentBodyType,
    gender: state.user.gender,
    user_size: userSize
  }
};

export default connect(mapStateToProps, bindAction)(MyBodyMeasure);

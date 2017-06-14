import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Title, getTheme, StyleProvider } from 'native-base';
import { Text, View, StyleSheet } from 'react-native';
import styles from './styles';
import glluTheme from '../../themes/gllu-theme';

import { connect } from 'react-redux';
import { saveUserSize } from '../../actions/myBodyMeasure';

import BodyMeasureView from './bodyMeasureView';
import InformationTextIcon from '../common/informationTextIcon';
import asScreen from "../common/containers/Screen"

class MyBodyMeasure extends Component {
  constructor(props) {
    super(props);
    this.handleSaveUserSizePress=this.handleSaveUserSizePress.bind(this);
    this.saveUserSize=this.saveUserSize.bind(this);
  }

  static propTypes = {
    user_size: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    gender: React.PropTypes.string,
    saveUserSize: React.PropTypes.func,
  }

  saveUserSize() {
    const {user_size, currentBodyType} = this.props;
    const data = {
      body_type: currentBodyType.body_type,
      chest: user_size.chest,
      waist: user_size.waist,
      hips: user_size.hips,
      height: user_size.height,
      measurements_scale: user_size.measurements_scale
    };
    return this.props.saveUserSize(data);
  }

  handleSaveUserSizePress() {
    this.props.logEvent('BodyMeasureScreen', {name: 'Lets inFash clicks'});
    this.saveUserSize()
      .then(()=>this.props.resetTo('feedscreen'))
      .catch(err=>console.log(err));
  }

  render() {
    return (
      <Container>
        <View style={{height: 50}}>
          <View style={[styles.header,{flexDirection:'row', flex: 1, alignItems:'center'}]}>
            <Button transparent onPress={this.props.goBack}>
              <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back"/>
            </Button>
            <Text style={styles.headerTitle}>My Body Measures</Text>
          </View>
        </View>
        <StyleProvider style={getTheme(glluTheme)}>
          <Content>
            <Text style={StyleSheet.flatten(styles.selectBodyTypeText)}>This will help us find unique items for a
              perfect fit</Text>
            <View style={StyleSheet.flatten(styles.container)}>
              <BodyMeasureView gender={this.props.gender} bodyType={this.props.currentBodyType}/>
            </View>
            <View style={{marginTop: 15}}>
              <InformationTextIcon text='This information is private to you only'/>
            </View>
            <Button block style={StyleSheet.flatten(styles.continueButton)}
                    onPress={this.handleSaveUserSizePress.bind(this)}>
              <Text style={{color:'white'}}>All Set. Let's inFash!</Text>
            </Button>
          </Content>
        </StyleProvider>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements))
  };
}

const mapStateToProps = state => {
  const userSize = state.user.user_size ? state.user.user_size : {};
  return {
    currentBodyType: state.myBodyType.currentBodyType,
    gender: state.user.gender,
    user_size: userSize
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(MyBodyMeasure));

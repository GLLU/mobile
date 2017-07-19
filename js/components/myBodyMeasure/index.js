import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Text, View, StyleSheet, BackAndroid, Dimensions } from 'react-native';
import styles from './styles';

import { connect } from 'react-redux';
import { saveUserSize } from '../../actions/myBodyMeasure';

import BodyMeasureView from './bodyMeasureView';
import InformationTextIcon from '../common/informationTextIcon';
import asScreen from "../common/containers/Screen"
import { showBodyTypeModal } from "../../actions/myBodyType";
import Header from "../common/headers/ModalHeader";
import SolidButton from "../common/buttons/SolidButton";

const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;

class MyBodyMeasure extends Component {
  constructor(props) {
    super(props);
    this.handleSaveUserSizePress=this.handleSaveUserSizePress.bind(this);
    this.saveUserSize=this.saveUserSize.bind(this);
    this.goBack=this.goBack.bind(this);
    this.logBackEvent=this.logBackEvent.bind(this);
  }

  static propTypes = {
    user_size: React.PropTypes.object,
    currentBodyType: React.PropTypes.object,
    gender: React.PropTypes.string,
    saveUserSize: React.PropTypes.func,
  }

  componentDidMount() {
    BackAndroid.addEventListener('BodyMeasureHardwareBackPress', this.logBackEvent);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('BodyMeasureHardwareBackPress', this.logBackEvent)

  }

  logBackEvent() {
    this.props.logEvent('BodyMeasureScreen', {name: 'BodyMeasure hardware back button press'});
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

  goBack(){
    this.props.showBodyTypeModal();
    this.props.goBack();
  }

  render() {
    return (
      <Container>
        <Header title='My Body Measures' goBack={this.goBack}/>
          <Content style={{backgroundColor:'#eee'}}>
            <View style={[{backgroundColor:'#fff'},styles.container]}>
              <Text style={styles.selectBodyTypeText}>This will help us find unique items for a
                perfect fit</Text>
            </View>
            <View style={{backgroundColor:'#eee'}}>
              <View style={styles.container}>
                <BodyMeasureView gender={this.props.gender} bodyType={this.props.currentBodyType}/>
              </View>
              <View style={{marginTop: 15}}>
                <InformationTextIcon text='This information is private to you only'/>
              </View>
              <SolidButton label="All Set. Let's inFash!" onPress={this.handleSaveUserSizePress.bind(this)} style={[styles.continueButton,{backgroundColor:'#00D7B2', height:45}]}/>
            </View>
          </Content>
      </Container>
    )
  }
}

function bindAction(dispatch) {
  return {
    saveUserSize: (measurements) => dispatch(saveUserSize(measurements)),
    showBodyTypeModal: () => dispatch(showBodyTypeModal())
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

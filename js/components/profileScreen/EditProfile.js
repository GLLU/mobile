import React, {Component} from 'react';
import { Image, Animated, InteractionManager, TouchableOpacity, Text, } from 'react-native';
import styles from './styles';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { getStats } from '../../actions/user'
const profileBackground = require('../../../images/backgrounds/profile-screen-background.jpeg');
const cancelEdit = require('../../../images/icons/cancelEdit.png');
const cameraWhite = require('../../../images/icons/cameraWhite.png');
import Icon from 'react-native-vector-icons/FontAwesome';
const { popRoute } = actions;
import BodyMeasureView from '../myBodyMeasure/bodyMeasureView';

class EditProfile extends Component {
  static propTypes = {
    userData: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
  }

  _PopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _tempBtn(){
    console.log('_tempBtn was pressed');
  }

  addItem() {
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false,
    }).then(image => {
      this.props.goToAddNewItem(image);
    });
  }

  _renderleftBtn() {
    return  <Image source={cancelEdit} style={styles.cancelEdit} />
  }
  _renderRightBtn() {
     return (
       <View style={{width: 40, height: 40, backgroundColor: '#00D7B2', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
        <Icon size={20} color={'white'} name={'check'}/>
       </View>
     )
  }

  render() {
    return (
      <View>
        <Image source={profileBackground} style={styles.editProfileBg}>
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']} style={[styles.linearGradient, {opacity: 0.7}]} />
          <View style={styles.header}>
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
            { this._renderleftBtn() }
            </TouchableOpacity>
            <TouchableOpacity transparent onPress={() => this._PopRoute()} style={styles.headerBtn}>
            { this._renderRightBtn() }
            </TouchableOpacity>
          </View>
        </Image>
        <TouchableOpacity transparent onPress={() => this.addItem()} style={styles.editProfileAvatarImg}>
          <Image source={{uri: this.props.user.avatar.url}} style={[styles.avatarImg, styles.editAvatarImage]} >
            <View style={{width: 100, height: 100, opacity: 0.8, backgroundColor: '#00D7B2', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
              <Image source={cameraWhite} style={styles.profilePicBtn} resizeMode={'contain'} />
            </View>
          </Image>
        </TouchableOpacity>
        <View style={styles.container}>
          <BodyMeasureView gender={this.props.user.gender} bodyType={this.props.bodyType} userSize={this.props.user.user_size}/>
        </View>

      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getStats: (id) => dispatch(getStats(id))
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    myUserId: state.user.id,
    stats: state.stats,
    user: state.user,
    bodyType: state.myBodyType.currentBodyType
  };
};

export default connect(mapStateToProps, bindAction)(EditProfile);

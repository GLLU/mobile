/**
 * Created by yonatanitzhaky on 1/9/17.
 */

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import { emailSignUp } from '../../actions/user';

const deviceHeight = Dimensions.get('window').height;
const MK = require('react-native-material-kit');
const {
  MKColor,
} = MK;
const { popRoute, pushRoute } = actions;
const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');

class SignUpGenderPage extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
        emailSignUp: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            gender: '',
        };

    }

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
    }


    pushRoute(route, gender) {
        this.props.pushRoute({ key: route, index: 1, gender: gender }, this.props.navigation.key);
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Image source={background} style={styles.shadow} blurRadius={5}>
                        <Image source={backgroundShadow} style={styles.bgShadow} />
                        <Header style={styles.header} >
                            <Button transparent onPress={() => this.popRoute()}>
                                <Icon style={styles.headerArrow} name="ios-arrow-back" />
                            </Button>
                            <Title style={styles.headerTitle}>Signup for Gllu</Title>
                        </Header>
                        <Content scrollEnabled={false}>
                            <View style={styles.genderSelectContainer}>
                                <TouchableOpacity onPress={() => this.pushRoute('signupemail','female') }>
                                    <View style={styles.genderBtnContainer}>
                                        <Image
                                            source={require('../../../images/genderwomen.png')}
                                            style={styles.genderImage}
                                        />
                                        <Text style={styles.genderLabel}>Female</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.pushRoute('signupemail','male') }>
                                    <View style={styles.genderBtnContainer}>
                                        <Image
                                            source={require('../../../images/gendermen.png')}
                                            style={styles.genderImage}
                                        />
                                        <Text style={styles.genderLabel}>Male</Text>
                                    </View>
                                </TouchableOpacity>
                             </View>
                        </Content>
                    </Image>
                </View>
            </Container>
        );
    }

}

function bindAction(dispatch) {
    return {
        emailSignUp: (data) => dispatch(emailSignUp(data)),
        popRoute: key => dispatch(popRoute(key)),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpGenderPage);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  headerArrow: {
    color: '#FFFFFF'
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: deviceHeight
  },
  shadow: {
    flex: 1,
    width: null,
    height: null
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  bgShadow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0
  },
  uploadImgContainer: {
    marginTop: 15,
    alignSelf: 'center',
    marginBottom: 10
  },
  uploadImgBtn: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100
  },
  uploadImgIcon: {
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  formItem: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderColor: 'rgba(192,192,192, .3)',
    height: 55,
    paddingLeft: 0,
    alignItems: 'flex-end'
  },
  formGroup: {
    flex: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    paddingLeft: 0
  },
  label: {
    color: 'lightgrey',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
  },
  addOpacity: {
    opacity: 0.8
  },
  confirmPass: {
    paddingBottom: 10
  },
  genderSelectContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formInput: {
    flex: 1,
    paddingLeft: 20,
    lineHeight: 20,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
    alignItems: 'stretch',
    color: '#FFFFFF',
    marginLeft: 10,
    top: (Platform.OS === 'ios') ? 0 : 13,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: (Platform.OS === 'ios') ? 20 : 10,
    width: 280,
    height: 40,
    backgroundColor: '#ADADAD',
    borderRadius: 0,
    opacity: 0.8
  },
  validationPassed: {
    backgroundColor: MKColor.Teal
  },
  countrySelectView: {
    flex:1,
  },
  countrySelectInput: {
    padding:10,
    height:40,
    color: '#FFFFFF',
    paddingLeft: 20,
    marginLeft: 10
  },
  alreadyBox: {
    alignSelf: 'center',
    flexDirection:'row',
  },
  alreadyTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8
  },
  alreadyBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    paddingTop: (Platform.OS === 'ios') ? 0 : 5,
  },
  genderBtnContainer:{
    flex: 1,
    alignItems: 'center',
    marginTop: deviceHeight/4
  },
  genderImage:{
    width: 130,
    height: 130,
    borderRadius: 65
  },
  genderLabel:{
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 15,
    opacity: 0.8
  },
  bottomContainerContent: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: (Platform.OS === 'ios') ? 10 : 35,    opacity: 0.8,
    backgroundColor: 'transparent'
  },
});
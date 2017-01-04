
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon, List, ListItem, InputGroup, Input } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import IconB from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import _ from 'lodash';

const { navigateTo } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');
const MK = require('react-native-material-kit');

const {
  MKColor,
} = MK;

const {
    pushRoute,
    popRoute
} = actions;

class SignUpPage extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);

  }

  singupWithEmail() {
      console.log('state',this.state)
      let { username, password, email, name, country } = this.state;
  }

    popRoute() {

      this.props.popRoute(this.props.navigation.key);
    }

  render() {
    console.log('SignUpPage screen');
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
            <View style={styles.uploadImgContainer}>
              <Button large style={styles.uploadImgBtn} warning>
                <IconB size={30} color={MKColor.Teal} name='camera' style={styles.uploadImgIcon}/>
              </Button>
            </View>
          <View>
            <List style={styles.signupForm}>
              <ListItem style={styles.formItem}>
                <InputGroup style={styles.formGroup}>
                  <Input color="white" style={styles.formInput} placeholder="Username" placeholderTextColor="lightgrey" onChangeText={(username) => this.setState({username})}/>
                </InputGroup>
              </ListItem>
              <ListItem style={styles.formItem}>
                <InputGroup style={styles.formGroup}>
                  <Input color="white" style={styles.formInput} placeholder="Name" placeholderTextColor="lightgrey" onChangeText={(name) => this.setState({name})}/>
                </InputGroup>
              </ListItem>
              <ListItem style={styles.formItem}>
                <InputGroup style={styles.formGroup}>
                  <Input color="white" style={styles.formInput} placeholder="Email" placeholderTextColor="lightgrey" onChangeText={(email) => this.setState({email})}/>
                </InputGroup>
              </ListItem>
              <ListItem style={styles.formItem}>
                <InputGroup style={styles.formGroup}>
                  <Input color="white" style={styles.formInput} placeholder="Password" secureTextEntry placeholderTextColor="lightgrey" onChangeText={(password) => this.setState({password})}/>
                </InputGroup>
              </ListItem>
              <ListItem style={styles.formItem}>
                <InputGroup style={styles.formGroup}>
                  <Input color="white" style={styles.formInput} placeholder="Country" placeholderTextColor="lightgrey" onChangeText={(country) => this.setState({country})}/>
                </InputGroup>
              </ListItem>
            </List>
            <Button color='lightgrey' style={styles.formBtn} onPress={() => this.singupWithEmail()}>
              Let's GLLU
            </Button>
              <View style={styles.alreadyBox}>
                <Text style={styles.alreadyTxt}>Already a user?</Text>
                <Button color={MKColor.Teal} style={styles.alreadyBtn}>Login Here</Button>
              </View>
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
    popRoute: key => dispatch(popRoute(key)),
    loginViaFacebook: data => dispatch(loginViaFacebook(data)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpPage);

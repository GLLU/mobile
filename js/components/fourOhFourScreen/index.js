import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { popRoute } from '../../actions';

import brokenLink from '../../../images/brokenLink.png';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width,
    height
  },
  title: {
    fontSize: 24,
    paddingVertical: 20
  },
  textAlign: {
    textAlign: 'center'
  },
  backButton: {
    paddingVertical:12,
    backgroundColor: '#00D7B2',
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
  }
});

class FourOhFour extends BasePage {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.goBackAndLog = this.goBackAndLog.bind(this)
  }

  setUser(name) {
    this.props.setUser(name);
  }

  goBackAndLog() {
    this.logEvent('FourOhFourScreen', {name: 'Back Button Clicked'});
    this.goBack()
  }

  componentDidMount() {
    const {index, routes}=this.props.navigation;
    this.logEvent('FourOhFourScreen', {name: `Should have reached to '${routes[index].key}'`});
  }

  render() {
    return (
      <Container >
        <Content >
          <View style={styles.container}>
            <View style={{flex:1.5}} name="spacer"/>
            <Text style={[styles.textAlign, styles.title]}> Oh No!</Text>
            <View style={{flex:2, flexDirection:'row',justifyContent:'center'}}>
              <Image style={{width:150,height:150}} source={brokenLink}/>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.textAlign}> Seems like the page you are looking for does not exist</Text>
              <Text style={styles.textAlign}> Click here to go back and try again</Text>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity style={styles.backButton} onPress={this.goBackAndLog}>
                  <Text style={[styles.textAlign,{color:'white'}]}>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:2}} name="spacer"/>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(FourOhFour);

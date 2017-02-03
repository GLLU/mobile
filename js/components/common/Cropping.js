
import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text } from 'native-base';
import Modal from 'react-native-modalbox';
import glluTheme from '../../themes/gllu-theme';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  bgImage: {
    width: w,
    height: h,
    resizeMode: 'cover'
  },
  modal: {
    width: 150,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  }
});

class Cropping extends Component {

  static propTypes = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    const bg = require('../../../images/background.png');
    return(
        <Container style={styles.container} theme={glluTheme}>
          <Content scrollEnabled={false} contentContainerStyle={{backgroundColor: '#000000', alignItems: 'center'}}>
            <Image source={bg} style={styles.bgImage}  />
            <Modal isOpen={true}
              style={styles.modal}
              backdropPressToClose ={false}
              swipeToClose={false}
              animationDuration={0}
              position={"center"}>
              <Text>Processing...</Text>
            </Modal>
          </Content>
        </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
});


export default connect(mapStateToProps, bindAction)(Cropping);

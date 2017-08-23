
import React, { Component } from 'react';
import { Platform, StyleSheet,Text, View, } from 'react-native';
import CodePush from 'react-native-code-push';
import { Container, Content,  StyleProvider, getTheme } from 'native-base';
import Modal from 'react-native-modalbox';
import AppNavigator from './AppNavigator';

import theme from './themes/base-theme';
import SpinnerSwitch from './components/loaders/SpinnerSwitch';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }


  render() {
    // if (this.state.showDownloadingModal) {
    //   return (
    //     <View style={{ backgroundColor: 'white' ,flex: 1}}>
    //         <Modal
    //           style={[styles.modal, styles.modal1]}
    //           backdrop={false}
    //           ref={(c) => { this._modal = c; }}
    //           swipeToClose={false}
    //         >
    //           <View
    //             style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}
    //           >
    //             {this.state.showInstalling ?
    //               <Text
    //                 style={{
    //                   color: 'white',
    //                   textAlign: 'center',
    //                   marginBottom: 15,
    //                   fontSize: 15,
    //                 }}
    //               >
    //                 Installing update...
    //               </Text> :
    //               <View
    //                 style={{
    //                   alignSelf: 'stretch',
    //                   justifyContent: 'center',
    //                   padding: 20
    //                 }}
    //               >
    //                 <Text
    //                   style={{
    //                     color: 'black',
    //                     textAlign: 'center',
    //                     marginBottom: 15,
    //                     fontSize: 15,
    //                   }}
    //                 >
    //                   Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
    //                 </Text>
    //
    //               </View>
    //             }
    //           </View>
    //         </Modal>
    //       </View>
    //   );
    // }
    return <AppNavigator notification={this.props.notification} />;
  }
}
App = CodePush(App);
export default App;

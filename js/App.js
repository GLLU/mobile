
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

  componentDidMount() {
    CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        console.log('status',status)
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('download')
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('installing')
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('installed')
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      }
    );

  }

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <View style={{ backgroundColor: 'white' ,flex: 1}}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => { this._modal = c; }}
              swipeToClose={false}
            >
              <View
                style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}
              >
                {this.state.showInstalling ?
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15,
                    }}
                  >
                    Installing update...
                  </Text> :
                  <View
                    style={{
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      padding: 20
                    }}
                  >
                    <Text
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15,
                      }}
                    >
                      Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>

                  </View>
                }
              </View>
            </Modal>
          </View>
      );
    }

    return <AppNavigator/>;
  }
}
App = CodePush(App);
export default App;

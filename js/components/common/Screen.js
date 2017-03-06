import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button, Container, Header, Title, Icon } from 'native-base';
import BaseComponent from './BaseComponent';
import FontSizeCalculator from './../../calculators/FontSize';
import glluTheme from '../../themes/gllu-theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  header: {
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: glluTheme.toolbarLineHeight,
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: glluTheme.tooolbarTextMarginLeft,
    textAlign: 'center',
    alignSelf: 'center'
  },
  backIcon: {
    color: '#FFFFFF'
  },
  nextStyle: {
    color: '#FFFFFF'
  },
});

class GlluScreen extends Component {
  static propTypes = {
    style: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    title: React.PropTypes.string,
    showNext: React.PropTypes.bool,
    onBackPress: React.PropTypes.func,
    onNextPress: React.PropTypes.func,
  }

  renderChildren() {
    return this.props.children;
  }

  renderNext() {
    if (this.props.showNext) {
      return (
        <Button transparent onPress={this.props.onNextPress}>
            <Text style={styles.nextStyle}>Next</Text>
          </Button>
        );
    }

    return null;
  }

  render() {
    const style = [styles.container, this.props.style];
    const titleStyle = [styles.header, this.props.titleStyle];
    
    return (
      <Container style={style} theme={glluTheme}>
        <Header style={{backgroundColor: '#000000'}}>
          <Button transparent onPress={this.props.onBackPress}>
            <Icon style={styles.backIcon} name="ios-arrow-back" />
          </Button>
          <Title style={titleStyle}>{this.props.title}</Title>
          {this.renderNext()}
        </Header>
        <View
            scrollEnabled={false}
            disableKBDismissScroll
            style={{backgroundColor: '#000000', flexDirection: 'column', flexGrow: 1}}>
          {this.renderChildren()}
        </View>
      </Container>
    );
  }
}

GlluScreen.defaultProps = {
  style: {},
  titleStyle: {},
  title: '',
  showNext: false,
};

export default GlluScreen;

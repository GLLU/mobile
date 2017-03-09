import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, UIManager, LayoutAnimation } from 'react-native'
import { View, Text, Button, Header, Title, Icon } from 'native-base';
import glluTheme from '../../themes/gllu-theme';
import Container from './Container';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000'
  },
  header: {
    backgroundColor: '#000000'
  },
  title: {
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: glluTheme.toolbarLineHeight,
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: glluTheme.tooolbarTextMarginLeft,
    textAlign: 'center',
    alignSelf: 'center'
  },
  content: {
    flexDirection: 'column',
    flexGrow: 1,
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
    headerStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    backgroundColor: React.PropTypes.string,
    foregroundColor: React.PropTypes.string,
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
            <Text style={[styles.nextStyle, { color: this.props.foregroundColor }]}>Next</Text>
          </Button>
        );
    }

    return null;
  }

  render() {
    const { style, headerStyle, titleStyle, contentStyle, backgroundColor, foregroundColor } = this.props;
    const _containerStyle = [styles.container, style];
    const _headerStyle = [styles.header, headerStyle];
    const _titleStyle = [styles.title, titleStyle, { color: foregroundColor }];
    const _contentStyle = [styles.content, contentStyle, { backgroundColor: backgroundColor }];
    return (
      <Container style={_containerStyle} theme={glluTheme} backgroundColor={backgroundColor}>
        <Header style={_headerStyle} backgroundColor={backgroundColor}>
          <Button transparent onPress={this.props.onBackPress}>
            <Icon style={[styles.backIcon, { color: foregroundColor }]} name="ios-arrow-back" />
          </Button>
          <Title style={_titleStyle}>{this.props.title}</Title>
          {this.renderNext()}
        </Header>
        <View
            scrollEnabled={false}
            disableKBDismissScroll
            style={_contentStyle}>
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
  backgroundColor: '#000000',
  foregroundColor: '#F2F2F2',
  showNext: false,
};

export default GlluScreen;

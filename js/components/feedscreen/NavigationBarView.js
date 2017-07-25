import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform ,View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import withAnalytics from '../common/analytics/WithAnalytics'




const styles = StyleSheet.create({

});

class NavigationBarView extends PureComponent {
  static propTypes = {
    user: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    addNewItem: React.PropTypes.func,
    gotNewNotifications: React.PropTypes.bool
  }

  static defaultProps = {
    navigateTo: _.noop,
    addNewItem: _.noop
  }

  constructor(props) {
    super(props);

  }



  render() {

    return(
      <View style={styles.navigationBar}>

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gotNewNotifications: state.notifications.newNotifications
  }
};

export default connect(mapStateToProps)(withAnalytics(NavigationBarView));

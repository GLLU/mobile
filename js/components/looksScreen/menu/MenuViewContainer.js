import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { noop } from 'lodash'
import BottomHalfScreenModal from "../common/BottomHalfScreenModal";
import SolidButton from "../../common/buttons/SolidButton";
import * as _ from "lodash";
import withAnalytics from '../../common/analytics/WithAnalytics'
import { connect } from "react-redux";
import { reportAbuse } from "../../../actions/looks";
import MenuView from "./MenuView";

class MenuViewContainer extends Component {

  static propTypes = {
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onEditPress: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,
    isMyLook: React.PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop,
    onDeletePress: noop,
    onEditPress: noop,
    onShareClicked: noop,
    isMyLook: false
  };

  constructor(props){
    super(props);
    this._reportAbuse=this._reportAbuse.bind(this);
    this.state={
      abuseReported:false
    }
  }

  _reportAbuse() {
    this.setState({abuseReported: true})
    this.props.reportAbuse(this.props.look_id)
  }

  render() {
    return (
      <MenuView {...this.props}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    reportAbuse: (id) => dispatch(reportAbuse(id)),
  };
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, bindAction)(withAnalytics(MenuViewContainer));
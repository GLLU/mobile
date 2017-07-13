import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { noop } from 'lodash'
import BottomHalfScreenModal from "../common/BottomHalfScreenModal";
import SolidButton from "../../common/buttons/SolidButton";
import * as _ from "lodash";
import withAnalytics from '../../common/analytics/WithAnalytics'
import { connect } from "react-redux";
import { reportAbuse } from "../../../actions/looks";

const cancelIcon = require('../../../../images/icons/cancel-black.png');

const styles = StyleSheet.create({
  thankYouContainer: {
    flex: 1,
    justifyContent:'center',
    padding: 20
  },
  thankYouText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
});

class MenuView extends Component {

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

  renderSeparator=({key})=><View key={key} style={{height: 5, backgroundColor: 'black'}}/>;

  renderRow({key,label, onPress}) {
    return (
      <View key={key} style={{height: 75, paddingVertical: 15}}>
        <SolidButton style={{backgroundColor: '#00D7B2'}} label={label} onPress={onPress}/>
      </View>
    );
  }

  renderShare=(key)=>this.renderRow({key:'share',label: 'Share', onPress: this.props.onShareClicked});

  renderEdit=()=>this.renderRow({key:'edit',label: 'Edit', onPress: this.props.onEditPress});

  renderDelete=()=>this.renderRow({key:'delete',label:'Delete',onPress:this.props.onDeletePress});

  renderWishlist=()=>this.renderRow({key:'wishlist',label:'Add to Wishlist!',onPress:()=>{Alert.alert('coming soon')}});

  renderReport() {
    return(
      this.state.abuseReported ?
        this.renderReportThankYou({key:'report'}):
        this.renderRow({key:'report',label: 'Report', onPress: this._reportAbuse})
    );
  }

  renderReportThankYou({key}) {
    return (
      <View key={key} style={{height: 75, paddingVertical: 15}}>
        <View key={key} style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>Thank you for making inFash better! we'll examine your report and will be in
            touch with you over email.</Text>
        </View>
      </View>
    )
  }

  renderGeneralContent(){
    return [
      this.renderShare(),
      this.renderSeparator({key:1}),
      this.renderReport(),
      // this.renderSeparator({key:2}),
      // this.renderWishlist()
    ];
  }

  renderMyContent(){
    return [
      this.renderShare(),
      this.renderSeparator({key:1}),
      this.renderEdit(),
      // this.renderSeparator({key:2}),
      // this.renderDelete()
    ];
  }

  render() {
    return (
      <BottomHalfScreenModal {...this.props} style={{borderWidth: 5}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.props.onRequestClose}>
            <Image style={{height: 25, width: 25, margin: 5}} source={cancelIcon}/>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 30, marginVertical: 25}}>
          {this.props.isMyLook?this.renderMyContent():this.renderGeneralContent()}
        </View>
      </BottomHalfScreenModal>
    );
  }
}

export default MenuView;
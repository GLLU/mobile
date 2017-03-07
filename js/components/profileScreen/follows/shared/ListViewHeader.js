'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
const { popRoute } = actions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f2f2f2'
    },
    row:{
        flexDirection:'row'
    },
    header:{
        justifyContent: 'space-between',
    },
    column:{
        flexDirection:'column'
    },
    backBtn: {
        marginLeft: 20,
        color: 'black',
        backgroundColor: 'transparent'
    },
});

class ListViewHeader extends Component {

    static propTypes = {
        title: React.PropTypes.string,
        count: React.PropTypes.number,
    };

    constructor(props){
        super(props);
        this.popRoute=this.popRoute.bind(this);
    }

    popRoute(){
        this.props.popRoute(this.props.navigation.key);
    }

    render() {
        return (
            <View style={[styles.container,styles.column]}>
                <View style={[styles.header,styles.row]}>
                    <TouchableOpacity onPress={() => this.popRoute()} style={{flex:1}}>
                        <Icon style={styles.backBtn} name="ios-arrow-back" />
                    </TouchableOpacity>
                    <View style={[styles.row,{flex:1}]}>
                        <Text>{this.props.title}</Text>
                        <Text style={{marginLeft:12}}>{this.props.count}</Text>
                    </View>
                    <View style={{flex:1}} name="spacer"/>

                </View>
                {/*{search will come here}*/}
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        popRoute: key => dispatch(popRoute(key))
    };
}

const mapStateToProps = state => {
    return {
        navigation: state.cardNavigation
    };
};


export default connect(mapStateToProps, bindAction)(ListViewHeader);


'use strict';

import React, { Component } from 'react';
import { ListView, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View, Icon } from 'native-base';

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

    render() {
        return (
            <View style={[styles.container,styles.column]}>
                <View style={[styles.header,styles.row]}>
                    <TouchableOpacity style={{flex:1}}>
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

export default ListViewHeader


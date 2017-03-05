import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    followBtn: {
        backgroundColor: '#00D7B2',
        width: 75,
        height: 25,
        justifyContent: 'center',
        margin: 5,
    },
    followText: {
        textAlign: 'center',
        color: 'white'
    },
    unfollowBtn: {
        backgroundColor: 'transparent',
        width: 75,
        height: 25,
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#00D7B2',
    },
    unfollowText: {
        textAlign: 'center',
        color: '#00D7B2'
    },
});

class FollowView extends Component
{
    static propTypes = {
        user: React.PropTypes.object,
        onPress: React.PropTypes.func
    };

    handleFollowPress() {
        this.props.onPress(this.props.user , !this.props.user.isFollowing)
    }

    renderUnfollowButton(){
        return (
            <TouchableOpacity style={styles.unfollowBtn} onPress={this.handleFollowPress.bind(this)}>
                <Text style={styles.unfollowText}>Unfollow</Text>
            </TouchableOpacity>
        )
    }

    renderFollowButton(){
        return (
            <TouchableOpacity style={styles.followBtn} onPress={this.handleFollowPress.bind(this)}>
                <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return this.props.user.isFollowing ? this.renderUnfollowButton() : this.renderFollowButton();
    }
}

export default FollowView
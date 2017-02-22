/**
 * Created by yonatanitzhaky on 1/9/17.
 */

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Title, Content, Text, View, Icon } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';

import { emailSignUp } from '../../actions/user';


import styles from './styles';

const { popRoute, pushRoute } = actions;

const background = require('../../../images/background.png');
const backgroundShadow = require('../../../images/background-shadow.png');

class SignUpGenderPage extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
        emailSignUp: React.PropTypes.func,
        pushRoute: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            gender: '',
        };

    }

    popRoute() {
        this.props.popRoute(this.props.navigation.key);
    }


    pushRoute(route, gender) {
        this.props.pushRoute({ key: route, index: 1, gender: gender }, this.props.navigation.key);
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Image source={background} style={styles.shadow} blurRadius={5}>
                        <Image source={backgroundShadow} style={styles.bgShadow} />
                        <Header style={styles.header} >
                            <Button transparent onPress={() => this.popRoute()}>
                                <Icon style={styles.headerArrow} name="ios-arrow-back" />
                            </Button>
                            <Title style={styles.headerTitle}>Signup for Gllu</Title>
                        </Header>
                        <Content scrollEnabled={false}>
                            <View style={styles.genderSelectContainer}>
                                <TouchableOpacity onPress={() => this.pushRoute('signupemail','female') }>
                                    <View style={styles.genderBtnContainer}>
                                        <Image
                                            source={require('../../../images/genderwomen.png')}
                                            style={styles.genderImage}
                                        />
                                        <Text style={styles.genderLabel}>Female</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.pushRoute('signupemail','male') }>
                                    <View style={styles.genderBtnContainer}>
                                        <Image
                                            source={require('../../../images/gendermen.png')}
                                            style={styles.genderImage}
                                        />
                                        <Text style={styles.genderLabel}>Male</Text>
                                    </View>
                                </TouchableOpacity>
                             </View>
                        </Content>
                    </Image>
                </View>
            </Container>
        );
    }

}

function bindAction(dispatch) {
    return {
        emailSignUp: (data) => dispatch(emailSignUp(data)),
        popRoute: key => dispatch(popRoute(key)),
        pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SignUpGenderPage);

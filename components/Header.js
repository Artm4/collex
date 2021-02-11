import React, { Component } from 'react';
import backImg from '../assets/img/back-ic.png';
import {BackHandler, TouchableOpacity, Image, View, Text} from "react-native";
import styles from 'assets/styles';

import {Menu, Divider, IconButton, Colors} from 'react-native-paper';
import {MobileComponent} from "./MobileComponent";
import {ConstNav} from "components/ConstNav";
import {LocalStorage} from "../payload/LocalStorage";

export class Header extends MobileComponent {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    state = {
        visible: false,
    };

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    static renderHeader()
    {

        return ({ navigation }) => {
            return {
                headerTitle:  <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <TouchableOpacity
                        onPress={this.handleBackButtonClick}
                    >
                        {/*<Icons name={'arrow-back'} size={30} color='#fff' style={{marginLeft: '3%'}}/>*/}
                        <Image source={backImg} style={styles.backBtn} />
                    </TouchableOpacity>
                </View>,

                headerRight:  <Header navigation={navigation} />
            };
        };
        this.forceUpdate();
    }

    /**
     * @returns {void}
     */
    onHome()
    {
        this.renderNavigate(ConstNav.Home,null);
    }


    render(){
        if(LocalStorage.personId > 0) {
            return(
                <Menu
                    visible={this.state.visible}
                    onDismiss={this._closeMenu}
                    anchor={
                        <IconButton
                            onPress={this._openMenu}
                            icon="menu"
                            color={Colors.white}
                            size={30}
                        >
                        </IconButton>
                    }
                >

                    <Menu.Item onPress = {()=> {this.renderNavigate(ConstNav.Home);this._closeMenu()} } title="Change Store" />
                    <Divider />

                </Menu>
            )
        }else {
            return(
                null
            )
        }
    }
}
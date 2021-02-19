import React from 'react';
import {ScrollView} from 'react-native';
import {Image, Text, View} from "react-native";

import styles from 'assets/styles'
import logo from "../assets/img/asda-logo.png";
import successImg from "../assets/img/success.png";
import edataLogo from  "../assets/img/edata-logo.png";
import tmsLogo from  "../assets/img/tms-logo.png";
import errorImg from "../assets/img/failed-icon.png";

import {MobileComponent} from "./MobileComponent";
import {Header} from "./Header"


export class ReportError extends MobileComponent
{

    /**
     * @param {Object} props
     * @returns {}
     */
    constructor(props)
    {
        super(props);
    }

    /**
     * @type {Object}
     */
    state = {

        /**
         * @type {boolean}
         */
        render: false,
        error: true
    };


    static
    /**
     * @type {Object}
     */
    navigationOptions = this.renderHeader();

    /**
     * @returns {void}
     */
    componentDidMount()
    {


    }

    static renderHeader()
    {
        return Header.renderHeader();
    }

    render(){
        let message=typeof this.props.navigation.getParam('message') != "undefined" ? this.props.navigation.getParam('message') : "Unknown";
        let error="Error: "+message;
        return(

            <View style={styles.container}>

                <View style={{marginTop: 20, marginBottom: 20, flex: 3}}>
                    <Image source={logo} />
                </View>

                <View style={{flex: 4}}>
                    <Image source={errorImg} />
                </View>

                <View style={{flex: 4}}>
                    <Text style={styles.instructions}>
                        Sorry we couldn't fulfill you request.
                    </Text>
                    <Text style={styles.instructions}>
                        {error}
                    </Text>
                </View>

                <View style={styles.fixedFooter}>
                    <Image source={edataLogo} style={{marginRight: 30}} />
                    <Image source={tmsLogo} />

                </View>
            </View>


        )
    }
}

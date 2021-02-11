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


export class ReportComplete extends MobileComponent
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
        return(

            <View style={styles.container}>

                <View style={{marginTop: 20, marginBottom: 20, flex: 3}}>
                    <Image source={logo} />
                </View>

                <View style={{flex: 4}}>
                    {
                        this.state.error ? (
                                <Image source={errorImg} />
                        ) :
                            <Image source={successImg} />
                    }
                </View>

                {
                    this.state.error ? (
                        <View style={{flex: 4}}>
                            <Text style={styles.instructions}>
                                Sorry.
                            </Text>
                        </View>
                    ) :
                        <View style={{flex: 4}}>
                            <Text style={styles.instructions}>
                                Thank you for your help in reporting the location of abandoned ASDA Trolleys.
                            </Text>
                            <Text style={styles.descriptions}>
                                A trained collector will ensure it is collected,
                                repaired if necessary and returned to store.
                            </Text>
                        </View>
                }

                <View style={styles.fixedFooter}>
                    <Image source={edataLogo} style={{marginRight: 30}} />
                    <Image source={tmsLogo} />

                </View>
            </View>


        )
    }
}

import React from 'react';
import {ScrollView, Picker, TouchableOpacity} from 'react-native';
import {Image, Text, View} from "react-native";

import styles from 'assets/styles'
import logo from "../assets/img/asda-logo.png";
import successImg from "../assets/img/success.png";
import edataLogo from  "../assets/img/edata-logo.png";
import tmsLogo from  "../assets/img/tms-logo.png";
import sendImg from "../assets/img/report-ic.png";

import {MobileComponent} from "./MobileComponent";
import {Header} from "./Header";
import InputSpinner from "react-native-input-spinner";


export class ReportTrolley extends MobileComponent
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
        render: false
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
        <View>
            <View style={styles.container}>
                <View style={{marginTop: 20, marginBottom: 20, flex: 3}}>
                    <Image source={logo} />
                </View>

                <View style={{flex: 2}}>
                    <InputSpinner
                        max={50}
                        min={0}
                        step={1}
                        colorMax={"#f04048"}
                        colorMin={"#40c5f4"}
                        value={this.state.number}
                        onChange={(num) => {
                            console.log(num);
                        }}
                    />
                </View>

                <View style={{flex: 2}}>
                    <Text style={styles.instructions}>
                        How many trolleys you report?
                    </Text>
                    <Text style={styles.descriptions}>
                        Swipe up and down to select desired number.
                    </Text>
                </View>

                <View style={{flex: 3}}>
                    <TouchableOpacity
                        onPress={() => alert('Hello, world!')}
                        style={styles.sendBtn}>
                        <Image style={{margin: 10}} source={sendImg} />
                        <Text style={{ fontSize: 20}}>Report an Abandoned {"\n"} ASDA trolley</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.fixedFooter}>
                <Image source={edataLogo} style={{marginRight: 30}} />
                <Image source={tmsLogo} />
            </View>
        </View>
        )
    }
}

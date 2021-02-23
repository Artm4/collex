import React from 'react';
import {ScrollView} from 'react-native';
import {Image, Text, View} from "react-native";

import styles from 'assets/styles'
import logo from "../assets/img/asda-logo.png";
import locationImg from "../assets/img/location-off.png";
import edataLogo from "../assets/img/edata-logo.png";
import tmsLogo from "../assets/img/tms-logo.png";

import {MobileComponent} from "../components/MobileComponent";
import {Header} from "../components/Header"


export class Home extends MobileComponent
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

                    <View style={{flex: 4}}>
                        <Image source={locationImg} />
                    </View>

                    <View style={{flex: 4}}>
                        <Text style={styles.instructions}>Oops, the location service is off</Text>
                        <Text style={styles.descriptions}>Go to Settings > Privacy to turn the location service on</Text>
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

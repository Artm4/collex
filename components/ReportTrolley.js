import React from 'react';
import {ScrollView, Picker, TouchableOpacity} from 'react-native';
import {Image, Text, View} from "react-native";

import styles from 'assets/styles'
import logo from "../assets/img/asda-logo.png";
import successImg from "../assets/img/success.png";
import edataLogo from  "../assets/img/edata-logo.png";
import tmsLogo from  "../assets/img/tms-logo.png";
import sendImg from "../assets/img/report-ic.png";
import locationImg from "../assets/img/location-off.png";

import {MobileComponent} from "./MobileComponent";
import {Header} from "./Header";
import InputSpinner from "react-native-input-spinner";
import {GeoLocation} from "/lib/common";
import {ConstNav} from "./ConstNav";
import * as Location from "expo-location/build/Location";


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

    static StateNormal=0;
    static StateServiceOff=1;
    static StateError=2;

    stateView=ReportTrolley.StateNormal;


    static
    /**
     * @type {Object}
     */
    navigationOptions = this.renderHeader();


    sendReport()
    {
        this.props.navigation.navigate(ConstNav.ReportComplete,null);
    }

    static renderHeader()
    {
        return Header.renderHeader();
    }

    renderLocationServiceOff(){
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

    renderInput(){
        GeoLocation.getLocation().then(
            (loc)=>{
                //console.log(loc);
            }
        ).catch(
            ()=>{}
        );
        return(
            <View>
                <View style={styles.container}>
                    <View style={{marginTop: 20, marginBottom: 20, flex: 3}}>
                        <Image source={logo} />
                    </View>

                    <View style={{flex: 2}}>
                        <InputSpinner
                            max={50}
                            min={1}
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
                            onPress={() => this.sendReport()}
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

    willFocusSubscription;

    componentDidMount()
    {
        Location.watchPositionAsync({accuracy:Location.Accuracy.High}, (location)=>{
            console.log(location)
        }).catch((err)=>{console.log("Something is wrong")});
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                console.log("Focus");
                GeoLocation.hasServicesEnabled().then(
                    (enabled)=>{
                        console.log("Enabled"+enabled);
                        this.stateView=enabled?ReportTrolley.StateNormal:ReportTrolley.StateServiceOff;
                        this.stateKey("render",!this.state.render);

                    }
                ).catch(
                    ()=>{
                        this.stateView=ReportTrolley.StateServiceOff;
                        this.stateKey("render",!this.state.render);
                    }
                );
            }
        );
    }

    componentWillUnmount()
    {
        this.willFocusSubscription.remove();
    }

    render()
    {

        console.log(this.stateView);
        switch (this.stateView)
        {
            case ReportTrolley.StateServiceOff:
                return this.renderLocationServiceOff();
                break;
        }

        return this.renderInput();
    }


}

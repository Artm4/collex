import React from 'react';
import {AppState,ScrollView, Picker, TouchableOpacity} from 'react-native';
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
const axios = require('axios');
import Constants from 'expo-constants';
import config from "/project-config";


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
        render: false,
        appState: AppState.currentState,
        number: 1
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

    willFocusSubscription;

    _sendRequest(loc)
    {

        //console.log(this.state.number);return;
        let params={};
        params["latitude"]=loc.coords.latitude.toString();
        params["longitude"]=loc.coords.longitude.toString();
        params["client_tag"]="asda";
        params["qty"]=this.state.number;
        params["device_id"]=Constants.deviceId;
        console.log(params)

        let url=config.URL;
        let requestConfig={
            withCredentials: false,
            headers:{

            }
        };
       // params["qty"]=-1;
        axios.post(url,params,requestConfig)
            .then( (response) => {
                // handle success
                console.log(response);
                this.setState({number:1});
                this.props.navigation.navigate(ConstNav.ReportComplete,null);
            })
            .catch((error) => {
                let msg=typeof error.response.data.message!="undefined"?error.response.data.message:"Unknown";
                this.props.navigation.navigate(ConstNav.ReportError,{message:msg});
            })
            .finally( () => {
                // always executed
            });
    }

    sendReport()
    {
        GeoLocation.hasServicesEnabled().then(
            (enabled)=>{
                if(!enabled){this.checkGeoAvailable();return;}
                GeoLocation.getLocation().then(
                    (loc)=>{
                        this._sendRequest(loc);
                    }
                ).catch(
                    ()=>{
                        this.props.navigation.navigate(ConstNav.ReportError,null);
                    }
                );

            }
        );

    }

    componentDidMount()
    {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.willFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.checkGeoAvailable();
            }
        );

        AppState.addEventListener('focus', this.handleAppStateChange);
        GeoLocation.getLocation().then(
            ()=>{
                this.checkGeoAvailable();
            }
        );

    }

    componentDidUpdate()
    {

    }


    componentWillUnmount()
    {
        this.willFocusSubscription.remove();
        AppState.removeEventListener('change', this.handleAppStateChange);
        AppState.removeEventListener('focus', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.checkGeoAvailable();

        }
        this.setState({appState: nextAppState});

    }

    static renderHeader()
    {
        return Header.renderHeader();
    }


    renderLocationServiceOff(){
        return(
            <View>
                <View style={styles.container}>
                    <View style={{marginTop: 20, marginBottom: 20, flex: 2}}>
                        <Image source={logo} />
                    </View>

                    <View style={{flex: 3}}>
                        <Image source={locationImg} />
                    </View>

                    <View style={{flex: 2}}>
                        <Text style={styles.instructions}>Oops, the location service is off</Text>
                        <Text style={styles.descriptions}>Go to Settings > Privacy to turn the location service on</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <TouchableOpacity
                            onPress={() => this.checkGeoAvailable()}
                            style={styles.sendBtn}>
                            <Image style={{margin: 4}} source={sendImg} />
                            <Text style={{ fontSize: 20}}>Try again</Text>
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

    renderInput(){

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
                            fontSize={50}
                            textColor={"#0073b1"}
                            arrows
                            width={250}
                            skin={"square"}
                            onChange={(num) => {
                                this.setState({number:num});
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


    checkGeoAvailable()
    {
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


    render()
    {

        switch (this.stateView)
        {
            case ReportTrolley.StateServiceOff:
                return this.renderLocationServiceOff();
                break;
        }

        return this.renderInput();
    }
}

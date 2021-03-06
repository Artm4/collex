import React, { Component } from 'react';
import 'react-native-gesture-handler'

import config from "./project-config";

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';
import NavigationService from "./components/NavigationService";
import {Home} from "./test/Home";
import {ReportComplete} from "./components/ReportComplete";
import {ReportTrolley} from "./components/ReportTrolley";
import GeoLocationComp from "./test/GeoLocationComp";
import {ReportError} from "./components/ReportError";


const MainNavigator = createStackNavigator({
    //GeoLocationComp: {screen: GeoLocationComp},
    //ReportError: {screen: ReportError},
    ReportTrolley: {screen: ReportTrolley},
    ReportComplete: {screen: ReportComplete},
    ReportError: {screen:ReportError}
});


const AppNavigator = createAppContainer(MainNavigator);
//MainNavigator.navigation.navigate(ScanBarcode);
export default function App() {
    return(
        <Provider>
            <AppNavigator ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}/>
        </Provider>
    )
}


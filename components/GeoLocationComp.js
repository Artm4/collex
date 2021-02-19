import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions";


export default function GeoLocationFunc() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    (async () => {
        //let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            console.log("no permission");
        }
        else {

            console.log("working on location");

            let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High})

            console.log('latitude is ' + location.coords.latitude.toString())
            console.log('longitude is ' + location.coords.longitude.toString())
            text = JSON.stringify(location);
            //setLocation(location);
        }


    })();


    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.hasServicesEnabledAsync();
    //         if (!status) {
    //             console.log("No")
    //             setErrorMsg('Activate Geo Location');
    //             return;
    //         }
    //         else
    //         {
    //             text='Activated';
    //             useEffect(() => {
    //                 (async () => {
    //                     let { status } = await Location.requestPermissionsAsync();
    //                     if (status !== 'granted') {
    //                         setErrorMsg('Permission to access location was denied');
    //                         return;
    //                     }
    //
    //                     let location = await Location.getCurrentPositionAsync({});
    //                     setLocation(location);
    //                 })();
    //             }, []);
    //         }
    //
    //
    //     })();
    // }, []);



    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        console.log(text);
    }

    return (
        <View >
            <Text>{text}</Text>
        </View>
    );
}
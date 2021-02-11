

import React from "react";
import {Text, View} from "react-native";
import CameraScreenLight from "./camera/CameraScreenLight";
import {MobileComponent} from "../../components/MobileComponent";
import PropTypes from 'prop-types';

export class Camera extends MobileComponent {
    constructor(props) {
        super(props);
    }

    /**
     * @type {Object}
     */
    static propTypes = {
        onPictureSaved: PropTypes.func,
    };

    render() {
        return(
            <CameraScreenLight onPictureSaved={(file)=>{null!=this.props.onPictureSaved?this.props.onPictureSaved(file):null;}}/>)
    }

}
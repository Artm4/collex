import React, { Component } from 'react';
import {Switch as SwitchInner} from 'react-native';
import {SingleValue} from "ccbus/payload/SingleValue";
import {ExtComponent} from 'ccbus';
import {PropTypes} from 'prop-types';


export class Switch extends ExtComponent {

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
    propTypes = {

        /**
         * @type {SingleValue}
         */
        value: PropTypes.object,

    };
    static
    /**
     * @type {Object}
     */
    defaultProps = {

        /**
         * @type {SingleValue}
         */
        value: new SingleValue("1")
    };

    onValueChange(value)
    {
        this.props.value.value=value ? "1" : "0";
        this.renderRe();
    }

    render()
    {
        let value=this.props.value.value==="1";
        let cleanProps={};

        for(let prop in this.props)
        {
            if(prop!='value' && prop!='onValueChange')
            {
                cleanProps[prop]=this.props[prop];
            }
        }
        return(
            <SwitchInner
                onValueChange = {(value)=>this.onValueChange(value)}
                value = {value}
                {...cleanProps}
            />
        )
    }

}

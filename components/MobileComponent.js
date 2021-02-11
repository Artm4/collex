import {Component,createRef} from 'react';

import {ScrollView, View, Dimensions, Text} from "react-native";

import React from 'react';

import {LocalStorage} from 'payload/LocalStorage';
import {ConstNav} from 'components/ConstNav';

export class MobileComponent extends Component
{
    
    /**
    * @param {Object} props
    * @returns {}
    */ 
    constructor(props)
    {
        super(props);
        this.renderInit();
    }
    
    /**
    * @type {boolean}
    */ 
    render;
    prop2ChangeFunc = new Map();
    
    /**
    * @returns {void}
    */ 
    secure()
    {
        // if(LocalStorage.personId==0)
        // {
        //     this.renderNavigate(ConstNav.Login,null);
        // }
    }
    
  
    renderInit()
    {
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            render: false,
        }

        this.renderOnLayout = this.renderOnLayout.bind(this);

    }

    renderNavigate(component,params)
    {
        this.props.navigation.navigate(component,params);
    }

    renderOnLayout(e) {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    renderRe()
    {
        this.stateKey("render",!this.state.render);
    }


    /**
     *
     * @param {String} key
     * @param {Object} value
     * @returns {void}
     */
    stateKey(key,value)
    {
        let state={};
        state[key]=value;
        this.setState(state);
    }

    stateKeySet(...keyVal)
    {
        let state={};
        for(let i=0;i<keyVal.length-1;i++)
        {
            state[keyVal[i]]=keyVal[i+1];
        }
        this.setState(state);
    }

    /**
     *
     * @param {String}
     * @param {function(propCurrent,propPrev)}
     * @returns {void}
     */
    onChangeProp(propKey,propFuncion)
    {
        this.prop2ChangeFunc.set(propKey,propFuncion);
    }

    /**
     *
     * @param {Event}
     * @param {String} state key
     * @returns {void}
     */
    setStateByEvent(key,event) {
        this.stateKey(key,event.target.value);
    }

    setStateByEventInt(key,event) {
        this.stateKey(key,Number.parseInt(event.target.value));
    }

    setStateByEventFloat(key,event) {
        this.stateKey(key,Number.parseFloat(event.target.value));
    }

    componentDidUpdate(prevProps) {
        let that=this;
        this.prop2ChangeFunc.forEach(
            (v,k,map) =>
            {
                if (this.props[k] !== prevProps[k]) {
                    v.call(that,this.props[k],prevProps[k]);
                }

            }
        )
    }

    createRef()
    {
        return createRef();
    }

    getDocument()
    {
        return document;
    }

}
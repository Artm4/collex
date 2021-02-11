import {ExtComponent} from 'ccbus';
import {SingleValue} from 'ccbus/payload/SingleValue';
import React from 'react';
import {PropTypes} from 'prop-types';
import {TextInput as TextInputNative} from "react-native";

export class TextInput extends ExtComponent
{

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

        /**
        * @type {Object}
        */
        styleOnFocus: PropTypes.object,

        /**
        * @type {Object}
        */
        styleOnBlur: PropTypes.object,
    };
    static
    /**
    * @type {Object}
    */
    defaultProps = {

        /**
        * @type {SingleValue}
        */
        value: new SingleValue("")
    };

    /**
    * @type {boolean}
    */
    focused = false;

    /**
    * @type {Object}
    */
    refInner;

    focus()
    {
        this.refInner.focus();
    }

    renderOnChange(value)
    {
        if(typeof this.props.value != 'undefined'
        && this.props.value.value != 'undefined')
        {
            this.props.value.value=value;
            this.renderRe();
        }
    }

    renderOnFocus()
    {
        this.focused=true;
        if(typeof this.props.onFocus != 'undefined')
        {
            this.props.onFocus.apply(this);
        }
    }

    renderOnBlur()
    {
        this.focused=false;
        if(typeof this.props.onBlur != 'undefined')
        {
            this.props.onBlur.apply(this);
        }
    }

    renderForwardRef()
    {
        if(typeof this.props.ref != 'undefined')
        {
            this.props.ref.call(this.refInner);
        }
    }

    render()
    {
        let cleanProps={};

        for(let prop in this.props)
        {
            if(prop!='value' && prop!='onChangeText'
                && prop!='onFocus' && prop!="onBlur" && prop!='style' && prop!='ref')
            {
                cleanProps[prop]=this.props[prop];
            }
        }

        let value="";

        if(typeof this.props.value != 'undefined'
            && this.props.value.value != 'undefined')
        {
            value=this.props.value.value;
        }

        let styleOnFocus="";
        let styleOnBlur="";

        if(typeof this.props.style != 'undefined')
        {
            styleOnFocus=styleOnBlur=this.props.style;
        }



        return(
            <TextInputNative
                onChangeText={(v) => {this.renderOnChange(v)}}
                value={value} editable = {true}
                {...cleanProps}
                style={this.focused ? styleOnFocus : styleOnBlur}
                ref={(r) => {this.refInner = r;}}
                onFocus={()=>this.renderOnFocus()}
                onBlur={()=>this.renderOnBlur()}
            />
        )
    }
}
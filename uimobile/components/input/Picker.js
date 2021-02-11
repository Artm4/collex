import {ExtComponent} from 'ccbus';
import {SingleValue} from 'ccbus/payload/SingleValue';
import React from 'react';
import {PropTypes} from 'prop-types';
import {Picker as PickerNative} from "react-native";
import {Dropdown} from "react-native-material-dropdown";
import {PageData} from "ccbus/payload/PageData";

export class Picker extends ExtComponent
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
         * @type {PageData<Pair>}
         */
        data: PropTypes.object,
    };
    static
    /**
     * @type {Object}
     */
    defaultProps = {

        /**
         * @type {SingleValue}
         */
        value: new SingleValue(""),

        /**
         * @type {PageData<>}
         */
        data: new PageData(new Array()),

        /**
         * @type {FunctionBi<Value,Index,Void>}
         */
       // Calling PropTypes validators directly is not supported!
        // onChange: PropTypes.func
    };

    static propsNative=[
        "style",
        "itemStyle",
        "mode",
        "prompt",
        "enabled",
        "testID",

        // added for consistence
        "value",
        "data",
        "onChange"
    ]

    static propsEmulated=[

    ]

    renderNativePicker()
    {
        let cleanProps={};

        for(let prop in this.props)
        {
            if(prop!='selectedValue' && prop!='onValueChange'
                && prop!="value" && prop!="data" && prop !="onChange")
            {
                cleanProps[prop]=this.props[prop];
            }
        }

        var options = this.props.data.data.map(function(pair){
            return <PickerNative.Item label={pair.value} value={pair.key}/>
        })

        return(
            <PickerNative
                selectedValue={this.props.value.value}
                onValueChange={(item, index) =>
                    this.onValueChange(item,index)
                }
                {...cleanProps}
                >
                {options}
            </PickerNative>
        )

    }

    onValueChange(value,index)
    {

        /**
         * @type {Pair}
         */
        let pair = this.props.data.data[index];
        this.props.value.value=pair.key;

        if(typeof this.props.onChange!=='undefined')
        {
            this.props.onChange.call(null,value,index);
        }
        this.renderRe();
    }

    renderEmulatedPicker()
    {
        let cleanProps={};

        for(let prop in this.props)
        {
            if(prop!='data' && prop!='onChangeText' && prop!="value" && prop !="onChange")
            {
                cleanProps[prop]=this.props[prop];
            }
        }

        let value="";

        for(let index in this.props.data.data)
        {
            if(this.props.value.value==this.props.data.data[index].key)
            {
                value=this.props.data.data[index].value;
            }
        }

        return (<Dropdown
                  data={this.props.data.data}
                  value={value}
                  onChangeText={(item,index)=>this.onValueChange(item,index)}
                  {...cleanProps}
        />)
    }


    render()
    {
        let native=true;
        for(let prop in this.props)
        {
            if(!Picker.propsNative.includes(prop))
            {
                native=false;
                break;
            }
        }

        let picker=native ? this.renderNativePicker() : this.renderEmulatedPicker();


        return(
            picker
        )
    }
}
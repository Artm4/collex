import {ExtComponent} from 'ccbus';
import {SingleValue} from 'ccbus/payload/SingleValue';
import React from 'react';
import {PropTypes} from 'prop-types';
import {TextInput} from 'uimobile/components/input/TextInput';
import styles from "../../../assets/styles";

export class Barcode extends ExtComponent
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

    focus()
    {
        this.refInner.focus();

    }

    renderOnSubmitEditing()
    {
        if(typeof this.props.onSubmitEditing != 'undefined')
        {
            this.props.onSubmitEditing.apply(null);
        }
    }


    render()
    {
        let cleanProps={};

        for(let prop in this.props)
        {
            if(
                prop!="ref" && prop!="autoFocus" && prop!="onSubmitEditing" && prop!="blurOnSubmit")
            {
                cleanProps[prop]=this.props[prop];
            }
        }

        let autoFocus=typeof this.props.autoFocus!='undefined' ? this.props.autoFocus: true;

        return(


            <TextInput
                {...cleanProps}
                ref={(input) => { this.refInner = input; }}
                autoFocus={autoFocus}
                onSubmitEditing={() => {this.renderOnSubmitEditing()} }
                blurOnSubmit={false}
                editable = {true}
                />
        )
    }
}
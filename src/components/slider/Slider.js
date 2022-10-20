import React, { Component } from 'react';
import styles from './Slider.module.css';
import { withNamespaces } from 'react-i18next';
import {Link} from "react-router-dom";
import getLng from "../../utils/getLanguage"



class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUnmount(){
    }

    componentDidUpdate() {
    }

    getButtons(item,key){
        return <div key={key} className={`${styles.links_button} ${this.props.pathname === item.url ? styles.active_linck : ''}`}><Link to={item.url+'?lng='+getLng()}>{this.props.t(item.name)}</Link></div>
    }

    render(){
        return <div className={styles.slider_wrapper}>
            <div className={styles.slider_container}>
                {this.props.data.map((item,key)=>
                { return this.getButtons(item,key);

                })}
            </div>
        </div>
    }
}

export default withNamespaces()(Slider);

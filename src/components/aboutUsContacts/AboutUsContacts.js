import React, { Component } from 'react';
import styles from './AboutUsContacts.module.css';
import { withNamespaces } from 'react-i18next';

class AboutUsContacts extends Component {

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    getCards(item, key){
        return <div key={key} className={styles.card}>
            <div className={styles.card_header}>{this.props.t(item.name)}</div>
            <div className={styles.card_content}>{item.adress}</div>
        </div>
    }

    getImg(img){
        let source;
        switch (this.props.mode) {
            case 'desktop':
                source=img.desktop;
                break;
            case 'tablet':
                source=img.tablet;
                break;
            default:
                source=img.mobile
        }

        return <img src={source} alt={this.props.t(img.alt)}/>
    }

    render(){
        return<div className={styles.about_wrapper}>
                <div className={styles.header}>
                    {this.props.t(this.props.content.header)}
                </div>
                <div className={styles.contacts_wrapper}>
                    {this.props.content.contacts.map((item,key)=>
                    { return this.getCards(item,key);

                    })}
                </div>
                <div className={styles.about_bgimg_wrapper}>
                    {this.getImg(this.props.content.bgimg)}
                </div>
        </div>;
    }
}

export default withNamespaces()(AboutUsContacts);

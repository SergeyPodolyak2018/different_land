import React, { Component } from 'react';
import styles from './Footer.module.css';
import { withNamespaces } from 'react-i18next';
import getLng from "../../utils/getLanguage"
import {ReactComponent as FacebookLogo} from './facebook.svg';
import {ReactComponent as InstagramLogo} from './instagram.svg';
import {ReactComponent as YoutubLogo} from './youtub.svg';
import {Link} from "react-router-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.scrollToTop=this.scrollToTop.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    scrollToTop(){
        window.scrollTo(0, 0);
    }

    render(){
        return <div className={styles.footer_wrapper}>
            <div className={styles.logo}>
                <Link to={'/?lng='+getLng()} onClick={this.scrollToTop}>
                    <img src={this.props.contacts.logo} alt={this.props.t(this.props.contacts.logoAlt)}/>
                </Link>
                {
                    this.props.mode === 'desktop' && (
                      <div className={styles.copyright_wrapper}>
                          <div className={styles.copyright} style={{backgroundImage: 'url(img/copyright.svg)'}} ></div>Anthropogeos. 2021
                      </div>
                    )
                }<br/>

            </div>
            <div className={styles.footer_subwrapper}>
                <div className={styles.menu_wrapper}>
                    <div className={styles.menu_wrapper_first}>
                        <Link to={this.props.menu[0].url+'?lng='+getLng()} onClick={this.scrollToTop}>{this.props.t(this.props.menu[0].name)}</Link>
                        <Link to={this.props.menu[1].url+'?lng='+getLng()} onClick={this.scrollToTop}>{this.props.t(this.props.menu[1].name)}</Link>
                    </div>
                    <div className={styles.menu_wrapper_second}>
                        <Link to={this.props.menu[2].url+'?lng='+getLng()} onClick={this.scrollToTop}>{this.props.t(this.props.menu[2].name)}</Link>
                        <Link to={this.props.menu[3].url+'?lng='+getLng()} onClick={this.scrollToTop}>{this.props.t(this.props.menu[3].name)}</Link>
                    </div>
                </div>
                <div className={styles.contacts_wrapper}>
                    <div className={styles.contacts_wrapper_first}>
                        <span className={styles.contacts_wrapper_first_text} >{this.props.t(this.props.contacts.contact.text)}</span>
                        <span className={styles.contacts_wrapper_first_adress}>{this.props.contacts.contact.adress}</span>
                    </div>
                    <div className={styles.contacts_wrapper_second}>
                        <span className={styles.contacts_wrapper_second_text}>{this.props.t(this.props.contacts.social.text)}</span>
                        <span className={styles.logo_container}>
                                <a href={this.props.contacts.social.facebook[this.props.language]}><FacebookLogo/></a>
                                <a href={this.props.contacts.social.instagram[this.props.language]}><InstagramLogo/></a>
                                <a href={this.props.contacts.social.youtube[this.props.language]}><YoutubLogo/></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withNamespaces()(Footer);

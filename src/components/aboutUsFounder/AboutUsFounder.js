import React, { Component } from 'react';
import styles from './AboutUsFounder.module.css';
import { withNamespaces } from 'react-i18next';

class AboutUsFounder extends Component {

    componentDidMount() {
    }

    componentWillUnmount(){
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
        return<img src={source} alt={this.props.t(img.alt)}/>
    }


    render(){
        return<div className={styles.about_wrapper}>
                <div className={styles.content_wrapper}>
                    <div className={styles.about_header}>
                        {this.props.t(this.props.content.header)}
                    </div>
                    <div className={styles.content_wrapper_small}>
                        <div className={styles.about_img_wrapper}>
                            {this.getImg(this.props.content.img)}
                        </div>
                        <div className={styles.about_content}>
                            {this.props.t(this.props.content.body)}
                        </div>

                    </div>
                </div>
                <div className={styles.about_bgimg_wrapper}>
                    {this.getImg(this.props.content.bgimg)}
                </div>
        </div>;
    }
}

export default withNamespaces()(AboutUsFounder);

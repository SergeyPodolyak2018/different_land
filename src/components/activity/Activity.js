import React, { Component } from 'react';
import styles from './Activity.module.css';
import { withNamespaces } from 'react-i18next';
import LinkButtonArrow from '../linkButtonArrow/LinkButtonArrow';

class Activity extends Component {
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

        return source;
    }


    render(){
        let contentBody;
        const isTablet = this.props.mode ==='tablet';
        const contentText = <span id={styles.content_body} className={styles.activity_content_body}>{this.props.t(this.props.content.content.body1)}{}</span>;

        if(!isTablet){
            contentBody=<span id={styles.content_body}className={styles.activity_content_body}>{this.props.t(this.props.content.content.body1)}{this.props.t(this.props.content.content.body2)}</span>
        }else{
            contentBody = <span className={styles.activity_content_body1}>{this.props.t(this.props.content.content.body2)}</span>
        }
        return <div className={styles.activity_wrapper}>
            <div className={styles.activity__header}>{this.props.t(this.props.content.header)}</div>
            <div className={styles.activity__subheader}>{this.props.t(this.props.content.subheader)}</div>
            <img className={styles.activity__bgimg} src={this.getImg(this.props.content.bgimg)} alt={this.props.t(this.props.content.bgimg.alt)}/>
            <div className={styles.activity_content}>
                <span id={styles.content_header} className={styles.activity_content_header}>{this.props.t(this.props.content.content.header)}</span>
                <img id={styles.content_img} className={styles.activity_content_img} src={this.getImg(this.props.content.content.img)} alt={this.props.t(this.props.content.content.img.alt)}/>
                {isTablet && contentText}
                <div id={styles.content_wrapper} className={styles.activity_content_body_wrapper}>
                    {contentBody}
                    <span className={styles.linkWrapper}>
                        <LinkButtonArrow link={this.props.content.content.link}
                        linkText={this.props.content.content.linkText}/>
                    </span>

                </div>
            </div>

        </div>
    }
}

export default withNamespaces()(Activity);

import React, { Component } from 'react';
import styles from './Author.module.css';
import { withNamespaces } from 'react-i18next';

class Author extends Component {
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
        return<img className={styles.author_image} src={source} alt={this.props.t(img.alt)}/>
    }


    render(){
        return<div className={styles.author_wrapper}>
            <div className={styles.text_wrapper}>
                <div className={styles.author_header}>
                    {this.props.t(this.props.content.header)}
                </div>
                <div className={styles.author_content}>
                    {this.props.t(this.props.content.body)}
                </div>
            </div>
                <div className={styles.author_img_wrapper}>
                    {this.getImg(this.props.content.img)}
                </div>
        </div>;
    }
}

export default withNamespaces()(Author);

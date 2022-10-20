import React, {Component} from 'react';
import styles from './AboutUsPreview.module.css';
import {withNamespaces} from 'react-i18next';

class AboutUsPreview extends Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    getImg(img) {
        let source;
        switch (this.props.mode) {
            case 'desktop':
                source = img.desktop;
                break;
            case 'tablet':
                source = img.tablet;
                break;
            default:
                source = img.mobile
        }
        return <div>
            <img className={styles.about_image} src={source} alt={this.props.t(img.alt)}/>
        </div>
    }


    render() {
        return <div className={styles.about_wrapper}>
            <div className={styles.text_wrapper}>
                <div className={styles.about_header}>
                    {this.props.t(this.props.data.header)}
                </div>
                <div className={styles.about_content}>
                    {this.props.t(this.props.data.body)}
                </div>
            </div>

            <div className={styles.about_img_wrapper}>
                {this.getImg(this.props.data.img)}
            </div>
        </div>;
    }
}

export default withNamespaces()(AboutUsPreview);

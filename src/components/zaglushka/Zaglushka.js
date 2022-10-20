import React, {Component} from 'react';
import styles from './Zaglushka.module.css';
import {withNamespaces} from 'react-i18next';
import {Link} from "react-router-dom";
import getLng from "../../utils/getLanguage"

class Zaglushka extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    getButtons(item, key) {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a className={styles.button} key={key} href={item[this.props.language]}
                  style={{backgroundImage: `url(${item.img})`}}/>

    }

    getLinksButton(item) {
        return <div className={styles.link_button}><Link
            to={item.url + '?lng=' + getLng()}>{this.props.t(item.name)}</Link></div>
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
            <img className={styles.image} src={source} alt={this.props.t(img.alt)}/>
        </div>
    }

    render() {
        return <div className={styles.wrapper}>
            <div className={styles.img_wrapper}>
                <div className={styles.appeal}>
                    <div className={styles.appeal_text}>
                        {this.props.t(this.props.data.appeal)}
                    </div>
                    {this.props.data.showLinks ? <div className={styles.share_button_wrapper}>
                        {this.props.data.links.map((item, key) => {
                            return this.getButtons(item, key);
                        })}
                    </div> : ''}
                    {this.props.data.showButtonLinks ? this.getLinksButton(this.props.data.buttonLink) : ''}
                </div>
                {this.getImg(this.props.data.img)}
            </div>
            <div className={styles.text_wrapper}>
                <div className={styles.header}>
                    {this.props.t(this.props.data.header)}
                </div>
                <div className={styles.content}>
                    {this.props.t(this.props.data.body)}
                </div>
            </div>
        </div>;
    }
}

export default withNamespaces()(Zaglushka);

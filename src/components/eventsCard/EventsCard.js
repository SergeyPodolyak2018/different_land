import React, { Component } from 'react';
import styles from './EventsCard.module.css';
import { withNamespaces } from 'react-i18next';

class EventsCard extends Component {
    componentDidMount() {

    }

    componentWillUnmount(){

    }

    getButtons(item){
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        return <a>{this.props.t(item.name)}</a>

    }
    getLinksButton(item){
        return <div className={styles.link_button}>{this.getButtons(item)}</div>
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

        return <img className={styles.image} src={source} alt={this.props.t(img.alt)}/>
    }


    render(){
        return<div className={styles.wrapper}>
            <div className={styles.text_wrapper}>
                <div className={styles.header_wrapper}>
                    <div className={styles.date}>
                        {this.props.t(this.props.content.date)}
                    </div>
                    <div className={styles.header}>
                        {this.props.t(this.props.content.header)}
                    </div>
                    <div className={styles.place}>
                        {this.props.t(this.props.content.place)}
                    </div>

                </div>
                <div className={styles.body}>
                    {this.props.t(this.props.content.body)}
                </div>
                {this.props.content.showButtonLinks && this.getLinksButton(this.props.content.buttonLink)}

            </div>
            <div className={styles.img_wrapper}>
                {this.getImg(this.props.content.img)}
            </div>

        </div>;
    }
}

export default withNamespaces()(EventsCard);

import React, {Component} from 'react';
import styles from './MainIdea.module.css';
import {withNamespaces} from 'react-i18next';

class MainIdea extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            activeImg: 0,
        };

        this.changeImg = this.changeImg.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.changeImg, 4000);
    }

    changeImg() {
        if (this.state.activeImg < this.props.data.background.length - 1) {
            this.setState(
                // eslint-disable-next-line react/no-direct-mutation-state
                {activeImg: ++this.state.activeImg}
            );
        } else {
            this.setState(
                {activeImg: 0}
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getImg(item, key) {
        let tempClassName = styles.img_hiden;
        let source;
        if (key === this.state.activeImg) {
            tempClassName = styles.img_shown;
        }
        switch (this.props.mode) {
            case 'desktop':
                source = item.desktop;
                break;
            case 'tablet':
                source = item.tablet;
                break;
            default:
                source = item.mobile
        }
        return <div key={key}>
            <img key={key} className={tempClassName} src={source} alt={this.props.t(item.alt)}/>
        </div>
    }


    render() {
        return <div className={styles.main_idea_wrapper}>
            <div className={styles.main_idea_header}>
                {this.props.t(this.props.data.header)}
            </div>
            <div className={styles.main_idea_content}>
                {this.props.t(this.props.data.body)}
            </div>
            <div className={styles.main_idea_img_wrapper}>
                {this.props.data.background.map((item, key) => {
                    return this.getImg(item, key);
                })}
            </div>
        </div>;
    }
}

export default withNamespaces()(MainIdea);

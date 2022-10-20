import React, {Component} from "react"
import styles from "./EventsMain.module.css"
import {withNamespaces} from "react-i18next"
import LinkButtonArrow from "../linkButtonArrow/LinkButtonArrow"

class EventsMain extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
    }

    getButtons(item, key) {
        return (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
                className={styles.button}
                key={key}
                href={item[this.props.language]}
                style={{backgroundImage: `url(${item.img})`}}
            />
        )
    }

    getLinksButton(item) {
        return (
            <LinkButtonArrow
                wrapperStyle="white"
                link={item.url}
                linkText={item.name}
            />
        )
    }

    getImg(img, key) {
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
        return (
            <div className={styles.wrapper}>
                <div className={styles.text_wrapper}>
                    <div className={styles.header}>
                        {this.props.t(this.props.content.header)}
                    </div>
                    <div className={styles.content}>
                        {this.props.t(this.props.content.body)}
                    </div>
                    {this.props.content.showLinks ? (
                        <div className={styles.share_button_wrapper}>
                            {this.props.content.links.map((item, key) => {
                                return this.getButtons(item, key)
                            })}
                        </div>
                    ) : (
                        ""
                    )}
                    {this.props.content.showButtonLinks
                        ? this.getLinksButton(this.props.content.buttonLink)
                        : ""}
                    <div className={styles.img_wrapper}>
                        {this.getImg(this.props.content.img)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withNamespaces()(EventsMain)

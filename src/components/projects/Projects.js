import React, {Component} from "react"
import styles from "./Projects.module.css"
import {withNamespaces} from "react-i18next"
import LinkButtonArrow from "../linkButtonArrow/LinkButtonArrow"

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "current",
        };
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    componentDidMount() {

        fetch(this.getImg(this.props.content['future'].img))
            .then(res => res.blob())
            .then(res => {
                this.setState({
                    futureImage: URL.createObjectURL(res)
                })
            })
    }

    componentWillUnmount() {
    }

    toggleMenu(point) {
        if (point !== this.state.active) {
            this.setState({
                active: point,
            })
        }
    }

    getImg(img) {
        let source;
        switch (this.props.mode) {
            case "desktop":
                source = img.desktop;
                break;
            case "tablet":
                source = img.tablet;
                break;
            default:
                source = img.mobile
        }
        return source;
    }

    render() {
        let content;
        if (this.props.mode !== "mobile") {
            content = (
                <div className={styles.projects_wrapper}>
                    <div className={styles.nav_container}>
                        <span
                            className={`${styles.nav_point} ${
                                this.state.active === "current" ? styles.nav_point_active : ""
                            }`}
                            onClick={() => this.toggleMenu("current")}
                        >
                            {this.props.t("onlineProjects")}
                        </span>
                        <span
                            className={`${styles.nav_point} ${
                                this.state.active === "future" ? styles.nav_point_active : ""
                            }`}
                            onClick={() => this.toggleMenu("future")}
                        >
                            {this.props.t("soonOnSite")}
                        </span>
                    </div>
                    <img
                        className={`${styles.baground_current} ${
                            this.state.active === "current"
                                ? styles.baground_current_active
                                : ""
                        }`}
                        src={this.getImg(this.props.content["current"].bgimg)}
                        alt=""
                    />
                    <img
                        className={`${styles.baground_future} ${
                            this.state.active === "future"
                                ? styles.baground_future_active
                                : ""
                        }`}
                        src={this.getImg(this.props.content["future"].bgimg)}
                        alt=""/>
                    <div className={styles.content_container}>
                        <div className={styles.content_container_wrapper}
                             style={{display: this.state.active === "future" ? 'none' : 'block'}}>
                            <img className={styles.content__image}
                                 src={this.getImg(this.props.content['current'].img)}
                                 alt={this.props.t(this.props.content[this.state.active].img.alt)}
                            />
                        </div>
                        <div className={styles.content_container_wrapper}
                             style={{display: this.state.active === "future" ? 'block' : 'none'}}>
                            <img className={styles.content__image}
                                 src={this.getImg(this.props.content['future'].img)}
                                 alt={this.props.t(this.props.content[this.state.active].img.alt)}
                            />
                        </div>
                    </div>
                    <div
                        className={`${styles.content_text_wrapper} ${
                            this.state.active === "future"
                                ? styles.content_text_wrapper_future
                                : ""
                        }`}
                    >
                        <span className={styles.content_header}>
                          {this.props.t(this.props.content[this.state.active].header)}
                        </span>
                        <span className={styles.content_body}>
                          {this.props.t(this.props.content[this.state.active].body)}
                        </span>
                        <span className={styles.linkWrapper}>
                            <LinkButtonArrow link={this.props.content[this.state.active].link}
                                             linkText={this.props.content[this.state.active].linkText}
                            />
                        </span>
                    </div>
                </div>
            )
        } else {
            content = (
                <div className={styles.projects_wrapper_mob}>
                    <div className={styles.nav_container_mob}>
                        <span
                            className={`${styles.nav_point_mob} ${
                                this.state.active === "current"
                                    ? styles.nav_point_active_mob
                                    : ""
                            }`}
                            onClick={() => this.toggleMenu("current")}
                        >
                          {this.props.t("onlineProjects")}
                        </span>
                        <span
                            className={`${styles.nav_point_mob} ${
                                this.state.active === "future"
                                    ? styles.nav_point_active_mob
                                    : ""
                            }`}
                            onClick={() => this.toggleMenu("future")}
                        >
                          {this.props.t("soonOnSite")}
                        </span>
                    </div>
                    <img className={styles.content__image_mob}
                        src={this.state.active === 'current' ? this.getImg(this.props.content[this.state.active].img) : this.state.futureImage}
                        alt=""
                    />
                    <div className={`${styles.content_text_wrapper_mob} ${
                        this.state.active === "future"
                            ? styles.content_text_wrapper_future_mob
                            : ""}`}
                    >
                        <span className={styles.content_header_mob}>
                          {this.props.t(this.props.content[this.state.active].header)}
                        </span>
                        <span className={styles.content_body_mob}>
                            {this.props.t(this.props.content[this.state.active].body)}
                        </span>
                        <span className={styles.linkWrapper}>
                            <LinkButtonArrow wrapperStyle='white'
                                             link={this.props.content[this.state.active].link}
                                             linkText={this.props.content[this.state.active].linkText}
                            />
                        </span>
                    </div>
                </div>
            )
        }
        return content
    }
}

export default withNamespaces()(Projects)

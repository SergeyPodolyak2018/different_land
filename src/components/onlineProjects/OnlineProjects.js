import React, {Component} from "react";
import styles from "./OnlineProjects.module.css";
import {withNamespaces} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Mousewheel} from "swiper";
import "swiper/swiper-bundle.css";
import LinkButtonArrow from "../linkButtonArrow/LinkButtonArrow";

SwiperCore.use([Mousewheel]);

class OnlineProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            help: true,
        };
        this.getHeaders = this.getHeaders.bind(this);
        this.changeActiveIndex = this.changeActiveIndex.bind(this);
        this.firstmove = this.firstmove.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    firstmove() {
    }

    changeActiveIndex(swipe) {
        this.setState({active: swipe.realIndex});
        if (this.state.help && swipe.realIndex !== 0) {
            this.setState({help: false});
        }
    }

    getHeaders(item, key, array) {
        const isLastSlideActive = this.state.active === array.length - 1;
        const isNextSlide = isLastSlideActive
            ? key === 0
            : key === this.state.active + 1;
        let style = styles.swipe_content_prev;

        if (key === this.state.active) {
            style = styles.swipe_content_active;
        }
        if (isNextSlide) {
            style = styles.swipe_content_next;
        }

        return (
            <SwiperSlide key={key} className={styles.swiper_slide}>
                <div className={style}>{this.props.t(item.header)}</div>
            </SwiperSlide>
        );
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
                source = img.mobile;
        }
        return <div>
            <img className={styles.image} src={source} alt={this.props.t(img.alt)}/>
        </div>
    }

    getLinksButton(item) {
        let style = styles.link_button;
        if (item.disableButton) {
            style = styles.link_button_disable;

            return (
                <div className={style}>
                    <div className={styles.arrow}/>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>{this.props.t(item.name)}</a>
                </div>
            );
        }

        return (
            <LinkButtonArrow
                wrapperStyle={styles.link_button_disable}
                link={this.props.t(item.url)}
                linkText={this.props.t(item.name)}
            />

        );

    }

    getSpace() {
        let source;
        switch (this.props.mode) {
            case "desktop":
                source = 40;
                break;
            case "tablet":
                source = 30;
                break;
            default:
                source = 5;
        }

        return source;
    }

    render() {
        let activeLink = this.state.active;
        return (
            <div
                className={styles.wrapper}

            >
                <div className={styles.drum_wrapper} ref={this.container}>
                    <Swiper
                        direction={"vertical"}
                        spaceBetween={this.getSpace()}
                        slidesPerView={3}
                        initialSlide={0}
                        autoHeight={false}
                        centeredSlides={true}
                        loop={true}
                        slideToClickedSlide={true}
                        touchRatio={1}
                        speed={1000}
                        keyboard={{
                            enabled: true,
                            onlyInViewport: false,
                        }}
                        mousewheel
                        onActiveIndexChange={(swiper) => this.changeActiveIndex(swiper)}
                        className={styles.swiper_container}
                    >
                        {this.props.data.map((item, key, array) => {
                            return this.getHeaders(item, key, array);
                        })}
                    </Swiper>
                </div>
                <div className={styles.content_wrapper}>
                    <div className={styles.img_wrapper}>
                        {this.getImg(this.props.data[activeLink].img)}
                    </div>
                    <div className={styles.body_wrapper}>
                        <div className={styles.bodyHeader}>
                            {this.props.t(this.props.data[activeLink].bodyHeader)}
                        </div>
                        <div className={styles.body}>
                            {this.props.t(this.props.data[activeLink].body)}
                        </div>

                        {this.props.data[activeLink].showButtonLinks
                            ? this.getLinksButton(this.props.data[activeLink].buttonLink)
                            : ""}
                    </div>
                </div>
                {this.state.help ? (
                    <div className={styles.helper}>
                        <div
                            className={styles.shevron}
                            style={{backgroundImage: "url(img/shevron.svg)"}}
                        ></div>
                        <div className={styles.helper_body}>{this.props.t("helper")}</div>
                        <div
                            className={styles.shevron}
                            style={{backgroundImage: "url(img/shevron_invers.svg)"}}
                        ></div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default withNamespaces()(OnlineProjects);

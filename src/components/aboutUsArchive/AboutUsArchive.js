import React, { Component } from 'react';
import styles from './AboutUsArchive.module.css';
import { withNamespaces } from 'react-i18next';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation]);

class AboutUsArchive extends Component {
    constructor(props) {
        super(props);
        this.handleScroll=this.handleScroll.bind(this);
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount(){
        //window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e){
    }

    getImg(item,key){
        let source, width;
        switch (this.props.mode) {
            case 'desktop':
                source=item.desktop;
                width=912;
                break;
            case 'tablet':
                source=item.tablet;
                width=538;
                break;
            default:
                source=item.mobile;
                width=335;
        }

        return <SwiperSlide key={key}>
            <div className={styles.swiper_slide}><img src={source} width={width} alt={this.props.t(item.alt)}/></div></SwiperSlide>
    }
    getSpace(){
        let source;
        switch (this.props.mode) {
            case 'desktop':
                source=40;
                break;
            case 'tablet':
                source=20;
                break;
            default:
                source=10
        }

        return source
    }
    getSlidesPerView(){
        let source,
        viewPortWidth = window.innerWidth >= 1920 ? 1920 : window.innerWidth;
        switch (this.props.mode) {
            case 'desktop':
                source= 1 + (viewPortWidth - 934 + 80) / viewPortWidth;
                break;
            case 'tablet':
                source= 1 + (viewPortWidth - 538 + 60) / viewPortWidth;
                break;
            default:
                source= 1 + (viewPortWidth - 335 + 20) / viewPortWidth;
        }

        return source
    }

    render(){
        return<div className={styles.archive_wrapper}>
            <div className={styles.header}>
                {this.props.t(this.props.content.header)}
            </div>
            <div className={styles.content}>
                {this.props.t(this.props.content.body)}
            </div>
            <div className={styles.img_wrapper}>
                <Swiper
                    spaceBetween={this.getSpace()}
                    slidesPerView={this.getSlidesPerView()}
                    initialSlide={1}
                    centeredSlides={true}
                    roundLengths={true}
                    loop={true}
                    freeMode={false}
                    navigation={true}
                    touchRatio={1}
                    speed={1000}
                >
                    {this.props.content.img.map((item,key)=>this.getImg(item,key))}
                </Swiper>
            </div>
        </div>;
    }
}

export default withNamespaces()(AboutUsArchive);

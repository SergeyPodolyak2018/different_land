import React, { Component } from 'react';
import styles from './Share.module.css';
import { withNamespaces } from 'react-i18next';

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen:true,
            tabletOpen:false
        };
        this.position='';
        this.container = React.createRef();

        this.togleMenu=this.togleMenu.bind(this);
        this.togleTabletMenu=this.togleTabletMenu.bind(this);
    }

    componentDidMount() {
        let bodywidth=document.body.clientWidth;
        let rect = document.getElementsByClassName('App')[0].getBoundingClientRect();
        this.position=bodywidth-rect.right + this.getDimension() +'px';
    }

    componentWillUnmount(){

    }

    componentDidUpdate(nextProps) {
        const location = this.props.pathname;
        if (nextProps.pathname !== location) {
            if (!this.state.menuOpen) {
                this.setState({ menuOpen: true })
            }
        }
    }
    togleMenu(){
        this.setState({ menuOpen: false })
    }
    togleTabletMenu(){
        this.setState({ tabletOpen: !this.state.tabletOpen })
    }

    getButtons(item,key){
        if(item.hasOwnProperty('type') && item.type === 'mail'){
            return <a
                key={key}
                className={styles.button}
                style={{backgroundImage: `url(${item.img})`}}
                href={item.link + `subject=${encodeURIComponent(this.props.t(item.subject))}&body=${encodeURIComponent(this.props.t(item.title)+this.props.t(item.description)+ window.location.href)} `}
                target='_blank'
                onClick={(e) => {if (!item.link) e.preventDefault()}}
                rel="noreferrer"
            />
        }else {
            return <a
                key={key}
                className={styles.button}
                style={{backgroundImage: `url(${item.img})`}}
                href={item.link ? item.link.replace('_URL_', window.location.href) : ''}
                target='_blank'
                onClick={(e) => {if (!item.link) e.preventDefault()}}
                rel="noreferrer"
            />
        }

    }
    getDimension(){
        let source;
        switch (this.props.mode) {
            case 'desktop':
                source=0;
                break;
            case 'tablet':
                source=20;
                break;
            default:
                source=21
        }

        return source
    }

    render(){
        let text = this.state.tabletOpen && this.props.mode==='tablet' ? <div className={styles.share_text}>{this.props.t(this.props.content.shareText)}</div> : ``;
        let shareButton = this.state.tabletOpen ?
                <div className={styles.main_button_open} style={{backgroundImage: `url(${this.props.content.sublogo})`}} onClick={this.togleTabletMenu}></div>:
                <div className={styles.main_button} style={{backgroundImage: `url(${this.props.content.logo})`}} onClick={this.togleTabletMenu}></div>;

        return <div ref={this.container} className={styles.share_wrapper} style={{right: this.position}}>
            {text}
            {this.props.mode === 'desktop' && shareButton}
            {this.state.tabletOpen && <div className={styles.share_button_wrapper}>
                {this.props.content.links.map((item,key) => this.getButtons(item,key))}
            </div>}
            {this.props.mode !== 'desktop' && shareButton}
        </div>
    }
}

export default withNamespaces()(Share);

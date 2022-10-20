import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import styles from "./Header.module.css"
import Logo from "./AG_logo.png"
import getLng from "../../utils/getLanguage"
import {withNamespaces} from "react-i18next"
import urlCompare from "../../utils/urlCompare"

class Header extends Component {
    constructor(props) {
        super(props);
        this.scrollState = {
            previous: 0,
            current: 0,
        };
        this.state = {
            menuOpen: false,
            headerFixed: true,
            lng: getLng(),
            lngMenu: false,
            mode: props.mode,
        };
        this.headerRef = React.createRef();
        this.toglemenu = this.toglemenu.bind(this);
        this.togleLanguage = this.togleLanguage.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.headerClickOutsideHandler = this.headerClickOutsideHandler.bind(this);
        this.headerScrollHandler = this.headerScrollHandler.bind(this)
    }

    updateDimensions = () => {
        // this.setState({ width: window.innerWidth, height: window.innerHeight });

        const direction =
            window.innerWidth > window.innerHeight ? "horizontal" : "vertical";


        if (direction === "vertical") {
            if (window.innerWidth > 768)
                return this.setState({
                    mode: "desktop",
                })

            if (window.innerWidth < 400)
                return this.setState({
                    mode: "mobile",
                })

            return this.setState({
                mode: "tablet",
            })
        }

        if (direction === "horizontal") {
            if (window.innerHeight > 768)
                return this.setState({
                    mode: "desktop",
                })

            if (window.innerHeight < 400)
                return this.setState({
                    mode: "mobile",
                })

            return this.setState({
                mode: "tablet",
            })
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions)
        document.addEventListener("scroll", this.headerScrollHandler)
        document.addEventListener("click", this.headerClickOutsideHandler)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
        document.removeEventListener("scroll", this.headerScrollHandler)
        document.removeEventListener("click", this.headerClickOutsideHandler)
    }

    scrollToTop() {
        if (this.state.mode !== "desktop") {
            this.setState({
                menuOpen: false,
            })
        }
        window.scrollTo(0, 0)
    }

    getButtons(item, key) {
        //urlCompare(this.props.pathname,item.url);
        return (
            <div
                key={key}
                className={`${styles.links_button}  ${
                    urlCompare(this.props.pathname, item.url) ? styles.active_linck : ""
                }`}
            >
                <Link
                    to={item.url + "?lng=" + this.state.lng}
                    onClick={this.scrollToTop}
                >
                    {this.props.t(item.name)}
                </Link>
            </div>
        )
    }

    toglemenu() {
        this.setState({
            menuOpen: !this.state.menuOpen,
        })
    }

    togleLanguage() {
        if (this.state.lng === "ru") {
            this.changeLanguage("en")
        } else {
            this.changeLanguage("ru")
        }
    }

    toglHeader(data) {
        if (this.state.mode === "desktop" || window.innerWidth > 950) {
            this.setState({
                headerFixed: data,
            })
        }
    }

    changeLanguage(lang) {
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + new URLSearchParams({lng: lang}).toString(),
        })
        this.setState({
            lng: lang,
        })
    }

    getLangMenu() {
        if (this.props.language === "ru") {
            return "ENG"
        }
        return "RU"
    }

    headerClickOutsideHandler(evt) {
        if (!this.headerRef.current.contains(evt.target)) {
            this.setState({menuOpen: false})
        }
    }

    headerScrollHandler(e) {
        this.scrollState.current = window.scrollY
        if (this.scrollState.current > this.scrollState.previous) {
            if (this.state.headerFixed) {
                this.toglHeader(false)
            }
        } else {
            if (!this.state.headerFixed && this.scrollState.current > 120) {
                this.toglHeader(true)
            } else if (this.scrollState.current === 0) {
                if (this.state.headerFixed) {
                    this.toglHeader(false)
                }
            }
        }
        this.scrollState.previous = this.scrollState.current
    }

    render() {

        let languageClose
        let languageOpen
        let logo

        if (!this.state.menuOpen && this.state.mode !== "mobile") {
            languageClose = (
                <div className={styles.langWrapper}>
                    <div className={styles.lang} onClick={this.togleLanguage}>
                        {this.getLangMenu()}
                    </div>
                </div>
            )
        } else if (this.state.mode !== "mobile") {
            languageOpen = (
                <div className={styles.langWrapperList}>
                    <div
                        className={`${styles.langInMenu} ${styles.lang}`}
                        onClick={this.togleLanguage}
                    >
                        {this.getLangMenu()}
                    </div>
                </div>
            )
        } else {
            languageClose = (
                <div className={styles.langWrapper}>
                    <div className={styles.lang} onClick={this.togleLanguage}>
                        {this.getLangMenu()}
                    </div>
                </div>
            )
        }
        logo = <img src={Logo} alt={this.props.t("commonHeaderLogo")} className={styles.box}/>

        return (
            <div
                className={`${styles.header} ${
                    this.state.headerFixed ? styles.headerScrollUp : styles.headerNormal
                }`}
                ref={this.headerRef}
            >
                <div className={styles.header_wrapper}>
                    <div className={styles.box}>
                        <Link
                            to={"/?lng=" + this.state.lng}
                            onClick={() => {
                                this.setState({
                                    menuOpen: false,
                                });
                                this.scrollToTop()
                            }}
                        >
                            {logo}
                        </Link>
                    </div>
                    <div
                        className={`${styles.links} ${
                            this.state.menuOpen ? styles.open_links : ""
                        }`}
                    >
                        {this.props.menuButtons.map((item, key) => {
                            return this.getButtons(item, key)
                        })}
                        {languageOpen}
                    </div>
                    {languageClose}

                    {/* {this.state.mode !== "desktop" ? ( */}
                    {window.innerWidth <= 950 ? (
                        <div
                            className={`${styles.burger} ${
                                this.state.menuOpen ? styles.close : ""
                            }`}
                            onClick={this.toglemenu}
                        ></div>
                    ) : (
                        ""
                    )}
                    <div
                        className={`${styles.header_baground} ${
                            this.state.menuOpen ? styles.baground_open : ""
                        }`}
                    ></div>
                </div>
            </div>
        )
    }
}

export default withRouter(withNamespaces()(Header))

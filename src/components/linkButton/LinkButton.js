import React, {Component} from "react";
import styles from "./LinkButton.module.css";
import {withNamespaces} from "react-i18next";

class Projects extends Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <span className={styles.linkWrapper}>
        <span
            className={styles.arrow}
            style={{backgroundImage: "url(img/arrow.svg)"}}
        />
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>{this.props.t(this.props.linkText)}</a>
      </span>
        );
    }
}

export default withNamespaces()(Projects);

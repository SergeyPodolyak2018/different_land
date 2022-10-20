import React, { Component } from "react"
import styles from "./LinkButtonWhite.module.css"
import { withNamespaces } from "react-i18next"
import { Link } from "react-router-dom"
import getLng from "../../utils/getLanguage"

class LinkButtonWhite extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <span className={styles.linkWrapper}>

        <Link to={this.props.t(this.props.link) + "?lng=" + getLng()}>
          {this.props.t(this.props.linkText)}
        </Link>
      </span>
    )
  }
}

export default withNamespaces()(LinkButtonWhite)

import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'

import classNames from 'classnames/bind'
import useDarkMode from "use-dark-mode";
import { useTheme } from "../hooks/useTheme";

import "../styles/theme-button.scss";
import styles from '../styles/core.scss'

const cx = classNames.bind(styles)

export default class ThemeButton extends PureComponent {
	static propTypes = {
    value: PropTypes.string,
		styleClass: PropTypes.string.isRequired,
	}

	componentDidUpdate() {
		if (this.props.lines.length === 0) {
			return
		}

		this.node.scrollTop = this.node.scrollHeight
	}

	render() {
		const { value, styleClass } = this.props

    const darkMode = useDarkMode(true);
    const theme = useTheme();

    return (
      <button className="btn-theme" type="button" onClick={darkMode.toggle}>
        {theme === "dark-mode" ? "Light mode" : "Dark mode"}
      </button>
    );
	}
}

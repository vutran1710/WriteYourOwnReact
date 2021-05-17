import "./style.css"
import * as React from "./react"
import { DOMcreateElement } from "./helpers"


// DYNAMIC-APP that updates & remove =============================
const Button = (props: { onClick: EventHandler; text: string }) => {
  /* return React.createElement(
   *   'button',
   *   { onClick: props.onClick },
   *   props.text,
   * ) */
  return <button onClick={props.onClick}>{props.text}</button>
}

const Heading = (props: { count: number }) => {
  /* React.createElement(
   *   'h1',
   *   {},
   *   `This is a dynamic counter: ${props.count}`,
   * ) */
  const text = `This is a dynamic counter: ${props.count}`
  return <h1>{text}</h1>
}

const SubHeading = (props: { currentCount: number }) => {
  const { currentCount: cnt } = props

  /* let tag = 'h4'
   * let txt = ''
   * const cnt = props.currentCount

   * if (cnt > 7 && cnt < 10) {
   *   txt = "counter is more than 7 but less than 10, it's a H4"
   * }

   * if (cnt >= 10) {
   *   txt = "counter is more than 10, it's a H5"
   *   tag = 'h5'
   * }

   * return React.createElement(tag, {}, txt) */
  if (cnt > 7 && cnt < 10) {
    return <h4>counter is more than 7 but less than 10, it's a H4</h4>
  }
  if (cnt >= 10) {
    return <h5>counter is more than 10, it's a H5</h5>
  }
}

class DynamicApp extends React.Component {
  state: { count: number }

  constructor(props: any) {
    super(props)
    this.state = {
      count: 1,
    }
  }

  handleOnClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  reset = () => {
    this.setState({ count: 0 })
  }

  render() {
    /* return React.createElement(
     *   'div',
     *   { className: 'example-dynamic-app' },
     *   'This is my Dynamic App',
     *   React.createElement(Heading, { count: this.state.count }),
     *   React.createElement(Button, { onClick: this.handleOnClick, text: 'Incr!' }),
     *   React.createElement(Button, { onClick: this.reset, text: 'Reset' }),
     *   this.state.count > 7 && React.createElement(SubHeading, { currentCount: this.state.count })
     * ) */
    return (
      <div className="example-dynamic-app">
        <Heading count={this.state.count} />
        <Button text="Incr!" onClick={this.handleOnClick} />
        <Button text="Reset" onClick={this.reset} />
        {this.state.count > 7 && SubHeading({ currentCount: this.state.count })}
      </div>
    )
  }
}

export default DynamicApp

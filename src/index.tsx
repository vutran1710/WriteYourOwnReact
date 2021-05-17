import "./style.css"
import * as React from "./react"
import DynamicApp from './DynamicApp'
import StaticApp from './StaticApp'


const DOMcreateElement = (tag: string, attrs = {}): Node => {
  const elm = document.createElement(tag)
  Object.assign(elm, attrs)
  return elm
}

/*
 * Usage
 */
const body = document.querySelector("body")
body.appendChild(DOMcreateElement("div", { id: "static-app" }))
body.appendChild(DOMcreateElement("div", { id: "dynamic-app" }))

/*
 * Mounting Apps
 */
React.RenderDOM(StaticApp, '#static-app')
React.RenderDOM(DynamicApp, "#dynamic-app")

import { FiberNode } from './fiber'
import { vdom } from './vdom'

/*
 * APIs
 */
type FunctionalComponent = (props: Props) => FiberNode

export const createElement = (
  tag: string | FunctionalComponent,
  props: Props = {},
  ...children: Array<FiberNode | string>
): FiberNode => {
  let fiber: FiberNode

  if (typeof tag === 'string') {
    const el = document.createElement(tag)
    fiber = new FiberNode(el, props)
  }

  if (typeof tag === 'function') {
    fiber = tag(props)
  }

  if (children) {
    const convertChild = (child: FiberNode | string): FiberNode => {
      if (typeof child === 'string') {
        const textNode = document.createTextNode(child)
        const childFiberNode = new FiberNode(textNode)
        return childFiberNode
      }
      return child
    }

    children.filter(Boolean).forEach(c => {
      const child = convertChild(c)
      fiber.appendFiberChild(child)
    })
  }

  return fiber
}


export abstract class Component {
  static _is_class = true
  state = {}
  props: Props = {}
  node: FiberNode

  constructor(props: Props) {
    this.props = props
  }

  setState(newState: object = {}) {
    this.state = { ...this.state, ...newState }
    const node = vdom.reconcile(this)
    this.node = node
  }

  initialRender(): FiberNode {
    const node = this.render()
    this.node = node
    return this.node
  }

  abstract render(): FiberNode
}

export const RenderDOM = (app: any, container: string) => {
  const appContainerNode = document.querySelector(container)

  let renderedApp: any

  if (app._is_class) {
    const initialized = new app()
    renderedApp = initialized.initialRender.bind(initialized)
  } else {
    renderedApp = app
  }

  const fiber: FiberNode = renderedApp()
  fiber.parent = new FiberNode(appContainerNode)
  appContainerNode.appendChild(fiber.el)
}

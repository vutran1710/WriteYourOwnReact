import { FiberNode } from "./fiber"
import { reconcile } from "./vdom"

export abstract class Component {
  // TODO: add more life-cycle hooks for class-componennts
  static _is_class = true
  state: State = {}
  props: Props = {}
  node: FiberNode

  constructor(props: Props = {}) {
    this.props = props
  }

  setState(newState: State = {}): void {
    this.state = { ...this.state, ...newState }
    const node = reconcile(this)
    this.node = node
  }

  initialRender(): FiberNode {
    const node = this.render()
    this.node = node
    return this.node
  }

  abstract render(): FiberNode
}

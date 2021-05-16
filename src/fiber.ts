import { SyntheticEvents } from './constants'
import { shallowCompare } from './helpers'

/*
 * VDOM is a tree of fiber-nodes
 * Text should be a fiber-node as well
 * createElement should return a fiber-node
 * after setState, render a new sub-tree of fiber-nodes and process to `diffing`
 * diffing algorithm is a recursive run down both tree from the stateful node
 * - during diffing, swap tree happen when tag is different, or when children structure change
 * - when structure remains the same, but attributes change then update corresponding nodes only
 */

export class FiberNode {
  el: HTMLElement | Node

  tag: string
  parent: FiberNode
  props: Props

  children: FiberNode[] = []

  constructor(el: Node | HTMLElement, props?: Props) {
    this.el = el
    this.setProps(props || {})
    this.tag = el.nodeName
  }

  setProps(newProps: Props) {
    this.props = { ...newProps }
    Object.assign(this.el, this.props)
    Object
      .keys(this.props)
      .filter(propName => SyntheticEvents.has(propName))
      .forEach(prop => {
        const eventName = prop.slice(2).toLowerCase()
        this.el.addEventListener(eventName, this.props[prop] as EventHandler)
      })
  }

  appendFiberChild(child: FiberNode) {
    this.children.push(child)
    this.el.appendChild(child.el)
    child.parent = this
  }

  remove() {
    this.el['remove']()
  }
}

export const Diffing = (newNode: FiberNode, currentNode: FiberNode, root: FiberNode): FiberNode => {
  // NOTE: Diffing should be tail-calling
  // so the memory is utilized efficiently
  const swapTree = () => {
    const { parent } = currentNode
    currentNode.remove()
    parent.appendFiberChild(newNode)
    return currentNode === root ? newNode : root
  }

  const tagChanged = newNode.tag !== currentNode.tag
  const childrenStructureChanged = (
    (currentNode.children.length !== newNode.children.length) ||
    (currentNode.children.some((c, idx) => c.tag !== newNode.children[idx].tag))
  )

  const shouldSwap = [
    tagChanged,
    childrenStructureChanged,
  ].some(Boolean)

  if (shouldSwap) {
    return swapTree()
  }

  const textNodeChanged = (
    newNode.tag === '#text' &&
    newNode.el.textContent !== currentNode.el.textContent
  )

  if (textNodeChanged) {
    currentNode.el.textContent = newNode.el.textContent
  }

  if (!shallowCompare(newNode.props, currentNode.props)) {
    currentNode.setProps(newNode.props)
  }

  newNode
    .children
    .forEach((n, i) => Diffing(n, currentNode.children[i], root))

  return root
}

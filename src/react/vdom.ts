import { FiberNode } from "./fiber"
import { Component } from "./react_class_component"

export const shallowCompare = (p: object, q: object): boolean => {
  const pkeys = Object.keys(p)
  const qkeys = Object.keys(q)
  return (
    pkeys.length === qkeys.length &&
    pkeys.every((k) => p[k] === q[k] && typeof p[k] !== "function")
  )
}

export const reconcile = (comp: Component): FiberNode => {
  // TODO: updating tree should be a batch-update
  // to avoid blocking when rendering heavy tree or
  // grouping multiple diffing into one update
  const newTree = comp.render()
  const currentTree = comp.node
  const node = diffing(newTree, currentTree, currentTree)
  return node
}

export const diffing = (
  newNode: FiberNode,
  currentNode: FiberNode,
  root: FiberNode
): FiberNode => {
  // TODO: Diffing should be tail-calling
  // so the memory is utilized efficiently
  const swapTree = () => {
    const { parent } = currentNode
    currentNode.remove()
    parent.appendFiberChild(newNode)
    return currentNode === root ? newNode : root
  }

  const tagChanged = newNode.tag !== currentNode.tag
  const childrenStructureChanged =
    currentNode.children.length !== newNode.children.length ||
    currentNode.children.some((c, idx) => c.tag !== newNode.children[idx].tag)

  const shouldSwap = [tagChanged, childrenStructureChanged].some(Boolean)

  if (shouldSwap) {
    return swapTree()
  }

  const textNodeChanged =
    newNode.tag === "#text" &&
    newNode.el.textContent !== currentNode.el.textContent

  if (textNodeChanged) {
    currentNode.el.textContent = newNode.el.textContent
  }

  if (!shallowCompare(newNode.props, currentNode.props)) {
    currentNode.setProps(newNode.props)
  }

  newNode.children.forEach((n, i) => diffing(n, currentNode.children[i], root))

  return root
}

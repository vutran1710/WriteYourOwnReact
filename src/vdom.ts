import { Diffing, FiberNode } from "./fiber"
import { Component } from "./react"

export const vdom = {
  reconcile: (comp: Component): FiberNode => {
    const newTree = comp.render()
    const currentTree = comp.node
    const node = Diffing(newTree, currentTree, currentTree)
    return node
    // NOTE: Implement reconciliation
    // Actually only need to replace tree if type is different,
    // otherwise just update the attributes of changed elemenent
  }
}

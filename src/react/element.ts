import { FiberNode } from "./fiber"

/*
 * APIs
 */

// NOTE: define Functional Component Type (FC)
export type FC = (props: Props) => FiberNode

export const createElement = (
  tag: string | FC,
  props: Props = {},
  ...children: Array<FiberNode | string>
): FiberNode => {
  let fiber: FiberNode

  if (typeof tag === "string") {
    const el = document.createElement(tag)
    fiber = new FiberNode(el, props)
  }

  if (typeof tag === "function") {
    fiber = tag(props)
  }

  if (children) {
    const convertChild = (child: FiberNode | string): FiberNode => {
      if (typeof child === "string") {
        const textNode = document.createTextNode(child)
        const childFiberNode = new FiberNode(textNode)
        return childFiberNode
      }
      return child
    }

    children.filter(Boolean).forEach((c) => {
      const child = convertChild(c)
      fiber.appendFiberChild(child)
    })
  }

  return fiber
}

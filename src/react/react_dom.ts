import { FiberNode } from "./fiber"
import { Component } from "./react_class_component"

type IsFC = FC & { _is_class: false }
type IsReactClass = Constructor<Component> & { _is_class: true }

export const RenderDOM = (
  app: IsFC | IsReactClass,
  container: string
): void => {
  const appContainerNode = document.querySelector(container)
  const FiberRoot = new FiberNode(appContainerNode)

  if (app._is_class) {
    const initialized = new app()
    const renderer = initialized.initialRender.bind(initialized)
    const node = renderer() as FiberNode
    FiberRoot.appendFiberChild(node)
  } else {
    const node = (app as FC)()
    FiberRoot.appendFiberChild(node)
  }
}

import { FiberNode } from "./fiber"

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

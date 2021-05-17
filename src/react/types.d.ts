/*
 * Type definitions
 */
declare type Props = Record<string, unknown>
declare type State = Record<string, unknown>

declare interface FiberNode {
  el: HTMLElement | Node
  tag: string
  parent: FiberNode
  props: Props
  children: FiberNode[]

  setProps: (p: Props) => void
  appendFiberChild: (c: FiberNode) => void
  remove: () => void
}

declare type EventHandler = (e: Event) => void

declare type Optional<T> = T | undefined | null

declare type FC = (props?: Props) => FiberNode

declare type Constructor<T> = {
  new (...args: unknown[]): T
}

import { SyntheticEvents, ElementAttributes } from './constants'

/*
 * Support functions
 */
export const isClass = (x: any) => Boolean(x._is_class)

export const DOMcreateElement = (tag: string, attrs = {}): Node => {
  const elm = document.createElement(tag)
  Object.assign(elm, attrs)
  return elm
}

export const settingAttributes = (el: ReactElement, props: Props) => {
  const events = new Set() as Set<string>
  const attrs = new Set() as Set<string>
  const customs = new Set() as Set<string>

  Object.keys(props).forEach(propName => {
    const group = (SyntheticEvents.has(propName) && events)
      || (ElementAttributes.has(propName) && attrs)
      || customs
    group.add(propName)
  })

  events.forEach(p => {
    const eventName = p.slice(2).toLowerCase()
    el.addEventListener(eventName, props[p] as EventHandler)
  })

  attrs.forEach(a => el[a] = props[a])

  el.props = {}
  customs.forEach(p => el.props[p] = props[p])
}

export const shallowCompare = (p: object, q: object): boolean => {
  const pkeys = Object.keys(p)
  const qkeys = Object.keys(q)
  return pkeys.length === qkeys.length && pkeys.every(k => p[k] === q[k] && typeof p[k] !== 'function')
}

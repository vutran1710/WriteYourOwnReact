/*
 * Type definitions
 */
declare type Props = Record<string, unknown>
declare type State = Record<string, unknown>

declare type EventHandler = (e: Event) => any

declare type Optional<T> = T | undefined | null

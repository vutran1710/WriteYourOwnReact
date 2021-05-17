import * as React from "./react"

// STATIC-APP that does not update ================================
const StaticApp: React.FC = () => {
  /* return React.createElement(
   *   'div', { className: 'example-static-app' },
   *   'This is my Static App',
   *   React.createElement('h1', { className: 'title' }, 'This is a heading'),
   *   React.createElement('div', { className: 'inner-body' },
   *                       React.createElement('p', { className: 'text' }, 'Lorem ipsum dolor sit amet'),
   *                       React.createElement('button', { onClick: () => alert('Hello Clicker!') }, 'Say Hello')
   *   )
   * ) */
  return (
    <div className="example-static-app">
      <h1 className="title">This is my Static App</h1>
      <div className="inner-body">
        <p>Lorem ipsum dolor sit amet</p>
        <button onClick={() => alert("Hello Clicker")}>Say Hello</button>
      </div>
    </div>
  )
}

export default StaticApp

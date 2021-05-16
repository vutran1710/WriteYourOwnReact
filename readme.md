# Write your self a REACT
- Of course it is simplified, but the most basic stuffs are there...
- To be updated/developed incrementally, just for the fun.

## Why?
1. If you can't create it, you don't understand it.
3. Proving that nothing is impossible to do with **Vutran** LOL

## What?
- Write a simplified *React-like* script, with 2 basic API: **createElement** & **RenderDOM**
- Create 2 **Apps**, one *static* and one *dynamic* (meaning it can update/delete)
- Using **RenderDOM** mount the 2 apps to two different nodes on the DOM
- The DOM tree after rendering would look like this:

```html
<body>

 <!-- Static, cannot update except printing things -->
   <div id="static-app">
      <div class="example-static-app">
         This is my Static App
         <h1 class="title">This is a heading</h1>
         <div class="inner-body">
            <p class="text">Lorem ipsum dolor sit amet</p>
            <button>Say Hello</button>
         </div>
      </div>
   </div>

 <!-- Fun part - a dynamic App that can update state & props & stuffs -->
   <div id="dynamic-app">
      <div class="example-dynamic-app">
         This is my Dynamic App
         <h1>This is a dynamic counter: 1</h1>
         <button>Incr!</button>
         <button>Reset counter!</button>
          <!-- if the Counter > 7, there will be a small hint shown bellow -->
          <!-- <h4>Counter > 7 and < 10 <h4> if counter > 7 and < 10 -->
          <!-- <h5>Counter more than 10 <h5> if counter >= 10 -->
      </div>
   </div>
</body>
```

## Project status
- [x] Rendering works!
- [x] Updating works! (replacing tree or updating individual nodes)
- [x] Optimization with fiber reconciliation - not perfect, but generally it works.
- [x] JSX ready!

## Running
- clone the repo & cd into it
- `npm i` and `npm start`
- [Localhosted-App](http://localhost:4444)

## Screenshot
<p align="center">
  <img src="./ss.png" alt="Screenshot" width="600">
<p>

Using this `Hanoian` React, you can write your app something like...
```javascript
const Button = (props: { onClick: EventHandler, text: string }) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Heading = (props: { count: number }) => {
  const text = `This is a dynamic counter: ${props.count}`
  return (
    <h1>{text}</h1>
  )
}

const SubHeading = (props: { currentCount: number }) => {
  const { currentCount: cnt } = props

  if (cnt > 7 && cnt <10) {
    return (
      <h4>counter is more than 7 but less than 10, it's a H4</h4>
    )
  }
  if (cnt >= 10) {
    return (
      <h5>counter is more than 10, it's a H5</h5>
    )
  }
}

class App extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      count: 1
    }
  }

  handleOnClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  reset = () => {
    this.setState({ count: 0 })
  }

  render() {
    return (
      <div className="example-dynamic-app">
        <Heading count={this.state.count} />
        <Button text="Incr!" onClick={this.handleOnClick} />
        <Button text="Reset" onClick={this.reset} />
        {this.state.count > 7 && SubHeading({ currentCount: this.state.count })}
      </div>
    )
  }
}


React.RenderDOM(DynamicApp, '#container-id')
```

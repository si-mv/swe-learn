---
title: Objects
video: TahIUcNTMXY
blitz: node-pixqf4
file: src/rectangle.js
view: editor
---

# Key points

An object is defined between two curly braces `{ }`

Objects can contain key/value pairs 

```js
const person = {
  name: 'Pam',
  age: 27
}
```

To access an object's values, we can use dot notation or square bracket notation:

```js
person.name // => 'Pam'
person['age'] // => 27
```

An object can also contain functions. When they're inside an object we call these methods:

```js
const person = {
  name: 'Pam',
  age: 27,
  birthday () {
    this.age++
    console.log(`Happy birthday, ${this.name}!`)
  }
}
```

# Task 1

 1. Follow the video to create a `rectangle` object. The object should have `width` of `3`, `height` of `7`, and an `area()` method.

 1. Add a property for `colour` with a value of `'green'`.

 1. Add a method `perimeter()` which calculates the perimeter.

# Task 2

 1. Create a `point` object with an `x` value of `5` and `y` value of `9`.

 1. Add a method `shift(dx, dy)` which adds `dx` to the `x` and `dy` to the `y` coordinates.

 1. Add a method `stretch(k)` which multiplies the `x` and `y` coordinates by `k`.

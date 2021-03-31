interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  height: number
}
interface Circle {
  kind: 'circle'
  r: number
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size
    case "rectangle":
      return s.height * s.height
    case "circle":
      return s.r * s.r
    default:
      return ((e: never) => {throw new Error(e)})(s)
  }
}
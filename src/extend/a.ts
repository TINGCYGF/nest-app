

interface X{
  a: any;
  b: any;
}
interface Y{
  a: any;
  b: any;
  c: any;
}

let x: X = {a:1, b: 2}
let y: Y = {a:1, b: 2, c:3}
x = y

type Handler = (a:number, b: number) => void
function hof(handler: Handler) {
  return handler
}

//1.参数个数
let handler1 = (a: number) => {}
hof(handler1)

let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2)

let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {}
let c = (...agrs: number[]) => {}

b = c
b = a


interface Point2D {
  x: number;
  y: number;
}
interface Point1D {
  x: number;
}

let p2d = (point: Point2D) => {}
let p1d = (point: Point1D) => {}
p2d = p1d//参数多的兼容参数少的
p1d = p2d//报错


function getInfo(age:number, name: string):string;
function getInfo(age:any): any {}


enum Fruit { Apple, Banana }
enum Color { Red, Yellow }
let fruit: Fruit.Apple = 2
let no: number = Fruit.Banana

// let color: Color.Red = Fruit.Banana//报错

class A{
  constructor(a:number,  b:number) {
  }
  id: number = 1
  private name: string = "aa"
}
class B{
  static s = 1
  id: number = 2
  private name:string = "ss"
}

let aa = new A(1, 3)
let bb = new B()

// aa = bb//报错
// bb = aa//报错

// interface Empty<T> {
// }
// let obj1: Empty<number> = {}
// let obj2: Empty<string> = {}
// obj1 = obj2


let log1 = <T>(x: T): T => {
  return x
}
let log2 = <U>(y: U): U => {
  return y
}

log1 = log2
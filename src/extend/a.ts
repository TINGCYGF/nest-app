


//接口继承length属性约束
interface Length{
  length: number
}
//泛型约束length属性
function log<T extends Length>(value: T): T{
  console.log(value, value.length)
  return value
}

log([1])
log("123")
log({length:1})
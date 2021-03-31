// 条件类型
type TypeName<T> =
  T extends string ? 'string' :
    T extends number ? 'number' :
      T extends boolean ? 'boolean' :
        T extends undefined ? 'undefined' :
          T extends Function ? 'Function' :
            'object'

// 定义类型T1为条件类型,传入参数string,指定t1为string类型
type T1 = TypeName<string>  // T1为 string
// 定义类型T2为条件类型,传入参数string[]
type T2 = TypeName<string[]>  // T2为 object

type T3 = TypeName<string | object>

type Diff<T, U> = T extends U ? never : T

type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>
/* 拆解：
*   Diff<'a', 'a' | 'e'>  返回never
*   Diff<'b', 'a' | 'e'>  返回 b
*   Diff<'c', 'a' | 'e'>  返回 c
*   最终得到 ‘b’ | ‘c’ 类型
*/

type NotNull<T> = Diff<T, undefined | null>
type T5 = NotNull<string | number | undefined | null>

  //内置Exclude<T, U> 实现Diff

//内置NotNullable<T> 实现NotNull

//内置Extract<T, U>,实现和Diff反过来的

type T7 = ReturnType<() => string>
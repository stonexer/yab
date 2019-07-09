# Interceptor

## useage

```typescript
import { yab, createFetch } from 'yab-fetch'; // 假设 yab 是 createFetch 创建的对象

// 新建对象时候传入
const request = createFetch({
  interceptor: {
    request: []
  }
});

request.get('//a.b.c');

// 已有对象上统一添加
yab.interceptor.use({
  request: [],
  response: [],
  error: []
});

// 已有对象上单独操作
yab.interceptor.request.use(() => {});

yab.get('//a.b.c');
```


## interceptor 函数定义

### request interceptor
入参为 `req`
```typescript
(req) => {
  //
  return req;
}
```

### response interceptor
入参为 `res`, `req`, 中间件返回 req 吧
```typescript
(res, reqOpts) => {

  return res.then(raw => {
    // do something then return
    return raw;
  })
}
```

## 考虑的事情
- 如何注册
  - 中间件一般都是在初始化的时候添加上，不太会后续动态添加吧
  - 后续动态添加的时候，要和之前的做 merge
- 拦截器函数的定义
  - 可使用哪些参数
- 执行
  - 中间件执行的顺序，按数组从左往右， 还是从右向左？
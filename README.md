# next-on-pages custom wrapper example

This is a very simple example of how a custom wrapper can be applied on top of the worker generated by `@cloudflare/next-on-pages`, so that the next-on-pages request handler can be expended/modified and custom logic can be added before/after it.

## Steps

Install the dependencies:
```
$ npm i
```

Build and preview the application:
```
$ npm run preview
```

In the terminal notice the `My Custom Handler!` logs, those come from the `worker.ts` file

You can then modify the `worker.ts` file in any way to then add any logic you want to the request handling.

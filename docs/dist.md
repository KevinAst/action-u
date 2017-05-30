# Distribution

This utility is primarily distributed as an [npm
package](https://www.npmjs.com/package/action-u) (*simply `npm
install` and use it in your [Node.js](https://nodejs.org/en/)
development environment*).

As with any npm package, individual aspects of the install can be
obtained through unpkg.com:
[https://unpkg.com/action-u/](https://unpkg.com/action-u/)

The following executable bindings are available (**it's your
choice**):

```
                 Module
Directory  What  Bindings Notes
=========  ====  ======== ======================================
src/       ES6   ES       the master source
dist/      ES5   CommonJS a UMD bundle: action-u[.min].js
lib/       ES5   CommonJS transpiled from src/
es/        ES5   ES       transpiled from src/
```

## Documentation

This documentation was produced by integrating two technologies:
[GitBook](https://github.com/GitbookIO/gitbook) *(for the Guide)*, and
[JSDoc](http://usejsdoc.org/) *(for the API)*, **documented here**:
[Integrating GitBook with JSDoc to Document Your Open Source
Project](https://medium.com/@kevinast/integrate-gitbook-jsdoc-974be8df6fb3).

Should you need to retain the docs locally, the [GitHub Releases
Page](https://github.com/KevinAst/action-u/releases) maintains
documentation-based git tags (**vn.n.n-docs**), *in addition to the normal production
release tags (**vn.n.n**)*.

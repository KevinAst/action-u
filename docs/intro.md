# action-u

Within the {{book.ext.redux}} framework, {{book.ext.actions}} are the
basic building blocks that facilitate application activity.  Actions
follow a pre-defined convention that promote an action type and a
type-specific payload.  Best practices prescribe that actions should
be created by {{book.ext.actionCreators}} (functions that return
actions).

While writing {{book.ext.actionCreators}} is a simple task, it is tedious and
potentially error prone.  In addition, one has to define a set of
corresponding action types, and somehow promote these pairs
(creators/types) throughout your application.  And then there is the
question of organization: How does one intuitively model actions that
are inner-related?

The action-u library addresses all of these areas.  Not only does it
auto generate your {{book.ext.actionCreators}}, but it introduces organization to
your actions through a JSON-based {{book.api.ActionStruct}}.  This {{book.api.ActionStruct}} is
a key aspect of action-u, it:
- implicitly defines your action types, 
- instinctively groups related actions,
- and seamlessly promotes both {{book.ext.actionCreators}} and types throughout
  your application.


<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/action-u.svg?branch=master)](https://travis-ci.org/KevinAst/action-u)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/action-u/badge.svg)](https://snyk.io/test/github/kevinast/action-u)
[![NPM Version Badge](https://img.shields.io/npm/v/action-u.svg)](https://www.npmjs.com/package/action-u)

## At a Glance

- {{book.guide.start}} ... installation and access

- Concepts:

  - {{book.guide.basics}} ... learn the basics of {{book.api.generateActions}}

  - {{book.guide.formalTypes}} ... a valuable diagram detailing
    exactly what is going on!

  - {{book.guide.shapes}} ... there is a lot of flexibility in how you
    organize your {{book.api.ActionStruct}}

  - {{book.guide.validation}} ... learn how to inject app-specific
    validation

  - {{book.guide.default}} ... learn how to apply default semantics to
    your action creator parameters


- {{book.api.ref}} ... details the low-level functional API

- Misc:

  - {{book.guide.dist}} ... where to find this utility **(and a local
    copy of the docs)**

  - {{book.guide.why}} ... why was action-u created, and how does it
    compare to other utilities

  - {{book.guide.history}} ... peruse various revisions

  - {{book.guide.LICENSE}} ... legal stuff

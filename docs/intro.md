# action-u

Within the redux framework, actions are the basic building blocks that
facilitate application activity.  Actions follow a pre-defined
convention that promote an action type and a type-specific payload.
Best practices prescribe that actions should be created by action
creators (functions that return actions).

- ??link: redux: http://redux.js.org/
- ??link: actions: http://redux.js.org/docs/basics/Actions.html
- ??link: "action creator functions": http://redux.js.org/docs/basics/Actions.html#action-creators

While writing action creators is a simple task, it is tedious and
potentially error prone.  In addition, one has to define a set of
corresponding action types, and somehow promote these pairs
(creators/types) throughout your application.  And then there is the
question of organization: How does one intuitively model actions that
are inner-related?

The action-u library addresses all of these areas.  Not only does it
auto generate your action creators, but it introduces organization to
your actions through a JSON-based ActionStruct.  This ActionStruct is
a key aspect of action-u, it:
- implicitly defines your action types, 
- instinctively groups related actions,
- and seamlessly promotes both action creators and types throughout
  your application.


<!-- ??? "MONEY QUOTE" (WITHOUT motivations/features)

The action-u library provides a utility that auto generates your redux
action creators, and introduces organization to your actions through
a JSON-based ActionStruct.  This structure instinctively groups
related actions, implicitly defines your action types, and seamlessly
promotes both action creators and types throughout your application.
This automates a tedious process, and promotes an overall organization
to your actions.

## ?? discuss various ways to promote actions (modules - one or more)

-->

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/action-u.svg?branch=master)](https://travis-ci.org/KevinAst/action-u)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/action-u/badge.svg)](https://snyk.io/test/github/kevinast/action-u)
[![NPM Version Badge](https://img.shields.io/npm/v/action-u.svg)](https://www.npmjs.com/package/action-u)

## At a Glance

??? RETROFIT THIS

- {{book.guide.start}} ... installation and access

- {{book.guide.concepts}}:

  - {{book.guide.conceptHash}} ... using {{book.api.reducerHash}}, eliminate
    the switch statement commonly found in reducers *("look ma, no
    switch")*

  - {{book.guide.conceptConditional}} ... using
    {{book.api.conditionalReducer}}, invoke a reducer only when
    certain constraints are met *("to reduce or NOT to reduce; that is
    the question")*

  - {{book.guide.conceptJoin}} ... using {{book.api.joinReducers}}, team up
    multiple reducers to promote higher order functionality *("working
    together is success" - Henry Ford)*

- {{book.guide.fullExample}} ... a more complete example employing many
  of the action-u utility functions

- {{book.api.ref}} ... details the low-level functional API

- {{book.guide.originalReducerState}} ... a sidebar discussion of
  originalReducerState

- {{book.guide.ext}} ... how would one extend action-u?

  - {{book.guide.logExt}} ... a concrete example of reducer-based
    centralized logging *("smarter logging")*


- {{book.guide.dist}} ... where to find this utility **(and a local
  copy of the docs)**

- {{book.guide.why}} ... why was action-u created, and how does it
  compare to other utilities

- {{book.guide.history}} ... peruse various revisions

- {{book.guide.LICENSE}} ... legal stuff

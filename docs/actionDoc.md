# Action Documentation

In order to gain a a better understanding of any reactive application,
it is important to fully understand it's emitted actions.

One of the goals of action-u is to implicitly promote intuitive
meaning to your actions through the shape of your
{{book.api.ActionStruct}}.



## Description

It is not uncommon to provide a short description for each action,
*"explainin' what each one was, to be used as evidence against us"*
([**Alice's
Restaurant**](http://www.azlyrics.com/lyrics/arloguthrie/alicesrestaurantmassacree.html)).
This provides additional context to better understand each action.

?? example code


## Intent

Sometimes it is helpful to promote the **intent** of each action.
As an example, you may have actions that are exclusively intended to be used
internally *(say by a logic module)*, and therefore are of no interest
to a reducer.  This is especially useful when using a dedicated logic
framework - such as
[redux-logic](https://www.npmjs.com/package/redux-logic) **(I highly
recommend this utility)**!

- To that end, I utilize the following hash-tags to further document
  each action:

  ```
  #byUser:    dispatched by a user action    (i.e. initiated directly from UI)
  #byLogic:   dispatched by app logic        (i.e. sourced from other actions)
  #reducer:   of interest to a reducer       (i.e. state should change as a result)
  #noReducer: of NO real interest to reducer (i.e. used to stimulate logic)
  ```

- Here is a concrete note from my
  [GeekU](https://github.com/KevinAst/GeekU) sandbox application:

  ```
  /**
   * The 'selCrit.edit.save' action is of no interest to reducers
   * (#noReducer) because application logic monitoring this action
   * will emit a more general action 'selCrit.changed' which provides
   * a more central opportunity to maintain our state (#byLogic,
   * #reducer).
   */
  ```

?? example code   



## JavaDoc

If you are "in to" [JSDoc](http://usejsdoc.org/) (a descendant of
[JavaDoc](https://en.wikipedia.org/wiki/Javadoc)), you can apply more
formal documentation to your actions.


?? example code

?? screen print

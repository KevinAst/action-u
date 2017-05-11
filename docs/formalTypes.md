## Formal Types (a closer look)

The basic process of action-u is very straight forward, however the
terminology can become a bit confusing when applying a more formal
definition that chronicles the process.

Part of the problem is we are dealing with a data structure that
has depth, and includes arbitrary app-level nodes that have
meaning only to the application.

Another intricacy is we are dealing with two parallel structures:
 - one containing the meta information that describes what will be generated ... ActionGenesis
 - the other parallels the first, but is used by the app at run-time ... ActionStruct

To better understand the the process, the following picture chronicles
our prior example, highlighting the formal types.

![userMsg](img/userMsg.svg)

**Meta Input**
- ActionGenesis: ??link a JSON structure providing the master definition of what will be generated
- ActionMeta: ??link a sub-node in the ActionGenesis that defines it's parent to be an ActionNode

**Run-Time Output**
- ActionStruct: ??link the generated app-specific structure that mirrors the ActionGenesis,
  promoting a series of action creators and types
- ActionNode: ??link a node in the ActionStruct that promotes both an action creator and type

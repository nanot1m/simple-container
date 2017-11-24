# simple-container

Zero deps container

## Usage

```js
import SimpleContainer from '@skbkontur/SimpleContainer'

const hebrewFactory = ({ httpClient, log }) => ({
  async brew() {
    try {
      await httpClient('/api/brew')
    } catch (ex) {
      log.error(ex)
    }
  }
})

const container = new SimpleContainer()
  .registerFactory('hebrew', hebrewFactory)
  .registerValue('httpClient', fetch.bind(global))
  .registerValue('log', console)

const hebrew = container.resolve('hebrew')

hebrew.brew()
```

## Api

`SimpleContainer` — class instantiates container

### Instance methods

`.registerValue(name, value)` — registers value in container

`.registerClass(name, klass)` — registers class in container. When resolves,
instance would be created with cradle to constructor

`.registerFactory(name, factory)` — registers factory function in container.
When resolves, function would be called with cradle passed to arguments

`.resolve(name)` — resolves registered item

### Instance properties

`.cradle` — Proxy, which resolves items on property get. For example:

```js
const hebrew = container.cradle.hebrew
// is the same as
const hebrew = cotainer.resolve('hebrew')
```

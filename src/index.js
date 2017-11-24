// @flow

const ItemType = {
  Class: 'Class',
  Function: 'Function',
  Value: 'Value'
}

type RegisteredItem<TItem> = {
  type: $Keys<typeof ItemType>,
  item: TItem
}

class SimpleContainer {
  _container: Map<string, RegisteredItem<any>>
  _resolvedItems: Map<string, any>

  cradle: Object

  constructor() {
    this._container = new Map()
    this._resolvedItems = new Map()
    this.cradle = new Proxy(
      {},
      {
        get: (target, property) => this.resolve(property)
      }
    )
  }

  registerClass<T>(name: string, Class: Class<T>) {
    this._container.set(name, {
      type: ItemType.Class,
      item: Class
    })
    return this
  }

  registerFactory<T: Function>(name: string, func: T) {
    this._container.set(name, {
      type: ItemType.Function,
      item: func
    })
    return this
  }

  registerValue<T>(name: string, value: T) {
    this._container.set(name, {
      type: ItemType.Value,
      item: value
    })
    return this
  }

  resolve<T>(name: string): T {
    return this._resolvedItems.get(name) || this._resolveInternal(name)
  }

  _resolveInternal(name: string) {
    const item = this._container.get(name)
    if (!item) {
      throw new Error(`${name} is not registered in container`)
    }
    let resolved
    switch (item.type) {
      case ItemType.Class:
        resolved = new item.item(this.cradle)
        break
      case ItemType.Function:
        resolved = item.item(this.cradle)
        break
      case ItemType.Value:
        resolved = item.item
        break
      default:
        throw new TypeError(`Unknown item type "${item.type}"`)
    }
    this._resolvedItems.set(name, resolved)
    return resolved
  }
}

export default SimpleContainer

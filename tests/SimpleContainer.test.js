// @flow

import SimpleContainer from '../src'

test('it registers and resolves class', () => {
  class Hebrew {}
  const container = new SimpleContainer().registerClass('Hebrew', Hebrew)
  const instance = container.resolve('Hebrew')
  expect(instance).toBeInstanceOf(Hebrew)
})

test('it registers and resolves many classes', () => {
  class Hebrew {}
  class Brew {}
  const container = new SimpleContainer()
    .registerClass('Hebrew', Hebrew)
    .registerClass('Brew', Brew)
  const hebrew = container.resolve('Hebrew')
  const brew = container.resolve('Brew')
  expect(hebrew).toBeInstanceOf(Hebrew)
  expect(brew).toBeInstanceOf(Brew)
})

test('it registers and resolves function', () => {
  const Hebrew = () => 'Hebrew'
  const container = new SimpleContainer().registerFactory('Hebrew', Hebrew)
  const instance = container.resolve('Hebrew')
  expect(instance).toBe('Hebrew')
})

test('it registers and resolves values', () => {
  const Hebrew = () => 'Hebrew'
  const container = new SimpleContainer().registerValue('Hebrew', Hebrew)
  const instance = container.resolve('Hebrew')
  expect(instance).toBe(Hebrew)
})

test('it resolves with deps', () => {
  const StringFactory = () => 'Hebrew'
  class Hebrew {
    /*:: brew: string */
    constructor({ stringIntance }) {
      this.brew = stringIntance
    }
  }
  const container = new SimpleContainer()
    .registerClass('hebrew', Hebrew)
    .registerFactory('stringIntance', StringFactory)
  const instance = container.resolve('hebrew')

  expect(instance).toBeInstanceOf(Hebrew)
  expect(instance.brew).toBe('Hebrew')
})

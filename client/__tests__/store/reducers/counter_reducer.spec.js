import test from 'tape'

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { incrementAsync } from 'store/reducers/counter'

test('incrementAsync Saga test', (assert) => {  

  const gen = incrementAsync()

  const {password, email, avatar, phone, name, user_type = 1} = {
    password:'sfsf',
    email:'afafa',
    vai:'dan',
  }  

  const info = {password, email, avatar, phone, name, user_type}

  console.log(info)

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})
import Storage from './Storage'
import { jest } from '@jest/globals'

it('Storage has a field with null fallback when child declares it manually without using field()', () => {
  class Demo extends Storage {
    // Not using field()
    x = {
      field: true,
    }
  }

  expect(Demo.instance.x).toBeNull()
})

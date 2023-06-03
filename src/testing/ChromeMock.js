import { jest } from '@jest/globals'

const get = jest.fn()
const set = jest.fn()
const addListener = jest.fn()
const chrome = {
  storage: {
    local: { set, get },
    onChanged: { addListener },
  },
}

export default { chrome }
export { chrome }

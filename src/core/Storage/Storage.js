/** A Storage class which creates a super simple API to talk with chrome storage. */
class Storage {
  /** Marks the property as storage field */
  field(initialValue = undefined) {
    return {
      field: true,
      initialValue,
    }
  }

  /**
   * Shadow storage
   * @private
   */
  _shadowStorage = {}

  /**
   * Builds the storage
   * @private
   */
  build() {
    const fields = Object.keys(this).filter((k) => this[k].field === true)
    fields.forEach((f) => (this._shadowStorage[f] = this[f].initialValue))

    const changeField = (field, newValue) => {
      if (newValue === this[field]) {
        return
      }

      this._shadowStorage[field] = newValue
      chrome.storage.local.set({ [field]: newValue })
      this.emit(field)
    }

    // Initialize values from chrome storage
    chrome.storage.local.get(fields, (result) => {
      for (const field of fields) {
        changeField(field, result[field] || this._shadowStorage[field])
      }
    })

    // Listen for changes to values
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (const field in changes) {
        changeField(field, changes[field].newValue)
      }
    })

    // Override the getter's and setter's of the field
    for (const field of fields) {
      Object.defineProperty(this, field, {
        get: function () {
          return this._shadowStorage[field]
        },
        set: function (newValue) {
          changeField(field, newValue)
        },
      })
    }
  }

  /** Returns values of all the fields. Can be used for debugging purposes. */
  get all() {
    return this._shadowStorage
  }

  /** @private */
  _listeners = {}

  /**
   * Listen to changes of a field.
   * @param {String} fieldToListen
   * @param {Function} callback function to be called when the field changes.
   */
  on(fieldToListen, callback) {
    if (!this._listeners[fieldToListen]) {
      this._listeners[fieldToListen] = []
    }
    this._listeners[fieldToListen].push(callback)
  }

  /** @private */
  emit(changedField) {
    if (!this._listeners[changedField]) {
      return
    }
    for (const callback of this._listeners[changedField]) {
      callback()
    }
  }

  off(fieldToListen, callback) {
    if (!this._listeners[fieldToListen]) {
      return
    }
    this._listeners[fieldToListen] = this._listeners[fieldToListen].filter((c) => c !== callback)
  }

  /** @private */
  static _instance = null

  /**
   * The shared instance. This is a singleton.
   * Type is the current child class of Storage.
   * @type {Storage}
   * @public
   */
  static get instance() {
    if (!Storage._instance) {
      const subClassStorage = new this()
      subClassStorage.build()
      Storage._instance = subClassStorage
    }
    return Storage._instance
  }

  /**
   * Only exposed for testing.
   * NOTE: SHOULD NOT BE USED IN IMPLEMENTATION.
   */
  static reset() {
    Storage._instance = null
  }
}

export default Storage

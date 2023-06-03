/** A Storage class which creates a super simple API to talk with chrome storage. */
class Storage {
  /** Marks the property as storage field */
  field(initialValue = undefined) {
    return {
      field: true,
      initialValue,
    }
  }

  build() {
    const fields = Object.keys(this).filter((k) => this[k].field === true)
    const shadowStorage = {}
    fields.forEach((f) => (shadowStorage[f] = this[f].initialValue))

    const changeField = (field, newValue) => {
      if (newValue === this[field]) {
        return
      }

      shadowStorage[field] = newValue
      chrome.storage.local.set({ [field]: newValue })
      this.emit(field)
    }

    // Initialize values from chrome storage
    chrome.storage.local.get(fields, (result) => {
      for (const field of fields) {
        changeField(field, result[field] || shadowStorage[field])
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
          return shadowStorage[field]
        },
        set: function (newValue) {
          changeField(field, newValue)
        },
      })
    }
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
}

export default Storage

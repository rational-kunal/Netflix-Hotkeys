/**
 * A Storage class which creates a super simple API to talk with chrome storage.
 */
class Storage {
  /**
   * Marks the property as storage field.
   *
   * @param {Object} props
   * @param {any} props.fallback The fallback value of the field if no value is found in chrome storage.
   */
  field(props = {}) {
    return {
      field: true,
      fallback: props.fallback ?? null,
    }
  }

  /** Shadow storage which maintains the values of the fields. */
  #shadowStorage = {}

  /**
   * values of the fields.
   */
  get values() {
    return this.#shadowStorage
  }

  /** Builds the storage class. */
  #build() {
    // Populate the shadow storage with the field values.
    const fields = Object.keys(this).filter((k) => this[k].field === true)
    fields.forEach((f) => (this.#shadowStorage[f] = this[f].fallback ?? null))

    const updateFieldAndNotify = (field, newValue) => {
      if (newValue === this[field]) {
        return
      }

      this.#shadowStorage[field] = newValue
      chrome.storage.local.set({ [field]: newValue })
      this.#emit(field)
    }

    // Initialize values from chrome storage.
    chrome.storage.local.get(fields, (result) => {
      fields.forEach((field) => {
        updateFieldAndNotify(field, result[field] ?? this.#shadowStorage[field])
      })
    })

    // Listen for changes to values.
    chrome.storage.onChanged.addListener((changes, namespace) => {
      for (const field in changes) {
        updateFieldAndNotify(field, changes[field].newValue)
      }
    })

    // Override the getter's and setter's of the field.
    fields.forEach((field) => {
      Object.defineProperty(this, field, {
        get: function () {
          return this.#shadowStorage[field]
        },
        set: function (newValue) {
          updateFieldAndNotify(field, newValue)
        },
      })
    })
  }

  /** The singleton instance */
  static #instance = null

  /**
   * The singleton instance of the Storage.
   *
   * NOTE: Override in child class to enable Auto Complete and intellisense.
   *
   * @type {Storage}
   */
  static get instance() {
    if (!Storage.#instance) {
      const subClassStorage = new this()
      subClassStorage.#build()
      Storage.#instance = subClassStorage
    }

    return Storage.#instance
  }

  /**
   * Resets the singleton instance.
   *
   * WARN: ONLY EXPOSED FOR TESTING. SHOULD NOT BE USED IN THE NON-TESTING CODE.
   */
  static reset() {
    Storage.#instance = null
  }

  /** Listeners for fields */
  #listeners = {}

  /**
   * Listen to changes of a field.
   *
   * @param {String} fieldToListen
   * @param {Function} callback function to be called when the field changes.
   */
  on(fieldToListen, callback) {
    if (!this.#listeners[fieldToListen]) {
      this.#listeners[fieldToListen] = []
    }

    this.#listeners[fieldToListen].push(callback)
  }

  /**
   * Remove a listener from a field.
   * @param {String} fieldToListen
   * @param {Function} callback function to be removed from the listeners.
   * @returns
   */
  off(fieldToListen, callback) {
    if (!this.#listeners[fieldToListen]) {
      return
    }

    this.#listeners[fieldToListen] = this.#listeners[fieldToListen].filter((c) => c !== callback)
  }

  /** Emit a change to the listeners of a field. */
  #emit(changedField) {
    if (!this.#listeners[changedField]) {
      return
    }

    for (const callback of this.#listeners[changedField]) {
      callback()
    }
  }
}

export default Storage

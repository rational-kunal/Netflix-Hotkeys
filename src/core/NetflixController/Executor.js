import NetflixCrawler from '../NetflixCrawler'

/**
 * Queue for function that needs to be executed
 * @type {Function[]}
 * TODO: Execution queue should have limited capacity
 */
let _executionQueue = []

/**
 * Execute the function if it is not successful i.e. the function returns false then add it to the queue.
 * For some operations like seeking, the target button might not be available at the time of execution. So we need seek again when the button is available.
 * @param {Function} func
 */
function executeOrAddToQueue(func) {
  if (_executionQueue.length !== 0) {
    _executionQueue.push(func)
    console.info('[🔀] Added a function to the queue')
    return
  }

  const success = func()
  if (!success) {
    _executionQueue.push(func)
    console.info('[🔀] Execution of a function was not successful')
  }
}

function executeFirstFunctionInQueue() {
  const func = _executionQueue.shift()
  if (func) {
    const success = func()
    if (!success) {
      _executionQueue.unshift(func)
      console.info('[🔀] Execution of a function was not successful')
    }
  }
}

NetflixCrawler.addChangeListener(() => {
  // Execute the first function (i.e. oldest) in the queue on DOM change
  executeFirstFunctionInQueue()
})

export default {
  executeOrAddToQueue,
}

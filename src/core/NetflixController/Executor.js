import NetflixCrawler from '../NetflixCrawler'

/**
 * Queue for function that needs to be executed
 * @type {Function[]}
 * TODO: Execution queue should have limited capacity
 */
const _executionQueue = []

/**
 * Execute the function if it is not successful i.e. the function returns false then add it to the queue.
 * For some operations like seeking, the target button might not be available at the time of execution. So we need seek again when the button is available.
 * @param {Function} func
 */
function executeOrAddToQueue(func) {
  const success = func()
  if (!success) {
    _executionQueue.push(func)
    console.info('[🔀] Execution of a function was not successful')
  }
}

function executeLastFunctionInQueue() {
  const func = _executionQueue.pop()
  if (func) {
    const success = func()
    if (!success) {
      _executionQueue.push(func)
      console.info('[🔀] Execution of a function was not successful')
    }
  }
}

NetflixCrawler.addChangeListener(() => {
  // Execute the last function in the queue on DOM change
  executeLastFunctionInQueue()
})

export default {
  executeOrAddToQueue,
}

let buttons = {
    /** @type {HTMLButtonElement|undefined} */
    backSeek: undefined,

    /** @type {HTMLButtonElement|undefined} */
    forwardSeek: undefined,
}

let netflixObserver = new MutationObserver(() => {
    buttons.backSeek = document.querySelectorAll("button[data-uia='control-back10']")[0]
    buttons.forwardSeek = document.querySelectorAll("button[data-uia='control-forward10']")[0]
})

function start() {
    netflixObserver.observe(document.documentElement || document.body, { childList: true, subtree: true })
}

function seekForward() {
    buttons.forwardSeek?.click()
}

function seekBackward() {
    buttons.backSeek?.click()
}

export default {
    start,
    seekForward,
    seekBackward,
}
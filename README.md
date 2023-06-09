<p align="center">
  <img width="128px" src="public/icons/logo.ico" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" />
</p>

<p align="center">
<img src="https://img.shields.io/github/actions/workflow/status/rational-kunal/Netflix-Hotkeys/node.js.yml?style=flat-square" />
<img src="https://img.shields.io/github/package-json/v/rational-kunal/Netflix-Hotkeys?style=flat-square" />
</p>

# Netflix Hotkeys

Introducing a Chrome extension that makes watching Netflix even better!

Why did I create this extension? It's simple. Whenever I opened Netflix on Chrome, I got tired of logging into my profile over and over again. That's when I had an idea: why not create an extension that adds cool features to enhance your Netflix binge-watching on Chrome?

<!-- TODO: Add video / GIF / screenshots -->

## Supported features

Enjoy these handy hotkeys to enhance your Netflix experience:

- 👤 Auto profile log-in
- ⏩ <kbd>A</kbd> and <kbd>D</kbd> to control playback speed
- 🎬 Auto skip intros, recaps, and end credits
- 💬 <kbd>C</kbd> to toggle subtitles
- 🔊 <kbd>V</kbd> to toggle audio
- 📺 <kbd>N</kbd> for the next episode
- 🔄 <kbd>R</kbd> to restart an episode

## How to install

1. Clone the repository:
   ```shell
   $ git clone https://github.com/rational-kunal/Netflix-Hotkeys.git
   ```
1. Run the following commands to build the extension:
   ```shell
   $ cd netflix-hotkeys
   $ npm install
   $ npm run build
   ```
1. Open `chrome://extensions/` and turn on `Developer mode`.
1. Click on `Load unpacked` and select the `build` folder.

## Development

_(For the curious minds and my future reference)_

### How it works

The extension consists of a Controller and a UI. The Controller listens to user events and triggers hotkeys, while the UI enables/disables hotkey features.

### Major Components and Responsibilities

The extension is implemented with consists of several components, some of the major components with their roles:

- [`Storage`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/core/Storage/Storage.js): Provides a simple API to the extending class for storing and retrieving data.
- [`Preferences`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/core/Preferences/Preferences.js) (extends `Storage`): Manages user preferences.
- [`usePreferences`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/UI/hooks/usePreferences.js): Bridges the UI and the storage service to manage the preferences.
- [`FeatureControl`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/UI/FeatureControl/FeatureControl.jsx): A UI element that allows users to enable or disable hotkeys.
- [`NetflixCrawler`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/core/NetflixCrawler/index.js): Monitors changes in the Netflix DOM and triggers update events. It also provides access to current DOM elements as needed.
- [`NetflixController`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/core/NetflixController/index.js): Listens to events from `NetflixCrawler` and triggers hotkeys based on the enabled preferences stored in `Preferences`.
- [`Executor`](https://github.com/rational-kunal/Netflix-Hotkeys/blob/main/src/core/NetflixController/Executor.js): Executes specific code immediately or after DOM updates.

### How Hotkeys are Triggered

Hotkeys are triggered based on user actions, but sometimes the Netflix DOM may not be in the desired state immediately. In such cases, the extension waits for the necessary elements to be added to the DOM before triggering the hotkey. Typically, the DOM changes occur promptly after user interaction.

Hotkeys are triggered by manipulating the Netflix DOM. Examples of DOM manipulation include clicking on a button or pasting text into an input field.

---

Generated by [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

<a href="https://www.flaticon.com/free-icons/netflix" title="netflix icons">Netflix icons created by Ruslan Babkin - Flaticon</a>

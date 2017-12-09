# vtx (ViewTeCross)

## Usage for test server

Test server will automate browser/devic and elisten for request from test client.

### Step 1 Setup your hub

```
$ npm install -g selenium-standalone
$ selenium-standalone install
```

And take a memo on the machine's ip, which will be used as
`<selenium_grid_hub_ip>` later.

### Step 2 Start your hub

```
$ selenium-standalone start -- -role hub
```

A hub server will be started at port 4444. And you can access the grid hub
console at `http://<selenium_grid_hub_ip>:4444/grid/console`.

### Step 3 Setup your node for desktop browser testing

Desktop browser testing uses selenium to automate browser behaviors.

If it's on a different machine than the grid hub, remember to install selenium-standalone first.

```
$ npm install -g selenium-standalone
$ selenium-standalone install
```

And make sure you have installed all the browsers you'd like to test.

Safari will require 2 additional step to enable automation for testing. 

  1. Menu -> Safari -> Perferences... -> Advanced -> Enable "Show Develop menu in menu bar"
  2. Menu -> Develop -> Check "Allow Remote Automation"

Configure your selenium node using the `selenium-mac-node.conf.json` or `selenium-win10-node.conf.json` and replace `hub` with `http://<selenium_grid_hub_ip>:4444`.

Sample file can be found at: <https://github.com/toruta39/ViewTe/blob/master/packages/vtx/examples/conf/server>

### Step 4 Start your node for desktop browser testing 

For Mac user:

```
$ selenium-standalone start -- -role node -hub http://<selenium_grid_hub_ip>:4444/grid/register/ -nodeConfig selenium-mac-node.conf.json
```

For Win10 user:

```
$ selenium-standalone start -- -role node -hub http://<selenium_grid_hub_ip>:4444/grid/register/ -nodeConfig selenium-win10-node.conf.json
```

### Step 5 Setup your node for mobile testing 

Mobile testing uses appium to automate emulator behaviors.

You'll need to run 1 appium node for app testing and 1 appium node for browser
testing using 2 different users on the same machine or 2 different machines.

Install appium

```
$ npm install -g appium
```

Set up driver for iOS

<https://github.com/appium/appium/blob/master/docs/en/drivers/ios-xcuitest.md>

Set up driver for Android

<https://github.com/appium/appium/blob/master/docs/en/drivers/android-uiautomator2.md>

Run appium-doctor to verify if the installation is done.

```
$ npm install -g appium-doctor
$ appium-doctor 
```

Install vtx artifacts

```
$ npm install -g vtx
$ vtx install-artifacts
```

Configure your appium node using the `appium-app-node.conf.json` and
`appium-browser-node.conf.json`.

Sample file can be found at: <https://github.com/toruta39/ViewTe/blob/master/packages/vtx/examples/conf/server>

1. Modify the `version` fields under capabilities to the OS version you'd like to
   test against
2. Replace `configuration.url` with
   `http://<selenium_grid_hub_ip>:4444/wd/hub`
3. Replace `configuration.host` with the ip of current machine
4. Replace `configuration.hubHost` with `<selenium_grid_hub_ip>`

For iOS testing, remember to install simulator for the OS version you'd like to test. You can do it by:

1. Start Xcode
2. Go to Menu -> Xcode -> Perferences... -> Components
3. Download the simulator of the OS version you need

For Android testing, remember to install SDK and emulator image for the OS version you'd like to test and setup AVDs (Android Virutal Device) in advance. You can do it by:

1. Start Android Studio
2. Go to Menu -> Android Studio -> Preferences... -> Appearance & Behavior ->
   System Settings -> Android SDK
3. In the SDK Platforms tab, Check Show Package Details
4. Check Android SDK Platform XX and Google APIs Intel x86 Atom System Image
   for the OS version you need
5. Click OK to install those packages
6. After installation is done, go to  Menu -> Tools -> Android -> AVD Manager
7. Click "Create Virtual Device..."
8. Select a phone device and click Next
9. Select a x86 system image you need and click Next 
10. Change AVD Name to something you want and click Finish
11. Take a memo of the AVD Name, and replace all spaces to `_`, it'll be used later as `<avd_name>`

#### Notes on Android

You'll need to update Chrome in the AVD if it's not meeting the requirement (>= 58.0.3029.0)

1. Start the AVD from AVD Manager
2. `$ vtx install-chrome-to-avd`
3. Accept user agreement
4. Skip log in Chrome
5. Close the AVD

### Step 6 Start your node for mobile testing

For the node built for app testing

```
$ appium --port 4447 --nodeconfig appium-app-node.conf.json
```

For the node built for browser testing 

```
$ appium --port 4446 --nodeconfig appium-browser-node.conf.json
```

## Usage for test client

Test client will run the tests and under the hood send requests to and get test results from test server.

### Step 1 Install vtx

Setup `package.json` in your project and install Jest and vtx 

```
$ npm install -D vtx jest
```

### Step 2 Configure vtx

Create a `vtx.conf.js` in the root directory.

1. Replace host with `<selenium_grid_hub_ip>`
2. Add capabilities for your tests to run against

Here's an example configuration: <https://github.com/toruta39/ViewTe/blob/master/packages/vtx/examples/conf/client/vtx.conf.js>

#### Notes on configuring capabilities:

For test report: `vtxTestName` will be used for test reporting on that capability setting.
For WebView testing: `browserName` needs to be `vt` and `vtEnv` needs to be filled with the WebView environment you'd like to test.
For iOS testing: iOS will need different `wdaLocalPort` for each device. 
For Android testing: Android will need differnt `avd` for each device. Use the `<avd_name>` when you set up test server.

### Step 3 Write test code

vtx works with Jest. To author a test:

1. Create a test file named as `<test-name>.js`
2. Load vtx by  `const vtx = require('vtx');`
3. Load the configuration by `const config = require('../../vtx.conf');`
4. Wrap your Jest test in a function
5. Invoke your test function with `vtx(testFn, config);`

Here's an example: <https://github.com/toruta39/ViewTe/blob/master/packages/vtx-code-example/tests/specs/search.spec.js>

#### Special global test utils for vtx tests

##### driver

`driver` is a wd instance, which exposes a set of API for controlling the browser/device. It will communicate with the browser/device through test server under the JSON Wire Protocol. 

API interface of `driver` can be found at: <https://github.com/admc/wd/blob/master/doc/jsonwire-full-mapping.md>
JSON Wire Protocol can be found at: <https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol>

##### capability

`capability` is the current capability being used for the test, one of those you've set in the `vtx.conf.js`. You can use this for authoring cross platform tests with minimal code changes needed by platform difference.

### Step 4 Run test

`$ ./node_modules/.bin/jest tests/<test-name>.js`

The test will be run over all capabilities serially.

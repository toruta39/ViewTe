# ViewTe Cross

## Cross platform web testing

```
$ # start grid hub
$ selenium-standalone start -- -role hub

$ # grid console
$ # http://localhost:4444/grid/console

$ #start grid node
$ selenium-standalone start -- -role node -hub http://192.168.3.7:4444/grid/register/ -nodeConfig selenium-mac-node.conf.json
$ appium --port 4446 --nodeconfig appium-browser-node.conf.json
$ appium --port 4447 --nodeconfig appium-app-node.conf.json # on a different user
```

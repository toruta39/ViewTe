#!/usr/bin/env node

const spawn = require('cross-spawn');
const path = require('path');
const mkdirp = require('mkdirp');
const cpr = require('cpr');
const rimraf = require('rimraf');

require('yargs')
  .command(
    'install-artifacts', 
    'install artifacts needed by appium node', 
    () => {}, 
    async (argv) => {
      const fromDir = path.resolve(__dirname, 'artifacts');
      const toDir = path.resolve(process.env.HOME, '.vtx', 'artifacts');
      
      try {
        await new Promise((resolve, reject) => {
          mkdirp(toDir, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
  
        await new Promise((resolve, reject) => {
          cpr(fromDir, toDir, {
            deleteFirst: true,
            overwrite: true,
            confirm: false
          }, (err, files) => {
            if (err) reject(err);
            resolve(files);
          });
        });
      } catch(e) {
        console.error(e);
      }
    }
  )
  .command(
    'uninstall-artifacts', 
    'uninstall artifacts under ~/.vtx/artifacts', 
    () => {}, 
    async (argv) => {
      const toDir = path.resolve(process.env.HOME, '.vtx', 'artifacts');
      
      try {
        await new Promise((resolve, reject) => {
          rimraf(toDir, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      } catch(e) {
        console.error(e);
      }
    }
  )
  .command(
    'install-chrome-to-avd', 
    'install Chrome 61 to the connected AVD', 
    () => {}, 
    (argv) => {
      spawn(
        'adb', 
        [
          'install', '-r', '-d',
          path.resolve(__dirname, 'artifacts', 
            'com.android.chrome_61.0.3163.98-316309812_minAPI24(x86)(nodpi)_apkmirror.com.apk')
        ], 
        { stdio: 'inherit' }
      );
    }
  )
  .demandCommand()
  .help()
  .wrap(72)
  .argv;

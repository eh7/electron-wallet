import { app, BrowserWindow } from 'electron';
import Main from './electron-main';
//import Main from './electron-main.js';

Main.main(app, BrowserWindow);

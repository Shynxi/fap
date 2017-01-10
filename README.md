# Heavily modified Version of Gulp Starter

## Basisinstallation
Um das Projekt bauen zu können, werden folgende Programme benötigt.

###NodeJS 
```
Installer von https://nodejs.org/
```

###npm installatieren/ aktualisieren
```bash
npm install -g npm
```

###python (v2.7.x)
```
> Installer von https://www.python.org/
```

##Cleanup: Um den modules-Ordner zu löschen
Bei Windows kann es bei zu langen Dateinamen zu Problemen kommen. Dabei hilft ein Nodejs Modul "rimraf".
Installation (https://www.npmjs.com/package/rimraf)
```bash
npm install rimraf -g
```

Starten (ohne Sicherheitsfrage ist dann rekursiv alles Weg)	
```bash
rimraf <path>
```
```bash
rimraf node_modules
```

## Projekt laufen lassen
Einmalig	
```
npm install
```

Für die Entwicklung (mit autoreload bei Resourcenänderungen)
```bash
npm run development
```

Für die Vorbereitung der Produktion
```bash
npm run production
```


## Bower/Webpack Integration
Any Bower Package can be integrated via 
```
require('packagename')
```
By default, packages "main" files will be used. Can be modified in projects bower.json in the overrides-section
## Bootstrap
Bootstrap is included by default as npm package.

To remove, delete it from package.json

Bootstrap Variables can be overriden in ./src/stylesheets/bs-overrides.scss

## Modernizr
Modernizr is included by default as npm package

To remove, delete it from package.json

You can set which parts of Modernizr to include by editing .modernizrrc

A list of possible options can be found here: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json

## Magnolia Light Module
To add assets (js, css, fonts, images) to lightmodule, run
```
npm run lightmodule
```
*Lightmodule folder name has to be specified in "gulpfile/config.json" for the root object!!*


####



# ![Gulp Starter](extras/demo/src/images/gulp-starter-logo.png)

Gulp Starter is a delicious blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site or app structure. The [extras](./extras) folder contains configuration details for Rails and Craft, with more to follow. [Check out the compiled demo](http://vigetlabs.github.io/gulp-starter/) and play with [the source files](extras/demo)!

```bash
git clone https://github.com/vigetlabs/gulp-starter.git MyApp
cd MyApp
npm install
npm start
```

Features | Tools Used
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**JavaScript** | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/)
**HTML** | [Nunjucks](https://mozilla.github.io/nunjucks/), [gulp-data](https://github.com/colynb/gulp-data), or bring your own
**Images** | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)
**Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
**Fonts** | Folder and `.sass` mixin for including WebFonts
**Live Updating** | [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
**Production Builds** | JS and CSS are [uglified](https://github.com/terinjokes/gulp-uglify) and [minified](http://cssnano.co/), [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport), local production [Express](http://expressjs.com/) server for testing builds.
**JS Testing** | [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), Example [Travis CI](https://travis-ci.org/) integration
**Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)

## Usage
Make sure Node installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions. 

This has been tested on Node `0.12.x` - `5.9.0`, and should work on newer versions as well. [File an issue](https://github.com/vigetlabs/gulp-starter/issues) if it doesn't!

#### Install Dependencies
```bash
npm install
```

#### Run development tasks:
```
npm start
```
Aliases: `npm run gulp`, `npm run development`

This is where the magic happens. The perfect front-end workflow. This runs the default gulp task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

Why run this as an npm script? NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

#### Run in tests in watch mode:
```bash
npm run test:watch
```

#### Run tests once:
```bash
npm run test
```

#### Build production files:
```bash
npm run production
```

### Running the Demo
By default, the files in `src` are pretty minimal. If you're just exploring and would like to play with the [demo](http://vigetlabs.github.io/gulp-starter/) files, the files available in `extras/demo`. Just replace `src` and `config.json` with the ones in `extras/demo`, or simply check out the `demo` branch.

```
git checkout demo
npm start
```

### Starting a fresh project
If you plan on using this to start a new project, be sure and clear out the `git` data start a fresh history:

```bash
rm -rf .git && git init
git commit -m "Initialized with Gulp Starter"
```

## Configuration
Directory and top level settings are convienently exposed in `gulpfile/config.json`. Use this file to update paths to match the directory structure of your project, and to adjust task options.

All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

**If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.**

Not all configuration is exposed here. For advanced task configuration, you can always edit the tasks themselves in `gulpfile/tasks`.

### Start compiling, serving, and watching files
```
npm run gulp
```

(or `npm run development`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile/tasks/default.js`.

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

To run any other existing task, simply add the task name after the `gulp` command. Example:

```bash
npm run gulp production
```

## Asset Task Details
A `README.md` with details about each asset task are available in their respective folders in the `src` directory:

- [JavaScript](src/javascripts)
- [Stylesheets](src/stylesheets)
- [HTML](src/html)
- [Fonts](src/fonts)
- [Images](src/images)
- [Icon Font](src/icons#iconfont-task)
- [SVG Sprite](src/icons#svg-sprite-task)
- [Static Files (favicons, app icons, etc.)](src/static)

## Additional Task Details

### Build production-ready files
```
npm run production
```

This will compile revisioned and compressed files to `./public`. To build production files and preview them localy, run

```
npm run demo
```

This will start a static server that serves your production files to http://localhost:5000. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

### Run JavaScript Tests
```
npm run test
```
Test files located in `__tests__` folders are picked up and run using
[Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/). The test script right now first compiles a production build, and then, if successful runs Karma. This is nice when using something like [Travis CI](https://travis-ci.org/vigetlabs/gulp-starter) in that if an error occurs during the build step, Travis alerts me that it failed. To pass, the files have to compile properly AND pass the JS tests.

### Deploy to gh-pages
```
npm run deploy
```
This task compiles production code and then uses [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages) to push the contents of your `dest.root` to a `gh-pages` (or other specified) branch, viewable at http://[your-username].github.io/[your-repo-name]. Be sure to update the `homepage` property in your `package.json`.

GitHub Pages isn't the most robust of hosting solutions (you'll eventually run into relative path issues), but it's a great place to quickly share in-progress work, and you get it for free.

[Surge.sh](http://surge.sh/) might be a good alternative for production-ready static hosting to check out, and is just as easy to deploy to. Where ever you're deploying to, all you need to do is `npm run gulp production` and transfer the contents of the `public` folder to your server however you see fit.

For non-static sites (Rails, Craft, etc.), make sure the `production` task runs as part of your deploy process.

Original Blog Post: https://www.viget.com/articles/gulp-browserify-starter-faq

***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)



## Project specials

### SPA Navigation

    Diese wird dynamisch erzeugt und benötigt die Attribute "data-spa-navi-id" und "data-spa-navi-title". Erzeugt wird diese durch clonen des Elements mit dem Attribut "data-spa-navi-element".
Der Aufbau erfolgt in der app.js nach DOM Ready.
Beispiel
```
   id="{{ module.id }}" data-spa-navi-title="{{ module.headline }}" data-spa-navi-id="{{ module.id }}"
```
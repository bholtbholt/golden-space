# Golden Scale

Calculate and preview the perfect spacing scale in web apps.

## Motivations

This project is the culmination of some space exploration in web apps. I've attempted to find a suitable space system while also trying out some ideas while retaining responsiveness.

The **primary goal** of this exploration was to determine whether it was feasible to:

* Consolidate margin and padding utility classes across screen sizes
* Determine the appropriate scale to implement in [Zipline](http://retailzipline.com)
* See the effect of implementing [Text Crop](http://text-crop.eightshapes.com/) to set consistency between line-heights and space

**Secondary goals** shaped some of the technology decisions. I wanted to:

* Try [Parcel](https://parceljs.org) for bundling assets
* Get more practice with [TypeScript](https://www.typescriptlang.org)
* Use as few frameworks as possible, thus imitating the [Elm Architecture](https://guide.elm-lang.org/architecture/) or [Redux Pattern](https://redux.js.org) in `update.ts`
* Learn [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## Next Steps

* Add some typography to the bottom of the page for a space + typography side-by-side comparison
* Add some UI elements for '''

## Development

### Installation

Golden Scale is built on a [Node Environment](https://nodejs.org/en/). You'll need a copy and Node and NPM. Personally, I've used [Yarn](https://yarnpkg.com/en/) for this project.

Install the project by running `yarn` in the CLI.

### Development

Start the NPM server with `yarn start` and visit `http://localhost:3000`.

### Deployment

The page is packaged with [Parcel](https://parceljs.org) and hosted on [Github Pages](https://pages.github.com). For technical reasons the "dist" folder is in the root folder (for now). You'll see `index.html` and hashed javascript and CSS files.

To create a new build:

* Run `yarn build`
* Commit the build to `master branch`
* Push the changes

## Reading on Space

* [Nathan Curtis' Thoughts on Space in UI Design](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
* [Kevin Powell of EightShapes' Motivations for their Text Crop Tool](https://medium.com/eightshapes-llc/cropping-away-negative-impacts-of-line-height-84d744e016ce)
* [An In-depth Study on CSS Typography](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)
* [Zurb's Modular Scale](https://zurb.com/word/modular-scale)
* [Tim Brown's Modular Scale Calculator](http://www.modularscale.com)

## Development Resources

* [EightShapes' Text Crop Tool](http://text-crop.eightshapes.com)
* [Using Custom CSS Properties](http://vanseodesign.com/css/custom-properties-and-javascript/)
* [TypeScript HTML Element Types](http://definitelytyped.org/docs/flipsnap--flipsnap/interfaces/htmlelement.html)
* [Flat UI: Australian theme](https://flatuicolors.com/palette/au)

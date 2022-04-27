import GetGame from '../../../../utils/system/GetGame.js';
import { CubismMatrix44 } from '../../framework/src/math/cubismmatrix44';
import InitializeCubism from '../../utils/InitializeCubism.js';

var GlobalDataInstance = undefined;

// Global data shared for all Live2dGameObjects
class GlobalData {
    static getInstance(gameObject) {
        if (!GlobalDataInstance) {
            GlobalDataInstance = new GlobalData(gameObject);
        }
        return GlobalDataInstance;
    }

    constructor(gameObject) {
        var game = GetGame(gameObject);
        var gl = game.renderer.gl;
        var scale = game.scale;

        this.game = game;
        this.gl = gl;
        this.scale = scale;

        // A frame buffer for all live2d game object
        this.frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);

        this.viewportRect = [0, 0, 0, 0];
        this.projectionMatrix = new CubismMatrix44();
        this.onResize();

        scale.on('resize', this.onResize, this);
        game.events.once('destroy', this.destroy, this);

        // Run this method once, before creating CubismModel
        InitializeCubism();
    }

    destroy() {
        this.scale.off('resize', this.onResize, this);

        this.game = undefined;
        this.gl = undefined;
        this.scale = undefined;

        this.frameBuffer = undefined;
        this.viewportRect = undefined;
        this.projectionMatrix = undefined;

        GlobalDataInstance = undefined;
    }

    onResize() {
        var width = this.scale.width;
        var height = this.scale.height;

        // Set view port
        this.viewportRect[2] = width;
        this.viewportRect[3] = height;

        // Set projectionMatrix
        if (width < height) {
            this.projectionMatrix.scale(1.0, width / height);
        } else {
            this.projectionMatrix.scale(height / width, 1.0);
        }
    }
}

export default GlobalData;
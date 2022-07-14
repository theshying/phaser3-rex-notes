import FullWindowRectangle from '../fullwindowrectangle/FullWindowRectangle';

export default Cover;

declare namespace Cover {
    interface IConfig {
        color?: number,
        alpha?: number,
        autoResize?: boolean
    }
}

declare class Cover extends FullWindowRectangle {
    constructor(
        scene: Phaser.Scene,
        config?: Cover.IConfig,
        autoResize?: boolean
    );
}

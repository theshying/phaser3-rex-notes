import Decorator from '../Decorator.js';
import { SUCCESS, ERROR, FAILURE } from '../../constants.js';

class RepeatUntilSuccess extends Decorator {

    constructor(
        {
            maxLoop = -1,
            child = null,
            title,
            name = 'RepeatUntilSuccess'
        } = {},
        nodePool
    ) {

        super(
            {
                child,
                title,
                name,
                properties: {
                    maxLoop
                },
            },
            nodePool
        );

        this.maxLoopExpression = this.addExpression(maxLoop);
    }

    open(tick) {
        var nodeMemory = tick.getNodeMemory();
        nodeMemory.$maxLoop = tick.evalExpression(this.maxLoopExpression);
        nodeMemory.$i = 0;
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var nodeMemory = tick.getNodeMemory();
        var maxLoop = nodeMemory.$maxLoop;
        var i = nodeMemory.$i;
        var status = ERROR;

        // Execute child many times in a tick
        while (maxLoop < 0 || i < maxLoop) {
            status = this.child._execute(tick);

            if (status === FAILURE) {
                i++;
            } else {
                break;
            }
        }

        nodeMemory.$i = i;
        return status;
    }
};

export default RepeatUntilSuccess;
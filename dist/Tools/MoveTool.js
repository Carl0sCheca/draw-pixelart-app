import { Tool } from './Tool';
import { MouseButton } from '../Mouse';
export class MoveTool extends Tool {
    onAction() {
        super.onAction();
        if (!this.canRun) {
            return;
        }
        if (this.drawApp.mouse.button === MouseButton.NONE) {
            this._dragging = false;
            this.drawApp.toolSelector.restoreTool();
            return;
        }
        if (!this._dragging) {
            this._dragging = true;
            this.firstPoint = this.drawApp.mouse.realPosition;
        }
        else if (this._dragging && this.drawApp.zoom.level !== this.drawApp.zoom.minLevel) {
            const newPosition = {
                x: this.drawApp.zoom.offset.x - (this.firstPoint.x - this.drawApp.mouse.realPosition.x),
                y: this.drawApp.zoom.offset.y - (this.firstPoint.y - this.drawApp.mouse.realPosition.y)
            };
            if (newPosition.x <= 0 && this.drawApp.canvas.width < newPosition.x + this.drawApp.canvas.width * this.drawApp.zoom.level) {
                this.drawApp.zoom.offset.x = newPosition.x;
            }
            if (newPosition.y <= 0 && this.drawApp.canvas.height < newPosition.y + this.drawApp.canvas.height * this.drawApp.zoom.level) {
                this.drawApp.zoom.offset.y = newPosition.y;
            }
            this.firstPoint = this.drawApp.mouse.realPosition;
            this.drawApp.reloadCanvas();
        }
    }
}

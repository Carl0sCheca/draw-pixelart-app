import { Tool } from '@/libs/DrawApp/Tools/Tool'
import { MouseButton } from '@/libs/DrawApp/Mouse'
import { DiscretizationDataPosition, DiscretizationPosition, Lerp, RandomColour, Vector } from '@/libs/DrawApp/Utils'

export class PencilTool extends Tool {
  public onClick (): void {
    if (this.canvas.mouse.clicked === MouseButton.LEFT) {
      if (
        this.canvas.mouse.dataPosition.x < 0 || this.canvas.mouse.dataPosition.x >= this.canvas.settings.gridSize ||
        this.canvas.mouse.dataPosition.y < 0 || this.canvas.mouse.dataPosition.y >= this.canvas.settings.gridSize ||
        this.canvas.mouse.position.x < 0 || this.canvas.mouse.position.x >= this.canvas.ctx.canvas.width ||
        this.canvas.mouse.position.y < 0 || this.canvas.mouse.position.y >= this.canvas.ctx.canvas.height
      ) {
        return
      }

      const distance: number = Math.max(
        Math.abs(this.canvas.mouse.lastPosition.x - this.canvas.mouse.position.x),
        Math.abs(this.canvas.mouse.lastPosition.y - this.canvas.mouse.position.y)
      )

      const _lerpSteps: number = 10 / distance
      let _currentPos: Vector = { x: this.canvas.mouse.position.x, y: this.canvas.mouse.position.y }

      for (let _lerp = 0; _lerp <= 1; _lerp += _lerpSteps) {
        _currentPos = DiscretizationDataPosition({
          x: Lerp(this.canvas.mouse.lastPosition.x, this.canvas.mouse.position.x, _lerp),
          y: Lerp(this.canvas.mouse.lastPosition.y, this.canvas.mouse.position.y, _lerp)
        }, this.canvas)

        this.canvas.paintCanvas(DiscretizationPosition(_currentPos, this.canvas), this.canvas.toolSelector.showGrid, RandomColour())
      }
    }
  }
}
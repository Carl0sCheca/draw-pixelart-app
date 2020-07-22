import { Tool } from '@/libs/DrawApp/Tools/Tool'
import { PencilTool } from '@/libs/DrawApp/Tools/PencilTool'
import { Canvas } from '@/libs/DrawApp/Canvas'
import { BucketTool } from '@/libs/DrawApp/Tools/BucketTool'
import { ColourPickerTool } from '@/libs/DrawApp/Tools/ColourPickerTool'
import { MoveTool } from '@/libs/DrawApp/Tools/MoveTool'

export enum ToolType {
  NONE = -1,
  PENCIL = 0,
  BUCKET = 1,
  COLOUR_PICKER = 2,
  MOVE = 3
}

export class ToolSelector {
  public readonly tools: Tool[]
  private selected: number
  private previousSelected: number

  public colorSelected: string

  public showGrid: boolean

  public constructor (canvas: Canvas) {
    this.selected = 0
    this.previousSelected = -1

    this.colorSelected = 'red'
    this.showGrid = true

    this.tools = []
    this.tools.push(new PencilTool(canvas, ToolType.PENCIL))
    this.tools.push(new BucketTool(canvas, ToolType.BUCKET))
    this.tools.push(new ColourPickerTool(canvas, ToolType.COLOUR_PICKER))
    this.tools.push(new MoveTool(canvas, ToolType.MOVE))
  }

  public get tool (): Tool {
    return this.tools[this.selected]
  }

  public set selectTool (toolType: ToolType) {
    if (this.selected !== toolType.valueOf()) {
      this.previousSelected = this.selected
      this.selected = toolType.valueOf()
    }
  }

  public restoreTool (): void {
    if (this.previousSelected !== -1) {
      this.selected = this.previousSelected
      this.previousSelected = -1
    }
  }
}
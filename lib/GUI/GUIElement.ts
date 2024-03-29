import { DrawApp } from '../index'
import { Vector } from '../Utils/Math'

export abstract class GUIElement {
  public loaded: boolean

  public enabled: boolean
  public clickIn: boolean
  private _position!: Vector
  private _size!: Vector

  public selectable: boolean
  public hoverable: boolean
  public active: boolean

  public parent?: GUIElement
  public child: Array<GUIElement>

  public img?: HTMLImageElement

  public constructor (protected readonly drawApp: DrawApp, public name: string) {
    this.enabled = false
    this.clickIn = true
    this.child = []

    this.active = false
    this.loaded = false
    this.selectable = true
    this.hoverable = true
  }

  public windowResize? (): void

  public set size (size: Vector) {
    this._size = size
  }

  public get size () {
    return this._size
  }

  public set position (position: Vector) {
    this._position = position
  }

  public get position () {
    return this._position
  }

  public hide (): void {
    this.enabled = false
  }

  public show (): void {
    this.enabled = true
  }

  public hover (): void {
    this.drawApp.ctx.filter = 'hue-rotate(180deg)'
    this.ui()
    this.drawApp.ctx.filter = 'none'
  }

  public abstract ui (): void

  public static AddElement (collection: Array<GUIElement>, drawApp: DrawApp, element: GUIElement, img?: HTMLImageElement, position?: Vector, size?: Vector): void {
    if (position !== undefined) {
      element._position = position
    } else {
      element._position = { x: 0, y: 0 }
    }

    if (img !== null) {
      if (size !== undefined) {
        img!.width = size.x
        img!.height = size.y
      } else {
        const defaultSize = 68
        img!.width = defaultSize
        img!.height = defaultSize
      }

      element.size = { x: img!.width, y: img!.height }

      element.img = img
    } else {
      element.size = size!
    }

    collection.push(element)
  }

  public mouseUp? (): void
  public mouseDown? (): void

  public setActive (image: HTMLImageElement = this.img!, rotation = 270): void {
    if (this.img !== undefined) {
      this.active = true
      this.drawApp.ctx.filter = `hue-rotate(${rotation}deg)`
      this.drawApp.ctx.drawImage(image, this._position.x, this._position.y, this.size.x, this.size.y)
      this.drawApp.ctx.filter = 'none'
    }
  }
}

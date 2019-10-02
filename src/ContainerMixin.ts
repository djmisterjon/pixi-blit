declare namespace PIXI {
    // export interface Container {
    //     containerRenderWebGL?(renderer: Renderer): void;
    // }
}

namespace pixi_blit {
    (Object as any).assign(PIXI.Container.prototype, {
        render: function (renderer: PIXI.Renderer): void {
            if (this._activeParentLayer && this._activeParentLayer != renderer._activeLayer) {
                return;
            }

            if (!this.visible) {
                this.displayOrder = 0;
                return;
            }

            this.displayOrder = renderer.incDisplayOrder();

            // if the object is not visible or the alpha is 0 then no need to render this element
            if (this.worldAlpha <= 0 || !this.renderable) {
                return;
            }

	        renderer._activeLayer = null;
            this.containerRenderWebGL(renderer);
	        renderer._activeLayer = this._activeParentLayer;
        },
        containerRenderWebGL: PIXI.Container.prototype.render
    });
}

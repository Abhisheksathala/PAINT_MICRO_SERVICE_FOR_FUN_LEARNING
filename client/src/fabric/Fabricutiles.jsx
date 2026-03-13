import { createShap } from "./Shapfactorie";
import { shapeDefinations } from "./Shaps";

export const initializeFabric = async (CanvasEl, containerEl) => {
  try {
    const { Canvas, Rect, PencilBrush } = await import("fabric");

    const canvas = new Canvas(CanvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    });

    const brush = new PencilBrush(canvas);
    brush.color = "#000000";
    brush.width = 5;
    canvas.freeDrawingBrush = brush;

    return canvas;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const centerCanvas = (canvas) => {
  if (!canvas || !canvas.wrapperEl) return;

  const canvasWrapper = canvas.wrapperEl;

  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.height = `${canvas.height}px`;

  canvasWrapper.style.position = "absolute";
  canvasWrapper.style.top = "50%";
  canvasWrapper.style.left = "50%";
  canvasWrapper.style.transform = "translate(-50%, -50%)";
};

export const addShapToCanvas = async (canvas, shapeTypes, CustomProps = {}) => {
  if (!canvas) return null;
  try {
    const fabricModule = await import("fabric");
    const shape = createShap(fabricModule, shapeTypes, shapeDefinations, {
      left: 100,
      top: 100,
      ...CustomProps,
    });

    if (shape) {
      shape.id = `${shapeTypes}-${Date.now()}`;
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
      return shape;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addTexttocanvas = async (
  canvas,
  text,
  options = {},
  withBackground = false,
) => {
  if (!canvas) return null;

  alert(canvas);
  alert(text);

  try {
    const { IText } = await import("fabric");

    const defaultprops = {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fill: "#000000",
      padding: withBackground ? 10 : 0,
      textAlign: "left",
      id: `text-${Date.now()}`,
    };
    alert(defaultprops);

    const textObj = new IText(text, { ...defaultprops, ...options });
    alert(textObj);
    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    return textObj;
  } catch (error) {
    alert(error);
    console.log("error in adding text", error);
    return null;
  }
};


export const 
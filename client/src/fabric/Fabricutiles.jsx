import { resolve } from "styled-jsx/css";
import { createShap } from "./Shapfactorie";
import { shapeDefinations } from "./Shaps";
import { reject } from "lodash";

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

//  drawing section
export const toggledrawingMode = (
  canvas,
  isDrawingMode,
  drawingColor = "#000000",
  brushWidth = 5,
) => {
  if (!canvas) return null;

  try {
    canvas.isDrawingMode = isDrawingMode;

    if (isDrawingMode) {
      canvas.freeDrawingBrush.color = drawingColor;
      canvas.freeDrawingBrush.brushWidth = brushWidth;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const toggleEraseMode = (
  canvas,
  isErasing,
  previousColor = "#000000",
  eraserWidth = 20,
) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    if (isErasing) {
      canvas.freeDrawingBrush.color = "#ffffff";
      canvas.freeDrawingBrush.width = eraserWidth;
    } else {
      canvas.freeDrawingBrush.color = previousColor;
      canvas.freeDrawingBrush.width = 5;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateDrawingBrush = (canvas, properties = {}) => {
  if (!canvas || !canvas.freeDrawingBrush) return false;

  try {
    const { color, width, opacity } = properties;

    if (color !== undefined) {
      canvas.freeDrawingBrush.color = color;
    }
    if (width !== undefined) {
      canvas.freeDrawingBrush.width = width;
    }
    if (opacity !== undefined) {
      canvas.freeDrawingBrush.opacity = opacity;
    }

    return true;
  } catch (error) {
    console.log(false);
    return false;
  }
};

export const addImageTocanavs = async (canvas, imageUrl) => {
  try {
    if (!canvas) return null;
    const { Image: FabricImage } = await import("fabric");
    let imgObj = new Image();
    imgObj.crossOrigin = "Anonymous";
    imgObj.src = imageUrl;
    return new Promise((resolve, reject) => {
      imgObj.onload = () => {
        let image = new FabricImage(imgObj);
        image.set({
          id: `image-${Date.now()}`,
          top: 100,
          left: 100,
          padding: 10,
          cornerSize: 10,
        });

        const maxDimension = 400;

        if (image.width > maxDimension || image.height > maxDimension) {
          if (image.width > image.height) {
            const scale = maxDimension / image.width;
            image.scale(scale);
          } else {
            const scale = maxDimension / image.height;
            image.scale(scale);
          }
        }
        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
        resolve(image);
      };
      imgObj.onerror = () => {
        reject(new Error(`failed to load image: ${imageUrl}`));
      };
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

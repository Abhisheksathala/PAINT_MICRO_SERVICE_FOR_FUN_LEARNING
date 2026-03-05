export const initializeFabric = async (CanvasEl, containerEl) => {
  try {
    const { Canvas, Rect, PencilBrush } = await import("fabric");

    const canvas = new Canvas(CanvasEl, {
      preserveObjectStacking: true,
      isDrawingMode: false,
      renderOnAddRemove: true,
    });

    const bursh = new PencilBrush(canvas);
    bursh.color = "#000000";
    bursh.width = 5;
    bursh.freeDrawingBrush = bursh;

    return canvas;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const centerCanvas = (canvas) => {
  if (canvas) return;
};

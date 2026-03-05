"use client";

import { create } from "zustand";

export const useEditorStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => {
    set({ canvas });
    if (canvas) {
      centerCanvas(canvas);
    }
  },
  designId: null,
  setDesignId: (id) =>
    set({
      designId: id,
    }),
  restStore: () => {
    set({
      canvas: null,
      designId: null,
    });
  },
}));

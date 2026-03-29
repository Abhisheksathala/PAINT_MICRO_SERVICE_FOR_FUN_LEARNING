"use client";

import { centerCanvas } from "@/fabric/Fabricutiles";
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
  isEditing: true,
  setIsEditing: (flag) =>
    set({
      isEditing: flag,
    }),
  name: "Untitled",
  setName: (value) => {
    set({ name: value });
  },
  showProperties: false,
  setShowProperties: (falg) => {
    set({ showProperties: falg });
  },
  markAsModified: () => {
    const designId = get().designId;

    if (designId) {
      set({
        lastModified: Date.now(),
        saveStatus: "Saving...",
        isModified: true,
      });

      get().debouncedSaveToServer();
    } else {
      console.error("No design ID Available");
    }
  },
  resetStore: () => {
    set({
      canvas: null,
      designId: null,
      isEditing: true,
      name: "unititled",
      showProperties: false,
    });
  },
}));

"use client";

import { centerCanvas } from "@/fabric/Fabricutiles";
import { saveCanvasState } from "@/services/DesignService";
import { debounce } from "lodash";
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

  userSubscription: null,
  setUserSubscription: (data) => {
    set({ userSubscription: data });
  },
  showPremiumModel : false,
  setShowPremiumModel: (falg) => {
    set({ showPremiumModel: falg });
  },

  userDesigns : [],
  setUserDesigns: (data) => {
    set({ userDesigns: data });
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
      get().debounceSaveToServer();
    } else {
      console.error("No design ID Available");
    }
  },

  saveTOServer: async () => {
    const designId = get().designId;
    const canvas = get().canvas;
    if (!canvas || !designId) return null;
    try {
      const saveDesign = await saveCanvasState(canvas, designId, get().name);
      set({
        saveStatus: "Saved",
        isModified: false,
      });
      return saveDesign;
    } catch (error) {
      set({ saveStatus: "Error" });
      console.log(error);
    }
  },

  debounceSaveToServer: debounce(() => {
    get().saveTOServer();
  }, 500),

  saveStatus: "saved",
  setSaveStatus: (status) => {
    set({ saveStatus: status });
  },

  lastModified: Date.now(),

  isModified: false,

  resetStore: () => {
    set({
      canvas: null,
      designId: null,
      isEditing: true,
      name: "unititled",
      showProperties: false,
      saveStatus: "Saved",
      isModified: false,
      lastModified: Date.now(),
    });
  },
}));

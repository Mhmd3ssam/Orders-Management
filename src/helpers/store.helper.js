// Helper to initialize ui state
export function initializeState() {
  return {
    uiFlags: {
      isLoading: false,
      isUpdating: false,
      isCreating: false,
      isDeleting: false,
    },
  };
}

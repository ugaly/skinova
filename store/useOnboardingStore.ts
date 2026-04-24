import { create } from 'zustand';

type OnboardingState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
}));

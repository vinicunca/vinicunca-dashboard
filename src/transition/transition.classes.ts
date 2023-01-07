import type { TransitionGroupProps, TransitionProps } from 'vue';

export const TRANSITION_CLASSES: Record<string, TransitionProps & TransitionGroupProps> = {
  FADE: {
    enterActiveClass: 'transition duration-300',
    leaveActiveClass: 'transition duration-300',
    enterFromClass: 'opacity-0',
    leaveToClass: 'opacity-0',
    moveClass: 'transition-transform duration-500',
  },

  EXPAND: {
    enterActiveClass: 'transition-all duration-300',
    leaveActiveClass: 'transition-all duration-300',
  },

  EXPAND_X: {
    enterActiveClass: 'transition-all duration-300',
    leaveActiveClass: 'transition-all duration-300',
    moveClass: 'transition-transform duration-500',
  },

  SCALE: {
    enterActiveClass: 'transition-all duration-300',
    leaveActiveClass: 'transition-all duration-300',
    enterFromClass: 'opacity-0 scale-0',
    leaveFromClass: 'opacity-0 scale-0',
    leaveToClass: 'opacity-0 scale-0',
  },

  SLIDE_Y: {
    enterActiveClass: 'transition-all duration-300',
    leaveActiveClass: 'transition-all duration-300',
    enterFromClass: 'opacity-0 scale-0',
    leaveFromClass: 'opacity-0 scale-0',
    leaveToClass: 'opacity-0 scale-0',
  },
};

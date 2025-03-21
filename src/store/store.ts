// ✅ Implementasi Benar (Fixed)
import { Updater } from '@tanstack/react-table';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = Record<string, any>; // atau sesuaikan dengan kebutuhan type

export const createStore = <T extends State>(
  name: string,
  stateCreator: StateCreator<T> // Fungsi creator yang menerima set/get
) => {
  return create<T>()(
    devtools(
      (set, get, store) => {
        return stateCreator(set, get, store);
      },
      { name }
    )
  );
};

// Fungsi utilitas untuk handle updater tanstack
export const runUpdater = <T>(updater: Updater<T>, prev: T): T => {
  return typeof updater === 'function' 
    ? (updater as (prev: T) => T)(prev)
    : updater;
};
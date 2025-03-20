// ✅ Implementasi Benar (Fixed)
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
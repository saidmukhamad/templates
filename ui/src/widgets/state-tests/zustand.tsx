import { create } from "zustand";

export const useStore_1 = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

export const useStore_2 = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

function StateManagement_1() {
  const { count, increment, decrement } = useStore_1();
  return (
    <div>
      <h3>State Management 1</h3>
      <p>Count: {count}</p>
      <div className="flex space-x-2">
        <button className="bg-primary text-primary-foreground rounded-md p-2" onClick={() => increment()}>
          Increment
        </button>
        <button className="bg-primary text-primary-foreground rounded-md p-2" onClick={() => decrement()}>
          Decrement
        </button>
      </div>
    </div>
  );
}

function StateManagement_2() {
  const { count: count2, increment: increment2, decrement: decrement2 } = useStore_2();
  return (
    <div>
      <h3>State Management 2</h3>
      <p>Count: {count2}</p>
      <div className="flex space-x-2">
        <button className="bg-primary text-primary-foreground rounded-md p-2    " onClick={() => increment2()}>
          Increment
        </button>
        <button className="bg-primary text-primary-foreground rounded-md p-2" onClick={() => decrement2()}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export function StateManagementTest() {
  return (
    <div className="flex flex-col space-y-4">
      <StateManagement_1 />
      <StateManagement_2 />
    </div>
  );
}

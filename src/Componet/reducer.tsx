import { type } from "os";
import React, { useReducer, useContext, createContext } from "react";

interface State {
  count: number;
}

type ActionType = string;

type Action = {
  type: ActionType;
  payload: {};
};

const INCREMENT: ActionType = "INCREMENT";
const increment = (): Action => {
  return {
    type: INCREMENT,
    payload: {},
  };
};

const DECREMENT: ActionType = "DECREMENT";
const decrement = (): Action => {
  return {
    type: DECREMENT,
    payload: {},
  };
};

const RESET: ActionType = "RESET";
const reset = (): Action => {
  return {
    type: RESET,
    payload: {},
  };
};

const reducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    case DECREMENT:
      return { count: state.count - 1 };
    case RESET:
      return { count: 0 };
    default:
      throw new Error();
  }
};

type CounterProps = {};

const Counter: React.FC<CounterProps> = (
  props: React.PropsWithChildren<CounterProps>
) => {
  const { state, dispatch } = useContext(contextStore);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  );
};

type StoreValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const storeInit: StoreValue = {
  state: {
    count: 0,
  },
  dispatch: (action: Action): void => {},
};

const contextStore: React.Context<StoreValue> = createContext(storeInit);

interface CounterParent {}
const CounterParent: React.FC<CounterProps> = (
  props: React.PropsWithChildren<CounterProps>
) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    count: 0,
  });
  return (
    <>
      <contextStore.Provider value={{ state, dispatch }}>
        {React.Children.map(props.children, (value) => {
          return value;
        })}
      </contextStore.Provider>
    </>
  );
};

const CounterReset: React.FC = () => {
  const { dispatch } = useContext(contextStore);
  const clickHandle = () => {
    dispatch(reset());
  };
  return (
    <>
      <button onClick={clickHandle}>重置:</button>
    </>
  );
};

const CounterDemo: React.FC = () => {
  return (
    <>
      <h1>one:</h1>
      <CounterParent>
        <Counter></Counter>
        <CounterReset></CounterReset>
      </CounterParent>
      <h1>two</h1>
      <CounterParent>
        <Counter></Counter>
        <CounterReset></CounterReset>
      </CounterParent>
    </>
  );
};

export { Counter, CounterParent, CounterReset, CounterDemo };

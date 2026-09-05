import { createContext, useContext, useReducer } from "react";

const WorkoutContext = createContext();

const initialState = {
  workouts: [],
  loading: false,
  error: ""
};

const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload
      };

    case "ADD_WORKOUT":
      return {
        ...state,
        workouts: [action.payload, ...state.workouts]
      };

    case "REMOVE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        )
      };

    case "UPDATE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id
            ? action.payload
            : workout
        )
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: ""
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    workoutReducer,
    initialState
  );

  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  return useContext(WorkoutContext);
};
import anecService from "../services/anecdotes";

export const NEW_ANECDOTE = "NEW_ANECDOTE";
export const VOTE = "VOTE";
export const INIT_ANECDOTES = "INIT_ANECDOTES";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_ANECDOTE:
      return [...state, action.data];
    case INIT_ANECDOTES:
      return action.data;
    case VOTE:
      const id = action.data.id;
      const anecToChange = state.find((x) => x.id === id);
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      };
      return state.map((anec) => (anec.id !== id ? anec : changedAnec));
    default:
      return state;
  }
};

export const voteOne = (id, content) => async (dispatch) => {
  const voteAnec = await anecService.updateVote(id, content);
  dispatch({ type: VOTE, data: voteAnec });
};

export const createAnecdote = (content) => async (dispatch) => {
  const newNote = await anecService.createNew(content);
  dispatch({ type: NEW_ANECDOTE, data: newNote });
};

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecService.getAll();
  dispatch({ type: INIT_ANECDOTES, data: anecdotes });
};

export default anecdoteReducer;

import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
// import themeReducer from '../features/theme'
// import freelancesReducer from '../features/freelances'
// import freelanceReducer from '../features/freelance'



export default configureStore({
    reducer: {
        // theme: themeReducer,
        // freelances: freelancesReducer,
        // freelance: freelanceReducer,
    },
})




// export function reducer(state = 'light', action: { type: string; payload: any; }) {
//     if (action.type === toggleTheme.toString()) {
//         return state === 'light' ? 'dark' : 'light'
//     }
//     if (action.type === SET_THEME) {
//         return action.payload
//     }
//     return state
// }




export const toggleExercice = createAction('exercie/toggle');
export const toggleSet = createAction('exercie/set');

export const reducerExercice = createReducer('light', (builder) =>
    builder
        .addCase(toggleExercice, (state) => {
            return state === 'light' ? 'dark' : 'light'
        })
        .addCase(toggleSet, (state, action) => {
            return action.payload
        })
)


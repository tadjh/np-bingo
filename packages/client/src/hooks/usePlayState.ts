// import {
//   initialPlayState,
//   PlayActions,
//   PlayState,
//   playReducer,
// } from '../reducers/play.reducer';
// import { useReducer } from 'react';
// import { NODE_ENV } from '../config';
// import logger from 'use-reducer-logger';

// TODO Deprecate
export {};

// export function usePlayState() {
//   const [playState, playDispatch] = useReducer<
//     (state: PlayState, action: PlayActions) => PlayState
//   >(
//     NODE_ENV === 'development' ? logger(playReducer) : playReducer,
//     initialPlayState
//   );

// const initPlay = () => {
//   playDispatch({ type: INIT_GAME });
// };

// /**
//  * Creates a new card and stores it in state
//  */
// const setCard = () => {
//   const [card, serial] = newCard(BINGO);
//   playDispatch({ type: NEW_CARD, payload: { card: card, serial: serial } });
// };

// /**
//  * Resets all crossmarks
//  */
// const clearCrossmarks = () => {
//   playDispatch({ type: CLEAR_CROSSMARKS });
// };

// TODO IS THIS NECESSARY???
// const updateCrossmarks = (crossmark: { [x: string]: boolean }) => {
//   playDispatch({ type: UPDATE_CROSSMARKS, payload: crossmark });
// };

// TODO IS THIS NECESSARY???
/**
 * Toggle current target's crossmark visibility
 * @param event Click event
 */
// const toggleCrossmark = (event: React.MouseEvent) => {
//   return;
// let target = event.target as HTMLDivElement;
// let value = crossmarks[target.id];
// let crossmark = { [target.id]: !value };
// updateCrossmarks(crossmark);
// };

//   return {
//     playState,
//     playDispatch,
//   };
// }

import { ROUTES, ROUTES_NOTES, ROUTES_NOTES_ID } from "./Router.constants";

export const getHomeRoute = () => ROUTES.home;

export const getNotesRoute = () => ROUTES.notes;

export const getNewNoteRoute = () => `${ROUTES.notes}/${ROUTES_NOTES.new}`;

export const getEditNoteRoute = (noteId: string) =>
  `${ROUTES.notes}/${noteId}/${ROUTES_NOTES_ID.edit}`;

export const getViewNoteRoute = (noteId: string) =>
  `${ROUTES.notes}/${noteId}/${ROUTES_NOTES_ID.view}`;

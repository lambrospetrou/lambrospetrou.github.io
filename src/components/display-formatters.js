import { format } from 'date-fns';

export const dateToLongDisplay = date => format(date, "MMMM dd, yyyy");
export const dateToNoteGroup = date => format(date, "yyyy");

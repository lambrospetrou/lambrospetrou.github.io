import { format } from 'date-fns';

export const dateToLongDisplay = date => format(date, "MMMM dd, yyyy | EEEE");

import { IAnswer } from './answer';

/* Defines the question entity */
export interface IQuestion {
    number: Number;
    qyestion: String;
    answer : IAnswer;
    isActive : Boolean;
    isCommentActive : Boolean;
    isCommentSent : Boolean;
    isCommentSentFailed : Boolean;
}

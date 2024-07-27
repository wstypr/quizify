export interface Question {
  _id?: number;
  question: string;
  right_answer: string;
  option_answer_1: string;
  option_answer_2: string;
  option_answer_3: string;
}

export interface ResQuestion {
  data: Question[];
}

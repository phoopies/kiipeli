import { Grade } from './types';

export const grades = [
  '4',
  '4+',
  '5',
  '5+',
  '6A',
  '6A+',
  '6B',
  '6B+',
  '6C',
  '6C+',
  '7A',
  '7A+',
  '7B',
  '7B+',
  '7C',
  '7C+',
  '8A',
  '8A+',
  '8B',
  '8B+',
  '8C',
  '8C+',
  '9A',
];

export const gradeToNumber = (grade: Grade) => {
  return grades.findIndex((g) => grade === g);
};

export const gradeToColor = (grade: Grade) => {
  const colors: {[color: string]: string} = {
    '4': 'green',
    '5': 'orange',
    '6': 'purple',
    '7': 'red',
    '8': 'black',
    '9': 'black'
  }
  const gradeNum = grade[0];
  return colors[gradeNum] || 'grey'
};

import { nudgingMessages } from "../constants/NudgingMessages";

export const getNudgingMessage = (grade) => {
  let messageCategory;
  if (grade >= 90) {
    messageCategory = nudgingMessages.gold;
  } else if (grade >= 80) {
    messageCategory = nudgingMessages.silver;
  } else if (grade >= 65) {
    messageCategory = nudgingMessages.bronze;
  } else {
    messageCategory = nudgingMessages.noMedal;
  }

  return messageCategory[Math.floor(Math.random() * messageCategory.length)];
};

export const getMedal = (grade) => {
  if (grade >= 90) {
    return "/gold.jpg";
  } else if (grade >= 80) {
    return "/silver.jpg";
  } else if (grade >= 65) {
    return "/bronze.jpg";
  } else {
    return null;
  }
};
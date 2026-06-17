
export const getTranslatedContent = (
  currentItem: any,
  t: any
) => {
  const letter = currentItem.letter;

  const isAlphabet = /^[A-Z]$/.test(letter);
  const isNumber = /^\d+$/.test(letter);
  const isColor = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Pink",
    "Purple",
    "Orange",
  ].includes(letter);

  const isSocialWord = [
    "I Love You",
    "Thank You",
    "Hello",
    "Goodbye",
    "Please",
    "Sorry",
    "No",
    "Yes",
    "Deaf",
    "Hearing Person",
  ].includes(letter);

  const isPronoun = [
    "Me/I",
    "My/Mine",
    "You",
    "Your/Yours",
    "He/She/It",
    "His/Her/Its",
    "We",
    "Our/Ours",
    "They",
    "Their/Theirs",
  ].includes(letter);

  const isVerb = [
    "Like",
    "Cut",
    "Drop",
    "Need",
    "Hear",
    "Talk",
    "Eat",
    "Drink",
    "Help",
    "See",
    "Go",
    "Come",
    "Sit",
    "Stand",
    "Wake Up",
    "Sleep",
    "Stop",
    "Clean",
    "Want",
    "Cook",
    "Write",
    "Draw",
    "Read",
    "Cry",
    "Laugh",
    "Walk",
    "Jump",
    "Hug",
  ].includes(letter);

  const isUtility = [
    "Where",
    "Who",
    "Why",
    "How",
    "What",
    "When",
    "Which",
  ].includes(letter);

  const isTime = [
    "Later",
    "Again",
    "Done",
    "More",
    "Now",
  ].includes(letter);

  let category = "";

  if (isAlphabet) category = "alphabet";
  else if (isNumber) category = "numbers";
  else if (isColor) category = "colors";
  else if (isSocialWord) category = "socialWords";
  else if (isPronoun) category = "pronouns";
  else if (isVerb) category = "verbs";
  else if (isUtility) category = "utilityWords";
  else if (isTime) category = "timeData";

  if (!category) {
    return {
      description: currentItem.description,
      tips: currentItem.tips,
    };
  }

  return {
    description: t(`data.${category}.${letter}.description`, {
      defaultValue: currentItem.description,
    }),

    tips: t(`data.${category}.${letter}.tips`, {
      returnObjects: true,
      defaultValue: currentItem.tips,
    }) as string[],
  };
};
export const markHandle = (lessonQuestionsCount : number, lessonRightQuestionsCount : number) => {
    const percentage = (lessonRightQuestionsCount / lessonQuestionsCount) * 100;
    console.log(percentage)
    if (percentage >= 90) {
        return "#1BAD4D";
    } else if (percentage >= 70) {
        return "#FFB82E";
    } return "#F05353";
}
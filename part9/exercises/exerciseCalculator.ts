interface ExerciseInput {
    dailyExercises: number[]
    target: number
}

export const parseExerciseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    if (isNaN(target)) {
        throw new Error('Provided value was not a number!');
    }

    const dailyExercises: number[] = args.slice(3).map((arg) => {
        const exerciseHours = Number(arg);
        if (isNaN(exerciseHours)) {
            throw new Error('Provided value was not a number!');
        }
        return exerciseHours;
    });

    return {
        dailyExercises,
        target,
    };
};

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}


const calculateExercises = (dailyExercises: number[], target: number): Result => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter((day) => day > 0).length;
    const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job! You met your target.';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not bad, but you can do better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to work harder to meet your target.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const { dailyExercises, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
} catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    } else {
        errorMessage += 'Something bad happened.';
    }
    console.log(errorMessage);
}

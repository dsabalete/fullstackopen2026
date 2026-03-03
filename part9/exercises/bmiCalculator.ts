interface BmiValues {
    height: number;
    weight: number;
}

const parseArgument = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)

    if (bmi < 18.5) {
        return 'Underweight (you should eat more)'
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)'
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight (you should exercise more)'
    } else {
        return 'Obese (you should see a doctor)'
    }
}

//console.log(calculateBmi(180, 74))

try {
    const { height, weight } = parseArgument(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
}
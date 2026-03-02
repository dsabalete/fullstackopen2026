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

console.log(calculateBmi(180, 74))
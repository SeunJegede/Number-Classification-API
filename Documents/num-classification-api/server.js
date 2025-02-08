const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function isPerfectSquare(n) {
    return Number.isInteger(Math.sqrt(n));
}

function isFibonacci(n) {
    let x1 = 5 * n * n + 4;
    let x2 = 5 * n * n - 4;
    return isPerfectSquare(x1) || isPerfectSquare(x2);
}

function numberProperties(n){
    let sum = 0;
    let type = ""
    let armstrong = ""
    let numberString = n.toString()
    let numberOfDigits = numberString.length;

    for(let i =0; i<numberOfDigits; i++){
        sum += Math.pow(Number(numberString[i]), numberOfDigits )
    }

    if(n%2 !== 0){
        type = "odd"
    } else{
        type = "even"
    }

    if(sum === n){
        armstrong = "armstrong"
    } else{
        armstrong = " "
    }

    return [type, armstrong]
}

function digitSum(n){
    let sum = 0;
    let numberString = n.toString()
    let numberOfDigits = numberString.length;

    for(let i =0; i<numberOfDigits; i++){
        sum += Number(numberString[i])
    }

    return sum;
}


async function getFunFact(number) {
    try {
        const response = await axios.get(`http://numbersapi.com/${number}/math`);
        return response.data;
    } catch (error) {
        return "No fun fact available.";
    }
}

app.get("/classify/:number/math", async (req, res) => {
    let number = parseInt(req.params.number);
    
    if (isNaN(number)) {
        return res.status(400).json({ number: "alphabet", error: "true" });
    }

    let funFact = await getFunFact(number);

    res.json({
        number: number,
            is_prime: isPrime(number),
            is_perfect: isPerfectSquare(number),
            is_properties: numberProperties(number),
            digit_sum: digitSum(number),
            fun_fact: funFact
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
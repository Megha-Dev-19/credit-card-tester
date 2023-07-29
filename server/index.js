const express = require("express");
const cors = require("cors");
const app = express();

function validateCreditCard(creditCardNumber) {
  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = creditCardNumber.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(creditCardNumber.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return checksum % 10 == 0;
}

// Use the CORS middleware
app.use(cors());

app.use(express.json());

app.post("/validateCreditCard", (req, res) => {
  const { creditCardNumber } = req.body?.data;
  const isValid = validateCreditCard(creditCardNumber);
  if (isValid) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

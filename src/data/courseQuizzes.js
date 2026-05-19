// src/data/courseQuizzes.js

export const courseQuizzes = {
  // 1 — O/L Mathematics Complete Guide
  1: [
    { question: "What is the value of 7 × 8?", options: ["54", "56", "64", "48"], correctIndex: 1 },
    { question: "If x + 5 = 12, what is x?", options: ["5", "7", "17", "-7"], correctIndex: 1 },
    { question: "A triangle has angles 50° and 60°. What is the third angle?", options: ["70°", "80°", "90°", "100°"], correctIndex: 0 },
    { question: "What is the mean of the numbers 2, 5, 7?", options: ["4", "5", "6", "14"], correctIndex: 1 },
    { question: "Which operation is the inverse of multiplication?", options: ["Addition", "Division", "Subtraction", "Exponent"], correctIndex: 1 },
    { question: "If 20% of a number is 40, the number is?", options: ["80", "200", "160", "20"], correctIndex: 2 },
  ],

  // 2 — A/L Combined Mathematics
  2: [
    { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2"], correctIndex: 1 },
    { question: "The integral of 2x dx is?", options: ["x^2 + C", "2x + C", "x + C", "x^2/2 + C"], correctIndex: 0 },
    { question: "If vectors a and b are perpendicular, their dot product is?", options: ["1", "0", "-1", "Undefined"], correctIndex: 1 },
    { question: "Matrix [[1,2],[3,4]] determinant equals?", options: ["-2", "-5", "-1", "2"], correctIndex: 1 },
    { question: "Series Σ (1/n) diverges or converges?", options: ["Converges", "Diverges", "Oscillates", "Converges conditionally"], correctIndex: 1 },
    { question: "Solve for x: 2x + 3 = 7", options: ["1", "2", "3", "4"], correctIndex: 1 },
  ],

  // 3 — Python Programming for Beginners
  3: [
    { question: "Which symbol starts a comment in Python?", options: ["//", "#", "/*", "--"], correctIndex: 1 },
    { question: "What is the correct file extension for Python files?", options: [".py", ".java", ".js", ".pt"], correctIndex: 0 },
    { question: "Which data type is ordered and changeable in Python?", options: ["Tuple", "List", "Set", "FrozenSet"], correctIndex: 1 },
    { question: "How do you define a function in Python?", options: ["function myFunc():", "def myFunc():", "fn myFunc()", "func myFunc()"], correctIndex: 1 },
    { question: "To install a package, which command is typically used?", options: ["pip install package", "npm install package", "apt-get install package", "yarn add package"], correctIndex: 0 },
    { question: "What is output of print(2 * 3 + 1)?", options: ["7", "9", "8", "None"], correctIndex: 0 },
  ],

  // 4 — Tamil Language for Professionals
  4: [
    { question: "Which script is used to write Tamil?", options: ["Latin", "Devanagari", "Tamil script", "Sinhala"], correctIndex: 2 },
    { question: "A formal greeting in Tamil for the morning is?", options: ["Vanakkam", "Kumusta", "Ayubowan", "Selamat"], correctIndex: 0 },
    { question: "Which is a polite form of address in Tamil?", options: ["-கா (-kaa)", "-ண்டு (-ndu)", "-சார் (-saar)", "-ஷ் (-sh)"], correctIndex: 2 },
    { question: "Which word means 'thank you' in Tamil?", options: ["Nandri", "ස්තුතියි", "Gracias", "謝謝"], correctIndex: 0 },
    { question: "What is the typical word order in Tamil sentences?", options: ["SVO", "SOV", "VSO", "OSV"], correctIndex: 1 },
    { question: "Which is a common formal closing for letters in Tamil?", options: ["Yours faithfully", "Ninakkum nanri", "Regards", "Cheers"], correctIndex: 1 },
  ],

  // 5 — Modern Paddy Farming Techniques
  5: [
    { question: "Which practice improves soil fertility naturally?", options: ["Composting", "Burning stubble", "Overwatering", "Salting"], correctIndex: 0 },
    { question: "Drip irrigation mainly conserves what?", options: ["Fertilizer", "Water", "Seeds", "Labor"], correctIndex: 1 },
    { question: "Which nutrient is crucial for leaf growth?", options: ["Potassium", "Phosphorus", "Nitrogen", "Calcium"], correctIndex: 2 },
    { question: "Crop rotation helps to?", options: ["Increase pests", "Reduce yield", "Improve soil health", "Raise salinity"], correctIndex: 2 },
    { question: "Best time to test soil is before?", options: ["Harvest", "Planting", "Rainy season", "Weeding"], correctIndex: 1 },
    { question: "Which method reduces post-harvest losses?", options: ["Proper drying", "Immediate sale", "Open storage", "Burning"], correctIndex: 0 },
  ],

  // 6 — Electrical Wiring & Installation
  6: [
    { question: "What colour is commonly used for live conductor in single-phase wiring?", options: ["Blue", "Brown", "Green", "Black"], correctIndex: 1 },
    { question: "A Residual Current Device (RCD) protects against?", options: ["Overheating", "Electric shock", "Noise", "Short circuits only"], correctIndex: 1 },
    { question: "What is the unit of electrical resistance?", options: ["Volts", "Amps", "Ohms", "Watts"], correctIndex: 2 },
    { question: "Fuse protects a circuit by?", options: ["Regulating voltage", "Breaking the circuit on overload", "Measuring current", "Improving power factor"], correctIndex: 1 },
    { question: "Earthing/grounding is used to?", options: ["Store energy", "Prevent corrosion", "Provide safety path for fault current", "Increase voltage"], correctIndex: 2 },
    { question: "Which tool is used to measure AC voltage?", options: ["Multimeter", "Hammer", "Pliers", "Screwdriver"], correctIndex: 0 },
  ],

  // 7 — Small Business Accounting
  7: [
    { question: "Double-entry bookkeeping records each transaction as?", options: ["One entry", "Two entries", "No entry", "Three entries"], correctIndex: 1 },
    { question: "What does VAT stand for?", options: ["Value Added Tax", "Variable Accounting Total", "Verified Asset Tax", "Value Assessment Table"], correctIndex: 0 },
    { question: "Which statement shows financial position at a date?", options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Trial Balance"], correctIndex: 2 },
    { question: "Revenue less expenses equals?", options: ["Assets", "Profit", "Liabilities", "Equity"], correctIndex: 1 },
    { question: "A ledger contains?", options: ["Summarised accounts", "Invoices only", "Payroll data only", "Bank statements only"], correctIndex: 0 },
    { question: "Depreciation is used to?", options: ["Increase asset value", "Spread cost over useful life", "Record sales", "Calculate tax credits"], correctIndex: 1 },
  ],

  // 8 — English Communication Skills
  8: [
    { question: "Choose the correct past tense of 'go'", options: ["goed", "went", "gone", "going"], correctIndex: 1 },
    { question: "Which word is a conjunction?", options: ["Quickly", "Because", "Blue", "Happiness"], correctIndex: 1 },
    { question: "Select the sentence with correct punctuation:", options: ["Its raining", "It's raining.", "Its' raining.", "Its, raining."], correctIndex: 1 },
    { question: "Which is a formal greeting for email?", options: ["Hey!", "Dear Sir/Madam", "Yo", "What's up"], correctIndex: 1 },
    { question: "Active voice example:", options: ["The letter was written by her.", "She wrote the letter.", "The letter is being written.", "By her the letter was written."], correctIndex: 1 },
    { question: "Which is an effective closing for a professional email?", options: ["Cheers", "Regards", "Later", "Bye"], correctIndex: 1 },
  ],
};
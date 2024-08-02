const questions = [
  {
    question: `1. Choose correct answer
    \`\`\`
    \`async...await\` is...
    \`\`\``,
    answers: [
      "a. syntactic sugar built on native JavaScript promises and generators.",
      "b. a method to delay the execution of code by a specified amount of time.",
      "c. a feature that allows you to handle synchronous code more efficiently.",
      "d. a tool for parallel processing of tasks.",
    ],
    correct: 0,
    explanation: `The async...await syntax is used to work with promises more comfortably. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.`,
  },
  {
    question: `
2. What is the output?
\`\`\`js
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = !true;

      if (success) {
        resolve({ data: "Get data successful!" });
      } else {
        reject("Failed to fetch data!");
      }
    }, 2000);
  });
}

fetchData().then(
  (response) => console.log(response),
  (error) => console.log(error)
);
\`\`\`
`,
    answers: [
      "a. Get data successful!",
      "b. Failed to fetch!",
      "c. Syntax Error",
      "d. UnhandledPromiseRejection",
    ],
    correct: 1,
    explanation: `Besides using \`.catch\` to handle errors, \`.then()\` also helps us handle rejects from Promises with the following syntax\n\n
    \`.then(onResolve() => {}, onReject() => {})\``,
  },
  {
    question: `
3. What is the output?
\`\`\`js
async function f() {
  let result = "first!";
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  result = await promise;

  console.log(result);
}

f();
\`\`\`
`,
    answers: [
      "a. first!",
      "b. done!",
      "c. Syntax Error",
      "d. UnhandledPromiseRejection",
    ],
    correct: 1,
    explanation: `The function \`f()\` initializes the variable result with the value "first!", then creates a Promise that resolves with "done!" after 1 second.\n\nUsing \`await\` stops execution of the function until the Promise completes. When the Promise resolves, the value "done!" is assigned to result, and then \`console.log(result)\` prints "done!"`,
  },
  {
    question: `
4. What is the output?
\`\`\`js
const myPromise = Promise.resolve("Woah some cool data");

(async () => {
  try {
    console.log(await myPromise);
  } catch {
    throw new Error(\`Oops didn't work\`);
  } finally {
    console.log("Oh finally!");
  }
})();
\`\`\`
`,
    answers: [
      "a. Woah some cool data On finally!",
      "b. Oops didn't work On finally!!",
      "c. Oh finally",
      "d. On finally! Oops didn't work",
    ],
    correct: 0,
    explanation: `The output is 'Woah some cool data Oh finally!'. The \`await myPromise\` resolves immediately with 'Woah some cool data' which is logged to the console.\n\nThe \`finally\` block executes regardless of whether the \`try\` block succeeds or fails, logging 'Oh finally!'. Therefore, 'Woah some cool data' and 'Oh finally!' are logged in sequence.`,
  },
  {
    question: `
5. What will be the output of the following code?
\`\`\`js
async function a() {
  try {
    await b();
  } catch (error) {
    console.log('Error:', error);
  }
}

async function b() {
  throw new Error('Something went wrong');
}

a().then(() => console.log('Done'));
\`\`\`
`,
    answers: [
      "a. Error: Something went wrong Done",
      "b. Error: Something went wrong",
      "c. Done Error: Something went wrong",
      "d. Done",
    ],
    correct: 0,
    explanation: `The function \`a()\` calls \`b()\`, which throws an error. The error is caught in the \`catch\` block, and 'Error: Something went wrong' is logged. After the error is handled, 'Done' is logged from the \`then\` block of the Promise returned by \`a()\`.`,
  },
  {
    question: `
6. How does the following code behave in terms of Promise execution order?
\`\`\`js
async function first() {
  console.log('First');
}

async function second() {
  console.log('Second');
}

async function main() {
  first();
  second();
  console.log('Main');
}

main();
\`\`\`
`,
    answers: [
      "a. First Second Main",
      "b. Second First Main",
      "c. Main First Second",
      "d. First Main Second",
    ],
    correct: 0,
    explanation: `The functions \`first()\`, \`second()\`, and \`console.log('Main')\` are executed in sequence, and because \`async\` functions are always executed after the current stack frame completes, 'First', 'Second', and 'Main' are logged in the order they are called.`,
  },
  {
    question: `
7. What is the output?
\`\`\`js
async function f() {
  console.log('start');
  await new Promise(resolve => {
    console.log('await');
    resolve();
  });
  console.log('end');
}

f();
console.log('outside');
\`\`\`
`,
    answers: [
      "a. start await end outside",
      "b. start await outside end",
      "c. await start outside end",
      "d. start outside await end",
    ],
    correct: 1,
    explanation: `The 'start' is logged first, then 'await' is logged before the Promise resolves. The \`await\` keyword causes the remaining code in the function to be scheduled as a microtask. After the current synchronous code (including 'outside') completes, 'end' is logged.`,
  },
  {
    question: `
8. How does the following code demonstrate the behavior of Promise chaining?
\`\`\`js
function chain() {
  return new Promise((resolve, reject) => {
    resolve('Initial');
  })
  .then(result => {
    console.log(result);
    return 'Next';
  })
  .then(result => {
    console.log(result);
  });
}

chain();
\`\`\`
`,
    answers: ["a. Initial Next", "b. Next Initial", "c. Initial", "d. Next"],
    correct: 0,
    explanation: `In Promise chaining, the \`.then\` blocks are executed in sequence. The first \`.then\` logs 'Initial' and returns 'Next'. The second \`.then\` receives 'Next' and logs it. Therefore, 'Initial' and 'Next' are logged in that order.`,
  },
  {
    question: `
9. What is the output?
\`\`\`js
async function overlap() {
  const result = await Promise.race([
    new Promise(resolve => setTimeout(() => resolve('First'), 100)),
    new Promise(resolve => setTimeout(() => resolve('Second'), 200))
  ]);
  console.log(result);
}

overlap();
overlap();
\`\`\`
`,
    answers: [
      "a. First First",
      "b. Second Second",
      "c. First Second",
      "d. Second First",
    ],
    correct: 0,
    explanation: `In \`Promise.race\`, the promise that resolves or rejects first determines the outcome. Here, 'First' will resolve before 'Second', so 'First' is logged twice as both invocations of \`overlap\` will get 'First' as the result.`,
  },
  {
    question: `
10. What is the output?
\`\`\`js
async function foo() {
  throw new Error('Error in foo');
}

async function bar() {
  try {
    await foo();
  } catch (e) {
    console.log('Caught:', e.message);
    throw new Error('Error in bar');
  }
}

bar().catch(e => console.log('Caught in catch:', e.message));
\`\`\`
`,
    answers: [
      "a. Caught: Error in foo Caught in catch: Error in bar",
      "b. Caught: Error in foo",
      "c. Caught in catch: Error in bar",
      "d. Caught in catch: Error in foo",
    ],
    correct: 0,
    explanation: `The function \`bar()\` calls \`foo()\`, which throws an error. This error is caught in the \`catch\` block of \`bar()\`, and 'Caught: Error in foo' is logged. \`bar()\` then throws another error, which is caught by the \`.catch\` block on the Promise returned by \`bar()\`, logging 'Caught in catch: Error in bar'.`,
  },
  {
    question: `
11. . What is the output?
\`\`\`js
async function mixedPromises() {
  const p1 = Promise.resolve('Resolved 1');
  const p2 = new Promise((_, reject) => setTimeout(() => reject('Rejected 2'), 100));
  const p3 = Promise.resolve('Resolved 3');

  try {
    const results = await Promise.all([p1, p2, p3]);
    console.log(results);
  } catch (e) {
    console.log('Error:', e);
  }
}

mixedPromises();
\`\`\`
`,
    answers: [
      "a. [ 'Resolved 1', 'Rejected 2', 'Resolved 3' ]",
      "b. [ 'Resolved 1', 'Resolved 3' ]",
      "c. Error: Rejected 2",
      "d. Error: Promise.all() failed",
    ],
    correct: 2,
    explanation: `In \`Promise.all\`, if any of the Promises are rejected, the whole operation is rejected with the error from the first rejected Promise. Here, \`p2\` is rejected, so the \`catch\` block is executed, logging 'Error: Rejected 2'. The successful results from \`p1\` and \`p3\` are not logged because the operation is short-circuited by the rejection.`,
  },
  {
    question: `
12. What is the output?
\`\`\`js
const myPromise = Promise.resolve(Promise.resolve("Promise!"));
  
function funcOne() {
  myPromise.then((res) => res).then((res) => console.log(res));
  setTimeout(() => console.log("Timeout 1!"), 0);
  console.log("Last line 1!");
}
  
async function funcTwo() {
  const res = await myPromise;
  console.log(await res);
  setTimeout(() => console.log("Timeout 2!"), 0);
  console.log("Last line 2!");
}
  
funcOne();
funcTwo();
\`\`\`
`,
    answers: [
      "a. Promise! Promise! Last line 2! Last line 1! Timeout 1! Timeout 2!",
      "b. Last line 1! Promise! Promise! Last line 2! Timeout 1! Timeout 2!",
      "c. Promise! Last line 1! Last line 2! Promise! Timeout 1! Timeout 2!",
      "d. Last line 1! Timeout 1! Promise! Last line 2! Timeout 2! Promise!",
    ],
    correct: 1,
    explanation: `First, we invoke funcOne. On the first line of funcOne, we call the myPromise promise, which is an asynchronous operation. While the engine is busy completing the promise, it keeps on running the function funcOne. The next line is the asynchronous setTimeout function, from which the callback is sent to the Web API.\n\nBoth the promise and the timeout are asynchronous operations, the function keeps on running while it's busy completing the promise and handling the setTimeout callback. This means that Last line! gets logged first, since this is not an asynchonous operation. This is the last line of funcOne, the promise resolved, and Promise! gets logged. However, since we're invoking funcTwo(), the call stack isn't empty, and the callback of the setTimeout function cannot get added to the callstack yet.\n\nIn funcTwo we're, first awaiting the myPromise promise. With the await keyword, we pause the execution of the function until the promise has resolved (or rejected). Then, we log the awaited value of res (since the promise itself returns a promise). This logs Promise!.\n\nThe next line is the asynchronous setTimeout function, from which the callback is sent to the Web API.\n\nWe get to the last line of funcTwo, which logs Last line! to the console. Now, since funcTwo popped off the call stack, the call stack is empty. The callbacks waiting in the queue (() => console.log("Timeout!") from funcOne, and () => console.log("Timeout!") from funcTwo) get added to the call stack one by one. The first callback logs Timeout!, and gets popped off the stack. Then, the second callback logs Timeout!, and gets popped off the stack. This logs Last line! Promise! Promise! Last line! Timeout! Timeout!`,
  },
];

/**
 * question: ""
 * answers: [],
 * correct: index
 * explaination: ""
 */
let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const questionElement = document.getElementById("question");
  const answersElements = document.getElementsByClassName("answer");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.innerHTML = marked.parse(currentQuestion.question);
  for (let i = 0; i < answersElements.length; i++) {
    answersElements[i].textContent = currentQuestion.answers[i];
    answersElements[i].style.backgroundColor = "#e0e0e0";
    answersElements[i].disabled = false;
  }
  document.getElementById("explanation-container").style.display = "none";
  document.getElementById("continue-btn").style.display = "none";
  document.getElementById("quiz-container").classList.remove("expanded");
}

function selectAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];
  const answersElements = document.getElementsByClassName("answer");

  for (let i = 0; i < answersElements.length; i++) {
    answersElements[i].disabled = true;
  }

  if (index === currentQuestion.correct) {
    answersElements[index].style.backgroundColor = "#4caf50";
    score++;
  } else {
    answersElements[index].style.backgroundColor = "#f44336";
    answersElements[currentQuestion.correct].style.backgroundColor = "#4caf50";
  }

  document.getElementById("explanation").innerHTML = marked.parse(
    currentQuestion.explanation
  );
  document.getElementById("explanation-container").style.display = "block";
  document.getElementById("continue-btn").style.display = "block";
  document.getElementById("quiz-container").classList.add("expanded");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  const totalQuestions = questions.length;
  resultElement.innerHTML = `
        <h2>Finish the test</h2>
        <p>Correct ${score}/${totalQuestions}</p>
    `;
  resultElement.style.display = "block";
  document.getElementById("question").style.display = "none";
  document.getElementById("answers-container").style.display = "none";
  document.getElementById("continue-btn").style.display = "none";
  document.getElementById("explanation-container").style.display = "none";
  document.getElementById("quiz-container").classList.remove("expanded");
}

function startNewTest() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

document.addEventListener("DOMContentLoaded", showQuestion);

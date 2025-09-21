"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  RadioGroup,
  Progress,
} from "@chakra-ui/react";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
    answer: "Bill Gates",
  },
];

function QuizApp() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (selected === questions[currentQ].answer) {
      setScore(score + 1);
    }
    setSelected("");
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected("");
    setScore(0);
    setTimeLeft(10);
    setShowResult(false);
  };

  return (
    <Box
      p={6}
      maxW="lg"
      mx="auto"
      mt={10}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
      bg="white"
    >
      {!showResult ? (
        <VStack spacing={6} align="stretch">
          <Heading size="md">
            Question {currentQ + 1} of {questions.length}
          </Heading>
          {/* <Progress value={(timeLeft / 10) * 100} colorScheme="teal" /> */}

          <Text fontWeight="bold" color={timeLeft <= 3 ? "red.500" : "black"}>
            Time left: {timeLeft}s
          </Text>

          <Text fontSize="lg">{questions[currentQ].question}</Text>

          {/* <RadioGroup value={selected} onChange={setSelected}>
            <VStack align="stretch">
              {questions[currentQ].options.map((opt, i) => (
                <RadioGroup.Item key={i} value={opt} colorScheme="teal">
                  {opt}
                </RadioGroup.Item>
              ))}
            </VStack>
          </RadioGroup> */}

          <Button
            colorScheme="blue"
            onClick={handleNext}
            isDisabled={!selected && timeLeft > 0}
          >
            {currentQ + 1 === questions.length ? "Finish" : "Next"}
          </Button>
        </VStack>
      ) : (
        <VStack spacing={6}>
          <Heading size="lg">Quiz Completed 🎉</Heading>
          <Text fontSize="xl">
            Your Score: {score} / {questions.length}
          </Text>
          <Button colorScheme="green" onClick={handleRestart}>
            Restart Quiz
          </Button>
        </VStack>
      )}
    </Box>
  );
}

const App = () => {
  return (
    <div>
      <QuizApp />
    </div>
  );
};
export default App;

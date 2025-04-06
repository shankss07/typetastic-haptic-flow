
// Set of practice texts
export const practiceParagraphs = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once, making it a perfect typing exercise for beginners and experts alike.",
  
  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer languages, such as JavaScript, Python, and C++.",
  
  "Typing practice is essential for building muscle memory and improving your speed and accuracy. Regular practice can lead to significant improvements in your typing skills over time.",
  
  "The Internet is a global network of computers connected to each other which communicate through a standardized set of protocols. It has revolutionized the way we share information and communicate with one another.",
  
  "Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.",
  
  "Cloud computing is the delivery of different services through the Internet, including data storage, servers, databases, networking, and software. Cloud-based storage makes it possible to save files to a remote database instead of keeping them on a proprietary hard drive or local storage device.",
  
  "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.",
  
  "Virtual reality is a simulated experience that can be similar to or completely different from the real world. Applications of virtual reality can include entertainment and educational purposes."
];

// Function to get a random paragraph
export const getRandomParagraph = (): string => {
  const randomIndex = Math.floor(Math.random() * practiceParagraphs.length);
  return practiceParagraphs[randomIndex];
};

// Calculate typing statistics
export const calculateStats = (
  originalText: string, 
  userInput: string, 
  timeInSeconds: number
) => {
  // Word count (standard definition: 5 characters = 1 word)
  const wordsTyped = originalText.length / 5;
  
  // Words per minute
  const minutes = timeInSeconds / 60;
  const wpm = wordsTyped / minutes;
  
  // Accuracy
  let correctChars = 0;
  const inputLength = Math.min(userInput.length, originalText.length);
  
  for (let i = 0; i < inputLength; i++) {
    if (userInput[i] === originalText[i]) {
      correctChars++;
    }
  }
  
  const accuracy = (correctChars / originalText.length) * 100;
  
  return {
    wpm,
    accuracy,
    time: timeInSeconds,
    wordsTyped: Math.round(wordsTyped)
  };
};

// Sound effects
export const playKeySound = () => {
  const audio = new Audio();
  audio.src = '/keypress.mp3'; // This file needs to be added to the public folder
  audio.volume = 0.2;
  audio.play().catch(err => {
    // Silently fail if user hasn't interacted with the page yet
    console.log("Audio couldn't play. User might need to interact with the page first.");
  });
};

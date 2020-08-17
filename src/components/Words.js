var words = [
    "procrastination",
    "normalization",
    "encapsulation",
    "resilience",
    "manufacturer",
    "pandemic",
    "investigation",
    "elephant",
    "science",
    "interactivity", 
]

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

export { randomWord }
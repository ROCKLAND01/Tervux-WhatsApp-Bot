export const joke = async (sock, m, args) => {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Parallel lines have so much in common. It’s a shame they’ll never meet.",
        "I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
        "Why did the math book look so sad? Because it had too many problems.",
        "What do you call a fake noodle? An impasta!",
        "Why don't some couples go to the gym? Because some relationships don't work out.",
        "I used to play piano by ear, but now I use my hands.",
        "I'm on a seafood diet. I see food and I eat it.",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What's orange and sounds like a parrot? A carrot!"
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return `😂 *JOKE OF THE DAY* 😂\n\n${randomJoke}`;
};

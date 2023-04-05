import readline from "readline";

class ReadlineSingleton {
  constructor() {
    if (!ReadlineSingleton.instance) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      ReadlineSingleton.instance = this;
    }

    return ReadlineSingleton.instance;
  }

  question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, resolve);
    });
  }

  close() {
    this.rl.close();
  }
}

const rlInstance = new ReadlineSingleton();
Object.freeze(rlInstance);

export default rlInstance;

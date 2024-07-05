class Model {
  constructor() {
    this.model = this.buildModel();
  }

  buildModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [13], units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 4, activation: 'linear' }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
  }

  predict(state) {
    return tf.tidy(() => {
      const input = tf.tensor2d([state]);
      const outputs = this.model.predict(input);
      const index = outputs.argMax(1).dataSync()[0];
      const directions = ["UP", "RIGHT", "DOWN", "LEFT"];
      const action = directions[index];
      return action;
    });
  }
}

const model = new Model();
// STATE = [DANGER LEFT, DANGER FORWARD, DANGER RIGHT, SNAKE UP, SNAKE RIGHT, SNAKE DOWN, SNAKE LEFT, SNAKE POSITION, FOOD UP, FOOD RIGHT, FOOD DOWN, FOOD LEFT, FOOD POSITION, FOOD DISTANCE]
const state = [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, [1, 2], 6];
console.log(model.predict(state));

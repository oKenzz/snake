class Agent {
  // TODO: setup
  constuctor() {
    this.model = new Model();
    // TODO: other attributes
  }

  remember(state, action, reward, nextState, done) {
    // TODO:
  }

  getAction() {
    // TODO:
    const action = this.model.predict();
    return action;
  }

  train() {
    // ???
  }
}

class FormValidator {
  formName = "";
  value = "";

  error = "";

  constructor(formName, updateState, e) {
    this.formName = formName;
    this.updateState = updateState;
    this.updateState = this.updateState.bind(this);
    if (e) {
      e.forEach((x) => {
        this.add(x);
      });
    }
  }

  validators = [];

  add(e) {
    this.validators.push(e);
    return this;
  }

  onKeyPress(e) {
    this.value = e.target.value;

    for (let i = 0; i < this.validators.length; i++) {
      const result = this.validators[i](e.target.value);
      console.log(result);
      if (result) {
        this.error = result;
        console.log(this.updateState);
        this.updateState(this.formName, this);
        break;
      }
    }

    return this.error || "";
  }
}

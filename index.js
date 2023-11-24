const calculatorNumberButtons = [
  {
    id: "one",
    width: 105,
    text: "1",
  },
  {
    id: "two",
    width: 105,
    text: "2",
  },
  {
    id: "three",
    width: 105,
    text: "3",
  },
  {
    id: "four",
    width: 105,
    text: "4",
  },
  {
    id: "five",
    width: 105,
    text: "5",
  },
  {
    id: "six",
    width: 105,
    text: "6",
  },
  {
    id: "seven",
    width: 105,
    text: "7",
  },
  {
    id: "eight",
    width: 105,
    text: "8",
  },
  {
    id: "nine",
    width: 105,
    text: "9",
  },
  {
    id: "zero",
    width: 220,
    text: "0",
  },
  {
    id: "decimal",
    width: 105,
    text: ".",
  },
];

const Numbers = ({ getNumberInput, item: { id, text, width } }) => {
  return (
    <button
      id={id}
      className="click-input pad btn"
      style={{ width: `${width}px` }}
      onClick={() => getNumberInput(text)}
    >
      <strong>{text}</strong>
    </button>
  );
};

const Numpad = ({ getNumberInput }) => {
  return calculatorNumberButtons.map((item) => (
    <Numbers getNumberInput={getNumberInput} item={item} />
  ));
};

const Operators = ({ getOperatorInput }) => {
  return (
    <div>
      <button
        id="add"
        className="click-operator pad btn"
        onClick={() => getOperatorInput("+")}
      >
        <strong>+</strong>
      </button>
      <button
        id="subtract"
        className="click-operator pad btn"
        onClick={() => getOperatorInput("-")}
      >
        <strong>-</strong>
      </button>
      <button
        id="multiply"
        className="click-operator pad btn"
        onClick={() => getOperatorInput("*")}
      >
        <strong>*</strong>
      </button>
      <button
        id="divide"
        className="click-operator pad btn"
        onClick={() => getOperatorInput("/")}
      >
        <strong>/</strong>
      </button>
    </div>
  );
};

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 1,
      part1: "",
      part2: "",
      decimal1: false,
      decimal2: false,
      part1Sign: "",
      part2Sign: "",
      operator: "",
      operator1: "",
      operator2: "",
      resultSign: "",
      result: "0",
      display: "0",
    };
    this.handleClear = this.handleClear.bind(this);

    this.getNumberInput = this.getNumberInput.bind(this);
    this.handlePart1 = this.handlePart1.bind(this);
    this.handlePart2 = this.handlePart2.bind(this);
    this.handlePart1New = this.handlePart1New.bind(this);

    this.getOperatorInput = this.getOperatorInput.bind(this);
    this.handleSign1 = this.handleSign1.bind(this);
    this.handleOperator = this.handleOperator.bind(this);

    this.applyEquals = this.applyEquals.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  //Clear Button
  handleClear() {
    this.setState((state) => ({
      phase: 1,
      part1: "",
      part2: "",
      decimal1: false,
      decimal2: false,
      part1Sign: "",
      part2Sign: "",
      operator: "",
      operator1: "",
      operator2: "",
      resultSign: "",
      result: "0",
      display: "0",
    }));
  }

  //number Input
  getNumberInput(text) {
    switch (this.state.phase) {
      case 1:
        if (this.state.part1.length < 10) {
          this.handlePart1(text);
        }
        break;
      case 2:
        if (this.state.part1.length < 10) {
          this.handlePart1(text);
        }
        break;
      case 3:
        if (this.state.part2.length < 10) {
          this.handlePart2(text);
        }
        break;
      case 4:
        if (this.state.part2.length < 10) {
          this.handlePart2(text);
        }
        break;
      case 5:
        this.handlePart1New(text);
        break;
      default:
        break;
    }
  }

  handlePart1(text) {
    let text1 = this.state.part1;
    let deci1 = this.state.decimal1;
    if (text === ".") {
      if (this.state.part1 === "") {
        text = "0.";
      }
      if (this.state.decimal1) {
        text = "";
      }
      deci1 = true;
    }
    if (text != "0" && text != "." && text1 === "0") {
      text1 = "";
    }
    if (text === "0" && text1 === "0") {
      text = "";
    }
    text1 = text1 + text;

    this.setState((state) => ({
      part1: text1,
      phase: 2,
      decimal1: deci1,
      display: this.state.part1Sign + text1,
    }));
  }

  handlePart2(text) {
    let text2 = this.state.part2;
    let deci2 = this.state.decimal2;
    if (text === ".") {
      if (this.state.part2 === "" || this.state.part2 === "0") {
        text = "0.";
      }
      if (this.state.decimal2) {
        text = "";
      }
      deci2 = true;
    }
    if (text != "0" && this.state.part2 === "0") {
      text2 = "";
    }
    if (text === "0" && this.state.part2 === "0") {
      text = "";
    }
    text2 = text2 + text;

    this.setState((state) => ({
      part2: text2,
      phase: 4,
      decimal2: deci2,
      display: this.state.part2Sign + text2,
    }));
  }

  handlePart1New(text) {
    let text1 = text;
    let deci1 = false;
    if (text === ".") {
      text1 = "0.";
      deci1 = true;
    }

    this.setState((state) => ({
      phase: 2,
      part1: text1,
      part2: "",
      decimal1: deci1,
      decimal2: false,
      part1Sign: "",
      part2Sign: "",
      operator: "",
      operator1: "",
      operator2: "",
      resultSign: "",
      result: "0",
      display: text1,
    }));
  }

  // operator Input
  getOperatorInput(op) {
    if (this.state.phase == 1 && op == "-") {
      this.handleSign1();
    }
    if (this.state.phase == 2 || this.state.phase == 3) {
      this.handleOperator(op);
    }
    if (this.state.phase == 4) {
      let tempResult = 0;
      let tempSign = "";
      tempResult = this.calculateResult();
      if (tempResult < 0) {
        tempResult = -tempResult;
        tempSign = "-";
      }
      tempResult = tempResult.toString();
      this.setState((state) => ({
        part1: tempResult,
        part1Sign: tempSign,
        part2: "",
        part2Sign: "",
        operator: op,
        operator1: op,
        operator2: "",
        phase: 3,
        display: op,
      }));
    }
    if (this.state.phase === 5) {
      let x = this.state.result;
      let y = this.state.resultSign;
      let z = false;
      for (let i = 0; i < x.length; i++) {
        if (x[i] === ".") {
          z = true;
        }
      }

      this.setState((state) => ({
        phase: 3,
        part1: x,
        part2: "",
        decimal1: z,
        decimal2: false,
        part1Sign: y,
        part2Sign: "",
        operator: op,
        operator1: op,
        operator2: "",
        resultSign: "",
        result: "0",
        display: op,
      }));
    }
  }

  handleSign1() {
    this.setState((state) => ({
      part1Sign: "-",
      display: "-",
    }));
  }

  handleOperator(op) {
    let o1 = this.state.operator1;
    let o2 = this.state.operator2;
    if (o1 === "") {
      o1 = op;
      o2 = "";
    } else {
      o2 = o1;
      o1 = op;
    }

    if (o2 === "") {
      this.setState((state) => ({
        operator: op,
        operator1: op,
        phase: 3,
        display: op,
      }));
    } else if (o1 === "-") {
      this.setState((state) => ({
        operator1: o1,
        operator2: o2,
        operator: o2,
        part2Sign: "-",
        phase: 3,
        display: op,
      }));
    } else {
      this.setState((state) => ({
        operator1: o1,
        operator2: o2,
        operator: o1,
        part2Sign: "",
        phase: 3,
        display: op,
      }));
    }
  }

  // Equals
  applyEquals() {
    if (this.state.phase === 4) {
      let tempResult = 0;
      let tempSign = "";
      tempResult = this.calculateResult();
      if (tempResult < 0) {
        tempResult = -tempResult;
        tempSign = "-";
      }
      tempResult = tempResult.toString();
      this.setState((state) => ({
        result: tempResult,
        resultSign: tempSign,
        phase: 5,
        display: tempSign + tempResult,
      }));
    }
  }
  calculateResult() {
    let number1 = parseFloat(this.state.part1Sign + this.state.part1);
    let number2 = parseFloat(this.state.part2Sign + this.state.part2);

    switch (this.state.operator) {
      case "+":
        return Math.round((number1 + number2) * 1000000000) / 1000000000;
        break;
      case "-":
        return Math.round((number1 - number2) * 1000000000) / 1000000000;
        break;
      case "*":
        return Math.round(number1 * number2 * 1000000000) / 1000000000;
        break;
      case "/":
        return Math.round((number1 / number2) * 1000000000) / 1000000000;
        break;
      default:
        break;
    }
  }

  render() {
    const displayInput =
      this.state.part1Sign +
      this.state.part1 +
      this.state.operator +
      this.state.part2Sign +
      this.state.part2;
    const displayResult = this.state.display;
    return (
      <div id="host-layer">
        <div id="box">
          <div id="screen">
            <div id="input-display">{displayInput}</div>
            <div id="display">{displayResult}</div>
          </div>
          <div id="result-pad">
            <button
              id="equals"
              className="pad result-pad btn"
              onClick={this.applyEquals}
            >
              <strong>=</strong>
            </button>
            <button
              id="clear"
              className="pad result-pad btn"
              onClick={this.handleClear}
            >
              <strong>Clear</strong>
            </button>
          </div>
          <div id="input-pad">
            <div className="num-pad">
              <Numpad getNumberInput={this.getNumberInput} />
            </div>
            <div className="operator-pad">
              <Operators getOperatorInput={this.getOperatorInput} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyApp />, document.getElementById("machine-app"));

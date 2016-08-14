$(document).ready(function() { 
  var output = "";
  $(".value").on("click", function() {
    output += this.innerHTML;
    updateOutput();
  })
  $(".operator").on("click", function() {
    output += this.innerHTML;
    updateOutput();
  })
  $(".equals").on("click", function() {
    calculate();
    updateOutput();
  })
  $(".clear").on("click", function() {
    output = "";
    updateOutput();
  })
  $(".delete").on("click", function() {
    var outputArr = output.split("");
    outputArr.pop();
    output = outputArr.join("");
    updateOutput();
  })

  document.onkeypress = function() {
     //output=event.which;
   // updateOutput();
    switch (event.which) {
      case 13: $(".equals").click(); break;
      case 8:
        $(".delete").click();
        break; //backspace
      case 127:
        $(".delete").click();
        break; //backspace
      case 33:
        $(".operator-factorial").click();
        break; //factorial
      case 120:
        $(".operator-x").click();
        break; //multiply
      case 88:
        $(".operator-x").click();
        break; //multiply
      case 42:
        $(".operator-x").click();
        break; //multiply
      case 43:
        $(".operator-plus").click();
        break;
      case 45:
        $(".operator-minus").click();
        break;
      case 61:
        $(".equals").click();
        break;
      case 37:
        $(".operator-mod").click();
        break;
      case 40:
        $(".operator-left").click();
        break;
      case 41:
        $(".operator-right").click();
        break;
      case 47:
        $(".operator-divide").click();
        break;
      case 94:
        $(".operator-power").click();
        break;
         case 68:
        $(".delete").click();
        break;
         case 100:
        $(".delete").click();
        break;
         case 67:
        $(".clear").click();
        break;
         case 99:
        $(".clear").click();
        break;

      case 48:
        $("#num-0").click();
        break;
      case 49:
        $("#num-1").click();
        break;
      case 50:
        $("#num-2").click();
        break;
      case 51:
        $("#num-3").click();
        break;
      case 52:
        $("#num-4").click();
        break;
      case 53:
        $("#num-5").click();
        break;
      case 54:
        $("#num-6").click();
        break;
      case 55:
        $("#num-7").click();
        break;
      case 56:
        $("#num-8").click();
        break;
      case 57:
        $("#num-9").click();
        break;
    }

  };

  function calculate() {
      var stack = [];
      var inputs = output.split("");
      var lastChar = "";
      //group values in stack
      stack = clumpNumbers(inputs);//.split(" ");
	  stack=stack.split(" ");
      // insert implied operations
      stack = getImpliedOperations(stack);
      // convert the outstring to postfix
      stack = getPostfix(stack);
      //calculate the stack
      output = evaluate(stack).join(" ");
    } // ends calculate

  function updateOutput() {

if(output=="NaN" || output=="Infinity" ) 
  { 
    output="error";
    $("#output").html(output);
    output="";
  }
   else{
     $("#output").html(output);
   } 
  
  }

}); // ends document.ready

function clumpNumbers(stack) {
	//returns a string of numbers seperated by space 
  var temp = "";
  var lastChar = "";

  for (var i = 0; i < stack.length; i++) {

    if (isNumber(stack[i])) {

      if (i == stack.length - 1 && isOperator(lastChar)) {
        temp += " " + stack[i];
      } else {
        temp += stack[i];
        lastChar = stack[i];
      }
    } else if (stack[i] == ")" || stack[i] == "(") {
      temp += " ";
      temp += stack[i];
      temp += " ";
      lastChar = stack[i];
    } else if (isOperator(stack[i])) {
      temp += " ";
      temp += stack[i];
      temp += " ";
      lastChar = stack[i];
    }

  } // ends for loop
  return temp;
}; // ends clump numbers

function getPostfix(input) {
	//convert the input to postfix notation
  var postfix = [];
  var stack = [];
  
  for(var i=0; i<input.length; i++)
  {
	  if(isNumber(input[i]) )
	  {	 
		  postfix.push(input[i]);
	  }
	  else if(isOperator(input[i]) )
	  {
		  //when an operator is read, pop the stack onto postfix until the top of the stack has an element of lower precedence, then push the operator
		  
		  //if the current operator has equal precedence, pop the existing operators onto the postfix until there is a operator of lower priority, then push the current
		  if(stack.length<1 | hasPrecedence(input[i],stack[stack.length-1])==1 )
		  {
			  stack.push(input[i])
		  }
		  else if(!hasPrecedence(input[i],stack[stack.length-1]) )
		  {
			  //current operator has equal precedence to the top of the stack
			  while(stack.length>0 && (hasPrecedence(input[i], stack[stack.length-1])==1 | hasPrecedence(input[i], stack[stack.length-1])==1)  )
			  {
				  postfix.push(stack.pop());
			  }
			   stack.push(input[i]);
		  }
		  else
		  {
			  //current operator has greater precedence to the top of the stack
			  postfix.push(stack.pop());
			  stack.push(input[i]);
		  }
		  
	  }
  else if(input[i]=="(")
  {
	  //when input "(" has the highest priority, when read it is the lowest
	  stack.push("(");
  }
  else if(input[i]==")" )
  {
	  //when "(", pop the stack onto postfix until "(" is read
	  while(stack[stack.length-1]!="(" )
	  {
		    postfix.push(stack.pop());
	  }
	  
	  stack.pop();
  }
  else if(input=="")
  {
	  continue;
  }
  
  }
  
  while(stack.length>0)
  {
	  postfix.push(stack.pop());
  }
  return postfix;

}

function evaluate(input) {
  var stack = [];
  for (var i in input) {
    if (isNumber(input[i])) {
      stack.push(toNumber(input[i]));
    } else if (input[i] == "!") {
      var a = stack.pop();
      stack.push(factorial(a));
    } else if (input[i] == "^") {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(Math.pow(b, a));
    } else if (input[i] == "*" || input[i] == "x") {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(a * b);
    } else if (input[i] == "/") {
      var a = stack.pop();
      var b = stack.pop();

      stack.push(b / a);
    } else if (input[i] == "%") {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(b % a);
    } else if (input[i] == "-") {
      var a = stack.pop();
      var b=0;
	  //handle subtraction as a unary operator
      b=stack.length>0? stack.pop():0;
      stack.push(b - a);
    } else if (input[i] == "+") {
      var a = stack.pop();
      var b = stack.pop();
      stack.push(a + b);
    }
  } // ends for loop
  return stack;
}

function getImpliedOperations(input) {
  var output = "";
  var lastChar = "";
 //input=input.split(" ");
 input=input.join("");
 
  for (var i in input) {
    if (input[i] == "(" && isNumber(lastChar)) {
      output += " * (";
      lastChar = "(";
    } else if (isNumber(input[i]) && lastChar == ")") {
      output += " * " + input[i];
      lastChar = input[i];
    }
	else if(input[i]=="(" && lastChar==")"){
		output+=" * (";
		lastChar="(";
	}
	else {
      output += " " + input[i];
      lastChar = input[i];
    }
  }
  return output.split(" ");

}

function hasPrecedence(a, b) {
//does a have precedence over b
  var aVal = getPrecedenceLevel(a);
  var bVal = getPrecedenceLevel(b);

  if (aVal == bVal) {
    return 0;
  } else if (aVal > bVal) {
    return 1;
  } else {
    return -1;
  }
}

function getPrecedenceLevel(operator) {
  switch (operator) {
    case ")":
      return 5;
    case "(":
      return 5;
    case "!":
      return 4;
    case "^":
      return 3;
    case "x":
      return 2;
    case "X":
      return 2;
    case "*":
      return 2;
    case "/":
      return 2;
    case "%":
      return 2;
    case "+":
      return 1;
    case "-":
      return 1;
  }
}

function isOperator(value) {
  switch (value) {
    case "!":
    case "^":
    case "+":
    case "-":
    case "/":
    case "x":
    case "X":
    case "*":
    case "%": return true;
    default:
      return false;
  }
}

function isNumber(value) {
  switch (value[0]) {
    case "0":
      return true;
    case "1":
      return true;
    case "2":
      return true;
    case "3":
      return true;
    case "4":
      return true;
    case "5":
      return true;
    case "6":
      return true;
    case "7":
      return true;
    case "8":
      return true;
    case "9":
      return true;
    default:
      return false;
  }
}

function toNumber(value) {
  
  var input = value.split("");
 // input = input.reverse();
  var output = 0;

  for (var i = 0; i < input.length; i++) {
    var num = 0;
    switch (input[i]) {
      case "0":
        num = 0;
        break;
      case "1":
        num = 1;
        break;
      case "2":
        num = 2;
        break;
      case "3":
        num = 3;
        break;
      case "4":
        num = 4;
        break;
      case "5":
        num = 5;
        break;
      case "6":
        num = 6;
        break;
      case "7":
        num = 7;
        break;
      case "8":
        num = 8;
        break;
      case "9":
        num = 9;
        break;
    }
    output = output * 10 + num;
  }
  return output;

}

function factorial(num) {
  var results = 1;
  for (var i = 1; i <= num; i++) {
    results *= i;
  }
  return results;
}
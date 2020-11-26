(function() {
    "use strict";
  
    // Atalho para obter os elementos
    var el = function(element) {
      if (element.charAt(0) === "#") { 
        return document.querySelector(element); 
      }
  
      return document.querySelectorAll(element); 
    };
  
    // Variaveis
    var numFixo = el("#numFixo"),
      igual = el("#igual"), 
      nums = el(".num"), 
      ops = el(".ops"), 
      theNum = "",
      oldNum = "", 
      resultNum, 
      operator; 
  
    // Quando um número é clicado. Obtenha o número clicado
    var setNum = function() {
      if (resultNum) { 
        theNum = this.getAttribute("data-num");
        resultNum = "";
      } else { 
        theNum += this.getAttribute("data-num");
      }
  
      numFixo.innerHTML = theNum;
  
    };
  
    // Quando o operador é clicado. Passe o número para o oldNum e salve o operador
    var moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");
  
      igual.setAttribute("data-result", ""); 
    };
  
    // Quando o igual é clicado, calcule a operação
    var displayNum = function() {
  
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);
  
      // Perform operation
      switch (operator) {
        case "mais":
          resultNum = oldNum + theNum;
          break;
  
        case "menos":
          resultNum = oldNum - theNum;
          break;
  
        case "vezes":
          resultNum = oldNum * theNum;
          break;
  
        case "dividir":
          resultNum = oldNum / theNum;
          break;
  
          // Se o igual é presionado sem operador, mantenha o número e continue
        default:
          resultNum = theNum;
      }
  
      // Se NaN ou Infinito retorne:
      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) { // Se o resultado não for um número; acionado por operadores de duplo clique, por exemplo:
          resultNum = "0";
        } else { // Se o resultado for infinito, comece dividindo por zero
            alert('Atualize o navegador para retornar.');
            resultNum = "Olha o que você fez";
          el('#calculadora').classList.add("parar"); // Parar calculadora
        }
      }

      numFixo.innerHTML = resultNum;
      igual.setAttribute("data-result", resultNum);
  
      // Agora reinicie o número antigo e mantenha o resultado
      oldNum = 0;
      theNum = resultNum;
  
    };
  
    // Quando o botão limpar é clicado, limpe tudo.
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      numFixo.innerHTML = "0";
      igual.setAttribute("data-result", resultNum);
    };
  
    /* Eventos de clique*/
  
    // Evento para adicionar número
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }
  
    // Evento ao clicar no operador
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }
  
    // Evento ao clicar no igual
    igual.onclick = displayNum;
  
    // Evento ao clicar no limpar
    el("#limpar").onclick = clearAll;
  
  }());
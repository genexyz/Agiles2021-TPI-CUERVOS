const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");

Given("Me quedan vidas restantes", function () {
  // Given general para los 4 escenarios, no es necesario escribirlo en cada uno
  return "pending";
});

// Escenario 1: Adivina la Palabra Secreta
When("Intento CUERVOS como la palabra secreta", function () {
  // Escribir codigo que torne la frase superior en acciones concretas
  return "pending";
});
Then("Se me informa que he ganado", function () {
  // Escribir codigo que torne la frase superior en acciones concretas
  return "pending";
});

// Escenario 2: Falla la Palabra Secreta
When("Intento MARATON como la palabra secreta", function () {
  return "pending";
});

Then("Se me informa que he perdido", function () {
  return "pending";
});

// Escenario 3: Adivina una letra de la palabra secreta
When("Ingreso la letra C como letra de la palabra secreta", function () {
  return "pending";
});

Then("Se agrega la letra a la pista actual en su posicion correcta", function () {
  return "pending";
});

// Escenario 4: Falla una letra de la palabra secreta
When("Ingreso la letra F como letra de la palabra secreta", function () {
  return "pending";
});

Then("Se agrega la letra a la lista de letras incorrectas", function () {
  return "pending";
});

Then("Se disminuye la puntuacion actual", function () {
  return "pending";
});

Then("Se pierde 1 vida", function () {
  return "pending";
});
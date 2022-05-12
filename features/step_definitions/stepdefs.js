const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const screen = {
  width: 640,
  height: 480,
};

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options().headless().windowSize(screen))
  .build();

// Given general para los 4 escenarios, no es necesario escribirlo en cada uno
Given("Me quedan vidas restantes", async function () {
  await driver.get("https://agiles2021-tpi-cuervos.vercel.app/");

  await driver.findElement(By.id("formUsername")).sendKeys("Usuario");

  await driver.findElement(By.xpath("//*[text()='Confirmar']")).click();

  let lives = await driver.findElement(By.id("vidas")).getText();

  assert(lives > 0);
});

// Escenario 1: Adivina la Palabra Secreta
When("Intento CUERVOS como la palabra secreta", async function () {
  await driver.findElement(By.id("formWord")).sendKeys("cuervos");

  await driver.findElement(By.xpath("//*[text()='Confirmar Palabra']")).click();
});
Then("Se me informa que he ganado", async function () {
  await driver.findElement(By.xpath("//*[text()='VICTORIA!']"));
});

// Escenario 2: Falla la Palabra Secreta
When("Intento MARATON como la palabra secreta", async function () {
  await driver.findElement(By.id("formWord")).sendKeys("maraton");

  await driver.findElement(By.xpath("//*[text()='Confirmar Palabra']")).click();
});

Then("Se me informa que he perdido", async function () {
  await driver.findElement(By.xpath("//*[text()='DERROTA!']"));
});

// Escenario 3: Adivina una letra de la palabra secreta
When("Ingreso la letra C como letra de la palabra secreta", async function () {
  await driver.findElement(By.id("formLetter")).sendKeys("c");

  await driver.findElement(By.xpath("//*[text()='Confirmar Letra']")).click();
});

Then("Se agrega la letra a la pista actual en su posicion correcta", async function () {
  let hint = await driver.findElement(By.className("pista")).getText();

  assert(hint === "C______");
});

// Escenario 4: Falla una letra de la palabra secreta
When("Ingreso la letra F como letra de la palabra secreta", async function () {
  await driver.findElement(By.id("formLetter")).sendKeys("f");

  await driver.findElement(By.xpath("//*[text()='Confirmar Letra']")).click();
});

Then("Se agrega la letra a la lista de letras incorrectas", async function () {
  let wrongLetter = await driver.findElement(By.className("stats-letters")).getText();

  assert(wrongLetter === "F");
});

Then("Se disminuye la puntuacion actual", async function () {
  await driver.findElement(By.xpath("//*[text()='85']"));
});

Then("Se pierde 1 vida", async function () {
  let lives = await driver.findElement(By.id("vidas")).getText();

  assert(lives === "6");
});

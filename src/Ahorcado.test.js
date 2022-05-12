/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Ahorcado from "./Ahorcado";
import React from "react";

test("Nombre Usuario - Ingreso nombre vacio", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("Debe ingresar un nombre");
});

test("Nombre Usuario - El nombre tiene mas de 20 caracteres", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "palabramuylargasuperlarga" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("El nombre debe tener menos de 20 caracteres");
});

test("Nombre Usuario - El nombre tiene espacios", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "Nombre Espaciado" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("El nombre no debe tener espacios");
});

test("Nombre Usuario - Ingreso nombre con caracteres invalidos", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "Pedro@" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("El nombre solo tiene que tener caracteres alfanumericos");
});

test("Nombre Usuario - Ingreso nombre valido", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "Carlos" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("Usuario: Carlos");
});

test("Nombre Usuario - Ingreso nombre valido 2", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "Martin25" } });

  fireEvent.submit(view.getByTestId("name-form"));

  view.getByText("Usuario: Martin25");
});

test("Arriesgar Palabra - Arriesgo palabra vacía", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputWord = view.getByPlaceholderText("Ingrese Palabra");

  fireEvent.change(inputWord, { target: { value: "" } });

  fireEvent.submit(view.getByTestId("word-form"));

  view.getByText("Debe ingresar una palabra");
});

test("Arriesgar Palabra - Arriesgo palabra incorrecta", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputWord = view.getByPlaceholderText("Ingrese Palabra");

  fireEvent.change(inputWord, { target: { value: "MARATON" } });

  fireEvent.submit(view.getByTestId("word-form"));

  view.getByText("DERROTA!");
});

test("Arriesgar Palabra - Arriesgo palabra correcta", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputWord = view.getByPlaceholderText("Ingrese Palabra");

  fireEvent.change(inputWord, { target: { value: "CUERVOS" } });

  fireEvent.submit(view.getByTestId("word-form"));

  view.getByText("VICTORIA!");
});

test("Ingresar Letra - Ingreso caracter vacío", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("Debe ingresar una letra");
});

test("Ingresar Letra - Ingreso varias letras", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "abc" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("Debe ingresar solamente una letra");
});

test("Ingresar Letra - Ingreso un numero", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "1" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("Debe ingresar una letra");
});

test("Ingresar Letra - Ingreso un caracter especial", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "@" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("Debe ingresar una letra");
});

test("Jugar Basico - Prueba de juego basico con palabra CUERVOS - Victoria", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "C" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("C______");

  fireEvent.change(inputLetter, { target: { value: "U" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CU_____");

  fireEvent.change(inputLetter, { target: { value: "E" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  fireEvent.change(inputLetter, { target: { value: "R" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUER___");

  fireEvent.change(inputLetter, { target: { value: "V" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUERV__");

  fireEvent.change(inputLetter, { target: { value: "O" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUERVO_");

  fireEvent.change(inputLetter, { target: { value: "S" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUERVOS");

  view.getByText("100 / 100");

  view.getByText("VICTORIA!");
});

test("Jugar Basico - Prueba de juego basico con palabra CUERVOS - Derrota", () => {
  const view = render(<Ahorcado />);

  const input = view.getByPlaceholderText("Ingrese Nombre de Usuario");

  fireEvent.change(input, { target: { value: "TesterUser" } });

  fireEvent.submit(view.getByTestId("name-form"));

  const inputLetter = view.getByPlaceholderText("Ingrese Letra");

  fireEvent.change(inputLetter, { target: { value: "C" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("C______");

  view.getByText("100 / 100");

  fireEvent.change(inputLetter, { target: { value: "U" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CU_____");

  view.getByText("100 / 100");

  fireEvent.change(inputLetter, { target: { value: "E" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("100 / 100");

  fireEvent.change(inputLetter, { target: { value: "A" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("85 / 100");

  view.getByText("A");

  fireEvent.change(inputLetter, { target: { value: "Q" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("70 / 100");

  view.getByText("AQ");

  fireEvent.change(inputLetter, { target: { value: "W" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("55 / 100");

  view.getByText("AQW");

  fireEvent.change(inputLetter, { target: { value: "T" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("40 / 100");

  view.getByText("AQWT");

  fireEvent.change(inputLetter, { target: { value: "Y" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("25 / 100");

  view.getByText("AQWTY");

  fireEvent.change(inputLetter, { target: { value: "I" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("10 / 100");

  view.getByText("AQWTYI");

  fireEvent.change(inputLetter, { target: { value: "P" } });

  fireEvent.submit(view.getByTestId("letter-form"));

  view.getByText("CUE____");

  view.getByText("0 / 100");

  view.getByText("AQWTYIP");

  view.getByText("DERROTA!");
});

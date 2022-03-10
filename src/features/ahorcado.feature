Feature: Adivinar la Palabra
        El usuario quiere adivinar la palabra secreta.
        Se ingresan letras o la palabra y se indica si son correctas o no.

Scenario Outline: Adivina la Palabra Secreta
    Given Me quedan vidas restantes
    When Intento CUERVOS como la palabra secreta
    Then Se me informa que he ganado

Scenario Outline: Falla la Palabra Secreta
    Given Me quedan vidas restantes
    When Intento MARATON como la palabra secreta
    Then Se me informa que he perdido

Scenario Outline: Adivina una letra de la palabra secreta
    Given Me quedan vidas restantes
    When Ingreso la letra C como letra de la palabra secreta
    Then Se agrega la letra a la pista actual en su posicion correcta

Scenario Outline: Falla una letra de la palabra secreta
    Given Me quedan vidas restantes
    When Ingreso la letra F como letra de la palabra secreta
    Then Se agrega la letra a la lista de letras incorrectas
    And Se disminuye la puntuacion actual
    And Se pierde 1 vida

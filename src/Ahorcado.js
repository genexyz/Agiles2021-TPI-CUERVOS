import React, { useState } from "react";
import { Form, Container, Button, Alert, Modal, Navbar } from "react-bootstrap";

const Ahorcado = () => {
  const [palabraSecreta, setPalabraSecreta] = useState("CUERVOS");
  const [nuevaPalabraSecreta, setNuevaPalabraSecreta] = useState("");
  const [pistaActual, setPistaActual] = useState("");
  const [vidasRestantes, setVidasRestantes] = useState(7);
  const [letrasIncorrectas, setLetrasIncorrectas] = useState([]);
  const [puntuacionActual, setPuntuacionActual] = useState(100);
  const [valorPuntuacionIncorrecta, setValorPuntuacionIncorrecta] = useState(
    Math.round((puntuacionActual / vidasRestantes) * 100) / 100
  );
  const [nombreJugador, setNombreJugador] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showLetterAlert, setShowLetterAlert] = useState(false);
  const [showNewWordAlert, setShowNewWordAlert] = useState(false);
  const [msjInvalid, setMsjInvalid] = useState("");
  const [letterMsjInvalid, setLetterMsjInvalid] = useState("");
  const [newWordMsgStatus, setNewWordMsgStatus] = useState("");
  const [newWordAlertVariant, setNewWordAlertVariant] = useState("danger");
  const [changeWordModal, setChangeWordModal] = useState(false);
  const [newWordButton, setNewWordButton] = useState(true);
  const [letraNueva, setLetraNueva] = useState("");
  const [palabraArriesgadaNueva, setPalabraArriesgadaNueva] = useState("");
  const [endGameModal, setEndGameModal] = useState(false);
  const [endGameModalMsg, setEndGameModalMsg] = useState("");
  const DERROTA = "DERROTA!";
  const VICTORIA = "VICTORIA!";

  const setIitialValues = (palabra) => {
    let pista = "";
    // eslint-disable-next-line no-unused-vars
    for (let _ of palabra) {
      pista += "_";
    }
    setPistaActual(pista);
    setVidasRestantes(7);
    setLetrasIncorrectas([]);
    setPuntuacionActual(100);
    setPalabraArriesgadaNueva("");
    setValorPuntuacionIncorrecta(15);
  };

  const ingresarLetra = (letra) => {
    if (letra.length === 0)
      return { error: 1, mensaje: "Debe ingresar una letra", pista: pistaActual, letra };
    if (letra.length > 1)
      return {
        error: 1,
        mensaje: "Debe ingresar solamente una letra",
        pista: pistaActual,
        letra,
      };
    if (letra.match("^.*[^a-zA-Z ].*$"))
      return { error: 1, mensaje: "Debe ingresar una letra", pista: pistaActual, letra };

    let pista = "";
    let vidasActuales = vidasRestantes;
    if (palabraSecreta.indexOf(letra) === -1) {
      setVidasRestantes(vidasRestantes - 1);
      vidasActuales--;
      setPuntuacionActual(Math.trunc(puntuacionActual - valorPuntuacionIncorrecta));
      if (puntuacionActual < 0) {
        setPuntuacionActual(0);
      }
      setLetrasIncorrectas([...letrasIncorrectas, letra]);
    }
    for (let i = 0; i < palabraSecreta.length; i++) {
      if (letra === palabraSecreta[i]) pista += letra;
      else pista += pistaActual[i];
    }
    setPistaActual(pista);

    if (vidasActuales === 0) {
      setEndGameModalMsg(DERROTA);
      setEndGameModal(true);
      setPuntuacionActual(0);
    }
    if (pista.indexOf("_") === -1) {
      setEndGameModalMsg(VICTORIA);
      setEndGameModal(true);
    }

    return {
      pista: pistaActual,
      letra: letra,
      vidasRestantes: vidasRestantes,
      letrasIncorrectas: letrasIncorrectas,
      puntuacion: puntuacionActual,
    };
  };

  const ingresarNombre = (nombre) => {
    if (nombre.length === 0) return { error: 1, mensaje: "Debe ingresar un nombre" };
    if (nombre.length > 20)
      return { error: 1, mensaje: "El nombre debe tener menos de 20 caracteres" };
    if (nombre.indexOf(" ") >= 0)
      return { error: 1, mensaje: "El nombre no debe tener espacios" };
    if (nombre.match("^.*[^a-zA-Z0-9 ].*$"))
      return {
        error: 1,
        mensaje: "El nombre solo tiene que tener caracteres alfanumericos",
      };
    return { error: 0, mensaje: nombre };
  };

  const ingresarPalabra = (palabra) => {
    if (palabra.length === 0) return { error: 1, mensaje: "Debe ingresar una palabra" };
    if (palabra.length > 20)
      return { error: 1, mensaje: "La palabra debe tener menos de 20 caracteres" };
    if (palabra.indexOf(" ") >= 0)
      return { error: 1, mensaje: "La palabra no debe tener espacios" };
    if (palabra.match("^.*[^a-zA-Z ].*$"))
      return {
        error: 1,
        mensaje: "La palabra solo debe contener letras",
      };
    if (palabra === palabraSecreta)
      return {
        error: 1,
        mensaje: "La nueva palabra es igual a la palabra actual, ingrese otra.",
      };
    return { error: 0, mensaje: palabra };
  };

  const ingresarPalabraNueva = (palabra) => {
    if (palabra.length === 0) return { error: 1, mensaje: "Debe ingresar una palabra" };
    if (palabra.length > 20)
      return { error: 1, mensaje: "La palabra debe tener menos de 20 caracteres" };
    if (palabra.indexOf(" ") >= 0)
      return { error: 1, mensaje: "La palabra no debe tener espacios" };
    if (palabra.match("^.*[^a-zA-Z ].*$"))
      return {
        error: 1,
        mensaje: "La palabra solo debe contener letras",
      };
    return { error: 0, mensaje: palabra };
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const mensaje = ingresarNombre(e.target.elements[0].value);
    console.log(mensaje);
    if (mensaje.error === 1) {
      setMsjInvalid(mensaje.mensaje);
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setIitialValues(palabraSecreta);
      setNombreJugador(mensaje.mensaje);
    }
  };

  const handleLetterSubmit = (e) => {
    setShowLetterAlert(false);
    e.preventDefault();
    const mensaje = ingresarLetra(e.target.elements[0].value);
    console.log(mensaje);
    if (mensaje.error === 1) {
      setLetterMsjInvalid(mensaje.mensaje);
      setShowLetterAlert(true);
    } else {
      setShowLetterAlert(false);
      setLetraNueva("");
    }
  };

  const handleCloseModal = () => {
    setChangeWordModal(false);
    setShowNewWordAlert(false);
  };

  const handleChangeWordSubmit = (e) => {
    e.preventDefault();
    const mensaje = ingresarPalabra(e.target.elements[0].value.toUpperCase());
    console.log(mensaje);
    if (mensaje.error === 1) {
      setNewWordMsgStatus(mensaje.mensaje);
      setShowNewWordAlert(true);
      setNewWordAlertVariant("danger");
      setNewWordButton(true);
    } else {
      setNewWordAlertVariant("success");
      setNewWordMsgStatus("La Palabra es Válida");
      setNewWordButton(false);
      setShowNewWordAlert(true);
      setNuevaPalabraSecreta(mensaje.mensaje.toUpperCase());
    }
  };

  const handleNewWordChange = () => {
    setPalabraSecreta(nuevaPalabraSecreta);
    setIitialValues(nuevaPalabraSecreta);
    handleCloseModal();
  };

  const handleLetterInput = (e) => {
    setLetraNueva(e.target.value.toUpperCase());
  };

  const handleWordInput = (e) => {
    setPalabraArriesgadaNueva(e.target.value.toUpperCase());
  };

  const handleWordSubmit = (e) => {
    e.preventDefault();
    const mensaje = ingresarPalabraNueva(e.target.elements[0].value.toUpperCase());
    console.log(mensaje);
    if (mensaje.error === 1) {
      setMsjInvalid(mensaje.mensaje);
      setShowAlert(true);
    } else {
      setEndGameModal(true);
      if (mensaje.mensaje !== palabraSecreta) {
        setEndGameModalMsg(DERROTA);
      } else {
        setEndGameModalMsg(VICTORIA);
      }
    }
  };

  const handleEndGameModalClose = () => {
    setEndGameModal(false);
  };

  const handleEndGameRestart = () => {
    setNombreJugador("");
    setIitialValues(palabraSecreta);
    setEndGameModal(false);
  };

  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="brand">
            Ahorcado - Cuervos
          </Navbar.Brand>
          {nombreJugador && <div className="brand-user">Usuario: {nombreJugador}</div>}
        </Container>
      </Navbar>
      <Container className="mt-5 main-body">
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>{msjInvalid}</Alert.Heading>
          </Alert>
        )}
        <Modal show={changeWordModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cambio de Palabra Secreta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showNewWordAlert && (
              <Alert
                variant={newWordAlertVariant}
                onClose={() => setShowNewWordAlert(false)}
                dismissible
              >
                <Alert.Heading>{newWordMsgStatus}</Alert.Heading>
              </Alert>
            )}
            <Form onSubmit={handleChangeWordSubmit}>
              <Form.Group className="mb-3" controlId="formChangeWord">
                <Form.Label>Ingrese la nueva Palabra Secreta</Form.Label>
                <Form.Control type="text" placeholder="Ingrese Palabra Secreta" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Validar
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleNewWordChange}
              disabled={newWordButton}
            >
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={endGameModal} onHide={handleEndGameModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Fin del Juego</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-endgame">{endGameModalMsg}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleEndGameModalClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleEndGameRestart}>
              Volver a Jugar
            </Button>
          </Modal.Footer>
        </Modal>
        {!nombreJugador && (
          <Form onSubmit={handleNameSubmit} data-testid="name-form">
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nombre de Usuario:</Form.Label>
              <Form.Control type="text" placeholder="Ingrese Nombre de Usuario" />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Confirmar
              </Button>
            </div>
          </Form>
        )}
        {nombreJugador && (
          <>
            {showLetterAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowLetterAlert(false)}
                dismissible
              >
                <Alert.Heading>{letterMsjInvalid}</Alert.Heading>
              </Alert>
            )}
            <div className="text-center pista-box">
              Pista Actual:
              <div className="pista">{pistaActual}</div>
            </div>
            <br />
            <Form onSubmit={handleLetterSubmit} data-testid="letter-form">
              <Form.Group className="mb-3" controlId="formLetter">
                <Form.Label>Ingrese una Letra</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Letra"
                  onChange={handleLetterInput}
                  value={letraNueva}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Confirmar
                </Button>
              </div>
            </Form>
            <br />
            <Form onSubmit={handleWordSubmit} data-testid="word-form">
              <Form.Group className="mb-3" controlId="formWord">
                <Form.Label>Ingrese Palabra a Arriesgar</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Palabra"
                  onChange={handleWordInput}
                  value={palabraArriesgadaNueva}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Confirmar
                </Button>
              </div>
            </Form>
            <div className="stats-box">
              <div>
                <span className="stats-titles">Vidas Restantes:</span>{" "}
                <span data-testid="vidas">{vidasRestantes}</span>
              </div>
              <div>
                <span className="stats-titles">Letras Incorrectas:</span>{" "}
                <span className="stats-letters">{letrasIncorrectas}</span>
              </div>
              <div>
                <span className="stats-titles">Puntuacion Actual:</span>{" "}
                {puntuacionActual} / 100
              </div>
            </div>
            <div className="text-center">
              <Button
                className="change-word-btn"
                onClick={() => setChangeWordModal(true)}
              >
                Cambiar Palabra Secreta
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Ahorcado;

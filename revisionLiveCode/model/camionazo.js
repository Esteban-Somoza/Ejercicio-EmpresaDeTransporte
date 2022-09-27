class Camionazo extends Camion {
    constructor() {
        super(1.5, 2000);
    }

    tiempoParaViaje(kmBuenEstado, kmMalEstado, carga) {
        let coeficienteCarga;
        let tiempoFijo = 1;
        if (carga <= 10000) {
            coeficienteCarga = 1;
        } else if (carga > 10000) {
            coeficienteCarga = 1.3;
        }
        let tiempoParaViaje = tiempoFijo + kmBuenEstado / 90 + kmMalEstado / 70 * coeficienteCarga;
        return tiempoParaViaje;
    }

    consumoParticular(kmBuenEstado, kmMalEstado, consumoPorCarga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado;
        return 1 * kilometrajeTotal * consumoPorCarga + 0.3 * kilometrajeTotal;
    }

}

module.exports = Camionazo
class Combi {
    constructor() {
        this.cargaMaxima = 2500;
    }

    tiempoParaViaje (kmBuenEstado, kmMalEstado, carga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado;
        let limitePeso = 1800;
        let tiempo;
        if (carga <= limitePeso) {
            tiempo = 100;
        }
        if (carga > limitePeso) {
            tiempo = 90;
        }

        let tiempoParaViaje = kilometrajeTotal / tiempo;
        return tiempoParaViaje;
    }
    
    consumoCombustible (kmBuenEstado, kmMalEstado, carga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado;
        let limitePeso = 1500;
        let consumo;

        if (carga <= limitePeso) {
            consumo = 0.15;
        }
        if (carga > limitePeso) {
            consumo = 0.2;
        }
        let consumoCombustible = kilometrajeTotal * consumo;
        return consumoCombustible;
    }

}

module.exports = Combi;
class Camioneta extends Vehiculo {
    constructor(cargaInicial) {
        this.cargaMaxima = 1200;
        this.carga = cargaInicial;
    }

    
    consumoCombustible(kmBuenEstado, kmMalEstado) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado;
        let consumoCombustible = kilometrajeTotal * 0.1;
        return consumoCombustible;
    }

    estasDisponible() {
        this.cargaMaxima >= carga;
    }
};

module.exports = Camioneta;
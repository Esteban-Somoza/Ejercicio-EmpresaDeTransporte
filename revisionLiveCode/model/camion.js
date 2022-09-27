class Camion extends Vehiculo {
    constructor(unCoeficientePorKm, unaCargaMaxima) {
        this.carga = 0;
        this.coeficientePorKm = unCoeficientePorKm;
        this.cargaMaxima = unaCargaMaxima;
    }

    consumoCombustible(kmBuenEstado, kmMalEstado) {
        let consumoPorCarga = this.carga / this.coeficientePorKm;
        let consumoCombustible = consumoParticular(kmBuenEstado, kmMalEstado, consumoPorCarga);
        return consumoCombustible;
    }
}

module.exports = Camion;
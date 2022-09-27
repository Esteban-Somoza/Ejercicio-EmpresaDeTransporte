class Viaje {
    constructor(origen, destino, carga) {
        this.origen = origen;
        this.destino = destino;
        this.carga = carga;
    }

    cargaATransportar() {
        return this.carga;
    }
}
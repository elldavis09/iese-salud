export default class Group {
    constructor(id, grupo, carrera_id, estudiantes_count, ciclo, carrera) {
        this.id = id;
        this.grupo = grupo;
        this.carrera_id = carrera_id;
        this.estudiantes_count = estudiantes_count;
        this.ciclo = ciclo;
        this.carrera = carrera;
    }
}

export default class Carrera {
    constructor(id, name) {
        this.id = id;
        this.carrera = name;
    }
}


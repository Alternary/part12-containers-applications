"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const types_1 = require("../src/types");
const zod_1 = require("zod");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const patients_full_1 = __importDefault(require("../data/patients-full"));
app.get('/api/ping', (_req, res) => {
    // console.log('in here')
    res.send('pong');
    // res.send(getDiagnoses())
});
const getDiagnoses = () => {
    return diagnoses_1.default;
};
app.get('/api/diagnoses', (_req, res) => {
    // console.log('HERE')
    const ds = getDiagnoses();
    res.send(ds);
});
const getPatients = () => {
    return patients_full_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
app.get('/api/patients', (_req, res) => {
    const ps = getPatients();
    res.send(ps);
});
app.get('/api/patients/:id', (req, res) => {
    const ps = patients_full_1.default
        .map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries
    }))
        .filter(p => p.id === req.params.id);
    res.send(ps);
});
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient = {
            id: (0, uuid_1.v1)(),
            name: zod_1.z.string().parse(object.name),
            dateOfBirth: zod_1.z.string().date().parse(object.dateOfBirth),
            ssn: zod_1.z.string().parse(object.ssn),
            gender: zod_1.z.enum(types_1.Gender).parse(object.gender),
            occupation: zod_1.z.string().parse(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
app.post('/api/patients', (req, res) => {
    const newPatient = toNewPatient(req.body);
    res.send(newPatient);
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

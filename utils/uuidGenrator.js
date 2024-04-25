import { v1, v4 } from 'uuid';

export function generateUUIDv1() {
    return v1();
}

export function generateUUIDv4() {
    return v4();
}
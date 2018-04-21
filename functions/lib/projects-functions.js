"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
class ProjectsFunctions {
    constructor(db) {
        this.db = db;
    }
    searchProjects() {
        return new Observable_1.Observable(observer => {
            this.db.ref('/projects')
                .once('value')
                .then((projects) => {
                observer.next(projects);
            })
                .catch((error) => observer.error(error));
        });
    }
}
exports.ProjectsFunctions = ProjectsFunctions;
//# sourceMappingURL=projects-functions.js.map
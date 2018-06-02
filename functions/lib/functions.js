"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
class Functions {
    constructor(db) {
        this.db = db;
    }
    searchProjects(text) {
        return new Observable_1.Observable(observer => {
            this.db.ref('/projects')
                .once('value')
                .then((res) => {
                const val = res.val();
                let projects = val ? Object.keys(val).map(key => val[key]) : [];
                if (text) {
                    projects = projects.filter(project => project.code.includes(text) ||
                        project.title.includes(text));
                }
                observer.next(projects);
            })
                .catch((error) => observer.error(error));
        });
    }
    getUserByEmail(email) {
        console.log(email);
        return new Observable_1.Observable(observer => {
            this.db.ref('users').orderByChild('email').equalTo(email).once('value')
                .then(user => observer.next(user))
                .catch((error) => observer.error(error));
        });
    }
}
exports.Functions = Functions;
//# sourceMappingURL=functions.js.map
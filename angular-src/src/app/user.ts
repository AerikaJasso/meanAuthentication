export class User {
    constructor(
        public name = '',
        public username = '',
        public email= '',
        public password = '',
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()

    ) {

    }
}
